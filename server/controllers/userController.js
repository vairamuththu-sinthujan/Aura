import bcrypt from "bcryptjs";
import userModel from "../models/usermodel.js";
import cloudinary from "cloudinary";
import notificationModel from "../models/notificationModel.js";


//get my data
export const getMyData = async (req,res) => {
    try {
        const {userId} = req.body
        const user = await userModel.findById(userId, "-password")

        if (!user) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "user not found",
            })
        }
        else {
            return res.json({
                Success: true,
                Status: 200,
                Message: "user found",
                userData: {
                    name:user.name,
                    id:user._id,
                    isAccisAccVerified: user.isAccVerified,
                    profileImg: user.profileImg
                },
            })
        }
    } catch (error) {
        return res.json({
            Success: false,
            Status: 500,
            Message: error.message
        })
    }
}



export const getUsersData = async(req,res) => {
    try {
        const {username} = req.params
        const {userId} = req.body

        const user = await userModel.findById(userId)

        if (user.name == username) {
            return res.json({
                Success: true,
                Status: 250,
                Message: "its your profile",
                userdata:user
            })
        }
        else {
            const user = await userModel.findOne({name:username}).select('-password -resetOtp -resetOtpExpAt -updatedAt -verifyOtp -verifyOtpExpAt')
            if (!user) {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: "user not found"
                })
            }else {
                return res.json({
                    Success: true,
                    Status: 200,
                    userdata: user,
                    Message: "user found"
                })
            }
        }
    } catch (error) {
        return res.json({
            Success: false,
            Status: 500,
            Message: error.message
        })
    }
}



export const followUnfollowUser = async(req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.body

        const userToModify = await userModel.findOne({name:id})

        if (!userToModify) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "user not found"
            })
        } else {
            if (userToModify._id == userId) {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: "you can't follow/unfollow yourself"
                })
            } else {
                const currUser = await userModel.findById(userId)
                const isFollowing = currUser.following.includes(userToModify.name)
                if (isFollowing) {
                    //unfollow
                    await userModel.findByIdAndUpdate({_id:userToModify._id}, {$pull:{followers:currUser.name}})
                    await userModel.findByIdAndUpdate({_id:currUser._id}, {$pull:{following:userToModify.name}})
                    return res.json({
                        Success: true,
                        Status: 200,
                        Message: "user unfollowed"})
                }else {
                    //follow
                    await userModel.findByIdAndUpdate({_id:userToModify._id}, {$push:{followers:currUser.name}})
                    await userModel.findByIdAndUpdate({_id:currUser._id}, {$push:{following:userToModify.name}})

                    const newNotification = new notificationModel({
                        from: currUser.name,
                        to: userToModify.name,
                        type: "follow",
                        message: `${currUser.name} followed you`
                    })

                    await newNotification.save()

                    return res.json({
                        Success: true,
                        Status: 200,
                        Message: "user followed"
                    })
                }
            }
        }
    } catch (error) {
        console.log(error)
        return res.json({
            Success: false,
            Status: 500,
            Message: "invalid details"
        })
    }
}



export const editDetails =  async (req,res) => {
    try {
        const {password, proImg, coverImg, fullname, bio, userId} = req.body
        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({
                Success: false,
                Status: 500,
                Message: "invalid details"
            })

        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({    
                Success: false,
                Status: 400,
                Message: "invalid password"
            })
        }

        if (fullname) {
            user.fullName = fullname
        }
        if (bio) {
            user.bio = bio
        }
        if(proImg) {
            const uploadImgCloud = await cloudinary.uploader.upload(proImg, {
                crop: 'fill', 
                width: 500, 
                height: 500,
                gravity: 'center'
            })
            const img = uploadImgCloud.secure_url
            if (user.profileImg) {
                const prevImgId =user.profileImg.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(prevImgId)
            }
            
            user.profileImg = img
        }

        if(coverImg) {
            const uploadImgCloud = await cloudinary.uploader.upload(coverImg, {
                crop: 'fill', 
                width: 500, 
                height: 500,
                gravity: 'center'
            })
            const img = uploadImgCloud.secure_url
            if (user.coverImg) {
                const prevImgId =user.coverImg.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(prevImgId)
            }

            user.coverImg = img
        }

        await user.save()

        return res.json({
            Success: true,
            Status: 200,
            Message: "details updated"
        })
        
        

    } catch (error) {
        console.log(error)
        return res.json({
            Success: false,
            Status: 500,
            Message: "invalid details"
        })
        
    }

}



export const findUsers = async (req,res) => {
    try {
        const {userName} = req.params

        const users = await userModel.find({
            name: {
              $regex: userName,  // Search for userName anywhere in the username
              $options: 'i'     // Case-insensitive
            }
          },
          { name: 1, _id: 1, fullName: 1, profileImg: 1 })

          if (!users) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "No users found"
            })
          }

          return res.json({
            Success: true,
            Status: 200,
            Message: "details updated",
            users: users,
        })

    } catch (error) {
       console.log(error)
        return res.json({
            Success: false,
            Status: 500,
            Message: "invalid details"
        }) 
    }

    
}


export const suggestUsers = async (req,res) => {
    try {

        const {userId} = req.body

        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "user not found"
            })
        }

        const following = user.following
        //get five users without following and me

        const users = await userModel.find({
            $and: [
                { name: { $ne: user.name } },
                { name: { $nin: following } },
            ],
        }).limit(5)

        if (!users) {
            return res.json({
                Success: false,
                Status: 400,
                user:[],
                Message: "No users found"
            })
        }

        return res.json({
            Success: true,
            Status: 200,
            Message: "details updated",
            users: users
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