const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.category;

    let filter = {};

    if (categorySlug) {
      const category = await Category.findOne({ slug: categorySlug });
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find({}).sort('name');
    res
      .status(200)
      .render('courses', { courses, categories, page_name: 'courses' }); //.json({ status: 'success', courses });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.category });
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: category._id,
      user: req.session.userID,
    });
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    const categories = await Category.find();
    res
      .status(200)
      .render('course', { course, page_name: 'courses', categories, user });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug });
    await user.courses.push({ _id: course._id });
    await user.save();
    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug });
    await user.courses.pull({ _id: course._id });
    await user.save();
    res.redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
