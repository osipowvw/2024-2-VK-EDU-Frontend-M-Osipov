(()=>{"use strict";function e(e,t,n){e.innerHTML="",console.log("Rendering messages for user:",n),t.forEach((function(t){!function(e,t,n){var a=function(e,t){var n=document.createElement("div");n.classList.add("message",t?"user-b":"user-a");var a=document.createElement("strong");a.textContent=e.sender,a.classList.add("message-sender"),n.appendChild(a);var c=document.createElement("div");c.textContent=e.text,n.appendChild(c);var r=document.createElement("span");return r.classList.add("message-time"),r.textContent=e.timestamp,n.appendChild(r),n}(t,t.sender===n);e.appendChild(a),e.scrollTop=e.scrollHeight}(e,t,n)}))}document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector("#messages-container"),n=document.getElementById("chat-list-screen"),a=document.getElementById("chat-screen"),c=document.getElementById("chat-list"),r=document.getElementById("back-button"),s=document.getElementById("create-chat-button"),o=document.getElementById("create-chat-modal"),i=document.getElementById("create-chat-confirm-button"),d=document.getElementById("create-chat-cancel-button"),l=document.getElementById("new-chat-name"),u=document.getElementById("search-input"),m=JSON.parse(localStorage.getItem("chats"))||[],g=null;function f(r){if(!document.getElementById(r.id)){var s=document.createElement("div");s.classList.add("chat-item"),s.id=r.id,s.innerHTML='\n      <div class="chat-avatar">\n        <span class="material-icons">account_circle</span>\n      </div>\n      <div class="chat-info">\n        <h3>'.concat(r.name,"</h3>\n        <p>").concat(r.lastMessage||"Нет сообщений",'</p>\n      </div>\n      <div class="chat-time">').concat(r.time||"",'</div>\n      <span class="indicator"></span>\n    '),c.appendChild(s),s.addEventListener("click",(function(){var c,s,o;g=r.id,c=r.id,s=r.name,g=c,n.style.display="none",a.style.display="block",document.getElementById("user-name").textContent=s,E=[],function(n){var a=JSON.parse(localStorage.getItem("messages_".concat(n)))||[];e(t,a,m.find((function(e){return e.id===n})).currentUser)}(c),(o=t).scrollTop=o.scrollHeight}))}}c.innerHTML="",m.forEach((function(e){return f(e)})),s.addEventListener("click",(function(){o.style.display="flex"})),d.addEventListener("click",(function(){o.style.display="none",l.value=""})),i.addEventListener("click",(function(){var e=l.value.trim();e&&(function(e){if(m.some((function(t){return t.name===e})))alert("Чат с таким именем уже существует!");else{var t={id:"chat-".concat(Date.now()),name:e,lastMessage:"",time:(new Date).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),currentUser:"Максим"};m.push(t),localStorage.setItem("chats",JSON.stringify(m)),f(t)}}(e),o.style.display="none",l.value="")})),r.addEventListener("click",(function(){a.style.display="none",n.style.display="block"}));var v,p,y,h,E=[];v=function(n){if(g){var a=m.find((function(e){return e.id===g}));if(a){var c,r,s,o,i,d={text:n,sender:a.currentUser,timestamp:(c=new Date,r=String(c.getDate()).padStart(2,"0"),s=String(c.getMonth()+1).padStart(2,"0"),o=String(c.getHours()).padStart(2,"0"),i=String(c.getMinutes()).padStart(2,"0"),"".concat(r,".").concat(s," ").concat(o,":").concat(i))};E.push(d),function(e,t){localStorage.setItem("messages_".concat(e),JSON.stringify(t))}(g,E),e(t,E,d.sender)}else console.error("Чат не найден")}else console.error("Текущий чат не установлен")},p=document.querySelector("#message-form"),y=document.querySelector(".form-input"),p.addEventListener("submit",(function(e){e.preventDefault();var t=y.value.trim();t&&(v(t),y.value="")})),h=function(){var n,a=m.find((function(e){return e.id===g}));a&&(a.currentUser="Максим"===a.currentUser?a.name:"Максим",n=a.currentUser,document.getElementById("user-name").textContent=n,E=JSON.parse(localStorage.getItem("messages_".concat(g)))||[],e(t,E,a.currentUser),localStorage.setItem("chats",JSON.stringify(m)))},document.getElementById("switch-user-button").addEventListener("click",h),u.addEventListener("input",(function(){var e=u.value.toLowerCase().trim();document.querySelectorAll(".chat-item").forEach((function(t){var n=t.querySelector("h3").textContent.toLowerCase();t.style.display=n.includes(e)?"flex":"none"}))}))}))})();