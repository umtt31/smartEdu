const bcyrpt = require('bcrypt');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
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
          }
        });
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
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find();
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
  });
};
