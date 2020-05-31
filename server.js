const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/db');
const flash = require('connect-flash');

connectDB(require('./config/keys').mongoURI);
require('./config/passport')(passport);


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
    res.locals.s_m = req.flash('success');
    res.locals.e_m = req.flash('error');
    next();
});

app.get('/', (req, res) => {
     res.redirect('/books');
});



app.use('/books', require('./routes/books'));
app.use('/users', require('./routes/users'));
app.use('/books/:id/comments', require('./routes/comments'));
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 1000;
app.listen(PORT, process.env.IP,() => {
    console.log(`Server started on port ${PORT}`);
});