const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Book, validationCreateBook, validationUpdateBook } = require('../models/Book');
const { verfiyAdmin } = require('../middleware/verifyToken');


// let books = [
//     {
//         id: 1, 
//         title: "NodeJ",
//         description: "This is a Node Js Book",
//         author: "Abdalazim",
//         rate: 8.5,
//         price: 300
//     },
//     {
//         id: 2, 
//         title: "ExpressJs",
//         description: "This is a ExpressJs Book",
//         author: "Abdalazim",
//         rate: 6.6,
//         price: 100
//     },
// ]


/**
 * @desc   Get All Books
 * @method GET
 * @route  /api/books
 * @access public
**/
router.get('/', asyncHandler(
    async (req, res) => {
        const books = await Book.find().populate("author", "firstName -_id") 
        res.status(200).json(books);
    }
))


/**
 * @desc   Get Book By Id
 * @method GET
 * @route  /api/books/:id
 * @access public
**/
router.get('/:id', asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id).populate("author", "-_id firstName lastName createdAt")
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ massege: `Book Not Found` })
    }

}))


/**
 * @desc   Create New Book
 * @method POST
 * @route  /api/books
 * @access private
**/
router.post('/', verfiyAdmin, asyncHandler(
    async (req, res) => {

        const { error } = validationCreateBook(req.body)
        if (error) { return res.status(400).json(error['message']) }

        const book = new Book({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            rate: req.body.rate,
            price: req.body.price,
            cover: req.body.cover
        })

        const result = await book.save()
        res.status(201).json(result)
    }
))


/** 
 * @desc   Update Book
 * @method PUT
 * @route  /api/books/:id
 * @access private
**/
router.put('/:id', verfiyAdmin, asyncHandler(async (req, res) => {

    const { error } = validationUpdateBook(req.body)
    if (error) { return res.status(400).json(error['message']) }

    const book = await Book.findByIdAndUpdate(req.params.id);

    if (book) {
        const result = await Book(
            {
                title: req.body.title,
                description: req.body.description,
                author: req.body.author,
                rate: req.body.rate,
                price: req.body.price
            })

        res.status(201).json(result);

    } else {
        res.status(400).json({ massge: "book not found" })
    }

}));



/** 
 * @desc   Delete a Book
 * @method DELETE
 * @route  /api/books/:id
 * @access private
**/
router.delete('/:id', verfiyAdmin, asyncHandler(async (req, res) => {

    const book = await Book.findByIdAndDelete(req.params.id);

    if (book) {
        res.status(200).json({ massege: "Book is deleted Seccefuly" })
        
    } else {
        res.status(200).json({ massege: "Book Not Found" })
    }

}));


module.exports = router;