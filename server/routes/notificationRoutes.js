import express from 'express'
import { deleteNotification, getNotifications } from '../controllers/notificationController.js'

const notificationRouter = express.Router()


notificationRouter.get("/:userName", getNotifications)
notificationRouter.delete("/delete/:notificationId", deleteNotification)


export default notificationRouter