export function createMessage(message, isCurrentUser) {
    console.log("Функция createMessage вызывается");
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

    console.log("Вызов createMessage")
    return div;
}


export function addMessage(messagesContainer, message, currentUser) {
    const isCurrentUser = message.sender === currentUser;
    const messageElement = createMessage(message, isCurrentUser);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    console.log("Вызов addMessage");
}

export function renderMessages(messagesContainer, messages, currentUser) {
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
        addMessage(messagesContainer, message, currentUser);
    });
    console.log("Вызов renderMessages");
}
