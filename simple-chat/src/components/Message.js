export function addMessage(messagesContainer, message, currentUser) {
    const isCurrentUser = message.sender === currentUser;
    const messageElement = createMessage(message, isCurrentUser);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

export function renderMessages(container, messages, currentUser) {
    container.innerHTML = '';
    console.log('Rendering messages for user:', currentUser);
    messages.forEach((message) => {
        addMessage(container, message, currentUser);
    });
}

export function createMessage(message, isCurrentUser) {
    const div = document.createElement('div');
    div.classList.add('message', isCurrentUser ? 'user-b' : 'user-a');

    // Создаем блок для имени пользователя
    const strong = document.createElement('strong');
    strong.textContent = message.sender;
    strong.classList.add('message-sender'); // Добавляем класс для стилизации
    div.appendChild(strong);

    // Создаем блок для сообщения
    const messageText = document.createElement('div');
    messageText.textContent = message.text;
    div.appendChild(messageText);

    // Создаем блок для времени
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('message-time');
    timeSpan.textContent = message.timestamp;
    div.appendChild(timeSpan);

    return div;
}
