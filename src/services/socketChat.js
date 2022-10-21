const socket = require('socket.io');

function socket(server) {
  const io = socket(server);

  io.on('connection', (socket) => {
    console.log('connection', socket.id);
  });
}

module.exports = socket;
