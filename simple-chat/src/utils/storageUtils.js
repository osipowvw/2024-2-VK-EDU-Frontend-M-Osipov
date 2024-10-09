export function saveMessageToLocalStorage(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
}

export function loadMessagesFromLocalStorage() {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : [];
}
