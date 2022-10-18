const User = require('../models/User');

const positive = async function (ctx, next) {
  const reviewerId = ctx.user.profileId;
  const userName = ctx.request.body.userName;

  const user = await User.findOne({ userName: userName });

  if (!user) {
    ctx.status = 500;
    return;
  }

  if (user.negativeReview.includes(reviewerId)) {
    const index = user.negativeReview.indexOf(reviewerId);
    if (index !== -1) {
      user.negativeReview.splice(index, 1);
    }
  }

  if (user.positiveReview.includes(reviewerId)) {
    const index = user.positiveReview.indexOf(reviewerId);

    if (index !== -1) {
      user.positiveReview.splice(index, 1);
    }

    await user.save();

    ctx.status = 200;
    ctx.body = { positive: user.positiveReview.length, negative: user.negativeReview.length };
    return;
  }

  user.positiveReview.push(reviewerId);

  await user.save();

  ctx.status = 200;
  ctx.body = { positive: user.positiveReview.length, negative: user.negativeReview.length };
};

const negative = async function (ctx, next) {
  const reviewerId = ctx.user.profileId;
  const userName = ctx.request.body.userName;

  const user = await User.findOne({ userName: userName });

  if (!user) {
    ctx.status = 500;
    return;
  }

  if (user.positiveReview.includes(reviewerId)) {
    const index = user.positiveReview.indexOf(reviewerId);
    if (index !== -1) {
      user.positiveReview.splice(index, 1);
    }
  }

  if (user.negativeReview.includes(reviewerId)) {
    const index = user.negativeReview.indexOf(reviewerId);

    if (index !== -1) {
      user.negativeReview.splice(index, 1);
    }

    await user.save();

    ctx.status = 200;
    ctx.body = { positive: user.positiveReview.length, negative: user.negativeReview.length };
    return;
  }

  user.negativeReview.push(reviewerId);

  await user.save();

  ctx.status = 200;
  ctx.body = { positive: user.positiveReview.length, negative: user.negativeReview.length };
};

const getScores = async function (ctx, next) {
  const userName = ctx.request.body.userName;

  const user = await User.findOne({ userName: userName });
  ctx.status = 200;
  ctx.body = { positive: user.positiveReview.length, negative: user.negativeReview.length };
};

module.exports = { positive, negative, getScores };
