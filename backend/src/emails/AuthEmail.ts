import { transport } from "../config/nodemailer"
import { IUser } from "../models/User"
interface IEmail{
    email: String,
    name: String,
    token: String
}
export class AuthEmail{
    static sendConfirmationEmail=async(user:IEmail)=>{
        await transport.sendMail({
                from: "Uptask <admin@uptask.com>",
                to: `${user.email}`,
                subject: 'Uptask - Confirma tu cuenta',
                text: 'Confirma tu cuenta',
                html: `<p> Hola ${user.name}, has creado tu cuenta en UpTask, ya casi esta listo, solo debes confirmar tu cuenta</p>
                        <p>visita el siguente enlace: </p>
                        <a href="${process.env.FRONTEND}/auth/confirm-account">Confirmar cuenta</a>
                        <p>e ingresa el codigo: <b>${user.token} </b></p>
                        <p>Este token expira en 10 minutos </p>`
            })
    }
}