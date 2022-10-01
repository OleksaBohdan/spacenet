const passport = require('../libs/passport');

module.exports = async function (ctx, next) {
  await passport.authenticate('local', async (error, user, info) => {
    if (error) throw error;

    if (!user) {
      ctx.status = 400;
      ctx.body = { message: info.message };
      return;
    }

    const token = await ctx.login(user);
    ctx.status = 200;
    ctx.cookies.set('token', token);
    ctx.body = { message: 'ok' };

    return next();
  })(ctx, next);
};
