const express = require('express');
const roleCheckMiddleware = require('../middlewares/roleCheckMiddleware');
const courseController = require('../controllers/courseController');

const router = express.Router();

router
  .route('/')
  .post(
    roleCheckMiddleware(['teacher', 'admin']),
    courseController.createCourse
  );
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);

module.exports = router;
