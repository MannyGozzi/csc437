import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const HOST_URL = process.env.HOST_URL
const PORT = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send()
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${HOST_URL}:${PORT} 🔥`)
})