const spinner = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

document.addEventListener('DOMContentLoaded', () => {
  const submit = document.querySelector('#btn_submit');
  const registerForm = document.querySelector('#registerForm');
  const info = document.querySelector('#require__info');

  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    if (registerForm.userName.value == '' || registerForm.email.value == '' || registerForm.password.value == '') {
      console.log('some form empty');
      info.classList.remove('success');
      info.innerHTML = 'ERROR: Some fields are empty!';
      return;
    }

    info.innerHTML = spinner;

    const user = {
      userName: registerForm.userName.value,
      email: registerForm.email.value,
      password: registerForm.password.value,
    };

    await fetch('/api/register/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.status == 201) {
        info.classList.remove('warning');
        info.classList.add('success');
        info.innerHTML = 'Account succesfully created!';
      }
      if (res.status == 409) {
        res.json().then((res) => {
          const obj = res;
          console.log(obj[Object.keys(obj)[0]]);
          let user = obj[Object.keys(obj)[0]];
          info.classList.add('warning');
          const errorMessage = `User: ${user} already registered`;
          info.innerHTML = errorMessage;
        });
      }
    });
  });
});
