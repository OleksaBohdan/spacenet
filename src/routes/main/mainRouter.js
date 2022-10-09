const Router = require('koa-router');
const updateProfile = require('../../controllers/updateProfile');
const getUserList = require('../../controllers/getUserList');

const mainRouter = new Router();

mainRouter.post('/api/update', updateProfile);
mainRouter.get('/api/getUsers', getUserList);

module.exports = mainRouter;
