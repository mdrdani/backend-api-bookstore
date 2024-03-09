const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const { getAllBooks } = require('./controller.js');

/* GET home page. */
router.get('/books', auth, getAllBooks);

module.exports = router;
