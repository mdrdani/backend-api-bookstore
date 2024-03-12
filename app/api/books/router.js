const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const { getAllBooks, createBooks } = require('./controller.js');

/* GET home page. */
router.get('/books', auth, getAllBooks);
router.post('/books', auth, createBooks);

module.exports = router;
