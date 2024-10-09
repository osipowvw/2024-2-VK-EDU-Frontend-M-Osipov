export function saveMessageToLocalStorage(message) {
    console.log("Сообщение пришло в save", message);
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    console.log(messages)
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
    console.log(localStorage.getItem('messages'));
}

export function loadMessagesFromLocalStorage() {
    console.log("Функция loadMessagesFromLocalStorage вызывается");
    return JSON.parse(localStorage.getItem('messages')) || [];
}
