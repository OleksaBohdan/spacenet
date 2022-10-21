const msgMe = function () {
  return `
  <div class='main-blocks__msg main-blocks__msg-me'>
    <div class='main-blocks__msg-wrapper'>
      <div class='main-blocks__msg-username'>Bohdan</div>
      <div class='main-blocks__msg-text'>
        Hello everybody! Hello everybody!Hello everybody!Hello everybody!Hello everybody! Hello everybody! Hello
        everybody!Hello everybody!Hello everybody!Hello everybody! Hello everybody! Hello everybody!Hello
        everybody!Hello everybody!Hello everybody!
      </div>
    </div>
    <img class='main-blocks__avatar' src='../img/user_photo.png' alt='photo' />
  </div>
  `;
};
const msgOther = function () {
  return `
  <div class='main-blocks__msg main-blocks__msg-other'>
    <img class='main-blocks__avatar' src='../img/user_1.jpeg' alt='photo' />
    <div class='main-blocks__msg-wrapper'>
      <div class='main-blocks__msg-username'>pussy.boy</div>
      <div class='main-blocks__msg-text'>Hello everybody!</div>
    </div>
  </div>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  const chatList = document.querySelector('.main-blocks__chatlist');

  const socket = new WebSocket('wss://localhost:3000');

  socket.onopen = function (e) {
    console.log('connection seuccesfull');

    socket.send('This is the client');
  };
});
