document.addEventListener('DOMContentLoaded', () => {
  const positiveBtn = document.querySelector('.main-profile__scores-score-positive');
  const negativeBtn = document.querySelector('.main-profile__scores-score-negative');
  const userName = document.querySelector('.main-profile__name');
  const positiveScore = document.querySelector('.main-profile__scores-positive');
  const negativeScore = document.querySelector('.main-profile__scores-negative');
  const summScore = document.querySelector('.main-profile__scores-summ');

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
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setScrores(response.positive, response.negative);
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
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setScrores(response.positive, response.negative);
      });
  });

  async function updateScores() {
    const name = userName.innerHTML;

    await fetch('/api/scores', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: name }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setScrores(response.positive, response.negative);
      });
  }

  updateScores();

  function setScrores(positive, negative) {
    positiveScore.innerHTML = positive;
    negativeScore.innerHTML = negative;
    summScore.innerHTML = positive - negative;
  }
});
