const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/config');
const Handlebars = require('handlebars');
const static = require('koa-static');

const app = new Koa();
const router = new Router();
app.use(require('koa-bodyparser')());

app.use(static('./public'));

router.get('/', async (ctx, next) => {
  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
