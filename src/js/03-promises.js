import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

iziToast.settings({
  position: "topRight",
  transitionIn: "flipInX",
  transitionOut: "flipOutX",
  icon: "",
});

const handleSubmit = (event) => {
  event.preventDefault();

  const elements = event.target.elements;

  let delay = Number(elements.delay.value);

  const step = Number(elements.step.value);
  const amount = Number(elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => iziToast.success({
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
      }))
      .catch(({ position, delay }) => iziToast.error({
        message: `❌ Rejected promise ${position} in ${delay}ms`,
      }));

    delay += step;
  }
}

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const response = { position, delay };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(response);
      } else {
        reject(response);
      }
    }, delay);
  });
}
