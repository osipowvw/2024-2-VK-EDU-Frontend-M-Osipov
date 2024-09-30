import './index.css';
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#message-form');
    const input = document.querySelector('.form-input');
    const messagesContainer = document.getElementById('messages-container');

    // Load messages from localStorage
    loadMessages();

    form.addEventListener('submit', handleSubmit);
    input.addEventListener('keypress', handleKeyPress);

    function handleSubmit(event) {
        event.preventDefault();
        const messageText = input.value.trim();
        if (messageText) {
            const message = {
                text: messageText,
                sender: 'Вы', // Add sender's name here
                timestamp: new Date().toLocaleString()
            };
            addMessage(message);
            saveMessageToLocalStorage(message);
            input.value = ''; // Clear the input field
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
        messageElement.innerHTML = `
            <strong>${message.sender}</strong> (${message.timestamp}): ${message.text}
        `;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
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
});
