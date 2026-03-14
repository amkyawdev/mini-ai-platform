// Main.js - Global Alpine.js Store
document.addEventListener('alpine:init', () => {
    Alpine.store('app', {
        sidebarOpen: window.innerWidth > 768,
        messages: [],
        chatHistory: [],
        newMessage: '',
        uploadedFiles: [],
        config: null,
        
        async init() {
            this.loadConfig();
            this.loadChatHistory();
            window.addEventListener('resize', () => {
                this.sidebarOpen = window.innerWidth > 768;
            });
        },
        
        async loadConfig() {
            try {
                const res = await fetch('data/config.json');
                this.config = await res.json();
            } catch(e) { this.config = {}; }
        },
        
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        
        newChat() {
            this.messages = [];
            this.newMessage = '';
        },
        
        loadChat(index) {
            if (this.chatHistory[index]) {
                this.messages = [...this.chatHistory[index].messages];
            }
        },
        
        saveChatHistory() {
            if (this.messages.length > 0) {
                const title = this.messages[0]?.content?.substring(0, 30) || 'New Chat';
                const existing = this.chatHistory.findIndex(h => h.title === title);
                if (existing >= 0) {
                    this.chatHistory[existing].messages = [...this.messages];
                } else {
                    this.chatHistory.unshift({ title, messages: [...this.messages] });
                }
                localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
            }
        },
        
        loadChatHistory() {
            const saved = localStorage.getItem('chatHistory');
            if (saved) this.chatHistory = JSON.parse(saved);
        },
        
        openSettings() {
            document.getElementById('settingsModal').classList.add('show');
        },
        
        closeSettings() {
            document.getElementById('settingsModal').classList.remove('show');
        },
        
        saveSettings(settings) {
            localStorage.setItem('settings', JSON.stringify(settings));
            this.closeSettings();
        },
        
        loadSettings() {
            const saved = localStorage.getItem('settings');
            return saved ? JSON.parse(saved) : { aiName: 'AmkyawDev Chat Bot', apiKey: '' };
        }
    });
});
