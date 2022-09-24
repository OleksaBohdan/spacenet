const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/config');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const registerRouter = require('./routes/register/registerRouter');

const app = new Koa();
const router = new Router();
app.use(require('koa-bodyparser')());
app.use(require('koa-static')(path.join(__dirname, 'public')));

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

app.use(registerRouter.routes());
app.use(router.routes());

module.exports = app;
