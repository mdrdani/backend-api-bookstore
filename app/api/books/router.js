const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const { authorize } = require('../../middleware/authorize.js');
const {
  getAllBooks,
  createBooks,
  updateBooks,
  deleteBooks,
} = require('./controller.js');

/* GET home page. */
router.get('/books', auth, authorize, getAllBooks);
router.post('/books', auth, authorize, createBooks);
router.put('/books/:id', auth, authorize, updateBooks);
router.delete('/books/:id', auth, authorize, deleteBooks);

module.exports = router;
