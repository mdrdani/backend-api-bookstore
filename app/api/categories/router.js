const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const { authorize } = require('../../middleware/authorize.js');
const {
  getAllCategories,
  createCategories,
  updateCategories,
  deleteCategories,
} = require('./controller.js');

/* GET home page. */
router.get('/categories', auth, authorize, getAllCategories);
router.post('/categories', auth, authorize, createCategories);
router.put('/categories/:id', auth, authorize, updateCategories);
router.delete('/categories/:id', auth, authorize, deleteCategories);

module.exports = router;
