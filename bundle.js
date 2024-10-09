(()=>{"use strict";function e(e,t,n){var a=function(e,t){console.log("Функция createMessage вызывается");var n=document.createElement("div");n.classList.add("message",t?"user-b":"user-a");var a=document.createElement("strong");a.textContent="".concat(e.sender,": "),n.appendChild(a);var s=document.createTextNode(e.text);n.appendChild(s);var o=document.createElement("span");return o.classList.add("message-time"),o.textContent=e.timestamp,n.appendChild(o),console.log("Вызов createMessage"),n}(t,t.sender===n);e.appendChild(a),e.scrollTop=e.scrollHeight,console.log("Вызов addMessage")}function t(t,n,a){t.innerHTML="",n.forEach((function(n){e(t,n,a)})),console.log("Вызов renderMessages")}function n(e){console.log("Функция formatDate вызывается");var t=String(e.getDate()).padStart(2,"0"),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getHours()).padStart(2,"0"),s=String(e.getMinutes()).padStart(2,"0");return"".concat(t,".").concat(n," ").concat(a,":").concat(s)}document.addEventListener("DOMContentLoaded",(function(){var a=document.createElement("div");a.classList.add("chat-container"),a.innerHTML+='\n      <header class="chat-header">\n        <div class="header-content">\n          <div class="header-avatar">\n            <span class="material-icons">account_circle</span>\n          </div>\n          <div class="header-info">\n            <h2 id="user-name">Максим</h2>\n            <p>онлайн</p>\n          </div>\n          <div class="header-actions">\n            <button id="switch-user-button" class="action-button">\n              <span class="material-icons">swap_horiz</span>\n            </button>\n            <button class="action-button">\n              <span class="material-icons">info</span>\n            </button>\n            <button class="action-button">\n              <span class="material-icons">volume_off</span>\n            </button>\n          </div>\n        </div>\n      </header>\n    ';var s=document.createElement("div");s.classList.add("messages-container"),s.id="messages-container",a.appendChild(s),a.innerHTML+=(console.log("Функция createMessageForm вызывается"),'\n      <form class="message-form" id="message-form">\n        <input class="form-input" name="message-text" placeholder="Введите сообщение" type="text" required>\n        <button type="submit" class="send-button">\n          <span class="material-icons">send</span>\n        </button>\n      </form>\n    '),document.body.appendChild(a);var o,c,r,l,i="Максим",d=(console.log("Функция loadMessagesFromLocalStorage вызывается"),JSON.parse(localStorage.getItem("messages"))||[]);console.log("Здесь выводятся сообщения",d),o=function(t){console.log("Функция handleSubmit вызывается");var a={text:t,sender:i,timestamp:n(new Date)};console.log(a),d.push(a),function(e){console.log("Сообщение пришло в save",e);var t=JSON.parse(localStorage.getItem("messages"))||[];console.log(t),t.push(e),localStorage.setItem("messages",JSON.stringify(t)),console.log(localStorage.getItem("messages"))}(a),e(s,a,i)},c=document.getElementById("message-form"),r=document.querySelector(".form-input"),console.log("Инициализация формы сообщения"),c.addEventListener("submit",(function(e){e.preventDefault();var t=r.value.trim();t&&(console.log("Отправка сообщения:",t),o(t),r.value="")})),l=function(){var e;e=i="Дженнифер"===i?"Максим":"Дженнифер",document.getElementById("user-name").textContent=e,t(s,d,i)},document.getElementById("switch-user-button").addEventListener("click",l),t(s,d,i)}))})();