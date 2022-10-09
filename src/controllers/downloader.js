const Router = require('koa-router');
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

const downloadRouter = new Router();
const upload = multer({ dest: './src/views/public/data/avatars', limits: { fileSize: 10000000 } });

downloadRouter.post('/download', upload.single('avatar'), async (ctx, next) => {
  const fileName = ctx.file.originalname;
  fs.renameSync(
    path.join(__dirname, '../views/public/data/avatars', ctx.file.filename),
    path.join(__dirname, '../views/public/data/avatars', fileName)
  );

  const user = await User.findById(ctx.user.id);
  user.avatar = `../data/avatars/${fileName}`;
  await user.save();

  ctx.redirect('/main');
});

module.exports = downloadRouter;
