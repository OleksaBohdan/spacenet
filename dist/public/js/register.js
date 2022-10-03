// Yes, I know, this code is very very simple:) because i tested backend

const { redirect } = require('../../../src/routes/register/registerRouter');

const spinner = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

document.addEventListener('DOMContentLoaded', () => {
  const submit = document.querySelector('#btn_submit');
  const registerForm = document.querySelector('#registerForm');
  const info = document.querySelector('#require__info');

  submit.addEventListener('click', async (e) => {
    e.preventDefault();

    function removeClasses() {
      info.classList.remove('success');
      info.classList.remove('warning');
    }
    if (registerForm.userName.value == '' || registerForm.email.value == '' || registerForm.password.value == '') {
      removeClasses();
      info.innerHTML = 'ERROR: Some fields are empty!';
      return;
    }

    if (registerForm.userName.value.length < 3) {
      removeClasses();
      info.innerHTML = `ERROR: Username to short`;
      return;
    }

    if (!EMAIL_REGEXP.test(registerForm.email.value)) {
      removeClasses();
      info.innerHTML = `ERROR: wrong email: ${registerForm.email.value}`;
      return;
    }

    if (registerForm.password.value.length < 3) {
      removeClasses();
      info.innerHTML = `ERROR: Password must have more than 4 symbols`;
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
        info.classList.remove('error');
        info.classList.add('success');
        info.innerHTML = 'Account succesfully created!';
        registerForm.userName.value = '';
        registerForm.email.value = '';
        registerForm.password.value = '';
        console.log('/login redirect');

        async function login() {
          console.log('/login redirect');
          await fetch('/login', {
            method: fetch,
          });
        }

        login();
        return;
      }

      if (res.status == 409) {
        res.json().then((res) => {
          let user = res[Object.keys(res)[0]];
          info.classList.remove('error');
          info.classList.remove('success');
          info.classList.add('warning');
          info.innerHTML = `User: ${user} already registered`;
          return;
        });
      }

      if (res.status == 520) {
        info.classList.remove('success');
        info.classList.remove('warning');
        info.classList.add('error');
        info.innerHTML = `ERROR: Unknown error ${res.status}`;
        return;
      }
    });
  });
});
