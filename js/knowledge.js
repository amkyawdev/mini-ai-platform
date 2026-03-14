// Mini AI Platform - Knowledge Module
// Handles communication with the Knowledge Engine

const Knowledge = {
    /**
     * Send a question to the knowledge engine
     * @param {string} question - The user's question
     * @returns {Promise<object>}
     */
    async ask(question) {
        const endpoint = CONFIG.KNOWLEDGE_ENGINE_URL + CONFIG.KNOWLEDGE_ENGINE_ENDPOINT;
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getApiKey() || ''}`
                },
                body: JSON.stringify({
                    question: question
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                success: true,
                answer: data.answer || data.response || data.message || 'No answer received'
            };
        } catch (error) {
            console.error('Knowledge Engine Error:', error);
            return {
                success: false,
                error: error.message,
                // Fallback response for demo purposes
                answer: this.getFallbackAnswer(question)
            };
        }
    },
    
    /**
     * Fallback answer when knowledge engine is unavailable
     * @param {string} question 
     * @returns {string}
     */
    getFallbackAnswer(question) {
        const lowerQuestion = question.toLowerCase();
        
        // Simple keyword-based responses for demo
        if (lowerQuestion.includes('ai') || lowerQuestion.includes('artificial intelligence')) {
            return `Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think and learn like humans. 

Key aspects of AI include:
• **Machine Learning**: Systems that learn from data
• **Natural Language Processing**: Understanding human language
• **Computer Vision**: Interpreting visual information
• **Robotics**: Physical AI applications

AI is used in many applications today, from voice assistants to autonomous vehicles.`;
        }
        
        if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
            return `Hello! I'm Mini AI, your AI assistant. I'm connected to a knowledge engine that helps me answer your questions. 

How can I help you today?`;
        }
        
        if (lowerQuestion.includes('who are you') || lowerQuestion.includes('what are you')) {
            return `I'm Mini AI, a lightweight AI platform built with:

• **HTML5** - Structure
• **Bulma CSS** - Styling
• **Vanilla JavaScript** - Functionality

I'm connected to a Knowledge Engine that retrieves information from a Knowledge Server to provide you with helpful answers.

Feel free to ask me anything!`;
        }
        
        if (lowerQuestion.includes('help')) {
            return `I'm here to help! You can ask me:

• Questions about AI and technology
• Explanations of concepts
• General knowledge questions
• And more!

Just type your question and I'll do my best to answer.`;
        }
        
        return `Thank you for your question: "${question}"

I'm connected to the Knowledge Engine which would process your question through:
1. **Knowledge Server** - Retrieves relevant information
2. **Knowledge Engine** - Processes and generates response
3. **LLM Integration** - Provides intelligent answers

Currently demonstrating fallback mode. The full system would connect to:
- https://github.com/amkyawdev/amkyawdev-knowledge-server
- https://github.com/amkyawdev/amkyawdev-knowledge-engin

How else can I assist you?`;
    },
    
    /**
     * Search knowledge base
     * @param {string} query 
     * @returns {Promise<array>}
     */
    async search(query) {
        // In production, this would call a search endpoint
        // For now, return empty array
        return [];
    },
    
    /**
     * Get knowledge categories
     * @returns {Promise<array>}
     */
    async getCategories() {
        // In production, this would fetch categories from the server
        return [
            { id: 'ai', name: 'Artificial Intelligence', count: 15 },
            { id: 'programming', name: 'Programming', count: 25 },
            { id: 'science', name: 'Science', count: 18 },
            { id: 'general', name: 'General Knowledge', count: 30 }
        ];
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Knowledge;
}
