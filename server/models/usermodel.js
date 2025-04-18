import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        default:""
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyOtp: {
        type: String,
        default: "",
    },
    verifyOtpExpAt: {
        type: Number,
        default: 0,
    },
    isAccVerified: {
        type: Boolean,
        default: false,
    },
    resetOtp: {
        type: String,
        default: '',
    },
    resetOtpExpAt: {
        type: Number,
        default: 0,
    },
    postCount: {
        type: Number,
        default: 0,
    },
    followers: [{
        type:String,
        ref: "user",
        default: [],
    }],
    following: [{
        type:String,
        ref: "user",
        default: [],
    }],
    profileImg: {
        type: String,
        default: "",
    },
    coverImg: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "Hi there, i'm using aura",
    },

}, {timestamps: true});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
