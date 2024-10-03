import './index.css';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#message-form');
    const input = document.querySelector('.form-input');
    const messagesContainer = document.getElementById('messages-container');
    const switchUserButton = document.getElementById('switch-user-button');
    const userNameElement = document.getElementById('user-name');

    let currentUser = 'Максим';

    loadMessages();

    form.addEventListener('submit', handleSubmit);
    input.addEventListener('keypress', handleKeyPress);
    switchUserButton.addEventListener('click', switchUser);

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}.${month} ${hours}:${minutes}`;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const messageText = input.value.trim();
        if (messageText) {
            const message = {
                text: messageText,
                sender: currentUser,
                timestamp: formatDate(new Date())
            };
            addMessage(message);
            saveMessageToLocalStorage(message);
            input.value = '';
        }
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    }

    function addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        if (message.sender === currentUser) {
            messageElement.classList.add('user-b');
        } else {
            messageElement.classList.add('user-a');
        }

        messageElement.innerHTML = `
            <strong>${message.sender}</strong>: ${message.text}
            <span class="message-time">${message.timestamp}</span>
        `;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function saveMessageToLocalStorage(message) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function loadMessages() {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(addMessage);
    }

    function switchUser() {
        currentUser = currentUser === 'Дженнифер' ? 'Максим' : 'Дженнифер';
        updateUserNameUI();
        updateMessagesUI();
    }

    function updateUserNameUI() {
        userNameElement.textContent = currentUser;
    }

    function updateMessagesUI() {
        messagesContainer.innerHTML = '';
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(message => {
            const isCurrentUser = message.sender === currentUser;
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', isCurrentUser ? 'user-b' : 'user-a');
            messageElement.innerHTML = `
                <strong>${message.sender}</strong>: ${message.text}
                <span class="message-time">${message.timestamp}</span>
            `;
            messagesContainer.appendChild(messageElement);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    updateUserNameUI();
});
