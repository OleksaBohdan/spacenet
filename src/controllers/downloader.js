const Router = require('koa-router');
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');

const downloadRouter = new Router();

const upload = multer({ dest: '../data/avatar' });

downloadRouter.post('/download', async (ctx, next) => {
  console.log('download');
  await upload.single('avatar');

  ctx.status = 200;
});

module.exports = downloadRouter;
