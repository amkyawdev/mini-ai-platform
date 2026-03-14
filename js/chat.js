// Chat.js - Chat Logic
function isEmpty(msg) { return !msg || msg.trim() === ''; }
function isTooLong(msg, max) { return msg.length > max; }

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const message = input.value.trim();
    
    if (!message) return;
    if (isTooLong(message, 5000)) {
        alert('Message too long (max 5000 characters)');
        return;
    }
    
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;
    
    const store = Alpine.store('app');
    const userMsg = { role: 'user', content: message, time: new Date().toISOString() };
    store.messages.push(userMsg);
    scrollToBottom();
    
    // Show typing
    showTyping();
    
    try {
        const response = await callKnowledgeEngine(message);
        removeTyping();
        store.messages.push({ role: 'assistant', content: response, time: new Date().toISOString() });
        store.saveChatHistory();
    } catch (e) {
        removeTyping();
        store.messages.push({ role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', time: new Date().toISOString() });
    }
    
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
    scrollToBottom();
}

function scrollToBottom() {
    setTimeout(() => {
        const container = document.getElementById('chatMessages');
        if (container) container.scrollTop = container.scrollHeight;
    }, 100);
}

function showTyping() {
    const container = document.getElementById('chatMessages');
    if (container) {
        container.insertAdjacentHTML('beforeend', '<div id="typingIndicator"><div class="typing-indicator"><span></span><span></span><span></span></div></div>');
        scrollToBottom();
    }
}

function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

function formatTime(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function newChat() {
    Alpine.store('app').newChat();
    closeSidebarMobile();
}
