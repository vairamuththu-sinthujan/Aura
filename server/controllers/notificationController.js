import notificationModel from "../models/notificationModel.js"
import userModel from "../models/usermodel.js"

export const getNotifications = async (req, res) => {
    try {
        const {userName} = req.params

        const user = await userModel.findOne({name:userName})

        if (!user) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "user not found"
            })
        }

        const notifications = await notificationModel.find({to:user.name})

        if (!notifications) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "notifications not found"
            })
        }

        return res.json({
            Success: true,
            Status: 200,
            Message: "notifications found",
            notifications:notifications
        })

    } catch (error) {
        console.log(error)
        return res.json({
            Success: false,
            Status: 500,
            Message: "internal server error"
        })
    }
}



export const deleteNotification = async (req, res) => {
    try {

        const {notificationId} = req.params

        const notification = await notificationModel.findById(notificationId)

        if (!notification) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "notification not found"
            })
        }

        await notificationModel.findByIdAndDelete(notificationId)

        return res.json({
            Success: true,
            Status: 200,
            Message: "notification deleted"
        })
        
    } catch (error) {
      console.log(error)
      return res.json({
        Success: false,
        Status: 500,
        Message: "internal server error"
      })  
    }
}