import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';

const saveStateToLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(FEEDBACK_FORM_STATE_KEY, JSON.stringify(state));
}, 500);

const getStateFromLocalStorage = () => {
  const savedState = localStorage.getItem(FEEDBACK_FORM_STATE_KEY);
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
};

form.addEventListener('input', saveStateToLocalStorage);
window.addEventListener('load', getStateFromLocalStorage);
form.addEventListener('submit', e => {
  e.preventDefault();
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(state);
  localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);
  emailInput.value = '';
  messageInput.value = '';
});
