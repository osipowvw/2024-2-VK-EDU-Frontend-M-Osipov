import './index.css';
import { initHeader, updateUserNameUI } from './components/Header';
import { initMessageForm } from './components/MessageForm';
import { renderMessages } from './components/Message';
import { formatDate } from './utils/dateUtils';

document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.querySelector('#messages-container');
  const chatListScreen = document.getElementById('chat-list-screen');
  const chatScreen = document.getElementById('chat-screen');
  const chatList = document.getElementById('chat-list');
  const backButton = document.getElementById('back-button');

  const createChatButton = document.getElementById('create-chat-button');
  const createChatModal = document.getElementById('create-chat-modal');
  const createChatConfirmButton = document.getElementById('create-chat-confirm-button');
  const createChatCancelButton = document.getElementById('create-chat-cancel-button');
  const newChatNameInput = document.getElementById('new-chat-name');
  const searchInput = document.getElementById('search-input');

  let chats = JSON.parse(localStorage.getItem('chats')) || [];
  let currentChatId = null;

  initChatList();

  createChatButton.addEventListener('click', () => {
    createChatModal.style.display = 'flex';
  });

  createChatCancelButton.addEventListener('click', () => {
    createChatModal.style.display = 'none';
    newChatNameInput.value = '';
  });

  createChatConfirmButton.addEventListener('click', () => {
    const newChatName = newChatNameInput.value.trim();
    if (newChatName) {
      addNewChat(newChatName);
      createChatModal.style.display = 'none';
      newChatNameInput.value = '';
    }
  });

  function initChatList() {
    chatList.innerHTML = '';
    chats.forEach(chat => addChatToDOM(chat));
  }

  function addChatToDOM(chat) {
    if (document.getElementById(chat.id)) return;

    const chatItem = document.createElement('div');
    chatItem.classList.add('chat-item');
    chatItem.id = chat.id;
    chatItem.innerHTML = `
      <div class="chat-avatar">
        <span class="material-icons">account_circle</span>
      </div>
      <div class="chat-info">
        <h3>${chat.name}</h3>
        <p>${chat.lastMessage || 'Нет сообщений'}</p>
      </div>
      <div class="chat-time">${chat.time || ''}</div>
      <span class="indicator"></span>
    `;

    chatList.appendChild(chatItem);

    chatItem.addEventListener('click', () => {
      currentChatId = chat.id;
      openChat(chat.id, chat.name);
    });
  }

  function openChat(chatId, chatName) {
    currentChatId = chatId;
    chatListScreen.style.display = 'none';
    chatScreen.style.display = 'block';
    
    document.getElementById('user-name').textContent = chatName;
  
    messages = [];
    loadMessages(chatId);
    scrollToBottom(messagesContainer);
  }
  
  function addNewChat(chatName) {
    if (chats.some(chat => chat.name === chatName)) {
      alert('Чат с таким именем уже существует!');
      return;
    }

    const newChatId = `chat-${Date.now()}`;
    const newChat = {
      id: newChatId,
      name: chatName,
      lastMessage: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      currentUser: 'Максим',
    };

    chats.push(newChat);
    localStorage.setItem('chats', JSON.stringify(chats));
    addChatToDOM(newChat);
  }

  function goBackToChatList() {
    chatScreen.style.display = 'none';
    chatListScreen.style.display = 'block';
  }

  function loadMessages(chatId) {
    let messages = JSON.parse(localStorage.getItem(`messages_${chatId}`)) || [];
    renderMessages(messagesContainer, messages, chats.find(chat => chat.id === chatId).currentUser);
  }
  

  function saveMessages(chatId, messages) {
    localStorage.setItem(`messages_${chatId}`, JSON.stringify(messages));
  }

  backButton.addEventListener('click', () => {
    goBackToChatList();
  });

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

  let messages = [];

  initMessageForm(handleSubmit);
  initHeader(switchUser);

  function handleSubmit(messageText) {
    if (!currentChatId) {
      console.error('Текущий чат не установлен');
      return;
    }
  
    const chat = chats.find(chat => chat.id === currentChatId);
    
    if (!chat) {
      console.error('Чат не найден');
      return; 
    }
  
    const message = {
      text: messageText,
      sender: chat.currentUser,
      timestamp: formatDate(new Date()),
    };
  
    messages.push(message);
    saveMessages(currentChatId, messages);
    renderMessages(messagesContainer, messages, message.sender);
  }
  
  function switchUser() {
    const chat = chats.find(chat => chat.id === currentChatId);
    if (chat) {
      chat.currentUser = chat.currentUser === 'Максим' ? chat.name : 'Максим';
      updateUserNameUI(chat.currentUser);

      messages = JSON.parse(localStorage.getItem(`messages_${currentChatId}`)) || [];
      renderMessages(messagesContainer, messages, chat.currentUser);
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }

  searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const chatItems = document.querySelectorAll('.chat-item');

    chatItems.forEach(chat => {
        const chatName = chat.querySelector('h3').textContent.toLowerCase();
        chat.style.display = chatName.includes(searchQuery) ? 'flex' : 'none';
      });
  });
});
