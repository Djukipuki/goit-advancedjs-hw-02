const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let changeBackgroundId = null;

startBtn.disabled = false;
stopBtn.disabled = true;

const switchButtonState = () => {
  startBtn.disabled = !startBtn.disabled;
  stopBtn.disabled = !stopBtn.disabled;
}

const handleStart = () => {
  changeBackgroundId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  switchButtonState();
}

const handleStop = () => {
  clearInterval(changeBackgroundId);

  switchButtonState();
}

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
