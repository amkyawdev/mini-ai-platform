// Mini AI Platform - Memory Module
// Handles localStorage for chat history and user preferences

const Memory = {
    // Storage keys
    CHAT_HISTORY_KEY: 'mini_ai_chat_history',
    CURRENT_CHAT_KEY: 'mini_ai_current_chat',
    USER_PREFERENCES_KEY: 'mini_ai_preferences',
    
    /**
     * Get all chat history
     * @returns {array}
     */
    getChatHistory() {
        const history = localStorage.getItem(this.CHAT_HISTORY_KEY);
        if (history) {
            try {
                return JSON.parse(history);
            } catch (e) {
                return [];
            }
        }
        return [];
    },
    
    /**
     * Save chat history
     * @param {array} history 
     */
    saveChatHistory(history) {
        // Keep only the last N chats
        const limited = history.slice(-CONFIG.UI.CHAT_HISTORY_LIMIT);
        localStorage.setItem(this.CHAT_HISTORY_KEY, JSON.stringify(limited));
    },
    
    /**
     * Create a new chat
     * @param {string} title - Chat title
     * @returns {object}
     */
    createChat(title = 'New Chat') {
        const chat = {
            id: this.generateId(),
            title: title,
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        const history = this.getChatHistory();
        history.push(chat);
        this.saveChatHistory(history);
        
        return chat;
    },
    
    /**
     * Get a specific chat by ID
     * @param {string} chatId 
     * @returns {object|null}
     */
    getChat(chatId) {
        const history = this.getChatHistory();
        return history.find(chat => chat.id === chatId) || null;
    },
    
    /**
     * Update a chat
     * @param {string} chatId 
     * @param {object} updates 
     */
    updateChat(chatId, updates) {
        const history = this.getChatHistory();
        const index = history.findIndex(chat => chat.id === chatId);
        
        if (index !== -1) {
            history[index] = {
                ...history[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveChatHistory(history);
        }
    },
    
    /**
     * Delete a chat
     * @param {string} chatId 
     */
    deleteChat(chatId) {
        const history = this.getChatHistory();
        const filtered = history.filter(chat => chat.id !== chatId);
        this.saveChatHistory(filtered);
        
        // Clear current chat if it was deleted
        const currentChat = this.getCurrentChat();
        if (currentChat && currentChat.id === chatId) {
            localStorage.removeItem(this.CURRENT_CHAT_KEY);
        }
    },
    
    /**
     * Add message to a chat
     * @param {string} chatId 
     * @param {object} message 
     */
    addMessage(chatId, message) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.messages.push({
                ...message,
                timestamp: new Date().toISOString()
            });
            this.updateChat(chatId, { messages: chat.messages });
        }
    },
    
    /**
     * Get current active chat
     * @returns {object|null}
     */
    getCurrentChat() {
        const chatId = localStorage.getItem(this.CURRENT_CHAT_KEY);
        if (chatId) {
            return this.getChat(chatId);
        }
        return null;
    },
    
    /**
     * Set current active chat
     * @param {string} chatId 
     */
    setCurrentChat(chatId) {
        localStorage.setItem(this.CURRENT_CHAT_KEY, chatId);
    },
    
    /**
     * Get user preferences
     * @returns {object}
     */
    getPreferences() {
        const prefs = localStorage.getItem(this.USER_PREFERENCES_KEY);
        if (prefs) {
            try {
                return JSON.parse(prefs);
            } catch (e) {
                return this.getDefaultPreferences();
            }
        }
        return this.getDefaultPreferences();
    },
    
    /**
     * Get default preferences
     * @returns {object}
     */
    getDefaultPreferences() {
        return {
            theme: 'dark',
            aiName: 'Mini AI',
            language: 'en',
            streaming: true,
            soundEnabled: false
        };
    },
    
    /**
     * Save user preferences
     * @param {object} preferences 
     */
    savePreferences(preferences) {
        const current = this.getPreferences();
        const updated = { ...current, ...preferences };
        localStorage.setItem(this.USER_PREFERENCES_KEY, JSON.stringify(updated));
    },
    
    /**
     * Update a single preference
     * @param {string} key 
     * @param {any} value 
     */
    updatePreference(key, value) {
        const prefs = this.getPreferences();
        prefs[key] = value;
        this.savePreferences(prefs);
    },
    
    /**
     * Generate a unique ID
     * @returns {string}
     */
    generateId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    /**
     * Clear all data
     */
    clearAll() {
        localStorage.removeItem(this.CHAT_HISTORY_KEY);
        localStorage.removeItem(this.CURRENT_CHAT_KEY);
        localStorage.removeItem(this.USER_PREFERENCES_KEY);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Memory;
}
