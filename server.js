const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
