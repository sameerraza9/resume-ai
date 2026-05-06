const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "Account already exists with this username"],
        require: true
    },
    email:{
        type:String,
        unique:[true, "Account already exists with this email account"],
        require: true
    },
    password:{
        type:String,
        require: true
    },
    
})

const userModel = mongoose.model("User",userSchema)

module.exports = userModel