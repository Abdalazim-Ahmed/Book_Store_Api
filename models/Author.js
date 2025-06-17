
const mongoose = require('mongoose');
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlenght: 50
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },

    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },

    image: {
        type: String,
        trim: true,
        default: "image.png",
        minlength: 3,
        maxlength: 50
    }
},

    {
        timestamps: true

    }
);

const Author = mongoose.model('Author', AuthorSchema);



function validationCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50).required(),
        lastName: Joi.string().trim().min(3).max(50).required(),
        country: Joi.string().min(3).max(100).required(),
        image: Joi.string()
    })
    return schema.validate(obj);
}


function validationUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(50),
        lastName: Joi.string().trim().min(3).max(50),
        country: Joi.string().min(3).max(100),
        image: Joi.string()
    })
    return schema.validate(obj);
}



module.exports = { Author, validationCreateAuthor, validationUpdateAuthor }