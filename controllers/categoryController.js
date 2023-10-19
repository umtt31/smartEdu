const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = Category.create(req.body);
    res.status(201).json({ status: 'success', category });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
