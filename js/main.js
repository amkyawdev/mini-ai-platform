// Main.js - Alpine.js Store
document.addEventListener('alpine:init', () => {
    Alpine.store('app', {
        sidebarOpen: window.innerWidth > 768,
        asideOpen: false,
        messages: [],
        chatHistory: [],
        config: null,
        
        init() {
            this.loadConfig();
            this.loadChatHistory();
            window.addEventListener('resize', () => {
                this.sidebarOpen = window.innerWidth > 768;
            });
        },
        
        loadConfig() {
            fetch('data/config.json').then(r=>r.json()).then(c=>this.config=c).catch(()=>{});
        },
        
        toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; },
        toggleAside() { this.asideOpen = !this.asideOpen; },
        
        newChat() { this.messages = []; },
        
        loadChat(index) {
            if(this.chatHistory[index]) {
                this.messages = [...this.chatHistory[index].messages];
            }
        },
        
        saveChatHistory() {
            if(this.messages.length > 0) {
                const title = this.messages[0].content.substring(0, 30) || 'New Chat';
                this.chatHistory.unshift({ title, messages: [...this.messages] });
                localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
            }
        },
        
        loadChatHistory() {
            const s = localStorage.getItem('chatHistory');
            if(s) this.chatHistory = JSON.parse(s);
        },
        
        loadSettings() {
            const s = localStorage.getItem('settings');
            return s ? JSON.parse(s) : { aiName: 'Chat', theme: 'dark', apiKey: '' };
        }
    });
});
