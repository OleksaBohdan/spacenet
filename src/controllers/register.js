module.exports = function register(ctx, next) {
  console.log('register');
  console.log(ctx.request.body);
  return;
};
