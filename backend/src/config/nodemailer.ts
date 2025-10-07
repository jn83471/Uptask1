import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config()

const config = () => {
    return {
        host: process.env.SMNTP_HOST,
        port: +process.env.SMNTP_PORT,
        auth: {
            user: process.env.SMNTP_USER,
            pass: process.env.SMNTP_PASS,
        }
    }
}

// Looking to send emails in production? Check out our Email API/SMTP product!
export const transport = nodemailer.createTransport(config());