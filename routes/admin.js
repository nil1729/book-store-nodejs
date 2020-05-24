const express = require('express');
const router = express.Router();
const checkAuthorization = require('../middleware/checkAuthorization');
const User = require('../models/User');
const Book = require('../models/Book');

router.get('/', checkAuthorization, async (req, res) => {
    res.send('ADMIN PANEL');
});

module.exports = router;