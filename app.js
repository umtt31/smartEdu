const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

mongoose
  .connect('mongodb://localhost/smartedu-db')
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.set('view engine', 'ejs');

global.userIn = null;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);

app.use('*', (req, res, next) => {
  userIn = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
