import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import apiRoutes from './routes/api'

dotenv.config()

const server = express()

server.use(cors({}))

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended : true }))

server.use('/api', apiRoutes)

server.use((req: Request, res: Response ) => {
    res.status(404).json({ error : 'Endpoint não encontrado.'})
})

server.listen(process.env.PORT)