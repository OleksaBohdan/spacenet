document.addEventListener('DOMContentLoaded', () => {
  const credentialForm = document.querySelector('.credential-form');
  const profileBtn = document.querySelector('.btn_submit_profile');

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
});
