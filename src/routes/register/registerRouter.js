const Router = require('koa-router');
const register = require('../../controllers/register');

const registerRouter = new Router({ prefix: '/api/register' });

registerRouter.post('/', register);

module.exports = registerRouter;
