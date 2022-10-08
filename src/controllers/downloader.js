const Router = require('koa-router');
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');

const downloadRouter = new Router();
const upload = multer({ dest: './src/data/avatars', limits: { fileSize: 10000000 } });

downloadRouter.post('/download', upload.single('avatar'), async (ctx, next) => {
  console.log('Download');
  console.log('ctx.request.file', ctx.request.file);
  console.log('ctx.file', ctx.file);
  console.log('ctx.request.body', ctx.request.body);
});

module.exports = downloadRouter;
