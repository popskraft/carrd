/*
 * Plugin: Modal
 * Version: 0.1.11
 * Purpose: Modal open/close behavior with accessibility handling.
 * Admin placement: Code element in BODY END.
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
  const SELECTORS = {
    overlay: 'theme-modal-overlay',
    close: 'theme-modal-close',
    modalClose: 'modal-close'
  };

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
  const cartOpenSelector = '.theme-shopcart-panel.open, .theme-shopcart-overlay.open';

  // ==========================================
  // MODAL API
  // ==========================================
  
  const ModalAPI = {
    /**
     * Open a modal by ID
     * @param {string} modalId - The ID of the modal to open (without #)
     */
    open: function(modalId) {
      if (CONFIG.preventWhenCartOpen && document.querySelector(cartOpenSelector)) {
        return;
      }
      const id = modalId.replace(/^#/, '');
      const modal = getOrInitModal(id);
      
      if (!modal) {
        console.warn(`Modal: No modal found with id "${id}"`);
        return;
      }
      
      // Close any currently open modal
      if (activeModal && activeModal !== id) {
        this.close();
      }
      
      // Store previous focus to restore later
      this.lastFocus = document.activeElement;
      
      // Ensure overlay exists and sits with the active modal to avoid stacking issues
      if (!overlay) {
        createOverlay();
      }
      ensureOverlayPlacement(modal);

      // Open overlay
      if (overlay) {
        overlay.classList.add('is-open');
      }
      
      // Open modal
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          modal.classList.add('is-visible');
        });
      });
      
      // Lock body scroll
      if (CONFIG.lockBodyScroll) {
        document.body.classList.add('modal-open');
      }
      
      activeModal = id;
      
      // Focus management
      const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) {
        // Wait slightly for transition
        setTimeout(() => firstFocusable.focus(), 50);
      } else {
         // Fallback to modal itself if no focusable content
         modal.setAttribute('tabindex', '-1');
         modal.focus();
      }
      
      // Add Focus Trap listener
      document.addEventListener('keydown', this.handleTabKey);
    },

    /**
     * Connection for Tab Key trap (bound to 'this')
     */
    handleTabKey: function(e) {
      if (e.key !== 'Tab' || !activeModal) return;

      const modal = modalWrappers.get(activeModal);
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },

    /**
     * Close the currently open modal
     */
    close: function() {
      if (!activeModal) return;
      
      const modal = modalWrappers.get(activeModal);
      
      // Remove Trap
      document.removeEventListener('keydown', this.handleTabKey);
      
      // Close overlay
      if (overlay) {
        overlay.classList.remove('is-open');
      }
      
      // Close modal
      if (modal) {
        modal.classList.remove('is-visible');
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
      
      // Unlock body scroll
      if (CONFIG.lockBodyScroll) {
        document.body.classList.remove('modal-open');
      }
      
      activeModal = null;
      
      // Restore Focus
      if (this.lastFocus && typeof this.lastFocus.focus === 'function') {
        this.lastFocus.focus();
        this.lastFocus = null;
      }
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

  // Expose public API
  window.CarrdModal = ModalAPI;

  // ==========================================
  // SETUP FUNCTIONS
  // ==========================================
  
  /**
   * Create the shared overlay element
   */
  function createOverlay() {
    overlay = document.createElement('div');
    overlay.className = SELECTORS.overlay;
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
      if (!modal.querySelector(`.${SELECTORS.modalClose}`)) {
        const closeBtn = document.createElement('button');
        closeBtn.className = `${SELECTORS.close} ${SELECTORS.modalClose}`;
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
    
    // Initial ARIA setup
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    
    // Store reference
    modalWrappers.set(modalId, modal);
    modal.dataset.modalInitialized = 'true';
    
    return modal;
  }

  /**
   * Bind click handlers for modal triggers
   */
  function bindTriggers() {
    // Use event delegation for better performance (capture to beat Carrd's handlers)
    const handler = (e) => {
      const trigger = e.target.closest('a[href^="#"], button[data-modal]');
      if (!trigger) return;
      
      let modalId = null;
      
      // Check for href="#modalId"
      if (trigger.hasAttribute('href')) {
        const href = trigger.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const targetId = href.substring(1);
          // Check if this ID corresponds to a modal
          if (getOrInitModal(targetId)) {
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
    };
    document.addEventListener('click', handler, true);
  }

  /**
   * Open modal from hash (supports Carrd hash-based navigation)
   */
  function bindHashChange() {
    const openFromHash = () => {
      const hash = window.location.hash || '';
      if (hash.length <= 1) return;
      const id = hash.substring(1);
      if (getOrInitModal(id)) {
        ModalAPI.open(id);
      }
    };

    window.addEventListener('hashchange', openFromHash);
    openFromHash();
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

    // Setup each modal
    modals.forEach(modal => {
      if (modal.dataset.modalInitialized === 'true') return;
      setupModal(modal);
    });

    if (modals.length && !overlay) {
      createOverlay();
    }
    
    // Bind event handlers
    bindTriggers();
    bindKeyboard();
    bindHashChange();
  }

  /**
   * Fetch or initialize a modal by ID.
   * @param {string} modalId - The modal ID without hash.
   * @returns {HTMLElement|null}
   */
  function getOrInitModal(modalId) {
    if (modalWrappers.has(modalId)) {
      return modalWrappers.get(modalId);
    }
    const modal = document.getElementById(modalId);
    if (modal && modal.matches && modal.matches(CONFIG.modalSelector)) {
      return setupModal(modal);
    }
    return null;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
