const User = require('../models/User');
const bcyrpt = require('bcrypt');
const session = require('express-session');

exports.createUser = async (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(201).render('register', { user, page_name: 'register' });
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
            res.status(200).redirect('/');
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
