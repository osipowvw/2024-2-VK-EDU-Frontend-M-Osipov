export function initHeader(switchUserCallback) {
    const switchUserButton = document.getElementById('switch-user-button');
    switchUserButton.addEventListener('click', switchUserCallback);
}

export function updateUserNameUI(userName) {
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = userName;
}
