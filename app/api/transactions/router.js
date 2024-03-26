const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const {
  getTransactionsList,
  detailTransactionsList,
} = require('./controller.js');

/* GET home page. */
router.get('/transactions', auth, getTransactionsList);
router.get('/transactions/:id', auth, detailTransactionsList);

module.exports = router;
