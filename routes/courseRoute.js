const express = require('express');
const roleCheckMiddleware = require('../middlewares/roleCheckMiddleware');
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .post(
    roleCheckMiddleware(['teacher', 'admin']),
    courseController.createCourse
  );
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router
  .route('/enroll/:slug')
  .post(authMiddleware, courseController.enrollCourse);
router
  .route('/release/:slug')
  .post(authMiddleware, courseController.releaseCourse);

module.exports = router;
