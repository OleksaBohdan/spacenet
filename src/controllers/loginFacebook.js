const passport = require('../libs/passport');

module.exports.facebook = async function facebook(ctx, next) {
  await passport.authenticate('facebook')(ctx, next);
  ctx.status = 200;
  ctx.body = { status: 'ok', location: ctx.response.get('location') };
  ctx.response.remove('location');
};

module.exports.facebookCallback = async function facebookCallback(ctx, next) {
  await passport.authenticate('facebook', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { message: info };
      return;
    }

    const token = await ctx.login(user);
    ctx.status = 200;
    ctx.cookies.set('token', token);
    ctx.body = { message: 'ok' };
    ctx.redirect('/');
  })(ctx, next);
};
