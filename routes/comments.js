const express = require('express');
const router = express.Router({ mergeParams: true });
const Book = require('../models/Book');
const Comment = require('../models/Comment');
const checkAuthentication = require('../middleware/checkAuthentication');
const checkCommentOwnerShip = require('../middleware/checkCommentOwnerShip');

router.get('/new', checkAuthentication,(req, res) => {
    res.render('comments/new', {id: req.params.id});
});

router.post('/new', checkAuthentication, async (req, res) => {
    const comment = {
        title: req.body.title,
        content: req.body.content
    };
    try{
        const newComment = await Comment.create(comment);
        newComment.author.id = req.user._id;
        newComment.author.name = req.user.name;
        await newComment.save();
        try{
            const foundBook = await Book.findById(req.params.id);
            foundBook.comments.push(newComment);
            const savedBook =  await foundBook.save();
            res.redirect(`/books/view/${savedBook._id}`);
        }catch(e){
            res.render('comments/new', {id: req.params.id, comment: comment});
        }
    }catch(e){
        res.render('comments/new', {id: req.params.id, comment: comment});
    }
});

router.get('/:cid/edit',  checkCommentOwnerShip, async (req, res) => {
    const comment = await Comment.findById(req.params.cid);
    res.render('comments/edit', {comment: comment, id: req.params.id});
});

router.put('/:cid/edit',  checkCommentOwnerShip, async (req, res) => {
    const comment = {
        title: req.body.title,
        content: req.body.content
    };
    try{
        await Comment.findByIdAndUpdate(req.params.cid, comment);
        res.redirect(`/books/view/${req.params.id}`);
    }catch(e){
        console.log(e);
        res.redirect('back');
    }
});

router.delete('/:cid/delete',  checkCommentOwnerShip , (req, res) => {
    Comment.findByIdAndRemove(req.params.cid, (err, foundComment) => {
        if (err && foundComment == null) {
            return res.redirect(`/books/view/${req.params.id}`);
        } else {
            res.redirect(`/books/view/${req.params.id}`);
        }
    });
});

module.exports = router;