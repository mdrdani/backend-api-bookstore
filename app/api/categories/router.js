const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require('./controller.js');

/* GET home page. */
router.get('/categories', auth, getAllCategories);
router.post('/categories', auth, createCategories);
router.put('/categories/:id', auth, updateCategories);
router.delete('/categories/:id', auth, deleteCategories);

module.exports = router;
