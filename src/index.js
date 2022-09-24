const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');

try {
  mongoose.connect(config.DB, () => {
    console.log(`Conencted to MongoDB ${config.DB}`);
  });

  app.listen(config.PORT, async () => {
    console.log(`App started on port ${config.PORT}`);
  });
} catch (e) {
  console.log(e.message);
}
