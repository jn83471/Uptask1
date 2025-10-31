import jwt from 'jsonwebtoken'

import Types from 'mongoose'

type UserPayLoad={
    id:Types.ObjectId
}

export const generateJWT=(data:UserPayLoad)=>{
    const token = jwt.sign(data,process.env.JWTSECRET,{
        expiresIn: '1d'
    })
    return token
}