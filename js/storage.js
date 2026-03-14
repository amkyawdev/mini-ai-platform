// Storage.js - LocalStorage
const CHAT_HISTORY = 'chatHistory';
const SETTINGS = 'settings';
const UPLOADED_FILES = 'uploadedFiles';

function saveChatHistory(history) {
    localStorage.setItem(CHAT_HISTORY, JSON.stringify(history));
}

function loadChatHistory() {
    const saved = localStorage.getItem(CHAT_HISTORY);
    return saved ? JSON.parse(saved) : [];
}

function saveSettings(settings) {
    localStorage.setItem(SETTINGS, JSON.stringify(settings));
}

function loadSettings() {
    const saved = localStorage.getItem(SETTINGS);
    return saved ? JSON.parse(saved) : { aiName: 'AmkyawDev Chat Bot', apiKey: '' };
}

function saveUploadedFiles(files) {
    localStorage.setItem(UPLOADED_FILES, JSON.stringify(files));
}

function loadUploadedFiles() {
    const saved = localStorage.getItem(UPLOADED_FILES);
    return saved ? JSON.parse(saved) : [];
}

function clearAll() {
    localStorage.removeItem(CHAT_HISTORY);
    localStorage.removeItem(SETTINGS);
    localStorage.removeItem(UPLOADED_FILES);
}
