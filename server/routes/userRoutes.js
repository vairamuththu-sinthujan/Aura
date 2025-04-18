import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { editDetails, findUsers, followUnfollowUser, getMyData, getUsersData, suggestUsers } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.get("/me", userAuth,getMyData)
userRouter.get("/suggest_users", userAuth,suggestUsers)
userRouter.put("/me/edit", userAuth,editDetails)
userRouter.get("/find_users/:userName", userAuth,findUsers)
userRouter.post("/follow/:id", userAuth,followUnfollowUser)
userRouter.get("/:username", userAuth,getUsersData)


export default userRouter