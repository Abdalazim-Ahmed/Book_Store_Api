const { validationCreateBook, validationUpdateBook } = require('../models/Book');
const asyncHandler = require('express-async-handler');
const { Book } = require('../models/Book');



/**
 * @desc   Get All Books
 * @method GET
 * @route  /api/books
 * @access public
**/
module.exports.getAllBooks = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    let books;

    if (minPrice && maxPrice) {
        books = await Book.find({ price: { $gte: minPrice, $lte: maxPrice } })
            .populate("author", "firstName -_id")
        res.status(200).json(books);
    } else {
        books = await Book.find()
            .populate("author", "firstName -_id")
        res.status(200).json(books);
    }
});



/**
 * @desc   Get Book By Id
 * @method GET
 * @route  /api/books/:id
 * @access public
**/
module.exports.getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author", "-_id firstName lastName createdAt")
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ massege: `Book Not Found` })
    }
});



/**
 * @desc   Create New Book
 * @method POST
 * @route  /api/books
 * @access private
**/
module.exports.createBook = asyncHandler(async (req, res) => {
    
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
});



/** 
 * @desc   Update Book
 * @method PUT
 * @route  /api/books/:id
 * @access private
**/
module.exports.updateBook = asyncHandler(async (req, res) => {

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
            });
        res.status(201).json(result);

    } else {
        res.status(400).json({ massge: "book not found" })
    }

});


/** 
 * @desc   Delete a Book
 * @method DELETE
 * @route  /api/books/:id
 * @access private
**/
module.exports.deleteBook = asyncHandler(async (req, res) => {

    const book = await Book.findByIdAndDelete(req.params.id);

    if (book) {
        res.status(200).json({ massege: "Book is deleted Seccefuly" })

    } else {
        res.status(200).json({ massege: "Book Not Found" })
    }

});