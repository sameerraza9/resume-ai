const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/tokenBlackList.model.js")


async function authUser(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "You need to Login first"
        })
    }

    const isBlockedListed = await tokenBlackListModel.findOne({ token })
    if (isBlockedListed) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()

    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

}

module.exports = {
    authUser
}