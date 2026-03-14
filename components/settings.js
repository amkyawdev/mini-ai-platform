// Mini AI Platform - Settings Component

const Settings = {
    /**
     * Initialize settings
     */
    init() {
        this.modal = null;
    },
    
    /**
     * Open settings modal
     */
    open() {
        // Create modal if not exists
        if (!this.modal) {
            this.createModal();
        }
        
        this.modal.classList.add('is-active');
        this.loadSettings();
    },
    
    /**
     * Close settings modal
     */
    close() {
        if (this.modal) {
            this.modal.classList.remove('is-active');
        }
    },
    
    /**
     * Create settings modal
     */
    createModal() {
        const modalHTML = `
            <div class="modal" id="settings-modal">
                <div class="modal-background" onclick="Settings.close()"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Settings</p>
                        <button class="delete" aria-label="close" onclick="Settings.close()"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="form-group">
                            <label class="form-label">AI Name</label>
                            <input type="text" class="input" id="settings-ai-name" placeholder="Mini AI">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Theme</label>
                            <div class="select is-fullwidth">
                                <select id="settings-theme">
                                    <option value="dark">Dark</option>
                                    <option value="light">Light</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox">
                                <input type="checkbox" id="settings-streaming">
                                Enable streaming responses
                            </label>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox">
                                <input type="checkbox" id="settings-sound">
                                Enable sound notifications
                            </label>
                        </div>
                        
                        <hr>
                        
                        <h4 class="title is-6">API Keys</h4>
                        <p class="text-muted mb-2">Configure your LLM provider API keys</p>
                        
                        <div class="form-group">
                            <label class="form-label">Groq API Key</label>
                            <input type="password" class="input" id="settings-groq-key" placeholder="gsk_...">
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">OpenRouter API Key</label>
                            <input type="password" class="input" id="settings-openrouter-key" placeholder="sk-or-...">
                        </div>
                        
                        <hr>
                        
                        <h4 class="title is-6">Data Management</h4>
                        <button class="btn btn-danger" onclick="Settings.clearAllData()">
                            Clear All Data
                        </button>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="btn btn-primary" onclick="Settings.save()">Save Changes</button>
                        <button class="btn btn-secondary" onclick="Settings.close()">Cancel</button>
                    </footer>
                </div>
            </div>
        `;
        
        // Add to document
        const container = document.createElement('div');
        container.innerHTML = modalHTML;
        document.body.appendChild(container);
        
        this.modal = document.getElementById('settings-modal');
        
        // Add styles
        this.addStyles();
    },
    
    /**
     * Add modal styles
     */
    addStyles() {
        if (document.getElementById('settings-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'settings-styles';
        styles.textContent = `
            .modal {
                z-index: 1000;
            }
            .modal-card {
                max-width: 500px;
                width: 90%;
                background: var(--bg-sidebar);
                border-radius: 12px;
            }
            .modal-card-head {
                background: var(--bg-sidebar);
                border-bottom: 1px solid var(--border-color);
                padding: 20px;
            }
            .modal-card-title {
                color: var(--text-primary);
                font-size: 18px;
                font-weight: 600;
            }
            .modal-card-body {
                background: var(--bg-sidebar);
                padding: 20px;
            }
            .modal-card-foot {
                background: var(--bg-sidebar);
                border-top: 1px solid var(--border-color);
                padding: 16px 20px;
                justify-content: flex-end;
                gap: 12px;
            }
            .delete {
                background: var(--text-secondary);
            }
            .delete:hover {
                background: var(--text-primary);
            }
            .checkbox, .radio {
                color: var(--text-primary);
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 12px;
            }
            .checkbox input, .radio input {
                margin: 0;
            }
            .title.is-6 {
                color: var(--text-primary);
                font-size: 14px;
                margin-bottom: 8px;
            }
            hr {
                background: var(--border-color);
                margin: 20px 0;
            }
            .select select, .input {
                background: var(--bg-input);
                border-color: var(--border-color);
                color: var(--text-primary);
            }
            .select select:focus, .input:focus {
                border-color: var(--accent-color);
            }
            .select::after {
                border-color: var(--text-secondary);
            }
        `;
        document.head.appendChild(styles);
    },
    
    /**
     * Load current settings
     */
    loadSettings() {
        const prefs = Memory.getPreferences();
        
        document.getElementById('settings-ai-name').value = prefs.aiName || 'Mini AI';
        document.getElementById('settings-theme').value = prefs.theme || 'dark';
        document.getElementById('settings-streaming').checked = prefs.streaming !== false;
        document.getElementById('settings-sound').checked = prefs.soundEnabled === true;
        
        // Load API keys
        document.getElementById('settings-groq-key').value = LLM.getApiKey('groq') || '';
        document.getElementById('settings-openrouter-key').value = LLM.getApiKey('openrouter') || '';
    },
    
    /**
     * Save settings
     */
    save() {
        const aiName = document.getElementById('settings-ai-name').value;
        const theme = document.getElementById('settings-theme').value;
        const streaming = document.getElementById('settings-streaming').checked;
        const sound = document.getElementById('settings-sound').checked;
        
        // Save preferences
        Memory.savePreferences({
            aiName,
            theme,
            streaming,
            soundEnabled: sound
        });
        
        // Save API keys
        const groqKey = document.getElementById('settings-groq-key').value;
        const openrouterKey = document.getElementById('settings-openrouter-key').value;
        
        if (groqKey) LLM.setApiKey('groq', groqKey);
        if (openrouterKey) LLM.setApiKey('openrouter', openrouterKey);
        
        // Apply theme
        this.applyTheme(theme);
        
        App.showNotification('Settings saved successfully', 'success');
        this.close();
    },
    
    /**
     * Apply theme
     * @param {string} theme 
     */
    applyTheme(theme) {
        // For now, only dark theme is supported
        // Can be expanded to support light theme
    },
    
    /**
     * Clear all data
     */
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This will delete all chat history and settings. This action cannot be undone.')) {
            Memory.clearAll();
            Auth.logout();
            App.showNotification('All data cleared', 'success');
            this.close();
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Settings;
}
