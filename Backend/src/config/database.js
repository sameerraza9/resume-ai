const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB connected successfully!!");
        
    } catch (err) {
        console.log("connection error!!!!",err);
        
    }
}

module.exports = connectToDB
