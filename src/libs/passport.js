const { KoaPassport } = require('koa-passport');
const passport = new KoaPassport();

const localStrategy = require('./strategies/local');
const facebookStrategy = require('./strategies/facebook');

passport.use(localStrategy);
passport.use(facebookStrategy);

module.exports = passport;
