const passport = require('../libs/passport');

module.exports = async function (ctx, next) {
  passport.authenticate('local', async (error, user, info) => {
    if (error) throw error;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info };
      return;
    }

    const token = await ctx.login(user);
    ctx.cookies.set('token', token);

    return next();
  });
};
