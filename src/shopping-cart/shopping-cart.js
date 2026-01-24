/*
 * Plugin: Shopping Cart
 * Version: 0.1.8aaa
 * Purpose: Cart UI, item state, and order details sync for Carrd forms.
 * Admin placement: Code element in BODY END.
 *
 * Notes:
 * - Load `shopping-cart.css` in HEAD.
 * - Use `window.CarrdCart.add('Item', 99)` to add items.
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================
    
    // Default configuration (used when no external options provided)
    const DEFAULTS = {
        currency: '$',
        currencyPosition: 'before', // 'before' ($10) or 'after' (10$)
        position: 'top-right', // 'bottom-right', 'top-right', 'bottom-left', 'bottom-center'

        storageKey: 'carrd_cart_v1',
        
        // Checkout Form Settings
        orderInputSelector: '[name="order-details"], #order-details', // Default field
        orderInputClass: '.cart-output', // Alternative class for flexibility
        
        // Text labels for easy translation
        texts: {
            title: 'Shopping Cart',
            empty: 'Your cart is empty.',
            checkout: 'Checkout',
            total: 'Total',
            remove: 'Remove',
            required: 'Required',
            addedToCart: 'Added "${name}" to cart',
            errorName: 'Invalid product name',
            errorPrice: 'Invalid price for ${name}',
            errorForm: 'Error: Could not find the order form. Please contact support.',
            consoleErrorForm: 'Carrd Cart: Could not find "Order Details" field. Please ensure a Textarea with name="order-details" or ID="order-details" exists.'
        }
    };

    /**
     * Deep merge utility for nested configuration objects
     * @param {Object} target - Base/default object
     * @param {Object} source - Override object
     * @returns {Object} - Merged object
     */
    function deepMerge(target, source) {
        if (!source || typeof source !== 'object') return target;
        const result = { ...target };
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = deepMerge(target[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        return result;
    }

    // Get external options if available (loaded before this script)
    const externalOptions = (typeof window !== 'undefined' && 
        window.CarrdPluginOptions && 
        window.CarrdPluginOptions.shoppingCart) || {};

    // Final merged configuration
    const CONFIG = deepMerge(DEFAULTS, externalOptions);

    // ==========================================
    // SECURITY UTILITIES
    // ==========================================
    
    /**
     * Escapes HTML special characters to prevent XSS attacks
     * @param {string} str - Input string
     * @returns {string} - Escaped string safe for HTML insertion
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Validates a cart item from localStorage
     * @param {Object} item - Cart item to validate
     * @returns {boolean} - True if valid
     */
    function validateCartItem(item) {
        if (!item || typeof item !== 'object') return false;
        if (typeof item.name !== 'string' || item.name.length === 0 || item.name.length > 200) return false;
        if (typeof item.price !== 'number' || isNaN(item.price) || item.price < 0) return false;
        if (typeof item.qty !== 'number' || !Number.isInteger(item.qty) || item.qty < 1) return false;
        return true;
    }

    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    let state = {
        cart: [],
        isOpen: false
    };

    // Load from local storage with validation
    try {
        const stored = localStorage.getItem(CONFIG.storageKey);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                // Filter out invalid items to prevent localStorage injection attacks
                state.cart = parsed.filter(validateCartItem);
            }
        }
    } catch (e) {
        console.warn('LocalStorage not available or corrupted');
        state.cart = [];
    }

    const saveState = () => {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.cart));
        } catch (e) {
            // Ignore storage errors (private mode, quota).
        }
        updateUI();
    };

    // ==========================================
    // PUBLIC API
    // ==========================================
    const CartAPI = {
        /**
         * Add an item to the cart
         * @param {string} name - Product name
         * @param {number|string} price - Product price
         */
        add: function(name, price) {
            // Validate name
            if (typeof name !== 'string' || name.trim().length === 0) {
                console.error(CONFIG.texts.errorName);
                return;
            }
            name = name.trim();
            if (name.length > 200) {
                console.error('Product name too long (max 200 chars)');
                return;
            }

            // Validate price
            price = parseFloat(price);
            if (isNaN(price) || price < 0) {
                console.error(CONFIG.texts.errorPrice.replace('${name}', name));
                return;
            }

            const existing = state.cart.find(item => item.name === name);
            if (existing) {
                existing.qty++;
            } else {
                state.cart.push({ name, price, qty: 1 });
            }

            saveState();
            showToast(CONFIG.texts.addedToCart.replace('${name}', name));
            
            // Auto open if first item (optional, implies better UX)
            if (state.cart.length === 1 && state.cart[0].qty === 1) {
                this.open();
            }
        },

        remove: function(name) {
            state.cart = state.cart.filter(item => item.name !== name);
            saveState();
        },

        updateQty: function(name, delta) {
            const item = state.cart.find(i => i.name === name);
            if (!item) return;

            item.qty += delta;
            if (item.qty <= 0) {
                this.remove(name);
            } else {
                saveState();
            }
        },

        clear: function() {
            state.cart = [];
            saveState();
        },

        getCart: function() {
            return [...state.cart];
        },

        getTotal: function() {
            return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        },

        open: function() {
            state.isOpen = true;
            updateUI();
        },

        close: function() {
            state.isOpen = false;
            updateUI();
        },
        
        checkout: function() {
            if (state.cart.length === 0) return;

            // 1. Generate Order Summary
            const total = this.getTotal();
            const summary = [
                '--- ORDER DETAILS ---',
                ...state.cart.map(item => `${item.qty} x ${item.name}: ${formatPrice(item.price * item.qty)}`),
                '---------------------',
                `TOTAL: ${formatPrice(total)}`
            ].join('\n');

            // 2. Find the native Carrd form field
            // Priority: Config ID -> Config Class -> Name attribute -> ID -> Fuzzy Search
            let orderField = 
                document.querySelector(CONFIG.orderInputSelector) || 
                document.querySelector(CONFIG.orderInputClass) || 
                document.querySelector('[name="order-details"]') ||
                document.querySelector('#order-details');
            
            // Fuzzy fallback: look for any textarea with "order" in name or id
            if (!orderField) {
                const candidates = document.querySelectorAll('textarea');
                for (const el of candidates) {
                    const id = (el.id || '').toLowerCase();
                    const name = (el.name || '').toLowerCase();
                    if (id.includes('order') || name.includes('order') || id.includes('cart') || name.includes('cart')) {
                        orderField = el;
                        console.log('Carrd Cart: Found order field via fuzzy search:', el);
                        break;
                    }
                }
            }
            
            if (!orderField) {
                console.error(CONFIG.texts.consoleErrorForm);
                alert(CONFIG.texts.errorForm);
                return;
            }

            // 3. Populate Form
            orderField.value = summary;

            // 4. Close Cart Panel
            this.close();

            // 5. Navigate to Form Section
            // We use the hash '#shopping-cart' to trigger Carrd's internal script 
            // which handles efficient section switching/display.
            window.location.href = '#shopping-cart';
        },

        /**
         * Configure plugin options at runtime
         * @param {Object} options - Configuration options to merge
         */
        configure: function(options) {
            if (!options || typeof options !== 'object') return;
            const merged = deepMerge(CONFIG, options);
            Object.assign(CONFIG, merged);
            updateUI(); // Re-render with new settings
        },

        /**
         * Get current configuration
         * @returns {Object} - Current configuration object (copy)
         */
        getConfig: function() {
            return JSON.parse(JSON.stringify(CONFIG));
        }
    };

    // Expose Global Object
    window.CartPlugin = CartAPI;
    window.CarrdCart = CartAPI; // Alias for backward compatibility

    // ==========================================
    // UI INJECTION & RENDERING
    // ==========================================
    
    // Icons
    const ICONS = {
        cart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
        close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
        plus: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
        minus: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
    };

    // NOTE: Styles are now in carrd-cart.css. 
    // You must add that file to your site for the cart to look correct.

    function formatPrice(amount) {
        const fixed = amount.toFixed(2);
        return CONFIG.currencyPosition === 'before' 
            ? `${CONFIG.currency}${fixed}`
            : `${fixed}${CONFIG.currency}`;
    }

    function renderCartItems() {
        if (state.cart.length === 0) {
            return `<div style="text-align: center; padding: 40px 0; opacity: 0.6;">${escapeHtml(CONFIG.texts.empty)}</div>`;
        }
        return state.cart.map(item => {
            const safeName = escapeHtml(item.name);
            return `
            <div class="crt-item">
                <div class="crt-item-info">
                    <span class="crt-item-name">${safeName}</span>
                    <span class="crt-item-price">${formatPrice(item.price)}</span>
                </div>
                <div class="crt-controls">
                    <button class="crt-btn-qty" data-action="update-qty" data-name="${safeName}" data-qty="-1" aria-label="Decrease quantity for ${safeName}">${ICONS.minus}</button>
                    <span>${item.qty}</span>
                    <button class="crt-btn-qty" data-action="update-qty" data-name="${safeName}" data-qty="1" aria-label="Increase quantity for ${safeName}">${ICONS.plus}</button>
                    <button class="crt-btn-qty crt-btn-remove" style="margin-left:5px" data-action="remove" data-name="${safeName}" aria-label="Remove ${safeName} from cart">${ICONS.trash}</button>
                </div>
            </div>
        `;
        }).join('');
    }

    function updateUI() {
        const container = document.getElementById('crt-container');
        if (!container) return;

        const widget = container.querySelector('.crt-widget');
        const badge = container.querySelector('.crt-badge');
        const totalQty = state.cart.reduce((s, i) => s + i.qty, 0);

        // Update Visibility (Auto-hide if empty)
        if (state.cart.length > 0) {
            widget.classList.add('visible');
        } else {
            widget.classList.remove('visible');
        }

        // Update badge
        if (badge) {
            badge.textContent = totalQty;
            badge.style.display = totalQty > 0 ? 'block' : 'none';
        }

        // Update Panel State
        const overlay = container.querySelector('.crt-overlay');
        const panel = container.querySelector('.crt-panel');
        if (state.isOpen) {
            overlay.classList.add('open');
            panel.classList.add('open');
        } else {
            overlay.classList.remove('open');
            panel.classList.remove('open');
        }

        // Render Body
        const bodyContent = container.querySelector('.crt-body');
        const footerContent = container.querySelector('.crt-footer');
        const titleContent = container.querySelector('.crt-title');

        // Always render cart items (Checkout view is removed)
        titleContent.textContent = CONFIG.texts.title;
        bodyContent.innerHTML = renderCartItems();
        footerContent.style.display = 'block';
        container.querySelector('.crt-total-amount').textContent = formatPrice(CartAPI.getTotal());
        
        const checkoutBtn = container.querySelector('.crt-btn-checkout');
        if (checkoutBtn) {
            checkoutBtn.disabled = state.cart.length === 0;
            // Update button text to be more descriptive if needed, or keep as "Checkout"
            // checkoutBtn.textContent = 'Go to Checkout Form'; 
        }
    }

    function createWidget() {
        const div = document.createElement('div');
        div.id = 'crt-container';
        
        // Map position config to class
        const posMap = {
            'bottom-right': 'crt-pos-br',
            'top-right': 'crt-pos-tr',
            'bottom-left': 'crt-pos-bl',
            'bottom-center': 'crt-pos-bc'
        };
        const posClass = posMap[CONFIG.position] || 'crt-pos-br';

        div.innerHTML = `
            <div class="crt-widget ${posClass}" data-action="open" role="button" aria-label="Open Shopping Cart" tabindex="0">
                ${ICONS.cart}
                <div class="crt-badge" style="display:none">0</div>
            </div>
            <div class="crt-overlay" data-action="close"></div>
            <div class="crt-panel">
                <div class="crt-header">
                    <div class="crt-title">${CONFIG.texts.title}</div>
                    <button class="crt-close" data-action="close" aria-label="Close Cart">${ICONS.close}</button>
                </div>
                <div class="crt-body"></div>
                <div class="crt-footer">
                    <div class="crt-total-row">
                        <span>${CONFIG.texts.total}</span>
                        <span class="crt-total-amount">$0.00</span>
                    </div>
                    <button class="crt-btn-main crt-btn-checkout" data-action="checkout">${CONFIG.texts.checkout}</button>
                </div>
            </div>
            <div class="crt-toast"></div>
        `;
        document.body.appendChild(div);

        // Bind Events (Event Delegation)
        div.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-action]');
            if (!trigger) return;

            const action = trigger.dataset.action;
            const name = trigger.dataset.name;
            
            // Prevent default for buttons
            if (trigger.tagName === 'BUTTON') e.preventDefault();

            switch (action) {
                case 'open':
                    CartAPI.open();
                    break;
                case 'close':
                    CartAPI.close();
                    break;
                case 'checkout':
                    CartAPI.checkout();
                    break;
                case 'update-qty': {
                    const delta = parseInt(trigger.dataset.qty);
                    if (name && !isNaN(delta)) CartAPI.updateQty(name, delta);
                    break;
                }
                case 'remove':
                    if (name) CartAPI.remove(name);
                    break;
            }
        });
        
        // Handle Enter key on widget for accessibility
        div.addEventListener('keydown', (e) => {
             if (e.key === 'Enter' || e.key === ' ') {
                const trigger = e.target.closest('[data-action="open"]');
                if (trigger) {
                    e.preventDefault();
                    CartAPI.open();
                }
             }
        });
    }

    function showToast(msg) {
        const toast = document.querySelector('.crt-toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3000);
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================
    function init() {
        if (document.getElementById('crt-container')) return; // Prevent double init
        // Note: Styles are inject manually by user now
        createWidget();
        updateUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
