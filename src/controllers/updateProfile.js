const User = require('../models/User');

module.exports = async function updateProfile(ctx, next) {
  try {
    const user = await User.findById(ctx.user.id);
    user.userName = ctx.request.body.name;
    user.age = ctx.request.body.age;
    user.about = ctx.request.body.about;
    await user.save();
    ctx.status = 200;
  } catch (e) {
    ctx.body = { message: e.message };
    ctx.status = 500;
  }
};
