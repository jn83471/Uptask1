import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import Token from "../models/Token";

export class AuthController{
    static createAccount:any=async(req: Request,res: Response)=>{
        try {
            const userExist=await User.findOne({email:req.body.email})
            if(userExist){
                const error=new Error('Usuario ya registrado')
                return res.status(409).send({error: error.message})
            }
            const user=new User(req.body)
            user.password=await hashPassword(user.password)

            const token=new Token()
            token.token=generateToken()
            token.user=user.id;

            Promise.allSettled([user.save(),token.save()])
            return res.send('Cuenta generada')
        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }
}