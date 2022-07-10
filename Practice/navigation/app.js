const express = require('express');
const path = require('path');

const commonRoutes = require('./routes/common');
const userRoutes = require('./routes/users');

const app = express();

app.use('/', commonRoutes);
app.use('/users', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000)
