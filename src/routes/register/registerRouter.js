const Router = require('koa-router');
const register = require('../../controllers/register');

const registerRouter = new Router({ prefix: '/api/register' });

registerRouter.post('/', register, (ctx, next) => {});

registerRouter.get('/facebook', () => {
  console.log('facebook register');
  ctx.status = 200;
});

module.exports = registerRouter;
