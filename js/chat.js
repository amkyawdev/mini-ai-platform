// Mini AI Platform - Chat Module
// Handles chat functionality

const Chat = {
    // Current chat state
    currentChat: null,
    isLoading: false,
    
    /**
     * Initialize chat
     */
    init() {
        this.loadChatHistory();
        this.setupEventListeners();
        this.loadCurrentChat();
    },
    
    /**
     * Set up chat event listeners
     */
    setupEventListeners() {
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        if (input && sendBtn) {
            // Send on button click
            sendBtn.addEventListener('click', () => this.sendMessage());
            
            // Send on Enter (without Shift)
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // Auto-resize textarea
            input.addEventListener('input', () => {
                this.autoResize(input);
            });
        }
        
        // New chat button
        const newChatBtn = document.getElementById('new-chat-btn');
        if (newChatBtn) {
            newChatBtn.addEventListener('click', () => this.startNewChat());
        }
    },
    
    /**
     * Auto-resize textarea
     * @param {HTMLElement} textarea 
     */
    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    },
    
    /**
     * Load chat history from memory
     */
    loadChatHistory() {
        const history = Memory.getChatHistory();
        this.renderChatHistory(history);
    },
    
    /**
     * Render chat history in sidebar
     * @param {array} history 
     */
    renderChatHistory(history) {
        const historyContainer = document.getElementById('chat-history-list');
        if (!historyContainer) return;
        
        if (history.length === 0) {
            historyContainer.innerHTML = '<p class="text-muted" style="padding: 12px; font-size: 13px;">No chat history yet</p>';
            return;
        }
        
        // Sort by updated time (most recent first)
        const sorted = [...history].sort((a, b) => 
            new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        
        historyContainer.innerHTML = sorted.map(chat => `
            <div class="history-item" data-chat-id="${chat.id}">
                <span>${this.escapeHtml(chat.title)}</span>
                <button class="delete-btn" onclick="Chat.deleteChat('${chat.id}')" title="Delete chat">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                </button>
            </div>
        `).join('');
        
        // Add click handlers
        historyContainer.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-btn')) {
                    const chatId = item.dataset.chatId;
                    this.loadChat(chatId);
                }
            });
        });
    },
    
    /**
     * Load a specific chat
     * @param {string} chatId 
     */
    loadChat(chatId) {
        const chat = Memory.getChat(chatId);
        if (chat) {
            this.currentChat = chat;
            Memory.setCurrentChat(chatId);
            this.renderMessages(chat.messages);
            this.updateChatHistory();
        }
    },
    
    /**
     * Load current chat from memory
     */
    loadCurrentChat() {
        const chat = Memory.getCurrentChat();
        if (chat) {
            this.currentChat = chat;
            this.renderMessages(chat.messages);
        } else {
            // Start a new chat if none exists
            this.startNewChat();
        }
        this.updateChatHistory();
    },
    
    /**
     * Render messages in chat window
     * @param {array} messages 
     */
    renderMessages(messages) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        if (messages.length === 0) {
            container.innerHTML = this.getEmptyState();
            return;
        }
        
        container.innerHTML = messages.map(msg => this.createMessageHTML(msg)).join('');
        this.scrollToBottom();
    },
    
    /**
     * Create HTML for a message - OpenAI style with timestamp
     * @param {object} message 
     * @returns {string}
     */
    createMessageHTML(message) {
        const isUser = message.role === 'user';
        const timestamp = this.formatTimestamp(message.timestamp);
        
        const avatarSvg = isUser 
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M12 16v-4M12 8h.01"/></svg>';
        
        return `
            <div class="message ${message.role}">
                <div class="message-avatar ${message.role}">
                    ${avatarSvg}
                </div>
                <div class="message-content">
                    <div class="message-text markdown-content">${isUser ? this.escapeHtml(message.content) : MiniAI.parseMarkdown(message.content)}</div>
                    <div class="message-timestamp">${timestamp}</div>
                </div>
            </div>
        `;
    },
    
    /**
     * Format timestamp
     * @param {string} timestamp 
     * @returns {string}
     */
    formatTimestamp(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    
    /**
     * Get empty state HTML
     * @returns {string}
     */
    getEmptyState() {
        return `
            <div class="empty-state">
                <div class="welcome-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                </div>
                <h3 class="empty-state-title">How can I help you today?</h3>
                <p class="empty-state-text">I can help you with questions, provide explanations, or just have a conversation. Try asking me something!</p>
            </div>
        `;
    },
    
    /**
     * Start a new chat
     */
    startNewChat() {
        const chat = Memory.createChat('New Chat');
        this.currentChat = chat;
        Memory.setCurrentChat(chat.id);
        this.renderMessages([]);
        this.updateChatHistory();
        
        // Focus input
        const input = document.getElementById('chat-input');
        if (input) {
            input.focus();
        }
    },
    
    /**
     * Send a message
     */
    async sendMessage() {
        const input = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-btn');
        
        if (!input || !this.currentChat || this.isLoading) return;
        
        const content = input.value.trim();
        
        // Validate message
        const validation = MiniAI.validateMessage(content);
        if (!validation.validied) {
            App.showNotification(validation.error, 'error');
            return;
        }
        
        // Clear input
        input.value = '';
        input.style.height = 'auto';
        
        // Disable send button
        this.isLoading = true;
        sendBtn.disabled = true;
        
        // Create user message
        const userMessage = {
            role: 'user',
            content: content
        };
        
        // Add message to current chat
        this.currentChat.messages.push(userMessage);
        
        // Update title if first message
        if (this.currentChat.messages.length === 1) {
            const title = MiniAI.extractTitle(content);
            this.currentChat.title = title;
            Memory.updateChat(this.currentChat.id, { title: title });
        }
        
        // Render user message
        this.appendMessage(userMessage);
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response from Knowledge Engine
            const response = await Knowledge.ask(content);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Create AI message
            const aiMessage = {
                role: 'ai',
                content: response.answer || 'I apologize, but I could not generate a response.'
            };
            
            // Add to chat
            this.currentChat.messages.push(aiMessage);
            
            // Render AI message
            this.appendMessage(aiMessage);
            
            // Save chat
            Memory.updateChat(this.currentChat.id, { 
                messages: this.currentChat.messages 
            });
            
            // Update history
            this.updateChatHistory();
            
        } catch (error) {
            console.error('Chat error:', error);
            this.hideTypingIndicator();
            App.showNotification('Failed to get response. Please try again.', 'error');
        }
        
        // Re-enable send button
        this.isLoading = false;
        sendBtn.disabled = false;
        input.focus();
    },
    
    /**
     * Append a message to the chat
     * @param {object} message 
     */
    appendMessage(message) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        // Remove empty state if present
        const emptyState = container.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Append new message
        const messageHTML = this.createMessageHTML(message);
        
        // Insert before the typing indicator if it exists
        const typingIndicator = container.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.insertAdjacentHTML('beforebegin', messageHTML);
        } else {
            container.insertAdjacentHTML('beforeend', messageHTML);
        }
        
        this.scrollToBottom();
    },
    
    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typing-indicator';
        indicator.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        container.insertAdjacentHTML('beforeend', indicator.outerHTML);
        this.scrollToBottom();
    },
    
    /**
     * Hide typing indicator
     */
    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    },
    
    /**
     * Scroll to bottom of chat
     */
    scrollToBottom() {
        const container = document.getElementById('chat-messages');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    },
    
    /**
     * Update chat history
     */
    updateChatHistory() {
        this.loadChatHistory();
    },
    
    /**
     * Delete a chat
     * @param {string} chatId 
     */
    deleteChat(chatId) {
        if (confirm('Are you sure you want to delete this chat?')) {
            Memory.deleteChat(chatId);
            
            // If current chat was deleted, start new chat
            if (this.currentChat && this.currentChat.id === chatId) {
                this.startNewChat();
            }
            
            this.updateChatHistory();
        }
    },
    
    /**
     * Escape HTML special characters
     * @param {string} text 
     * @returns {string}
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
};

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Chat.init();
});
