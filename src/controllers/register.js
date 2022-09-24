const User = require('../models/User');
const Router = require('koa-router');

module.exports = async function register(ctx, next) {
  const user = {
    userName: ctx.request.body.userName,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  };

  try {
    await User.create(user);
  } catch (e) {
    if (e.code == 11000) {
      ctx.status = 409;
      ctx.body = JSON.stringify(e.keyValue);
      return;
    }

    ctx.status = 520;
    return;
  }

  ctx.status = 201;
};
