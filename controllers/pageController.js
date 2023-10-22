const nodeMailer = require('nodemailer');
const Course = require('../models/Course');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  console.log(courses);
  const totalCourses = await Course.find().countDocuments();
  const totalUser = await User.find({ role: 'student' }).countDocuments();
  const totalTeacher = await User.find({ role: 'teacher' }).countDocuments();

  res.status(200).render('index', {
    page_name: 'index',
    courses,
    totalCourses,
    totalTeacher,
    totalUser,
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const output = `
                  <h1>Mail Detail</h1>
                  <ul>
                    <li>Name: ${req.body.name}</li>
                    <li>Email: ${req.body.mail}</li>
                  </ul>
                  <h1>Message Detail</h1>
                  <p>${req.body.message}</p>`;

    const transporter = nodeMailer.createTransport({
      host: 'mtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
        pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD',
      },
    });

    const info = await transporter.sendMail({
      from: '"SmartEdu <foo@example.com>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: 'SmartEdu | New Message✔', // Subject line
      html: output, // html body
    });

    req.flash('success', 'we recieve your message successfully');
    res.status(200).redirect('/contact');
  } catch (err) {
    req.flash('error', 'error');
    res.status(200).redirect('/contact');
  }
};
