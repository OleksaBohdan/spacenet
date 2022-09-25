const User = require('../models/User');
const Session = require('../models/Session');
const uuid = require('uuid');

module.exports = async function (ctx, next) {
  const userName = ctx.request.body.userName;
  const password = ctx.request.body.password;
  let user;

  console.log(userName, password);

  try {
    user = await User.findOne({ userName });
    ctx.body = user;
  } catch (e) {
    ctx.status = 500;
    ctx.body = { message: 'server error' };
    return;
  }

  if (!user) {
    ctx.status = 404;
    ctx.body = { message: 'user not found' };
    return;
  }

  if (await user.checkPassword(password)) {
    const token = uuid.v4();
    ctx.status = 200;
    ctx.user = user;
    ctx.body = token;
    return;
  } else {
    ctx.status = 412;
    ctx.body = { message: 'wrong password' };
    return;
  }
};
