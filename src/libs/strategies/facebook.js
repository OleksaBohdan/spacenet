const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config/config');

module.exports = new FacebookStrategy(
  {
    clientID: config.providers.facebook.id,
    clientSecret: config.providers.facebook.secretKey,
    callbackURL: config.providers.facebook.callbackURL,
  },
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
);
