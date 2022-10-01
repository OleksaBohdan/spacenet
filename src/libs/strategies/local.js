const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
  {
    usernameField: 'userName',
  },
  async function (username, password, done) {
    try {
      const user = await User.findOne({ userName: username });
      if (!user) {
        return done(null, false, 'user not found');
      }
      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return done(null, false, 'invalid password');
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
