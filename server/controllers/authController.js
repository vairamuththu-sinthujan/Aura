import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/usermodel.js'
import transporter from '../config/nodemailer.js'
import createOtp from '../utils/createOtp.js'

export const register = async (req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        return res.json({
            Success : false,
            Status: 400,
            Message: 'missing details.',
        })
    }
    else {
        try {
            const EmailexistUser = await userModel.findOne({email})
            const NameexistUser = await userModel.findOne({name})

            if (EmailexistUser) {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: 'allready email used.',
                })
            }
            if (NameexistUser) {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: 'username allready exist.',
                })
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = new userModel({
                    name: name,
                    email: email,
                    password: hashedPassword,
                })
                await user.save()

                const token = jwt.sign({
                    id: user._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '7d',
                })
                //senting wellcome email
                const mailOption = {
                    from: process.env.SENTER_EMAIL,
                    to: email,
                    subject: "Wellcome To Aura",
                    text:`
                    Hi ${name},

                    Thank you for joining Aura! We're thrilled to have you as part of our community.

                    At Aura, we're dedicated to providing you with an exceptional experience. Whether you're here to explore new ideas, connect with like-minded individuals, or simply enjoy our content, we're here to support you every step of the way.

                    Here's what you can expect from us:

                    Exclusive Content: Access to unique and insightful articles, videos, and more.
                    Community Engagement: Opportunities to connect with others who share your interests.
                    Personalized Recommendations: Tailored suggestions based on your preferences.
                    Regular Updates: Stay informed with the latest news and trends in your areas of interest.

                    To get started, feel free to explore our website and discover all that Aura has to offer. If you have any questions or need assistance, our support team is always here to help.

                    once again, welcome to Aura! We can't wait to see the amazing things you'll achieve with us.

                    Best regards,

                    sinthujan
                    C.E.O
                    Aura Team`}

                await transporter.sendMail(mailOption)

                return res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production'? "none": 'strict',
                    maxAge: 7*24*60*60*1000,
                }).json({
                    Success: true,
                    Status: 200,
                    Message: "account created successfully.",
                })
            }
        } catch (error) {
            return res.json({
                Success: false,
                Status: 500,
                Message: error.message,
            })
        }
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body
    if (!email || !password) {
        return res.json({
            Success: false,
            Status: 400,
            Message: 'missing email or password.',
        })
    }
    else {
        try {
            const user = await userModel.findOne({email})
            if (!user) {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: 'invaild email or password.',
                })
            }
            else {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    return res.json({
                        Success: false,
                        Status: 400,
                        Message: 'invaild email or password.',
                    })
                }
                else {
                    const token = jwt.sign({
                        id: user._id,
                    }, process.env.JWT_SECRET, {
                        expiresIn: '7d',
                    })
                    return res.cookie('token', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production'? "none": 'strict',
                        maxAge: 7*24*60*60*1000,
                    }).json({
                        Success: true,
                        Status: 200,
                        Message: "logged in successfully.",
                    })
                }
            }
        } catch (error) {
           return res.json({
            Success: false,
            Status: 500,
            Message: error.message,
           })
        }
    }
}


export const logout = async (req,res) => {
    try {
        return res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? "none": 'strict',
        }).json({
            Success: true,
            Status: 200,
            Message: 'loged out successfully.'
        })
    } catch (error) {
        return res.json({
            Success: false,
            Status: 500,
            Message: error.message
        })
    }
}


export const sentVerifyOtp = async (req,res) => {
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
        if (user.isAccVerified) {
            return res.json({
                Success: false,
                Status: 400,
                Message: "account already verified"
            })
        }
        else {
            const OTP = createOtp()
            user.verifyOtp = OTP
            user.verifyOtpExpAt = Date.now() + 24*60*60*1000
            await user.save()

            const mailOption = {
                from: process.env.SENTER_EMAIL,
                to: user.email,
                subject: "Email Verification OTP",
                text: `
                your otp is: ${OTP}
                `
            }

            await transporter.sendMail(mailOption)

            return res.json({
                Success: true,
                Status: 200,
                Message: `OTP sended your email address: ${user.email}`
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


export const verifyEmail = async (req,res) => {
    try {
        const {userId,otp} = req.body
        if (!otp || !userId) {
            return res.json({
                Success: false,
                Status:400,
                Message: "Missing Details."
            })
        }
        else {
            try {
                const user = await userModel.findById(userId)
                if (!user) {
                    return res.json({
                        Success: false,
                        Status:400,
                        Message: "User Not Found."
                    })
                }
                else {
                    if (user.isAccVerified) {
                        return res.json({
                            Success: false,
                            Status:400,
                            Message: "account already verified."
                        })
                    }
                    if (user.verifyOtp == '' || user.verifyOtp !== otp) {
                        return res.json({
                            Success: false,
                            Status:400,
                            Message: "OTP not Match."
                        })
                    }
                    if (user.verifyOtpExpAt < Date.now()) {
                        return res.json({
                            Success: false,
                            Status:400,
                            Message: "OTP Expired."
                        })
                    }
                    else {
                        user.isAccVerified = true
                        user.verifyOtp = ''
                        user.verifyOtpExpAt = 0

                        await user.save()
                        return res.json({
                            Success: true,
                            Status:200,
                            Message: "Email Verified."
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
    } catch (error) {
        return res.json({
            Success: false,
            Status: 500,
            Message: error.message
        })
    }
}


export const isAuthenticated = async (req,res) => {
    try {
        return res.json({
            Success: true,
        })
    } catch (error) {
        return res.json({
            Success: false,
            Status: 500,
            Message: error.message
        })
    }
}


export const sentResetOtp = async (req,res) => {
    const {email} = req.body
    if (!email) {
        return res.json({
            Success: false,
            Status: 400,
            Message: "email is required"
        })
    }
    else {
        try {
            const user = await userModel.findOne({email})
            if (!user) {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: "user not found"
                })
            }

            const OTP = createOtp()
            user.resetOtp = OTP
            user.resetOtpExpAt = Date.now() + 15*60*1000
            await user.save()

            const mailOption = {
                from: process.env.SENTER_EMAIL,
                to: user.email,
                subject: "Email Verification OTP",
                text: `
                your reset otp is: ${OTP}
                `
            }

            await transporter.sendMail(mailOption)

            return res.json({
                Success: true,
                Status: 200,
                Message: `Reset OTP sented your email address: ${user.email}`
            })
            
        } catch (error) {
            return res.json({
                Success: false,
                Status: 500,
                Message: error.message
            })
        }
    }
}


export const resetPassword = async (req,res) => {
    const {email,otp, newPassword} = req.body

    if (!email || !otp || !newPassword) {
        return res.json({
            Success: false,
            Status: 400,
            Message: `missing details.`
        })
    }
    else {
        try {
            const user = await userModel.findOne({email})

            if (!user) {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: "user not found"
                })
            }
            else {
                if (user.resetOtp === "" || user.resetOtp != otp) {
                    return res.json({
                        Success: false,
                        Status: 400,
                        Message: "invaild OTP"
                    })
                }
                if (user.resetOtpExpAt < Date.now()) {
                    return res.json({
                        Success: false,
                        Status: 400,
                        Message: "your OTP is Expired"
                    })
                }
                else {
                    const hashedPassword = await bcrypt.hash(newPassword, 10)
                    user.password = hashedPassword
                    user.resetOtp = ''
                    user.resetOtpExpAt = ''
                    await user.save()
                    return res.json({
                        Success: true,
                        Status: 200,
                        Message: "password reseted successfully"
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
}
