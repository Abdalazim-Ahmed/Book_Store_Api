const bcrypt = require('bcryptjs');
const aysncHandler = require('express-async-handler');
const { User, userValidationUpdate } = require('../models/User');


/**
 * @docs Get All Users
 * @method GET
 * @router api/user/
 * @access private
 **/
module.exports.getAllUsers = aysncHandler(async (req, res) => {
    const users = await User.find().select('-password')
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404).json({ message: "Users Not Found" })
    }
});


/**
 * @docs Get User By Id
 * @method GET
 * @router api/user/:id
 * @access private
 **/
module.exports.getUserById = aysncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: "User Not Found" })
    }
});



/**
 * @docs Update User
 * @method PUT
 * @router api/user/:id
 * @access private
 **/
module.exports.updateUserById = aysncHandler(async (req, res) => {

    const { error } = userValidationUpdate(req.body);
    if (error) { return res.status(400).json({ message: error.message }) }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const result = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        },
    },
    {
            new: true
    }).select('-password');

    res.status(200).json(result);
});



/**
 * @docs   Delete User
 * @method DELETE
 * @router api/user/:id
 * @access private
 **/
module.exports.deleteUserById = aysncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ messsage: "User has been deleted" })
    } else {
        res.status(404).json({ message: "User Not Found" })
    }
});