const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const { getTransactionsList } = require('./controller.js');

/* GET home page. */
router.get('/transactions', auth, getTransactionsList);

module.exports = router;
