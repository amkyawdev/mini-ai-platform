// Chat.js - Chat Logic
async function sendMessage(){
    var i=document.getElementById("chatInput"),s=document.getElementById("sendBtn"),m=i.value.trim();
    if(!m)return; i.value="";i.disabled=true;s.disabled=true;
    var store=Alpine.store("app");
    store.messages.push({role:"user",content:m,time:new Date().toISOString()});
    showTyping();
    try{var r=await callAI(m);removeTyping();store.messages.push({role:"assistant",content:r,time:new Date().toISOString()});store.saveChatHistory();}
    catch(e){removeTyping();store.messages.push({role:"assistant",content:"Error occurred",time:new Date().toISOString()});}
    i.disabled=false;s.disabled=false;i.focus();scrollToBottom();
}
function showTyping(){var c=document.getElementById("chatMessages");if(c){c.insertAdjacentHTML("beforeend",'<div id="typing"><div class="typing-indicator"><span></span><span></span><span></span></div></div>');scrollToBottom();}}
function removeTyping(){var t=document.getElementById("typing");if(t)t.remove();}
function scrollToBottom(){setTimeout(function(){var c=document.getElementById("chatMessages");if(c)c.scrollTop=c.scrollHeight;},100);}
function newChat(){Alpine.store("app").newChat();}
