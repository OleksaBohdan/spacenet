document.addEventListener('DOMContentLoaded', () => {
  const submit = document.querySelector('.btn_submit');
  const submitFb = document.querySelector('.btn_fb');
  const loginForm = document.querySelector('.credential-form');
  const info = document.querySelector('.require__info');

  submitFb.addEventListener('click', async (e) => {
    await fetch('/oauth/facebook').then((response) => {
      response.json().then((res) => {
        window.location.href = res.location;
      });
    });
  });

  submit.addEventListener('click', async (e) => {
    e.preventDefault();

    const userName = loginForm.username.value;
    const password = loginForm.password.value;

    const user = {
      userName: userName,
      password: password,
    };

    await fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => {
      res.json().then((result) => {
        console.log(result);
        if (res.status == 500 || res.status == 404 || res.status == 412 || res.status == 400) {
          info.innerHTML = result.message;
        }
      });

      if (res.status == 200) {
        info.classList.add('success');
        info.innerHTML = `Login succesfull`;
        window.location.replace('/main');
      }

      console.log('res stat', res.status);
    });
  });
});
