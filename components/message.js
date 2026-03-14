// Mini AI Platform - Message Component

const Message = {
    /**
     * Create a message bubble
     * @param {string} role - 'user' or 'ai'
     * @param {string} content - Message content
     * @returns {string}
     */
    create(role, content) {
        const isUser = role === 'user';
        const avatarInitial = isUser ? 'U' : 'AI';
        
        const formattedContent = isUser 
            ? this.escapeHtml(content)
            : MiniAI.parseMarkdown(content);
        
        return `
            <div class="message ${role}">
                <div class="message-avatar ${role}">
                    ${avatarInitial}
                </div>
                <div class="message-content">
                    <div class="message-text markdown-content">${formattedContent}</div>
                </div>
            </div>
        `;
    },
    
    /**
     * Create a typing indicator
     * @returns {string}
     */
    createTyping() {
        return `
            <div class="message ai">
                <div class="message-avatar ai">AI</div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
    },
    
    /**
     * Create empty state
     * @returns {string}
     */
    createEmptyState() {
        return `
            <div class="empty-state">
                <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <h3 class="empty-state-title">How can I help you today?</h3>
                <p class="empty-state-text">I can help you with questions, provide explanations, or just have a conversation. Try asking me something!</p>
            </div>
        `;
    },
    
    /**
     * Escape HTML
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

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Message;
}
