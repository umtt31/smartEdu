const bcyrpt = require('bcrypt');
const { validationResult } = require('express-validator');
const Category = require('../models/Category');
const User = require('../models/User');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    for (let err of errors.array()) {
      req.flash('error', err.msg);
    }
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }).then((user) => {
      if (user) {
        bcyrpt.compare(password, user.password, (err, result) => {
          if (result) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          } else {
            req.flash('error', 'incorrect password');
            res.redirect('/login');
          }
        });
      } else {
        req.flash('error', 'user no found ');
        res.redirect('/login');
      }
    });
  } catch (error) {
    res.status(400).send({ status: 'fail', error });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const users = await User.find({});
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses,
    users,
  });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Course.deleteMany({ user: req.params.id });
  res.redirect('/users/dashboard');
};
