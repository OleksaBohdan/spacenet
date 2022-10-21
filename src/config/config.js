module.exports = {
  PORT: process.env.PORT || 3000,
  DB: process.env.DB || 'mongodb://127.0.0.1:27017/spacenet',
  crypto: {
    length: 128,
    iterations: 12000,
    digest: 'sha512',
  },
  providers: {
    facebook: {
      id: process.env.FacebookID || '819318892542435',
      secretKey: process.env.FacebookSecret || 'f1c0293dc8746882b61f3d85761e1a46',
      callbackURL: process.env.callbackURL || 'http://localhost:3000/oauth/facebook/callback',
      options: {
        scope: ['email'],
      },
    },
  },
};
