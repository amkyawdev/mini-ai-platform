// Mini AI Platform - Sidebar Component

const Sidebar = {
    /**
     * Initialize sidebar
     */
    init() {
        this.render();
        this.setupEventListeners();
    },
    
    /**
     * Render sidebar HTML
     */
    render() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        const user = Auth.getUser();
        const userName = user ? user.name : 'Guest';
        
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <button class="new-chat-btn" id="new-chat-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                    New Chat
                </button>
            </div>
            
            <nav class="sidebar-nav">
                <p class="menu-label">Navigation</p>
                <ul class="sidebar-menu">
                    <li>
                        <a href="chat.html" class="${this.isActivePage('chat.html') ? 'is-active' : ''}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                            </svg>
                            Chat
                        </a>
                    </li>
                    <li>
                        <a href="docs.html" class="${this.isActivePage('docs.html') ? 'is-active' : ''}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                            </svg>
                            Docs
                        </a>
                    </li>
                    <li>
                        <a href="about.html" class="${this.isActivePage('about.html') ? 'is-active' : ''}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 16v-4M12 8h.01"/>
                            </svg>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="create_api.html" class="${this.isActivePage('create_api.html') ? 'is-active' : ''}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                            </svg>
                            Create API
                        </a>
                    </li>
                </ul>
                
                <div class="chat-history">
                    <p class="menu-label">Recent Chats</p>
                    <div id="chat-history-list">
                        <!-- Chat history will be loaded here -->
                    </div>
                </div>
            </nav>
            
            <div class="sidebar-footer">
                <div class="user-profile" id="user-profile">
                    <div class="user-avatar">${userName.charAt(0).toUpperCase()}</div>
                    <span class="user-name">${this.escapeHtml(userName)}</span>
                    ${Auth.isLoggedIn() ? `
                        <button class="logout-btn" id="logout-btn" title="Logout">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Auth.logout();
            });
        }
        
        // Listen for auth changes
        window.addEventListener('authChanged', () => {
            this.render();
        });
    },
    
    /**
     * Check if a page is active
     * @param {string} page 
     * @returns {boolean}
     */
    isActivePage(page) {
        const currentPage = window.location.pathname.split('/').pop() || 'chat.html';
        return currentPage === page;
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
    module.exports = Sidebar;
}
