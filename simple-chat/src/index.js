import './index.css';
import { initHeader, updateUserNameUI } from './components/Header';
import { initMessageForm } from './components/MessageForm';
import { renderMessages } from './components/Message';
import { formatDate } from './utils/dateUtils';
import { saveMessageToLocalStorage, loadMessagesFromLocalStorage } from './utils/storageUtils';

document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.querySelector('#messages-container');

  let currentUser = 'Максим';
  let messages = loadMessagesFromLocalStorage();
  console.log('Loaded messages:', messages); // Для отладки

  // Проверка на случай, если сообщения не были загружены
  if (!Array.isArray(messages)) {
    console.error('Messages is not an array:', messages);
    messages = [];
  }

  // Отображаем сообщения при загрузке
  renderMessages(messagesContainer, messages, currentUser);

  // Инициализация компонентов
  initMessageForm(handleSubmit);
  initHeader(switchUser); // Убедитесь, что initHeader не добавляет лишние слушатели событий

  function handleSubmit(messageText) {
    const message = {
      text: messageText,
      sender: currentUser,
      timestamp: formatDate(new Date()),
    };

    messages.push(message); // Добавляем сообщение в массив
    console.log('Messages after adding:', messages);

    saveMessageToLocalStorage(messages); // Сохраняем весь массив сообщений

    // Перерисовываем сообщения после добавления нового
    renderMessages(messagesContainer, messages, currentUser);
  }

  function switchUser() {
    // Смена текущего пользователя
    currentUser = currentUser === 'Дженнифер' ? 'Максим' : 'Дженнифер';
    updateUserNameUI(currentUser);

    console.log('Current User:', currentUser);
    console.log('Messages before switching user:', messages);

    // Загружаем сообщения из localStorage, если они были изменены
    messages = loadMessagesFromLocalStorage();
    renderMessages(messagesContainer, messages, currentUser);
  }
});
