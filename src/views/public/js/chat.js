const msgMe = function (username = 'unknown', text = '') {
  return `
  <div class='main-blocks__msg main-blocks__msg-me'>
    <div class='main-blocks__msg-wrapper'>
      <div class='main-blocks__msg-username'>${username}</div>
      <div class='main-blocks__msg-text'>
      ${text}
      </div>
    </div>
    <img class='main-blocks__avatar' src='../data/nullavatar.jpg' alt='photo' />
  </div>
  `;
};
const msgOther = function (username = 'unknown', text = '') {
  return `
  <div class='main-blocks__msg main-blocks__msg-other'>
    <img class='main-blocks__avatar' src='../img/user_1.jpeg' alt='photo' />
    <div class='main-blocks__msg-wrapper'>
      <div class='main-blocks__msg-username'>${username}</div>
      <div class='main-blocks__msg-text'>
      ${text}
      </div>
    </div>
  </div>
  `;
};

document.addEventListener('DOMContentLoaded', () => {
  const chatList = document.querySelector('.main-blocks__chatlist');
  const form = document.querySelector('.main-blocks__chatform');
  const input = document.querySelector('.main-blocks__chatinput');
  const userName = document.querySelector('.credential-userName');

  const socket = io();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
      console.log(userName.value);
      socket.emit('chat_message', { message: input.value, userName: userName.value });
      input.value = '';
    }
  });

  socket.on('chat_message', (data) => {
    const item = document.createElement('div');
    console.log(data);

    if (data.userName == userName.value) {
      item.innerHTML = msgMe(data.userName, data.message);
    } else {
      item.innerHTML = msgOther(data.userName, data.message);
    }

    chatList.appendChild(item);
    chatList.scrollTo(0, document.body.scrollHeight);
  });
});
