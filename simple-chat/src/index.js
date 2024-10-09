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
  console.log('Loaded messages:', messages);

  if (!Array.isArray(messages)) {
    console.error('Messages is not an array:', messages);
    messages = [];
  }

  renderMessages(messagesContainer, messages, currentUser);

  initMessageForm(handleSubmit);
  initHeader(switchUser);

  function handleSubmit(messageText) {
    const message = {
      text: messageText,
      sender: currentUser,
      timestamp: formatDate(new Date()),
    };

    messages.push(message);
    console.log('Messages after adding:', messages);

    saveMessageToLocalStorage(messages);

    renderMessages(messagesContainer, messages, currentUser);
  }

  function switchUser() {
    currentUser = currentUser === 'Дженнифер' ? 'Максим' : 'Дженнифер';
    updateUserNameUI(currentUser);

    console.log('Current User:', currentUser);
    console.log('Messages before switching user:', messages);

    messages = loadMessagesFromLocalStorage();
    renderMessages(messagesContainer, messages, currentUser);
  }
});
