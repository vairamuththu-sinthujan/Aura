import mongoose from "mongoose";




const notificationSchema = mongoose.Schema({
    from: {
        type: String,
        ref: "user",
        required: true
    },
    to: {
        type: String,
        ref: "user",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["like","follow"],
        read: {
            type: Boolean,
            default: false
        }
    }
}, {timestamps: true})




const notificationModel = mongoose.models.notification || mongoose.model('notification', notificationSchema)


export default notificationModel