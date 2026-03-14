# Mini AI Platform

A lightweight AI web platform that resembles the OpenAI Chat interface, built with HTML, Bulma CSS, and Vanilla JavaScript.

## Features

- **AI Chat**: Interactive chat interface with real-time responses
- **Knowledge Engine Integration**: Connects to external knowledge services
- **Simple Authentication**: One-click login using localStorage
- **API Key Management**: Generate and manage API keys for external integrations
- **Chat History**: Persistent chat history using localStorage
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern dark interface inspired by OpenAI

## Technology Stack

- **HTML5**: Structure
- **Bulma CSS**: Styling framework
- **Vanilla JavaScript**: Functionality
- **Fetch API**: HTTP requests
- **localStorage**: Data persistence

## Project Structure

```
mini-ai-platform/
├── index.html              # Loader page
├── pages/
│   ├── chat.html          # Main chat interface
│   ├── docs.html          # Documentation
│   ├── about.html         # About page
│   └── create_api.html    # API key generator
├── auth/
│   └── login.html         # Login page
├── css/
│   ├── style.css          # Main styles
│   ├── chat.css           # Chat-specific styles
│   ├── docs.css           # Documentation styles
│   ├── about.css          # About page styles
│   └── create_api.css     # API creation styles
├── js/
│   ├── app.js             # Main app module
│   ├── chat.js            # Chat functionality
│   ├── mini-ai.js         # Mini AI layer
│   ├── llm.js             # LLM router
│   ├── memory.js          # Memory/localStorage
│   ├── knowledge.js       # Knowledge engine
│   └── auth.js            # Authentication
├── components/
│   ├── sidebar.js         # Sidebar component
│   ├── topbar.js          # Top navigation
│   ├── message.js         # Message component
│   └── settings.js        # Settings modal
├── config/
│   └── config.js          # Configuration
└── assets/
    └── logo.svg           # Platform logo
```

## Getting Started

1. Open `index.html` in a web browser
2. Click "Sign In" for one-click login
3. Start chatting with the AI

## Connected Repositories

- **Knowledge Engine**: [amkyawdev-knowledge-engin](https://github.com/amkyawdev/amkyawdev-knowledge-engin)
- **Knowledge Server**: [amkyawdev-knowledge-server](https://github.com/amkyawdev/amkyawdev-knowledge-server)

## How It Works

```
User → Mini AI Platform → Knowledge Engine → Knowledge Server → AI Response
```

1. User sends a question via the chat interface
2. The platform processes and formats the question
3. Knowledge Engine retrieves relevant information
4. Knowledge Server provides the knowledge data
5. AI response is displayed in the chat

## License

MIT
