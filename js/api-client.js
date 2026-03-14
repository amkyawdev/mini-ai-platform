// API Client - Knowledge Engine & Base
async function callKnowledgeEngine(question) {
    const settings = JSON.parse(localStorage.getItem('settings') || '{"apiKey":""}');
    if (!settings.apiKey) return getMockResponse();
    
    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + settings.apiKey
            },
            body: JSON.stringify({
                model: 'llama-3.1-70b-versatile',
                messages: [{ role: 'user', content: question }],
                temperature: 0.7,
                max_tokens: 2048
            })
        });
        
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        if (data.choices && data.choices[0]) return data.choices[0].message.content;
        throw new Error('Invalid response');
    } catch (e) {
        console.error(e);
        return getMockResponse();
    }
}

async function callKnowledgeBase(query) {
    const config = Alpine.store('app').config || {};
    const url = config.knowledgeBase || 'https://api.amkyaw.dev/knowledge';
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        return data.results || [];
    } catch (e) {
        console.error(e);
        return [];
    }
}

function getMockResponse() {
    const responses = [
        "I'm AmkyawDev Chat Bot! Configure your API key in Settings for full AI capabilities.",
        "I'm running in demo mode. Add your API key in Settings.",
        "Hello! Set up your API key to enable AI responses."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
