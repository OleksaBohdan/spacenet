const Router = require('koa-router');
const User = require('../../models/User');
const { positive, negative } = require('../../services/rating');

const profileRouter = new Router();

profileRouter.post('/api/positive', positive);
profileRouter.post('/api/negative', negative);

module.exports = profileRouter;
