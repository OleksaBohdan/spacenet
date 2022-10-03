const FacebookStrategy = require('passport-facebook').Strategy;
const authenticate = require('./authenticate');
const config = require('../../config/config');
const get = require('lodash/get');

module.exports = new FacebookStrategy(
  {
    clientID: config.providers.facebook.id,
    clientSecret: config.providers.facebook.secretKey,
    callbackURL: config.providers.facebook.callbackURL,
    profileFields: ['displayName', 'email'],
  },
  function (accessToken, refreshToken, profile, cb) {
    authenticate('facebook', get(profile, 'emails[0].value'), profile.displayName, done);
  }
);
