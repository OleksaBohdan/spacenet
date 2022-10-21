const socketIO = require('socket.io');

function socket(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('connection', socket.id);

    socket.on('chat_message', (data) => {
      console.log('data', data);

      socket.emit('chat_message', data);
    });
  });
}

module.exports = socket;
