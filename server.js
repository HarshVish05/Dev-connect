import express from 'express'
import { config } from 'dotenv'


const app = express()


app.get('/', (req,res) => res.send('Server started'))

const PORT = process.env.PORT  || 5000

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
