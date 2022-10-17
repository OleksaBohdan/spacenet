const Router = require('koa-router');
const User = require('../../models/User');
const { positive } = require('../../controllers/rating');

const profileRouter = new Router();

profileRouter.post('/api/positive', positive);

module.exports = profileRouter;
