const socketIO = require('socket.io');
const Message = require('../models/Message');

async function socket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    socket.on('chat_message', async (data) => {
      io.emit('chat_message', data);

      const date = new Date();
      await Message.create({
        message: data.message,
        userName: data.userName,
        avatar: data.avatar,
        userId: data.userId,
        date: date,
      });
    });
  });
}

module.exports = socket;
