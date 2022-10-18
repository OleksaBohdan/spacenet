const Router = require('koa-router');
const User = require('../../models/User');
const { positive, negative, getScores } = require('../../services/rating');

const profileRouter = new Router();

profileRouter.post('/api/positive', positive);
profileRouter.post('/api/negative', negative);
profileRouter.post('/api/scores', getScores);

module.exports = profileRouter;
