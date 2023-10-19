const Category = require('../models/Category');
const Course = require('../models/Course');

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
    const course = await Course.create(req.body);
    res.status(201).json({ status: 'success', course });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.find({ slug: req.params.slug });
    res.status(200).render('course', { course, page_name: 'courses' });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};
