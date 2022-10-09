document.addEventListener('DOMContentLoaded', () => {
  const credentialForm = document.querySelector('.credential-form');
  const profileBtn = document.querySelector('.btn_submit_profile');
  const usersBtn = document.querySelector('.btn_submit_users');

  profileBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const credentials = {
      name: credentialForm.name.value,
      age: credentialForm.age.value,
      about: credentialForm.about.value,
    };

    console.log(credentials);

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
    }).then((response) => {
      console.log(response.body.json());
    });
  });
});
