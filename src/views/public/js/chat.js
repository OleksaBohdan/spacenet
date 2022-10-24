const msgMe = function (username = 'unknown', text = '', avatar = '../data/nullavatar.jpg', id) {
  return `
  <div class='main-blocks__msg main-blocks__msg-me'>
    <div class='main-blocks__msg-wrapper'>
      <div class='main-blocks__msg-username'><a href='/profile/${id}'>${username}</a></div>
      <div class='main-blocks__msg-text'>
      ${text}
      </div>
    </div>
    <img class='main-blocks__avatar' src='${avatar}' alt='photo' />
  </div>
  `;
};
const msgOther = function (username = 'unknown', text = '', avatar = '../data/nullavatar.jpg', id) {
  return `
  <div class='main-blocks__msg main-blocks__msg-other'>
    <img class='main-blocks__avatar' src='${avatar}' />
    <div class='main-blocks__msg-wrapper'>
      <div class='main-blocks__msg-username'><a href='/profile/${id}'>${username}</a></div>
      <div class='main-blocks__msg-text'>
      ${text}
      </div>
    </div>
  </div>
  `;
};

document.addEventListener('DOMContentLoaded', async () => {
  const chatList = document.querySelector('.main-blocks__chatlist');
  const form = document.querySelector('.main-blocks__chatform');
  const input = document.querySelector('.main-blocks__chatinput');
  const userName = document.querySelector('.credential-userName');
  const userAvatar = document.querySelector('.main-blocks__img');
  const userId = document.querySelector('.main-blocks__username');

  await fetch('/api/getMessages')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      response.messages.forEach((data) => {
        const item = document.createElement('div');

        if (data.userName == userName.value) {
          item.innerHTML = msgMe(data.userName, data.message, data.avatar, data.userId);
        } else {
          item.innerHTML = msgOther(data.userName, data.message, data.avatar, data.userId);
        }

        chatList.appendChild(item);
        chatList.scrollTo(0, document.body.scrollHeight);
      });
    });

  const socket = io();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
      socket.emit('chat_message', {
        message: input.value,
        userName: userName.value,
        avatar: userAvatar.dataset.avatar,
        userId: userId.dataset.id,
      });
      input.value = '';
    }
  });

  socket.on('chat_message', (data) => {
    const item = document.createElement('div');

    if (data.userName == userName.value) {
      item.innerHTML = msgMe(data.userName, data.message, data.avatar, data.userId);
    } else {
      item.innerHTML = msgOther(data.userName, data.message, data.avatar, data.userId);
    }

    chatList.appendChild(item);
    item.scrollIntoView();
  });
});
