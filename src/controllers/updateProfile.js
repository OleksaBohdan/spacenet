const User = require('../models/User');

module.exports = async function updateProfile(ctx, next) {
  const user = {
    userName: ctx.request.body.name,
    age: ctx.request.body.age,
    about: ctx.request.body.about,
  };

  try {
    await User.findOneAndUpdate(ctx.user, user);
    ctx.status = 200;
  } catch (e) {
    ctx.body = { message: e.message };
    ctx.status = 500;
  }
};
