const User = require('../models/User');

module.exports = async (req, res, next) => {
  await User.findById(req.session.userID).then((err, user) => {
    if (err || !user) return res.redirect('/login');
    next();
  });
};
