// Mini AI Platform - Configuration
// This file contains all the configuration settings for the platform

const CONFIG = {
    // App Info
    APP_NAME: 'Mini AI Platform',
    APP_VERSION: '1.0.0',
    
    // Knowledge Engine API - External repository
    // https://github.com/amkyawdev/amkyawdev-knowledge-engin
    KNOWLEDGE_ENGINE_URL: 'https://api.knowledge-engine.example.com',
    KNOWLEDGE_ENGINE_ENDPOINT: '/api/answer',
    
    // Knowledge Server - External repository  
    // https://github.com/amkyawdev/amkyawdev-knowledge-server
    KNOWLEDGE_SERVER_URL: 'https://api.knowledge-server.example.com',
    
    // API Keys Configuration
    API_KEY_PREFIX: 'AMKYAW_',
    API_KEY_LENGTH: 32,
    
    // LLM Providers
    LLM_PROVIDERS: {
        groq: {
            name: 'Groq',
            endpoint: 'https://api.groq.com/openai/v1/chat/completions'
        },
        openrouter: {
            name: 'OpenRouter',
            endpoint: 'https://openrouter.ai/api/v1/chat/completions'
        },
        huggingface: {
            name: 'HuggingFace',
            endpoint: 'https://api-inference.huggingface.co/models/'
        }
    },
    
    // Default LLM Provider
    DEFAULT_LLM_PROVIDER: 'groq',
    
    // UI Settings
    UI: {
        SIDEBAR_WIDTH: 260,
        MAX_MESSAGE_LENGTH: 10000,
        TYPING_INDICATOR_DELAY: 300,
        AUTO_SCROLL_DELAY: 100,
        STORAGE_PREFIX: 'mini_ai_',
        CHAT_HISTORY_LIMIT: 50
    },
    
    // Colors (matching CSS variables)
    COLORS: {
        bgDark: '#171717',
        bgSidebar: '#202123',
        bgInput: '#343541',
        bgMessage: '#444654',
        textPrimary: '#ececf1',
        textSecondary: '#8e8ea0',
        accent: '#10a37f',
        userMessage: '#5436da',
        border: '#3e3f4a'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
