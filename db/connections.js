const mongoose = require('mongoose');

async function connectMongo() {
  // await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectMongo;
