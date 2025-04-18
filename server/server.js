import express from 'express'
import cors from 'cors'
import  'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import cloudinaryConfig from './config/cloudinary.js'
import postRoute from './routes/postRoutes.js'
import authRouter from './routes/authRoutes.js'
import notificationRouter from './routes/notificationRoutes.js'



const app = express()
const PORT = process.env.PORT || 4000
connectDB()
cloudinaryConfig()

const allowedOrigins = [
    'http://localhost:5173',  
    
]

app.use(express.json(
    {
        limit: "5mb"
    }
))
app.use(cookieParser())
app.use(cors({origin:allowedOrigins, credentials:true}))
app.use(express.urlencoded({ extended: true, limit: '5mb' }));



// api endpoints
app.get('/', (req,res) =>  {res.send('hello world')})
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/post', postRoute)
app.use('/api/notification', notificationRouter)



app.listen(PORT, ()=> {
    console.log(`server start on port: ${PORT}`)
})