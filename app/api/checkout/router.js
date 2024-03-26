const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const { checkout } = require('./controller.js');

/* GET home page. */
router.post('/checkouts', auth, checkout);

module.exports = router;
