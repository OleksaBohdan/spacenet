function userComponent(path, userName, date) {
  const userHtml = `
<div class='main-blocks__user'>
<img class='main-blocks__avatar' src='${path}' alt='photo' />
<div class='main-blocks__name'>${userName}</div>
<div class='main-blocks__userdate'>${date}</div>
</div>
`;
  return userHtml;
}

document.addEventListener('DOMContentLoaded', () => {
  const credentialForm = document.querySelector('.credential-form');
  const profileBtn = document.querySelector('.btn_submit_profile');
  const userlist = document.querySelector('.main-blocks__userlist');
  const usersBtn = document.querySelector('.btn_submit_users');
  const avatarForm = document.querySelector('.main-blocks__download-form');

  profileBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const credentials = {
      name: credentialForm.name.value,
      age: credentialForm.age.value,
      about: credentialForm.about.value,
    };

    await fetch('/api/update', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        location.reload();
      }
      response.status;
    });
  });

  usersBtn.addEventListener('click', async (e) => {
    e.preventDefault;

    await fetch('/api/getUsers', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let result = ``;

        res.forEach((obj) => {
          const date = obj.createdAt.substr(0, 10);
          result += userComponent(obj.avatar, obj.userName, date);
        });
        userlist.innerHTML = result;
      });
  });

  avatarForm.addEventListener('change', async (e) => {
    e.preventDefault();
    const file = document.querySelector('#download-input');
    const formData = new FormData();
    formData.append('avatar', file.files[0], 'avatar');

    await fetch('/download', {
      method: 'post',
      body: formData,
    }).then((respone) => {
      if (respone.status == 200) {
        location.reload();
      }
    });
  });
});
