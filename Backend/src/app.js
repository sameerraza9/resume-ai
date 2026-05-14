const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({ extended: true }))


const authRouter = require("./routes/auth.routes.js")


app.use("/api/auth",authRouter)

app.get("/",(req,res)=>{
    res.send("hello")
})

module.exports = app