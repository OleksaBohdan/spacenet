const Router = require('koa-router');
const updateProfile = require('../../controllers/updateProfile');
const mainRouter = new Router();

mainRouter.post('/api/update', updateProfile);

module.exports = mainRouter;
