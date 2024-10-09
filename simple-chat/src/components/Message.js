export function addMessage(messagesContainer, message, currentUser) {
    const isCurrentUser = message.sender === currentUser;
    const messageElement = createMessage(message, isCurrentUser);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Прокрутка вниз
}

export function renderMessages(container, messages, currentUser) {
    container.innerHTML = ''; // Очищаем контейнер перед рендерингом
    console.log('Rendering messages for user:', currentUser); // Для отладки
    messages.forEach((message) => {
        addMessage(container, message, currentUser);
    });
}

export function createMessage(message, isCurrentUser) {
    const div = document.createElement('div');
    div.classList.add('message', isCurrentUser ? 'user-b' : 'user-a');

    const strong = document.createElement('strong');
    strong.textContent = `${message.sender}: `;
    div.appendChild(strong);

    const textNode = document.createTextNode(message.text);
    div.appendChild(textNode);

    const timeSpan = document.createElement('span');
    timeSpan.classList.add('message-time');
    timeSpan.textContent = message.timestamp;
    div.appendChild(timeSpan);

    return div;
}
