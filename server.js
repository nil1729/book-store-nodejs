const path = require('path');
const configFilePath = path.join('/opt/nil1729/book-store-app/backend.env');
require('dotenv').config({ path: configFilePath });

const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('cookie-session');
const passport = require('passport');
const connectDB = require('./config/db');
const flash = require('connect-flash');
require('./config/passport')(passport);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
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

const PORT = process.env.PORT || 5050;
app.listen(PORT, async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`Server started on port ${PORT} on ${process.env.NODE_ENV} mode`);
});
