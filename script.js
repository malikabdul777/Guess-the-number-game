'use strict';

let score = 5;
let highScore =
  localStorage.getItem('Guess-number-HS') === null
    ? 0
    : JSON.parse(localStorage.getItem('Guess-number-HS'));
// console.log(highScore);
let secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.highscore').textContent = highScore;

const checkBtn = document.querySelector('.check');
const userInp = document.querySelector('.guess');

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.score').textContent = '5';
  score = 5;
});

checkBtn.addEventListener('click', function () {
  const guess = Number(userInp.value);
  if (!guess) {
    displayMessage('⛔ wrong number');
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage('🎉 Correct number');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    userInp.blur();

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = score;
      // console.log(highScore);
      localStorage.setItem('Guess-number-HS', JSON.stringify(highScore));
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High!' : '📉 Too Low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.score').textContent = 0;
      displayMessage('🤯 You Lost the Game');
    }
  }
});

document.querySelector('.ResetHigh').addEventListener('click', function () {
  localStorage.removeItem('Guess-number-HS');
  location.reload();
});

userInp.addEventListener('keydown', e => {
  // console.log(e);
  if (e.key === 'Enter') {
    checkBtn.click();
  }
});
