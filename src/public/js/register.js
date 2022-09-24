const div = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

document.addEventListener('DOMContentLoaded', () => {
  console.log('register');
  const submit = document.querySelector('#btn_submit');
  const registerForm = document.querySelector('#registerForm');
  const info = document.querySelector('#require__info');
  const spinner = document.querySelector('#spinner');

  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('username:', registerForm.userName.value);
    console.log('email:', registerForm.email.value);
    console.log('password:', registerForm.password.value);

    if (registerForm.userName.value == '' || registerForm.email.value == '' || registerForm.password.value == '') {
      console.log('some form empty');
      info.classList.remove('success');
      info.innerHTML = 'ERROR: Some fields are empty!';
      return;
    }

    info.innerHTML = div;

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
      setTimeout(() => {
        console.log(res.status);
        info.classList.add('success');
        info.innerHTML = 'Account succesfully created!';
      }, 2000);
    });
  });
});
