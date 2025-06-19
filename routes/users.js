const express = require('express');
const router = express.Router();
const { verfiyAndAuthorize, verfiyAdmin } = require('../middleware/verifyToken');
const {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById } = require('../controller/userController')


// Get All Users
router.get('/', verfiyAdmin, getAllUsers);

// Get User By Id
router.get('/:id', verfiyAndAuthorize, getUserById);

// Upsate User By Id
router.put("/:id", verfiyAndAuthorize, updateUserById);

// Delete User By Id
router.delete('/:id', verfiyAndAuthorize, deleteUserById);

module.exports = router;