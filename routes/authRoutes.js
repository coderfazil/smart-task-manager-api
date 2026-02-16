const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const {authMiddleware} = require("../middlewares/authMiddleware");

authRouter.post('/register',authController.registerUser);
authRouter.post('/login',authController.loginUser);
authRouter.get('/logout',authController.logoutUser);
authRouter.get('/me',authMiddleware,authController.getUser)

module.exports = authRouter;
