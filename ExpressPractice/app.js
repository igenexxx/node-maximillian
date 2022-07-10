const express = require('express');
const app = express();

app.use('/user', (req, res, next) => {
  console.log('Second middleware');
  res.send({
    user: 'Eugene',
    age: 99,
    strength: 'unlimited'
  });
});

app.use('/', (req, res, next) => {
  console.log('First middleware');
  res.send('Hello to my world!');
});

app.listen(3100);
