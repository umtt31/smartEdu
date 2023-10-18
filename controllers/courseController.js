const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort('-createdAt');
    res.status(200).render('courses', { courses, page_name: 'courses' }); //.json({ status: 'success', courses });
  } catch (error) {
    res.status(400).json({ status: 'status', error });
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
