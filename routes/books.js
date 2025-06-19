const express = require('express');
const router = express.Router();
const { verfiyAdmin } = require('../middleware/verifyToken');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook } =
    require('../controller/booksController')

    
// Get All Books Route
router.get('/', getAllBooks);

// Get Book By Id Route
router.get('/:id', getBookById)

// Create New Book
router.post('/', verfiyAdmin, createBook)

// Update Book By Id
router.put('/:id', verfiyAdmin, updateBook);

// Update Book By Id
router.delete('/:id', verfiyAdmin, deleteBook);


module.exports = router;