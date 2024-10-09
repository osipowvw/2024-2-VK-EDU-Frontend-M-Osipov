export function createHeader() {
    return `
      <header class="chat-header">
        <div class="header-content">
          <div class="header-avatar">
            <span class="material-icons">account_circle</span>
          </div>
          <div class="header-info">
            <h2 id="user-name">Максим</h2>
            <p>онлайн</p>
          </div>
          <div class="header-actions">
            <button id="switch-user-button" class="action-button">
              <span class="material-icons">swap_horiz</span>
            </button>
            <button class="action-button">
              <span class="material-icons">info</span>
            </button>
            <button class="action-button">
              <span class="material-icons">volume_off</span>
            </button>
          </div>
        </div>
      </header>
    `;
}

export function initHeader(switchUserCallback) {
    const switchUserButton = document.getElementById('switch-user-button');
    switchUserButton.addEventListener('click', switchUserCallback);
}

export function updateUserNameUI(userName) {
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = userName;
}
