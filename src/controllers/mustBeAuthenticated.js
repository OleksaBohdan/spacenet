const User = require('../models/User');
const Session = require('../models/Session');

module.exports = async function (ctx, next) {
  const token = ctx.cookies.get('token');
  const user = await Session.findOne({ token }).populate('user');
  if (!user) {
    ctx.status = 400;
    ctx.redirect('/login');
    return;
  }
  return next();
};
