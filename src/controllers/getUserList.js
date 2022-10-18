const User = require('../models/User');

module.exports = async function (ctx, next) {
  const users = await User.find();
  const userArray = [];

  users.forEach((obj) => {
    let avatarPath = obj.avatar;
    if (!avatarPath) {
      avatarPath = '../data/nullavatar.jpg';
    }
    userArray.push({ avatar: avatarPath, userName: obj.userName, createdAt: obj.createdAt, profileId: obj.profileId });
  });

  ctx.body = JSON.stringify(userArray);
  ctx.status = 200;
};
