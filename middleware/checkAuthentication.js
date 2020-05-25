module.exports = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        req.flash('error', `You Need to be logged in First`);
        res.redirect('/users/login');
    }
};