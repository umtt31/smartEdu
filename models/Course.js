const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const CourseSchema = new mongoose.Schema({
  name: { type: String, enique: true, required: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});
CourseSchema.plugin(uniqueValidator);

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
