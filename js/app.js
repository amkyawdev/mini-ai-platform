// Mini AI Platform - Main App Module
// Handles app initialization and global functionality

const App = {
    /**
     * Initialize the application
     */
    init() {
        console.log('Initializing Mini AI Platform...');
        
        // Check authentication
        this.checkAuth();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Set up auth change listener
        window.addEventListener('authChanged', (e) => {
            this.handleAuthChange(e.detail);
        });
        
        console.log('Mini AI Platform initialized');
    },
    
    /**
     * Check authentication status
     */
    checkAuth() {
        if (!Auth.isLoggedIn()) {
            // Redirect to login page if not on login/auth page
            const currentPage = window.location.pathname;
            if (!currentPage.includes('login.html') && !currentPage.endsWith('/')) {
                // Allow index.html as loader
                if (!currentPage.endsWith('index.html')) {
                    // window.location.href = 'auth/login.html';
                }
            }
        }
    },
    
    /**
     * Handle authentication change
     * @param {object} detail - Event detail
     */
    handleAuthChange(detail) {
        if (detail.loggedIn) {
            // User logged in, redirect to chat
            if (window.location.href.includes('login.html')) {
                window.location.href = 'pages/chat.html';
            }
        } else {
            // User logged out
            window.location.href = 'auth/login.html';
        }
    },
    
    /**
     * Set up global event listeners
     */
    setupEventListeners() {
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    },
    
    /**
     * Close all open modals
     */
    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('is-active');
        });
    },
    
    /**
     * Show a notification
     * @param {string} message 
     * @param {string} type - success, error, warning, info
     * @param {number} duration - Duration in ms
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to document
        const container = document.querySelector('.notification-container') || this.createNotificationContainer();
        container.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after duration
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    },
    
    /**
     * Create notification container
     * @returns {HTMLElement}
     */
    createNotificationContainer() {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        
        // Add notification styles
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    background: #202123;
                    border: 1px solid #3e3f4a;
                    border-radius: 8px;
                    padding: 12px 16px;
                    margin-bottom: 8px;
                    color: #ececf1;
                    font-size: 14px;
                    opacity: 0;
                    transform: translateX(100%);
                    transition: all 0.3s ease;
                }
                .notification.show {
                    opacity: 1;
                    transform: translateX(0);
                }
                .notification-success {
                    border-left: 4px solid #10a37f;
                }
                .notification-error {
                    border-left: 4px solid #ef4444;
                }
                .notification-warning {
                    border-left: 4px solid #f59e0b;
                }
                .notification-info {
                    border-left: 4px solid #3b82f6;
                }
            `;
            document.head.appendChild(styles);
        }
        
        return container;
    },
    
    /**
     * Load a component dynamically
     * @param {string} componentPath - Path to component file
     * @param {string} targetId - ID of target element
     * @returns {Promise}
     */
    async loadComponent(componentPath, targetId) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            const target = document.getElementById(targetId);
            if (target) {
                target.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    },
    
    /**
     * Get current page name
     * @returns {string}
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page;
    },
    
    /**
     * Check if running on mobile
     * @returns {boolean}
     */
    isMobile() {
        return window.innerWidth < 768;
    },
    
    /**
     * Toggle mobile sidebar
     */
    toggleMobileSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('is-open');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
