const User = require('../models/User');
const Router = require('koa-router');

module.exports = async function register(ctx, next) {
  const id = (await User.collection.find().count()) + 1;

  console.log('id', id);

  const user = new User({
    userName: ctx.request.body.userName,
    email: ctx.request.body.email,
    profileId: id,
  });

  try {
    await user.setPassword(ctx.request.body.password);
    await user.save();
  } catch (e) {
    if (e.code == 11000) {
      console.log(e);
      ctx.status = 409;
      ctx.body = JSON.stringify(e.keyValue);
      return;
    }

    ctx.status = 520;
    ctx.body = JSON.stringify(e.message);
    return;
  }

  ctx.status = 201;
  next();
};
