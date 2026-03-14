// Mini AI Platform - Mini AI Layer
// Handles prompt formatting, message cleanup, and context building

const MiniAI = {
    /**
     * Format a prompt for the AI
     * @param {string} userMessage - User's message
     * @param {array} chatHistory - Previous messages
     * @returns {string}
     */
    formatPrompt(userMessage, chatHistory = []) {
        // Build context from chat history
        let context = '';
        
        if (chatHistory.length > 0) {
            context = '\n\nPrevious conversation:\n';
            chatHistory.slice(-5).forEach(msg => {
                const role = msg.role === 'user' ? 'User' : 'Assistant';
                context += `${role}: ${msg.content}\n`;
            });
        }
        
        // Format the full prompt
        const prompt = `You are Mini AI, a helpful AI assistant.${context}\n\nUser: ${userMessage}\n\nAssistant:`;
        
        return prompt;
    },
    
    /**
     * Clean up a message
     * @param {string} message 
     * @returns {string}
     */
    cleanupMessage(message) {
        // Remove extra whitespace
        let cleaned = message.replace(/\s+/g, ' ');
        
        // Trim leading/trailing whitespace
        cleaned = cleaned.trim();
        
        // Fix common punctuation issues
        cleaned = cleaned.replace(/\.\./g, '.');
        cleaned = cleaned.replace(/,,/g, ',');
        
        return cleaned;
    },
    
    /**
     * Build context for the AI
     * @param {array} messages 
     * @param {number} maxMessages 
     * @returns {array}
     */
    buildContext(messages, maxMessages = 10) {
        // Get the most recent messages
        const recentMessages = messages.slice(-maxMessages);
        
        // Build context array
        return recentMessages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));
    },
    
    /**
     * Extract title from first message
     * @param {string} message 
     * @returns {string}
     */
    extractTitle(message) {
        // Get first 30 characters of first user message
        let title = message.trim().substring(0, 30);
        
        // Add ellipsis if truncated
        if (message.length > 30) {
            title += '...';
        }
        
        return title;
    },
    
    /**
     * Validate message
     * @param {string} message 
     * @returns {object}
     */
    validateMessage(message) {
        const trimmed = message.trim();
        
        if (!trimmed) {
            return {
                valid: false,
                error: 'Message cannot be empty'
            };
        }
        
        if (trimmed.length > CONFIG.UI.MAX_MESSAGE_LENGTH) {
            return {
                valid: false,
                error: `Message too long. Maximum ${CONFIG.UI.MAX_MESSAGE_LENGTH} characters.`
            };
        }
        
        return {
            valid: true,
            cleaned: trimmed
        };
    },
    
    /**
     * Format message content for display
     * @param {string} content 
     * @returns {string}
     */
    formatContent(content) {
        // Escape HTML
        let formatted = this.escapeHtml(content);
        
        // Convert URLs to links
        formatted = formatted.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank" rel="noopener">$1</a>'
        );
        
        // Convert code blocks
        formatted = formatted.replace(
            /```(\w+)?\n([\s\S]*?)```/g,
            '<pre><code class="language-$1">$2</code></pre>'
        );
        
        // Convert inline code
        formatted = formatted.replace(
            /`([^`]+)`/g,
            '<code>$1</code>'
        );
        
        // Convert bold
        formatted = formatted.replace(
            /\*\*([^*]+)\*\*/g,
            '<strong>$1</strong>'
        );
        
        // Convert italic
        formatted = formatted.replace(
            /\*([^*]+)\*/g,
            '<em>$1</em>'
        );
        
        // Convert line breaks to <br>
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
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
    },
    
    /**
     * Parse markdown to HTML
     * @param {string} markdown 
     * @returns {string}
     */
    parseMarkdown(markdown) {
        let html = markdown;
        
        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Lists
        html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // Bold
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        // Code blocks
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MiniAI;
}
