const Router = require('koa-router');
const login = require('../../controllers/login');
const loginFacebook = require('../../controllers/loginFacebook');
const passport = require('../../libs/passport');

const loginRouter = new Router({ prefix: '/api/login' });

loginRouter.post('/', login);

loginRouter.get('/facebook', async (ctx, next) => {
  passport.authenticate('facebook');
});

loginRouter.get('/facebook/callback', async (ctx, next) => {
  passport.authenticate('facebook', { failureRedirect: '/login' });
});

module.exports = loginRouter;
