const express = require('express');
const router = express.Router();
const { signin, signout, signup } = require('./controller');

/* GET home page. */
router.post('/auth/signin', signin);
router.post('/auth/signup', signup);
router.delete('/auth/signout', signout);

module.exports = router;
