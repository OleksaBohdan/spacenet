const app = require('./app');
const config = require('./config/config');

app.listen(config.PORT, () => {
  console.log(`App started on port ${config.PORT}`);
});
