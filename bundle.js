(()=>{"use strict";function e(e,t,n){e.innerHTML="",console.log("Rendering messages for user:",n),t.forEach((function(t){!function(e,t,n){var r=function(e,t){var n=document.createElement("div");n.classList.add("message",t?"user-b":"user-a");var r=document.createElement("strong");r.textContent="".concat(e.sender,": "),n.appendChild(r);var a=document.createTextNode(e.text);n.appendChild(a);var s=document.createElement("span");return s.classList.add("message-time"),s.textContent=e.timestamp,n.appendChild(s),n}(t,t.sender===n);e.appendChild(r),e.scrollTop=e.scrollHeight}(e,t,n)}))}function t(){var e=localStorage.getItem("messages");return e?JSON.parse(e):[]}document.addEventListener("DOMContentLoaded",(function(){var n,r,a,s,o=document.querySelector("#messages-container"),c="Максим",d=t();console.log("Loaded messages:",d),Array.isArray(d)||(console.error("Messages is not an array:",d),d=[]),e(o,d,c),n=function(t){var n,r,a,s,i,u={text:t,sender:c,timestamp:(n=new Date,r=String(n.getDate()).padStart(2,"0"),a=String(n.getMonth()+1).padStart(2,"0"),s=String(n.getHours()).padStart(2,"0"),i=String(n.getMinutes()).padStart(2,"0"),"".concat(r,".").concat(a," ").concat(s,":").concat(i))};d.push(u),console.log("Messages after adding:",d),function(e){localStorage.setItem("messages",JSON.stringify(e))}(d),e(o,d,c)},r=document.querySelector("#message-form"),a=document.querySelector(".form-input"),r.addEventListener("submit",(function(e){e.preventDefault();var t=a.value.trim();t&&(n(t),a.value="")})),s=function(){var n;n=c="Дженнифер"===c?"Максим":"Дженнифер",document.getElementById("user-name").textContent=n,console.log("Current User:",c),console.log("Messages before switching user:",d),d=t(),e(o,d,c)},document.getElementById("switch-user-button").addEventListener("click",s)}))})();