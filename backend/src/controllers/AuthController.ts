import type { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import Token from "../models/Token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    static createAccount: any = async (req: Request, res: Response) => {
        try {
            const userExist = await User.findOne({ email: req.body.email })
            if (userExist) {
                const error = new Error('Usuario ya registrado')
                return res.status(409).send({ error: error.message })
            }
            const user = new User(req.body)
            user.password = await hashPassword(user.password)

            const token = new Token()
            token.token = generateToken()
            token.user = user.id;

            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            Promise.allSettled([user.save(), token.save()])
            return res.send('Cuenta generada')
        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static ConfirmAccount: any = async (req: Request, res: Response) => {
        try {
            const { token } = req.body

            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('token no valido')
                return res.status(404).json({ error: error.message })
            }
            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([
                user.save(),
                tokenExists.deleteOne()
            ])

            res.send("Cuenta confirmada correctamente")

        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static Login: any = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error('Usuario no encontrado')
                return res.status(404).json({ error: error.message })
            }
            if (!user.confirmed) {
                const token = new Token()
                token.token = generateToken()
                token.user = user.id;
                await token.save()
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })
                const error = new Error('La cuenta no ha sido confirmada, Se ha enviado un correo con la confirmación')
                return res.status(401).json({ error: error.message })
            }

            const isPassword=await checkPassword(password,user.password)
            if(!isPassword){
                const error = new Error('Password incorrecto')
                return res.status(404).json({ error: error.message })
            }
            const tk=generateJWT({id: user.id})
            res.send(tk)

        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }

    static requestConfirmationCode: any = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                const error = new Error('El usuario no esta registrado')
                return res.status(409).send({ error: error.message })
            }

            if(user.confirmed){
                const error = new Error('El usuario ya esta confirmado')
                return res.status(403).send({ error: error.message })
            }

            const token = new Token()
            token.token = generateToken()
            token.user = user.id;

            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            Promise.allSettled([user.save(), token.save()])
            return res.send('Se envio un nuevo token')
        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static forgetPassword: any = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                const error = new Error('El usuario no esta registrado')
                return res.status(409).send({ error: error.message })
            }

            /*if(user.confirmed){
                const error = new Error('El usuario ya esta confirmado')
                return res.status(403).send({ error: error.message })
            }*/

            const token = new Token()
            token.token = generateToken()
            token.user = user.id;

            await token.save();

            AuthEmail.sendPasswordReset({
                email: user.email,
                name: user.name,
                token: token.token
            })

            return res.send('reviza tu email para seguir instrucciones')
        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }
     static ValidateToken: any = async (req: Request, res: Response) => {
        try {
            const { token } = req.body

            const tokenExists = await Token.findOne({ token })
            if (!tokenExists) {
                const error = new Error('token no valido')
                return res.status(404).json({ error: error.message })
            }
            

            res.send("Token valido define tu password")

        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }
    static updatePassword: any = async (req: Request, res: Response) => {
        try {
            const tokens = req.params.token

            console.log(tokens)

            const tokenExists = await Token.findOne({ token:tokens })
            console.log(tokenExists)
            if (!tokenExists) {
                const error = new Error('token no validos')
                return res.status(404).json({ error: error.message })
            }
            
            const user=await User.findById(tokenExists.user)
            user.password=await hashPassword(req.body.password)

            await Promise.allSettled([user.save(),tokenExists.deleteOne()])

            res.send("Cambio de password realizado correctamente")

        } catch (error) {
            return res.status(500).send("El proyecto no se ha generdo debido a algun error")
        }
    }
}