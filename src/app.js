const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const favicon = require('koa-favicon');
const config = require('./config/config');
const fs = require('fs');
const path = require('path');
const registerRouter = require('./routes/register/registerRouter');

const app = new Koa();
const router = new Router();

app.use(favicon(path.join(__dirname + '/public/img/icons/favicon.ico')));
app.use(require('koa-bodyparser')());
app.use(require('koa-static')(path.join(__dirname, './views/public')));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { error: 'Internal server error' };
    }
  }
});

const render = views(path.join(__dirname, './views/public'));
app.use(render);

router.get('/login', async (ctx, next) => {
  await ctx.render('./index.html');
});

router.get('/register', async (ctx, next) => {
  await ctx.render('./pages/register.html');
});

router.get('/main', async (ctx, next) => {
  await ctx.render('./pages/main.html');
});

router.get('/profile', async (ctx, next) => {
  await ctx.render('./pages/profile.html');
});

app.use(registerRouter.routes());
app.use(router.routes());

module.exports = app;
