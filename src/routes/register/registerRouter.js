const Router = require('koa-router');
const User = require('../../models/User');

const registerRouter = new Router({ prefix: '/api/register' });

registerRouter
  .post('/', (ctx, next) => {
    const user = {
      userName: ctx.request.body.userName,
    };
    console.log(user);
    console.log('base register');
    ctx.status = 200;
  })
  .get('/facebook', async (ctx, next) => {
    console.log('facebook register');
    ctx.status = 200;
  });

module.exports = registerRouter;
