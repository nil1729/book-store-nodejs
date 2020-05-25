const express = require('express');
const router = express.Router();
const checkAuthorization = require('../middleware/checkAuthorization');
const User = require('../models/User');
const Book = require('../models/Book');

router.get('/', checkAuthorization, async (req, res) => {
    const books = await Book.find();
    const users = await User.find();
    res.render('admin/dashboard', {admin: req.user, books: books, users: users});
});

module.exports = router;