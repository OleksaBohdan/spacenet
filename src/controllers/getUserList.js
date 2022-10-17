const User = require('../models/User');

module.exports = async function (ctx, next) {
  const users = await User.find();
  const userArray = [];

  users.forEach((obj) => {
    userArray.push({ avatar: obj.avatar, userName: obj.userName, createdAt: obj.createdAt, profileId: obj.profileId });
  });

  ctx.body = JSON.stringify(userArray);
  ctx.status = 200;
};
