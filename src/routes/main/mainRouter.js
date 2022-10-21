const Router = require('koa-router');
const updateProfile = require('../../controllers/updateProfile');
const getUserList = require('../../controllers/getUserList');
const messageList = require('../../controllers/message');

const mainRouter = new Router();

mainRouter.post('/api/update', updateProfile);
mainRouter.get('/api/getUsers', getUserList);
mainRouter.get('/api/getMessages', messageList);

module.exports = mainRouter;
