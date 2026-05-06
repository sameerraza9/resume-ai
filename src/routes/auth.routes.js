const express = require("express")
const Router = express.Router()
const authController = require("../controllers/auth.controller.js")
const authMiddleware = require("../middlewares/auth.middleware.js")



Router.post("/register",authController.registerUserController)

Router.post("/login",authController.loginUserController)

Router.get("/logout",authController.logoutUserController)

Router.get("/get-me", authMiddleware.authUser, authController.getMeController)



module.exports = Router