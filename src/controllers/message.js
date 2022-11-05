const Message = require('../models/Message');

module.exports = async function (ctx, next) {
  const messages = await Message.find().sort({ date: -1 }).limit(20);
  messages.reverse();

  function mapMessage(message) {
    return {
      message: message.message,
      userName: message.userName,
      avatar: message.avatar,
      userId: message.userId,
    };
  }

  ctx.status = 200;
  ctx.body = {
    messages: messages.map(mapMessage),
  };
};
