// Mini AI Platform - Authentication Module
// Simple one-click login using localStorage

const Auth = {
    // Storage keys
    USER_KEY: 'mini_ai_user',
    API_KEY_KEY: 'mini_ai_api_key',
    
    /**
     * Check if user is logged in
     * @returns {boolean}
     */
    isLoggedIn() {
        return localStorage.getItem(this.USER_KEY) === 'logged';
    },
    
    /**
     * Get current user info
     * @returns {object|null}
     */
    getUser() {
        const userData = localStorage.getItem(this.USER_KEY + '_data');
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (e) {
                return null;
            }
        }
        return null;
    },
    
    /**
     * Simple one-click login
     * @param {string} username - Optional username
     */
    login(username = 'User') {
        // Store login flag
        localStorage.setItem(this.USER_KEY, 'logged');
        
        // Store user data
        const userData = {
            name: username,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(this.USER_KEY + '_data', JSON.stringify(userData));
        
        // Trigger login event
        window.dispatchEvent(new CustomEvent('authChanged', { detail: { loggedIn: true } }));
    },
    
    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.USER_KEY + '_data');
        
        // Trigger logout event
        window.dispatchEvent(new CustomEvent('authChanged', { detail: { loggedIn: false } }));
    },
    
    /**
     * Generate a random API key
     * @returns {string}
     */
    generateApiKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let key = CONFIG.API_KEY_PREFIX;
        
        for (let i = 0; i < CONFIG.API_KEY_LENGTH; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        return key;
    },
    
    /**
     * Save API key for user
     * @param {string} apiKey 
     */
    saveApiKey(apiKey) {
        localStorage.setItem(this.API_KEY_KEY, apiKey);
    },
    
    /**
     * Get user's API key
     * @returns {string|null}
     */
    getApiKey() {
        return localStorage.getItem(this.API_KEY_KEY);
    },
    
    /**
     * Create a new API key
     * @param {string} name - API name
     * @param {string} description - API description
     * @returns {object}
     */
    createApiKey(name, description) {
        const apiKey = this.generateApiKey();
        
        const apiKeyData = {
            key: apiKey,
            name: name,
            description: description,
            createdAt: new Date().toISOString()
        };
        
        // Store all created API keys
        const existingKeys = this.getApiKeys();
        existingKeys.push(apiKeyData);
        localStorage.setItem(this.API_KEY_KEY + 's', JSON.stringify(existingKeys));
        
        // Also set as current active key
        this.saveApiKey(apiKey);
        
        return apiKeyData;
    },
    
    /**
     * Get all API keys
     * @returns {array}
     */
    getApiKeys() {
        const keys = localStorage.getItem(this.API_KEY_KEY + 's');
        if (keys) {
            try {
                return JSON.parse(keys);
            } catch (e) {
                return [];
            }
        }
        return [];
    },
    
    /**
     * Delete an API key
     * @param {string} apiKey 
     */
    deleteApiKey(apiKey) {
        const keys = this.getApiKeys();
        const filtered = keys.filter(k => k.key !== apiKey);
        localStorage.setItem(this.API_KEY_KEY + 's', JSON.stringify(filtered));
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
