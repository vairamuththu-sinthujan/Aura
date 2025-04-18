import express from 'express'
import { login, logout, register, resetPassword, sentResetOtp, sentVerifyOtp, verifyEmail } from '../controllers/authController.js'

import userAuth from "../middleware/userAuth.js"


const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login);
authRouter.post('/logout',userAuth, logout)
authRouter.post('/reset-otp',sentResetOtp)
authRouter.post('/reset-password', resetPassword)
authRouter.get('/sent-verify-otp', userAuth,sentVerifyOtp)
authRouter.post('/verify-email', userAuth,verifyEmail)

//verifyEmail
export default authRouter;
