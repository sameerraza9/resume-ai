const userModel = require("../models/auth.model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const tokenBlackListModel = require("../models/tokenBlackList.model.js")



async function registerUserController(req, res) {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please Enter username, email and password!"
        })
    }

    const isUserExists = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserExists) {
        return res.status(400).json({
            message: "User Already Existed with this username or email"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({ id: user._id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "user registered successfully!",
        user,
        token
    })

}


async function loginUserController(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and Password required to login"
        })
    }

    const user = await userModel.findOne({ username })
    if (!user) {
        return res.status(400).json({
            message: "InValid username or Password"
        })
    }

    const truePass = await bcrypt.compare(password, user.password)

    if (!truePass) {
        return res.status(400).json({
            message: "InValid username or Password"
        })
    }

    const token = jwt.sign({ id: user._id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "user Logged In!",
        token,
        user
    })

}



async function logoutUserController(req,res) {
    const token = req.cookies.token

    if(token){
        await tokenBlackListModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"logged Out successfully!"
    })
}




async function getMeController(req,res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User Details Fetched Successfully!",
        user
    })
}




module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}