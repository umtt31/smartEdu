const express = require('express');

const categoryController = require('../controllers/categoryController');

router = express.Router();

router.route('/').post(categoryController.createCategory);

module.exports = router;
