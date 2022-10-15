const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../../config/config');
const User = require('../../models/User');

module.exports = new FacebookStrategy(
  {
    clientID: config.providers.facebook.id,
    clientSecret: config.providers.facebook.secretKey,
    callbackURL: config.providers.facebook.callbackURL,
    profileFields: ['displayName', 'email'],
  },

  async function (accessToken, refreshToken, profile, done) {
    if (!profile) {
      return done(null, false, 'provider error');
    }

    const id = profile.id;

    try {
      const user = await User.findOne({ facebookId: id });
      if (!user) {
        const id = (await User.collection.find().count()) + 1;
        const user = await User.create({
          email: profile.id,
          userName: profile.displayName,
          profileId: id,
          facebookId: profile.id,
        });
        return done(null, user, 'ok');
      } else {
        return done(null, user, 'ok');
      }
    } catch (error) {
      return done(error, false, 'Some error occured');
    }
  }
);
