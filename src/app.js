const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const views = require('koa-views');
const hbs = require('handlebars');
const favicon = require('koa-favicon');
const config = require('./config/config');
const fs = require('fs');
const passport = require('./libs/passport');
const uuid = require('uuid');
const path = require('path');
const Session = require('./models/Session');
const User = require('./models/User');
const registerRouter = require('./routes/register/registerRouter');
const loginRouter = require('./routes/login/loginRouter');
const mainRouter = require('./routes/main/mainRouter');
const profileRouter = require('./routes/profile/profileRouter');
const downloadRouter = require('./controllers/downloader');
const mustBeAuthenticated = require('./controllers/mustBeAuthenticated');
const { facebook, facebookCallback } = require('./controllers/loginFacebook');

const app = new Koa();
app.use(cors());
const router = new Router();

app.use(favicon(path.join(__dirname + '/views/public/img/icons/favicon.ico')));
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
      ctx.body = { error: err.message };
    }
  }
});

app.use(async (ctx, next) => {
  ctx.login = async function (user) {
    const token = uuid.v4();

    try {
      const session = await Session.findOne(user);
      if (!session) {
        await Session.create({ token: token, lastVisit: new Date(), user: user });
      } else {
        await session.updateOne({ lastVisit: new Date(), token: token });
        await session.save();
      }
    } catch (error) {
      throw error;
    }

    return token;
  };
  return next();
});

app.use(async (ctx, next) => {
  const token = ctx.cookies.get('token');

  if (!token) return next();
  const session = await Session.findOne({ token: token }).populate('user');

  if (!session) {
    ctx.status = 400;
    ctx.body = { message: 'Wrong session token' };
    return next();
  }

  await session.updateOne({ lastVisit: new Date() });
  ctx.user = session.user;
  return next();
});

const render = views(path.join(__dirname, './views/public'), { extension: 'hbs', map: { hbs: 'handlebars' } });
app.use(render);

router.get('/', async (ctx, next) => {
  ctx.redirect('/main');
});

router.get('/login', async (ctx, next) => {
  await ctx.render('./login');
});

router.get('/register', async (ctx, next) => {
  await ctx.render('./pages/register');
});

router.get('/main', mustBeAuthenticated, async (ctx, next) => {
  let avatarPath = ctx.user.avatar;
  if (!avatarPath) {
    avatarPath = '../data/nullavatar.jpg';
  }
  ctx.state = {
    userName: ctx.user.userName,
    age: ctx.user.age,
    about: ctx.user.about,
    avatar: avatarPath,
  };
  await ctx.render('./pages/main');
});

router.get('/profile/:id', mustBeAuthenticated, async (ctx, next) => {
  const profileId = ctx.params.id;

  const user = await User.findOne({ profileId: profileId });

  if (!user) {
    ctx.status = 404;
    ctx.redirect('/main');
  }

  let avatarPath = user.avatar;
  if (!avatarPath) {
    avatarPath = '../data/nullavatar.jpg';
  }

  ctx.state = {
    userName: user.userName,
    age: user.age,
    about: user.about,
    avatar: avatarPath,
  };

  await ctx.render('./pages/profile');
});

router.get('/oauth/facebook', facebook);
router.get('/oauth/facebook/callback', facebookCallback);

router.get('/logout', async (ctx, next) => {
  await Session.findOneAndDelete(ctx.cookies.get('token'));
  ctx.cookies.set('token', '');
  ctx.redirect('/login');
});

app.use(registerRouter.routes());
app.use(loginRouter.routes());
app.use(mainRouter.routes());
app.use(downloadRouter.routes());
app.use(profileRouter.routes());
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
