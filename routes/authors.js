const express = require('express');
const router = express.Router();
const { verfiyAdmin } = require('../middleware/verifyToken')
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor } = require('../controller/authorController');


// Get All Authors
router.get('/', getAllAuthors);

// Get Author By Id
router.get('/:id', getAuthorById);

// Create an Author
router.post('/', verfiyAdmin, createAuthor);

// Update an Author By Id
router.put('/:id', verfiyAdmin, updateAuthor)

// Delete an Author By Id
router.delete('/:id', verfiyAdmin, deleteAuthor);


module.exports = router;