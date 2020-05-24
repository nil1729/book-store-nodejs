const Comment = require('../models/Comment');
module.exports =  async function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.cid, (err, foundComment) => {
            if (err) {
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    }else{
        res.redirect('/users/login');
    }
};