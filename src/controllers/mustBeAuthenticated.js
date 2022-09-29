module.exports = async function (ctx, next) {
  if (!ctx.user) {
    ctx.status = 400;
    ctx.body = { messahe: 'user not authorised' };
    await ctx.redirect('/login');
    return;
  }
  return next();
};
