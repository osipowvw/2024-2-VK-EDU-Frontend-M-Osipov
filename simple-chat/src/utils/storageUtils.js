export function saveMessageToLocalStorage(messages) {
    localStorage.setItem('messages', JSON.stringify(messages)); // Сохраняем весь массив в localStorage
}

export function loadMessagesFromLocalStorage() {
    const messages = localStorage.getItem('messages');
    return messages ? JSON.parse(messages) : []; // Возвращаем массив сообщений или пустой массив, если сообщений нет
}
