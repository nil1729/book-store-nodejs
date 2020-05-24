module.exports =  async function(req, res, next){
    if(req.isAuthenticated()){
         const user = req.user;
         if(user.role==='admin'){
             next();
         }else{
              res.redirect('back');
         }
    }else{
        res.redirect('/users/login');
    }
};