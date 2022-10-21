const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');
const socket = require('./services/socketChat');

try {
  mongoose.connect(config.DB, () => {
    console.log(`Conencted to MongoDB ${config.DB}`);
  });

  const server = app.listen(config.PORT, async () => {
    console.log(`Websocket App started on port ${config.PORT}`);
  });

  socket(server);
} catch (e) {
  console.log(e.message);
}
