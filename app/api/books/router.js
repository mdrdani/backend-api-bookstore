const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const {
  getAllBooks,
  createBooks,
  updateBooks,
  deleteBooks,
} = require('./controller.js');

/* GET home page. */
router.get('/books', auth, getAllBooks);
router.post('/books', auth, createBooks);
router.put('/books/:id', auth, updateBooks);
router.delete('/books/:id', auth, deleteBooks);

module.exports = router;
