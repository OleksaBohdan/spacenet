const User = require('../models/User');

const positive = async function (ctx, next) {
  console.log('positive', ctx.user.profileId);

  const userName = ctx.request.body.name;

  console.log('userName', userName);
};

module.exports = { positive };
