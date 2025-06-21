const express = require('express')
const router = express.Router();
const {
    getForgetPassword,
    sendForgotPassword,
    getResetPasswordView,
    sendResetPasswordView, 
    success}= require('../controller/passwordContorller')


// Get reset password
router.get('/forgot-password', getForgetPassword)

// Send reset password
router.post('/forgot-password', sendForgotPassword)

// Get Reset Password View
router.get('/reset-password/:userId/:token', getResetPasswordView)

// Send Reset Password View
router.post('/reset-password/:userId/:token', sendResetPasswordView)


module.exports = router;