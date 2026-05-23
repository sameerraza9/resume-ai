require("dotenv").config()
const app = require("./src/app.js")
const connectToDB = require("./src/config/database.js")
const dns = require("dns")
dns.setServers(["0.0.0.0", "8.8.8.8"])
const generateInterviewReport = require("./src/services/ai.service.js")
const { resume, selfDescription, jobDescription } = require("./src/services/temp.js")





connectToDB()

generateInterviewReport({ resume, selfDescription, jobDescription })
app.listen(3000, () => {
    console.log("server is listening on port 3000");
})

