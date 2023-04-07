const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const connectMongo = require('./db/connections');

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/auth/authRouter');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

const MONGO_URL = process.env.MONGO_URL;

(async function serverStart(connectionURL) {
  await connectMongo(connectionURL);
})(MONGO_URL);

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

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
