import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'process'

export const ConnectDB= async () =>{
    try{
        //console.log(process.env.CONNECTION)
        const connect= await mongoose.connect(process.env.CONNECTION)
        const url=`${connect.connection.host}:${connect.connection.port}`
        console.log(url)
    }
    catch(error){
        console.log(colors.red(error.message))
        exit(1)
    }
}