
const mongoose = require('mongoose');
const Joi = require('joi');


const BookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlenght: 50
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },

    description: {
        type: String,
        trim: true,
    },

    rate: {
        type: Number,
        minlenght: 0,
        maxlength: 10
    },

    price: {
        type: Number,
        required: true,
        minlength: 0,
    },

    cover: {
        type: String,
        required: true,
        enum: ["soft cover", "hard cover"]
    }

},
    {
        timeseries: true
    }
)


const Book = mongoose.model("Book", BookSchema);


// Validation Create Book
function validationCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(50).required(),
        description: Joi.string().trim(),
        author: Joi.string().required(),
        rate: Joi.number().min(0).max(10),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft cover", "hard cover").required()
    })
    return schema.validate(obj);
}

// Validation Update Book
function validationUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(25),
        description: Joi.string().trim().min(3).max(100),
        author: Joi.string().min(3).max(25),
        rate: Joi.number().min(0).max(10),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft cover", "hard cover")
    })
    return schema.validate(obj);
}



module.exports = {
    Book, validationCreateBook, validationUpdateBook
}



