const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth.js');
const controller = require('./controller.js');
const upload = require('../../middleware/multer.js');

/* GET home page. */
router.post('/uploads', auth, upload.single('image'), controller.uploadImage);
module.exports = router;
