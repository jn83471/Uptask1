import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ConnectDB } from './config/db'

import  projectRouter  from './routes/projectRouter'
import { corsConfig } from './config/cors'

dotenv.config()

const app=express()
ConnectDB()
app.use(cors(corsConfig))
app.use(express.json())
app.use('/api/proyects',projectRouter)

export default app