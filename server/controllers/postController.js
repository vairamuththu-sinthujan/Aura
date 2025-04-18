import postModel from "../models/postmodel.js"
import userModel from "../models/usermodel.js"
import cloudinary from "cloudinary"
import notificationModel from "../models/notificationModel.js"

export const createPost = async (req,res) => {
    try {
        const {text, userId} = req.body
        let {img} = req.body

        let user = await userModel.findById(userId)

        if (!user) {
            return res.status(400).json({
                Message: "user not found.",
                Success: false,
            })
        }

        if (!text && !img) {
            return res.status(400).json({
                Message: "text and image fields are empty.",
                Success: false,
            })
        }

        if (img) {
            const uploadImgCloud = await cloudinary.uploader.upload(img, {
                crop: 'fill', 
                width: 500, 
                height: 500,
                gravity: 'center'
            })
            img = uploadImgCloud.secure_url
        }

        const newPost = new postModel({
            user: user._id,
            text: text,
            img:img,
            userName: user.name,
        })

        await newPost.save()

        const numposts = await postModel.countDocuments({user:user._id})
        user.postCount = numposts
        await user.save()
        
        return res.status(200).json({
            Message: "post uploaded.",
            Success: true,
            newPost:newPost
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Message: "internal server error.",
            Success: false,
        })
    }
}



export const getPost = async (req,res) => {
    try {
        const { user } = req.params
        const getUser = await userModel.findOne({name:user})
        if (!getUser) {
            return res.json({
                Message: "user not found",
                Success: false,
                Status:400,
            }) 
        }
        const post = await postModel.find({user:getUser._id})

        if (!post) {
            return res.json({
                Message: "No post found",
                Success: false,
                Status:400,
            })
        }
        else {
            return res.json({
                Success: true,
                post:post,
                Status: 200
            })
        }
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }
}


export const getSavedPost = async (req,res) => {
    try {
        const {user} = req.params
        const getUser = await userModel.findOne({name:user})
        if (!getUser) {
            return res.json({
                Message: "user not found",
                Success: false,
                Status:400,
            }) 
        }

        const savedPost = await postModel.find({savedPost: getUser.name})

        if (!savedPost) {
            return res.json({
                Message: "No saved post",
                Success: false,
                Status:400,
            })
        }

        return res.json({
            Success: true,
            post:savedPost,
            Status: 200
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }
}


export const allPost = async (req,res) => {
    const {userId} = req.body

    try {
        const post = await postModel.find({ user: { $ne: userId } }).sort({ createdAt: -1 })
        if (post.length == 0) {
            return res.json({
                Message: "No post avilable.",
                posts:[],
                Status: 200
            })
        }
        return res.json({
            Success: true,
            posts:post,
            Status: 200
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }
}


export const deletePost = async (req,res) => {
    try {
        const {postId, name} = req.body
        const post = await postModel.findById(postId)

        if (!post) {
            return res.json({
                Message: "No post available to delete.",
                Success:false,
                Status: 400  
            })
        }

        if (post.userName != name) {
            return res.json({
            Message: "cant't delete another's post.",
            Success:false,
            Status: 400
            })
        }
        if (post.img) {

            const imgId = post.img.split('/').pop().split('.')[0]
            await cloudinary.uploader.destroy(imgId)
        }
        let user = await userModel.findById(post.user)
        user.postCount -= 1

        await user.save()
        await postModel.deleteOne({_id:post._id})

        return res.json({
            Message: "Post deleted successfully.",
            Success: true,
            Status: 200
          })

    } catch (error) {
        console.log(error)
        return res.json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }
}
 



export const LikeAndUnLike = async (req,res) => {
    try {
        const {userId} = req.body
        const {postId} = req.params

        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({
                Message: "user not found",
                Success:false,
                Status: 400
            })
        }


        const post = await postModel.findById(postId)


        if (!post) {
            return res.json({
                Message: "No post available to like.",
                Success:false,
                Status: 400  
            })
        }

        if (post.likes.includes(user.name)) {
            await postModel.findByIdAndUpdate(postId, {$pull:{likes:user.name}})
            return res.json({
                Message: "post unlike",
                Success: true,
                Status: 200
            })
        } else {
            await postModel.findByIdAndUpdate(postId, {$push:{likes:user.name}})
            

            if (post.userName != user.name) {
                const newNotification = new notificationModel({
                    from: user.name,
                    to: post.userName,
                    message: `${user.name} liked your post.`,
                    type: "like",
                })

                await newNotification.save()
            }


            return res.json({
                Message: "post liked",
                Success: true,
                Status: 200
            })
        }
        
    } catch (error) {
        console.log(error)
        res.json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }
}


export const SaveAndUnsave = async (req,res) => {
    try {
        const {userId} = req.body
        const {postId} = req.params

        const user = await userModel.findById(userId)
        const post = await postModel.findById(postId)

        if (!user) {
            return res.json({
                Message: "user not found",
                Success:false,
                Status: 400
            })
        }

        if (!post) {
            return res.json({
                Message: "No post available to like.",
                Success:false,
                Status: 400  
            })
        }

        if (post.savedPost.includes(user.name)) {
            await postModel.findByIdAndUpdate(postId, {$pull:{savedPost:user.name}})
            return res.json({
                Message: "post unsaved",
                Success: true,
                Status: 200
            })
        }
        await postModel.findByIdAndUpdate(postId, {$push:{savedPost:user.name}})
        return res.json({
            Message: "post saved",
            Success: true,
            Status: 200
        })


    } catch (error) {
        res.json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }
}



export const addComment = async (req, res) => {
    try {
        const {postId} = req.params
        const {comment, userName} = req.body

        const post = await postModel.findById(postId)

        if (!post) {
            return res.json({
                Message: "No post available to comment.",
                Success:false,
                Status: 400  
            })
        }

        const commentUser = await userModel.findOne({name:userName})

        if (!commentUser) {
            return res.json({
                Message: "user not found to comment.",
                Success:false,
                Status: 400  
            })
        }

        await postModel.findByIdAndUpdate(postId, {$push: {
            comments : {
                text: comment,
                user: commentUser.name
            }
        }})

        return res.json({
            Message: "comment successfully added",
            Success: true,
            Status: 200
        })

    } catch (error) {
        console.log(error)
        res.json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }

}


export const editPost = async (req,res) => {
    try {
        const {postId} = req.params

        const {userName, editText} = req.body

        const post = await postModel.findById(postId)

        if (!post) {
            return res.json({
                Message: "post not found.",
                Success:false,
                Status: 400  
            })
        }

        if (post.userName != userName) {
            return res.json({
                Message: "you can't edit someone post.",
                Success:false,
                Status: 400  
            })
        }


        post.text = editText

        await post.save()

        return res.json({
            Message: "post edited successfully",
            Success: true,
            Status: 200
        })


    } catch (error) {
        console.log(error)
        res.json({
            Message: "internal server error",
            Success:false,
            Status: 500
        })
    }
}