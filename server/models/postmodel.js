import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,

    },
    userName: {
        type: String,
    },
    text: {
        type: String,

    },
    img: {
        type: String,
    },
    likes: [
        {
            type: String,
            ref: "user",
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true,
            },
            user: {
                type: String,
                ref: "user",
                required: true
            }
        }
    ],
    savedPost: [
            {
                type: String,
                ref:'user',
            }
        ],
}, {timestamps: true})




const postModel = mongoose.models.post || mongoose.model('post', postSchema);


export default postModel