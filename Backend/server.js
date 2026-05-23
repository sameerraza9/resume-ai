require("dotenv").config()
const app = require("./src/app.js")
const connectToDB = require("./src/config/database.js")
const dns = require("dns")
dns.setServers(["0.0.0.0", "8.8.8.8"])
const invokeGeminiAi = require("./src/services/ai.service.js")





connectToDB()

invokeGeminiAi()
app.listen(3000, ()=>{
    console.log("server is listening on port 3000");
})

