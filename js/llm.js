// Mini AI Platform - LLM Router
// Handles communication with various LLM providers

const LLM = {
    /**
     * Send a prompt to an LLM provider
     * @param {string} prompt - The formatted prompt
     * @param {string} provider - Provider name (groq, openrouter, huggingface)
     * @returns {Promise<object>}
     */
    async sendPrompt(prompt, provider = CONFIG.DEFAULT_LLM_PROVIDER) {
        const providerConfig = CONFIG.LLM_PROVIDERS[provider];
        
        if (!providerConfig) {
            return {
                success: false,
                error: `Unknown provider: ${provider}`
            };
        }
        
        try {
            const response = await fetch(providerConfig.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getApiKey(provider)}`
                },
                body: JSON.stringify({
                    model: this.getModel(provider),
                    messages: [
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return {
                success: true,
                response: data.choices[0].message.content,
                usage: data.usage
            };
        } catch (error) {
            console.error('LLM Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },
    
    /**
     * Get API key for a provider
     * @param {string} provider 
     * @returns {string}
     */
    getApiKey(provider) {
        // Try to get from localStorage first
        const stored = localStorage.getItem(`llm_api_key_${provider}`);
        if (stored) {
            return stored;
        }
        
        // Return demo key for now
        return 'demo_key';
    },
    
    /**
     * Set API key for a provider
     * @param {string} provider 
     * @param {string} apiKey 
     */
    setApiKey(provider, apiKey) {
        localStorage.setItem(`llm_api_key_${provider}`, apiKey);
    },
    
    /**
     * Get model name for a provider
     * @param {string} provider 
     * @returns {string}
     */
    getModel(provider) {
        const models = {
            groq: 'llama-3.1-70b-versatile',
            openrouter: 'openai/gpt-3.5-turbo',
            huggingface: 'facebook/blenderbot-400m-distill'
        };
        
        return models[provider] || 'gpt-3.5-turbo';
    },
    
    /**
     * Get available providers
     * @returns {array}
     */
    getProviders() {
        return Object.entries(CONFIG.LLM_PROVIDERS).map(([key, value]) => ({
            id: key,
            name: value.name,
            endpoint: value.endpoint
        }));
    },
    
    /**
     * Test connection to a provider
     * @param {string} provider 
     * @returns {Promise<boolean>}
     */
    async testConnection(provider) {
        try {
            const result = await this.sendPrompt('Hello', provider);
            return result.success;
        } catch (error) {
            return false;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LLM;
}
