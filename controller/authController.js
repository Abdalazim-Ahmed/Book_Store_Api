
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    User,
    userValidationRegister,
    userValidationLogin
} = require('../models/User');


/**
 * @docs Register New User
 * @method POST
 * @route /api/auth/register
 * @access public
**/
module.exports.register = asyncHandler(async (req, res) => {

    const { error } = userValidationRegister(req.body);
    if (error) {
        return res.status(400).json({ message: error.message })
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already exist" })
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt)

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    const result = await user.save()
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY)
    const { password, ...other } = result._doc;

    res.status(201).json({ ...other, token });

});



/**
 * @docs Login User
 * @method POST
 * @route /api/auth/login
 * @access public
**/
module.exports.login = asyncHandler(async (req, res) => {

    const { error } = userValidationLogin(req.body);
    if (error) {
        return res.status(400).json({ message: error.message })
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "Invalid eamil or password " })
    }

    const passw = await bcrypt.compare(req.body.password, user.password)
    if (!passw) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
    const { password, ...other } = await user._doc;
    res.status(200).json({ ...other, token })

})