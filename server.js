const app = require('./app');
const connectMongo = require('./db/connections');
require('dotenv').config();

// const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

async function serverStart(connectionUrl, serverPort) {
  await connectMongo(connectionUrl);

  app.listen(serverPort, () => {
    console.log(`Server running. Use our API on port: ${serverPort}`);
  });
}

serverStart(MONGO_URL, PORT);
