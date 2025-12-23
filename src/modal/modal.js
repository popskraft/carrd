/**
 * Modal Plugin
 * Opens modal containers when clicking elements with href="#modalId"
 * 
 * Targets: .container-component.modal with specific ID (e.g., #modalContact)
 * 
 * Features:
 * - Click to open via href="#modalId"
 * - Close on overlay click
 * - Close on Escape key
 * - Close button
 * - Body scroll lock
 * - Smooth animations
 */
(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================
    
    const DEFAULTS = {
        modalSelector: '.container-component.modal',
        closeOnOverlay: true,
        closeOnEscape: true,
        showCloseButton: true,
        lockBodyScroll: true,
        preventWhenCartOpen: false
    };

    // Merge with external options
    const externalOptions = (typeof window !== 'undefined' && 
        window.CarrdPluginOptions && 
        window.CarrdPluginOptions.modal) || {};
    
    const CONFIG = { ...DEFAULTS, ...externalOptions };

    // ==========================================
    // ICONS
    // ==========================================
    
    const ICONS = {
        close: `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
    };

    // ==========================================
    // STATE
    // ==========================================
    
    let activeModal = null;
    let overlay = null;
    const modalWrappers = new Map();
    const cartOpenSelector = '.crt-panel.open, .crt-overlay.open';

    // ==========================================
    // MODAL API
    // ==========================================
    
    const ModalAPI = {
        /**
         * Open a modal by ID
         * @param {string} modalId - The ID of the modal to open (without #)
         */
        /**
         * Open a modal by ID
         * @param {string} modalId - The ID of the modal to open (without #)
         */
        open: function(modalId) {
            if (CONFIG.preventWhenCartOpen && document.querySelector(cartOpenSelector)) {
                return;
            }
            const id = modalId.replace(/^#/, '');
            const modal = modalWrappers.get(id);
            
            if (!modal) {
                console.warn(`Modal: No modal found with id "${id}"`);
                return;
            }
            
            // Close any currently open modal
            if (activeModal && activeModal !== id) {
                this.close();
            }
            
            // Ensure overlay sits with the active modal to avoid stacking issues
            ensureOverlayPlacement(modal);

            // Open overlay
            if (overlay) {
                overlay.classList.add('is-open');
            }
            
            // Open modal
            modal.classList.add('is-open');
            requestAnimationFrame(() => {
                modal.classList.add('is-visible');
            });
            
            // Lock body scroll
            if (CONFIG.lockBodyScroll) {
                document.body.classList.add('modal-open');
            }
            
            activeModal = id;
            
            // Focus management
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
        },

        /**
         * Close the currently open modal
         */
        close: function() {
            if (!activeModal) return;
            
            const modal = modalWrappers.get(activeModal);
            
            // Close overlay
            if (overlay) {
                overlay.classList.remove('is-open');
            }
            
            // Close modal
            if (modal) {
                modal.classList.remove('is-visible');
                modal.classList.remove('is-open');
            }
            
            // Unlock body scroll
            if (CONFIG.lockBodyScroll) {
                document.body.classList.remove('modal-open');
            }
            
            activeModal = null;
        },

        /**
         * Toggle a modal
         * @param {string} modalId - The ID of the modal to toggle
         */
        toggle: function(modalId) {
            const id = modalId.replace(/^#/, '');
            if (activeModal === id) {
                this.close();
            } else {
                this.open(id);
            }
        },

        /**
         * Check if a modal is open
         * @param {string} modalId - Optional modal ID to check
         * @returns {boolean}
         */
        isOpen: function(modalId) {
            if (modalId) {
                return activeModal === modalId.replace(/^#/, '');
            }
            return activeModal !== null;
        }
    };

    // Expose global API
    window.ModalPlugin = ModalAPI;
    window.CarrdModal = ModalAPI; // Alias

    // ==========================================
    // SETUP FUNCTIONS
    // ==========================================
    
    /**
     * Create the shared overlay element
     */
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        
        if (CONFIG.closeOnOverlay) {
            overlay.addEventListener('click', () => ModalAPI.close());
        }
        
        document.body.appendChild(overlay);
    }

    /**
     * Ensure overlay shares the same stacking context as the active modal.
     * @param {HTMLElement} modal - The modal element
     */
    function ensureOverlayPlacement(modal) {
        if (!overlay || !modal || !modal.parentNode) return;

        const parent = modal.parentNode;
        if (overlay.parentNode !== parent || overlay.nextSibling !== modal) {
            parent.insertBefore(overlay, modal);
        }
    }

    /**
     * Setup a modal element
     * @param {HTMLElement} modal - The modal element
     */
    function setupModal(modal) {
        const modalId = modal.id;
        if (!modalId) {
            console.warn('Modal: Modal element must have an ID', modal);
            return null;
        }
        
        // Add close button if enabled
        if (CONFIG.showCloseButton) {
            // Check if button already exists (to avoid duplicates on re-init)
            if (!modal.querySelector('.modal-close')) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'modal-close';
                closeBtn.setAttribute('aria-label', 'Close modal');
                closeBtn.innerHTML = ICONS.close;
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling
                    ModalAPI.close();
                });
                
                // Insert close button at the beginning of the inner content
                const inner = modal.querySelector('.inner');
                if (inner) {
                    inner.insertBefore(closeBtn, inner.firstChild);
                } else {
                    modal.insertBefore(closeBtn, modal.firstChild);
                }
            }
        }
        
        // Store reference
        modalWrappers.set(modalId, modal);
        modal.dataset.modalInitialized = 'true';
        
        return modal;
    }

    /**
     * Bind click handlers for modal triggers
     */
    function bindTriggers() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('a[href^="#"], button[data-modal]');
            if (!trigger) return;
            
            let modalId = null;
            
            // Check for href="#modalId"
            if (trigger.hasAttribute('href')) {
                const href = trigger.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    const targetId = href.substring(1);
                    // Check if this ID corresponds to a modal
                    if (modalWrappers.has(targetId)) {
                        modalId = targetId;
                    }
                }
            }
            
            // Check for data-modal attribute
            if (!modalId && trigger.hasAttribute('data-modal')) {
                modalId = trigger.getAttribute('data-modal').replace(/^#/, '');
            }
            
            if (modalId) {
                e.preventDefault();
                ModalAPI.open(modalId);
            }
        });
    }

    /**
     * Bind keyboard handlers
     */
    function bindKeyboard() {
        if (CONFIG.closeOnEscape) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && activeModal) {
                    ModalAPI.close();
                }
            });
        }
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    function init() {
        // Find all modal containers
        const modals = document.querySelectorAll(CONFIG.modalSelector);
        
        if (!modals.length) return;
        
        // Create shared overlay
        createOverlay();
        
        // Setup each modal
        modals.forEach(modal => {
            if (modal.dataset.modalInitialized === 'true') return;
            setupModal(modal);
        });
        
        // Bind event handlers
        bindTriggers();
        bindKeyboard();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
