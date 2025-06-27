const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images"))
    },

    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({ storage });

/**
 * @desc   Upload image
 * @method POST 
 * @route  /api/upload 
 * @access public
**/
router.post('/', upload.single('img'), (req, res) => {
    res.status(200).json({massege: 'image uploaded'})
})

module.exports = router;