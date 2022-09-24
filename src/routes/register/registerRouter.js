const Router = require('koa-router');
const User = require('../../models/User');
const register = require('../../controllers/login');

const registerRouter = new Router({ prefix: '/api/register' });

registerRouter
  .post('/', async (ctx, next) => {
    const user = {
      userName: ctx.request.body.userName,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
    };
    console.log(user);

    ctx.status = 201;
  })
  .get('/facebook', async (ctx, next) => {
    console.log('facebook register');
    ctx.status = 200;
  });

module.exports = registerRouter;
