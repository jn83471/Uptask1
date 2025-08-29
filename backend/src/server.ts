import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { ConnectDB } from './config/db'

import  projectRouter  from './routes/projectRouter'
import  authRoutes  from './routes/authRoutes'
import { corsConfig } from './config/cors'
import morgan from 'morgan'

dotenv.config()

const app=express()
ConnectDB()
app.use(cors(corsConfig))
app.use(morgan('dev'))

app.use(express.json())
app.use('/api/proyects',projectRouter)
app.use('/api/auth',authRoutes)

export default app