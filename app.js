const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).render('index', {
    page_name: 'index',
  });
});

app.get('/about', (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
