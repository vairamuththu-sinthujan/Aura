import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next) => {
    const {token} = req.cookies

    if (!token) {
        return res.json({
            Success: false,
            Status: 400,
            Message: "Not Authorized. Login Again",
        })
    }
    else {
        try {
            const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

            if (tokenDecode.id) {
                req.body.userId = tokenDecode.id
            }
            else {
                return res.json({
                    Success: false,
                    Status: 400,
                    Message: "Not Authorized. Login Again",
                })
            }
            return next()
        } catch (error) {
            console.log(error)
            return res.json({
                Success: false,
                Status: 500,
                Message: error.message,
            })
        }
    }


}


export default userAuth