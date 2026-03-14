// Mini AI Platform - Topbar Component

const Topbar = {
    /**
     * Initialize topbar
     */
    init() {
        this.render();
        this.setupEventListeners();
    },
    
    /**
     * Render topbar HTML
     */
    render() {
        const topbar = document.getElementById('topbar');
        if (!topbar) return;
        
        const prefs = Memory.getPreferences();
        const aiName = prefs.aiName || 'Mini AI';
        
        topbar.innerHTML = `
            <div class="top-nav">
                <div class="nav-left">
                    <button class="menu-toggle" id="menu-toggle" title="Toggle menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12h18M3 6h18M3 18h18"/>
                        </svg>
                    </button>
                    <div class="nav-logo">
                        <img src="../assets/logo.png" alt="Logo" onerror="this.style.display='none'">
                        <span>${CONFIG.APP_NAME}</span>
                    </div>
                </div>
                
                <div class="nav-center">
                    <span>${this.escapeHtml(aiName)}</span>
                </div>
                
                <div class="nav-right">
                    ${Auth.isLoggedIn() ? `
                        <button class="nav-btn" id="settings-btn" title="Settings">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
                            </svg>
                        </button>
                    ` : `
                        <a href="../auth/login.html" class="btn btn-primary">Login</a>
                    `}
                </div>
            </div>
        `;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Menu toggle button
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    sidebar.classList.toggle('is-open');
                }
            });
        }
        
        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                // Open settings modal
                Settings.open();
            });
        }
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
    module.exports = Topbar;
}
