const express = require('express');
const router = express.Router();
const checkAuthorization = require('../middleware/checkAuthorization');
const User = require('../models/User');
const Book = require('../models/Book');
const Order = require('../models/Order');

router.get('/', checkAuthorization, async (req, res) => {
    const books = await Book.find();
    const users = await User.find();
    const orders = await Order.find().sort({createdAt:-1}).populate("user").populate("details.book").exec();
    console.log(orders);
    res.render('admin/dashboard', {admin: req.user, books, users, orders});
});

module.exports = router;