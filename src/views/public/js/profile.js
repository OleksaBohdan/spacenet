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
      body: name,
    });
  });

  negativeBtn.addEventListener('click', async (e) => {
    console.log('negative');
  });
});
