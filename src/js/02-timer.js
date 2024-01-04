import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const DEFAULT_TIME = '00';

const startBtn = document.querySelector('[data-start]');
const dateTimeInput = document.getElementById('datetime-picker');

startBtn.disabled = true;

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const onClose = (selectedDates) => {
  const selectedTime = selectedDates[0].getTime();
  const currentTime = new Date().getTime();

  if (currentTime > selectedTime) {
    iziToast.error({
      message: "Please choose a date in the future",
      position: "topRight",
    });

    return;
  }

  startBtn.disabled = false;
  finishedTimerAt = selectedTime;
}

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
});

let finishedTimerAt = 0;
let timerId = null;

const startTimer = () => {
  dateTimeInput.disabled = true;
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date().getTime();

    const timeDiff = finishedTimerAt - currentTime;

    if (0 > timeDiff) {
      resetTimer();

      return;
    }

    const {
      days: daysValue,
      hours: hoursValue,
      minutes: minutesValue,
      seconds: secondsValue,
    } = convertMs(timeDiff);

    days.textContent = addLeadingZero(daysValue);
    hours.textContent = addLeadingZero(hoursValue);
    minutes.textContent = addLeadingZero(minutesValue);
    seconds.textContent = addLeadingZero(secondsValue);
  }, 1000);
}

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = (value) => {
  return value.toString().padStart(2, "0");
}

const resetTimer = () => {
  clearInterval(timerId);

  dateTimeInput.disabled = false;

  days.textContent = DEFAULT_TIME;
  hours.textContent = DEFAULT_TIME;
  minutes.textContent = DEFAULT_TIME;
  seconds.textContent = DEFAULT_TIME;
}

startBtn.addEventListener('click', startTimer);
