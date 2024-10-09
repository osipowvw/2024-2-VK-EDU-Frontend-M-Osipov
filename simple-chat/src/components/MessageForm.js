export function initMessageForm(submitCallback) {
  const form = document.querySelector('#message-form');
  const input = document.querySelector('.form-input');
  form.addEventListener('submit', (event) => {
      event.preventDefault();
      const messageText = input.value.trim();
      if (messageText) {
          submitCallback(messageText);
          input.value = '';
      }
  });
}
