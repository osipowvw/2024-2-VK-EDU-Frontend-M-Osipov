import './index.css';
import { createHeader, initHeader, updateUserNameUI } from './components/Header';
import { createMessageForm, initMessageForm } from './components/MessageForm';
import { renderMessages, addMessage } from './components/Message';
import { formatDate } from './utils/dateUtils';
import { saveMessageToLocalStorage, loadMessagesFromLocalStorage } from './utils/storageUtils';

document.addEventListener('DOMContentLoaded', () => {
  const chatContainer = document.createElement('div');
  chatContainer.classList.add('chat-container');

  chatContainer.innerHTML += createHeader();

  const messagesContainer = document.createElement('div');
  messagesContainer.classList.add('messages-container');
  messagesContainer.id = 'messages-container';
  chatContainer.appendChild(messagesContainer);

  chatContainer.innerHTML += createMessageForm();

  document.body.appendChild(chatContainer);

  let currentUser = 'Максим';
  let messages = loadMessagesFromLocalStorage();
  console.log("Здесь выводятся сообщения", messages);

  initMessageForm(handleSubmit);
  initHeader(switchUser);
  renderMessages(messagesContainer, messages, currentUser);

  function handleSubmit(messageText) {
    console.log("Функция handleSubmit вызывается");
    const message = {
        text: messageText,
        sender: currentUser,
        timestamp: formatDate(new Date())
    };
    console.log(message);
    messages.push(message);
    saveMessageToLocalStorage(message);
    addMessage(messagesContainer, message, currentUser);
}

  function switchUser() {
    currentUser = currentUser === 'Дженнифер' ? 'Максим' : 'Дженнифер';
    updateUserNameUI(currentUser);
    renderMessages(messagesContainer, messages, currentUser);
  }
});
