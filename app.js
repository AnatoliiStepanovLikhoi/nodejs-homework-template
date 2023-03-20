const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// dotenv.config({ path: './.env' });

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/auth/authRouter');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// mongoose
//   .connect(
//     process.env.MONGO_URL
//     // || 'mongodb://127.0.0.1:27017/db-users'
//   )
//   .then(connection => {
//     console.log('Database connection successful');
//   });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/user', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status } = err;

  res.status(status || 500).json({
    msg: err.message,
  });
});

module.exports = app;
