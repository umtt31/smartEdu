const express = require('express');

const categoryController = require('../controllers/categoryController');

router = express.Router();

router.route('/').post(categoryController.createCategory);
router.route('/:id').delete(categoryController.deleteCategory);
router.route('/add').post(categoryController.addCategory);

module.exports = router;
