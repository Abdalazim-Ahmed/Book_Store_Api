const express = require('express')
const router = express.Router();
const { forgetPassword } = require('../controller/passwordContorller')


/**
 * @docs Forgot password
 * @method GET
 * @route  /password/forgot-password
 * @access public
*/
router.get('/forgot-password', forgetPassword )



module.exports = router;