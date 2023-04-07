const mongoose = require('mongoose');

async function connectMongo(connectionUrl) {
  if (!connectionUrl) {
    console.error('Please check database connection ULR');
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectMongo;
