const passport = require('../libs/passport');

module.exports = async function (ctx, next) {
  console.log('login');
  await passport.authenticate('local', async (error, user, info) => {
    if (error) throw error.messaage;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info };
      return;
    }

    console.log(user);

    const token = await ctx.login(user);
    console.log('token to set', token);
    ctx.status = 200;
    ctx.cookies.set('token', token);
    ctx.body = { message: 'ok' };

    return next();
  })(ctx, next);
};
