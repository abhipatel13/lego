// routes/registerRoutes.js
const express = require('express');
const userRouter = express.Router();
const userController = require('../Controller/register.controller');
const authMiddleware = require('../Middleware/authMiddleware');

// Route for user registration
userRouter.get('/get-details/:id' , authMiddleware, userController.getUserDetails);
userRouter.put('/update-details/:id' , authMiddleware, userController.updateUserDetails);

module.exports = userRouter;

