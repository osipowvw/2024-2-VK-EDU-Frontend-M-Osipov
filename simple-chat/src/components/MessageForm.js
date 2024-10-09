export function createMessageForm() {
    console.log("Функция createMessageForm вызывается");
    return `
      <form class="message-form" id="message-form">
        <input class="form-input" name="message-text" placeholder="Введите сообщение" type="text" required>
        <button type="submit" class="send-button">
          <span class="material-icons">send</span>
        </button>
      </form>
    `;
  }
  
  export function initMessageForm(submitCallback) {
    const form = document.getElementById('message-form');
    const input = document.querySelector('.form-input');
    console.log("Инициализация формы сообщения");
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const messageText = input.value.trim();
      if (messageText) {
        console.log("Отправка сообщения:", messageText);
        submitCallback(messageText);
        input.value = '';
      }
    });
  }
  