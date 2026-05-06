const mongoose = require("mongoose")


const tokenBlackListSchema = new mongoose.Schema({
    token:{
        type: String,
        required:[true, "token is required to add in blackList"]
    }
},{
    timestamps: true
})

const tokenBlackListModel = mongoose.model("tokenBlackList",tokenBlackListSchema)

module.exports= tokenBlackListModel