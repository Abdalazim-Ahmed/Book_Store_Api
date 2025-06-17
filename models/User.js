const mongoose = require('mongoose');
const Joi = require('joi');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlenght: 2,
        maxlength: 50,
        trim: true
    },

    email: {
        type: String,
        required: true,
        minlenght: 10,
        maxlength: 100,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
        trim: true
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

const User = mongoose.model("User", UserSchema);


// Validation User Register
function userValidationRegister(obj) {

    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(50).required(),
        email: Joi.string().trim().min(10).max(100).required().email(),
        password: Joi.string().trim().min(6).max(100),
    })
    return schema.validate(obj);
};


// Validation User Login
function userValidationLogin(obj) {

    const schema = Joi.object({
        email: Joi.string().trim().min(10).max(100).required().email(),
        password: Joi.string().trim().min(6).max(100),
    })
    return schema.validate(obj);
};


// Validation User Update
function userValidationUpdate(obj) {

    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(50),
        email: Joi.string().trim().min(10).max(100).email(),
        password: Joi.string().trim().min(6).max(100),
    })
    return schema.validate(obj);
};


module.exports = {
    User,
    userValidationRegister,
    userValidationLogin,
    userValidationUpdate
}
