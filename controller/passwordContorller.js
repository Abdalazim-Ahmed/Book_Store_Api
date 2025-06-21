const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { render } = require('ejs');
const nodemailer = require('nodemailer');
require('dotenv').config();



/**
 * @docs Forgot password
 * @method GET
 * @route  /password/forgot-password
 * @access public
*/
module.exports.getForgetPassword = (req, res) => {
    res.render('forgot-password')
}


/**
 * @docs Send Forgot  Password
 * @method POST
 * @route  /password/forgot-password
 * @access public
*/
module.exports.sendForgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).json({ message: "Email Not Found" })
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '10m' });
    const link = `http://localhost:8000/password/reset-password/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASS
        }
    });

    const mailOption = {
        from: process.env.USER_MAIL,
        to: user.email,
        subject: 'Reset Password',
        html: `<div> 
                <h3> Click to pelw link to reset your password </h3>
                <a>${link}</a>
              </div>`
    }

    transporter.sendMail(mailOption, (error, success) => {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sended ${success}`)
        }
    })

    res.render('send-success')
}



/**
 * @docs   Get Reset Password View
 * @method GET
 * @route  /password/reset-password/:userId/:token
 * @access public
*/
module.exports.getResetPasswordView = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }

    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
        jwt.verify(req.params.token, secret);
        res.render('reset-password', { email: user.email });

    } catch (error) {
        console.log(error);
        return res.status(404).json("Invalid Token")
    }
    // Todo : send email to the user
}



/**
 * @docs Forgot password
 * @method POST
 * @route  /password/reset-password/:userId/:token
 * @access public
*/
module.exports.sendResetPasswordView = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }


    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
        jwt.verify(req.params.token, secret);

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user.password = req.body.password;
        console.log(user.password)
        await user.save();
        res.render('success-password', {userName: user.username});

    } catch (error) {
        console.log(error)
        res.json({ message: "Error" })
    }
}



