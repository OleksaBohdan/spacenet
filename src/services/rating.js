const User = require('../models/User');

const positive = async function (ctx, next) {
  console.log('positive function');
  const reviewerId = ctx.user.profileId;
  const userName = ctx.request.body.userName;

  const user = await User.findOne({ userName: userName });

  if (!user) {
    ctx.status = 500;
    return;
  }

  if (user.negativeReview.includes(reviewerId)) {
    console.log('Deleted id from negative');
    const index = user.negativeReview.indexOf(reviewerId);
    if (index !== -1) {
      user.negativeReview.splice(index, 1);
    }
  }

  if (user.positiveReview.includes(reviewerId)) {
    console.log('Your already left positive rewiev for this user');
    ctx.status = 200;
    ctx.body = { message: 'Your already left positive rewiev for this user' };
    return;
  }

  user.positiveReview.push(reviewerId);

  await user.save();

  console.log('user', user);
  ctx.status = 200;
};

const negative = async function (ctx, next) {
  console.log('negative function');
  const reviewerId = ctx.user.profileId;
  const userName = ctx.request.body.userName;

  const user = await User.findOne({ userName: userName });

  if (!user) {
    ctx.status = 500;
    return;
  }

  if (user.positiveReview.includes(reviewerId)) {
    console.log('Deleted id from positive');
    const index = user.positiveReview.indexOf(reviewerId);
    if (index !== -1) {
      user.positiveReview.splice(index, 1);
    }
  }

  if (user.negativeReview.includes(reviewerId)) {
    console.log('Your already left negative rewiev for this user');
    ctx.status = 200;
    ctx.body = { message: 'Your already left negative rewiev for this user' };
    return;
  }

  user.negativeReview.push(reviewerId);

  await user.save();

  console.log('user', user);
  ctx.status = 200;
};

module.exports = { positive, negative };
