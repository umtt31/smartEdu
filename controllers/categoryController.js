const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = Category.create(req.body);
    res.status(201).json({ status: 'success', category });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.redirect('/users/dashboard');
};

exports.addCategory = async (req, res) => {
  await Category.create(req.body);
  res.redirect('/users/dashboard');
};
