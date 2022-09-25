module.exports = {
  PORT: process.env.PORT || 3000,
  DB: process.env.DB || 'mongodb://127.0.0.1:27017/spacenet',
  crypto: {
    length: 128,
    iterations: 12000,
    digest: 'sha512',
  },
};
