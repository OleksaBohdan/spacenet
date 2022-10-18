document.addEventListener('DOMContentLoaded', () => {
  const positiveBtn = document.querySelector('.main-profile__scores-score-positive');
  const negativeBtn = document.querySelector('.main-profile__scores-score-negative');
  const userName = document.querySelector('.main-profile__name');

  positiveBtn.addEventListener('click', async (e) => {
    const name = userName.innerHTML;
    console.log('positive', name);
    userName.outerHTML;

    await fetch('/api/positive', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: name }),
    });
  });

  negativeBtn.addEventListener('click', async (e) => {
    const name = userName.innerHTML;
    console.log('negative', name);
    userName.outerHTML;

    await fetch('/api/negative', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: name }),
    });
  });
});
