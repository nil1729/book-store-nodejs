const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
// const checkAuthentication = require('../middleware/checkAuthentication');
const checkAuthorization = require('../middleware/checkAuthorization');

router.get('/',  async(req, res) => {
    const books = await Book.find({});
    res.render('books/home', {books: books, user: req.user});
});

router.get('/view/:id', (req, res)=>{
    Book.findById(req.params.id).populate('comments').exec((err, book)=>{
        if(err){
            console.log(err);
            res.redirect('/books');
        }else{
            res.render('books/view', {book: book, user: req.user});
        }
    });
});

router.get('/new', checkAuthorization ,(req, res) => {
    res.render('books/new');
});

router.post('/new', checkAuthorization ,async (req, res) => {
    const book = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price:  parseFloat(req.body.price)
    };
    try{
        const newBook = new Book(book);
        await newBook.save();
        res.redirect(`/books/view/${newBook._id}`);
    }catch(e){
        console.log(e);
        res.render('books/new', {book: book});
    }
});

router.get('/edit/:id', checkAuthorization ,async (req, res)=>{
    const book = await Book.findById(req.params.id);
    res.render('books/edit', {book: book});
});
router.put('/edit/:id', checkAuthorization ,async (req, res)=>{
    const book = {
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        price:  parseFloat(req.body.price)
    };
    try{
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, book);
        await updatedBook.save();
        res.redirect(`/books/view/${updatedBook._id}`);
    }catch(e){
        console.log(e);
        res.render('books/new', {book: book});
    }
});

router.delete('/delete/:id', checkAuthorization ,async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
});



module.exports = router;