const Router = require('koa-router');
const login = require('../../controllers/login');

const loginRouter = new Router({ prefix: '/api/login' });

loginRouter.post('/', login);

module.exports = loginRouter;
