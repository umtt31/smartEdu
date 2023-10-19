const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(201).render('register', { user, page_name: 'register' });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
