import express from 'express'
import { config } from 'dotenv'
import { connectDB } from './config/database.js'
import userRoutes from './routes/api/user.js'
import authRoutes from './routes/api/auth.js'
import profileRoutes from './routes/api/profile.js'
import postRoutes from './routes/api/posts.js'

// Loading env variables
config({
    path:"./config/config.env"
})


const app = express()

// Connecting to the database
connectDB()

// Middleware
app.use(express.json())

app.get('/', (req,res)=> res.send("Server running"))

// Define Routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT  || 5000

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
