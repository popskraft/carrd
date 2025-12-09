
/**
 * Carrd Shopping Cart Plugin - JS Logic
 * 
 * INSTRUCTIONS:
 * 1. JS: Copy this code (keeping the <script> tags) into a "Settings > Head" or "Embed" element.
 * 2. CSS: Copy the code from 'carrd-cart.css' into a separate "Embed" element (Type: Code, Style: Hidden Head).
 * 3. USAGE: Link a button to "On Click" -> CartPlugin.add('Item', 99)
 */

(function() {
    'use strict';

    // ==========================================
    // CONFIGURATION
    // ==========================================
    const CONFIG = {
        currency: '$',
        currencyPosition: 'before', // 'before' ($10) or 'after' (10$)
        storageKey: 'carrd_cart_v1',
        
        // Text labels for easy translation
        texts: {
            title: 'Shopping Cart',
            empty: 'Your cart is empty.',
            checkout: 'Checkout',
            total: 'Total',
            remove: 'Remove',
            required: 'Required',
        }
    };

    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
    let state = {
        cart: [],
        isOpen: false,
        isCheckout: false
    };

    // Load from local storage
    try {
        const stored = localStorage.getItem(CONFIG.storageKey);
        if (stored) {
            state.cart = JSON.parse(stored);
        }
    } catch (e) {
        console.warn('LocalStorage not available');
    }

    const saveState = () => {
        try {
            localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.cart));
        } catch (e) {}
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
            price = parseFloat(price);
            if (isNaN(price)) {
                console.error('Invalid price for ' + name);
                return;
            }

            const existing = state.cart.find(item => item.name === name);
            if (existing) {
                existing.qty++;
            } else {
                state.cart.push({ name, price, qty: 1 });
            }

            saveState();
            showToast(`Added "${name}" to cart`);
            
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
            state.isCheckout = false; // Reset to cart view
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
            // 2. Find the native Carrd form field
            // The user added a textarea with id="form-shopping-cart-order-details" (name="order-details")
            const orderField = document.getElementById('form-shopping-cart-order-details') || document.querySelector('[name="order-details"]');
            
            if (!orderField) {
                console.error('Carrd Cart: Could not find "Order Details" field (#form-shopping-cart-order-details). Please ensure it exists.');
                alert('Error: Could not find the order form. Please contact support.');
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
            return `<div style="text-align: center; padding: 40px 0; opacity: 0.6;">${CONFIG.texts.empty}</div>`;
        }
        return state.cart.map(item => `
            <div class="crt-item">
                <div class="crt-item-info">
                    <span class="crt-item-name">${item.name}</span>
                    <span class="crt-item-price">${formatPrice(item.price)}</span>
                </div>
                <div class="crt-controls">
                    <button class="crt-btn-qty" onclick="CartPlugin.updateQty('${item.name}', -1)">${ICONS.minus}</button>
                    <span>${item.qty}</span>
                    <button class="crt-btn-qty" onclick="CartPlugin.updateQty('${item.name}', 1)">${ICONS.plus}</button>
                    <button class="crt-btn-qty" style="margin-left:5px; color:#ef4444" onclick="CartPlugin.remove('${item.name}')">${ICONS.trash}</button>
                </div>
            </div>
        `).join('');
    }

    function updateUI() {
        const container = document.getElementById('crt-container');
        if (!container) return;

        // Update badge
        const totalQty = state.cart.reduce((s, i) => s + i.qty, 0);
        const badge = container.querySelector('.crt-badge');
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
        container.querySelector('.crt-total-amount').textContent = formatPrice(CartPlugin.getTotal());
        
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
        div.innerHTML = `
            <div class="crt-widget" onclick="CartPlugin.open()">
                ${ICONS.cart}
                <div class="crt-badge" style="display:none">0</div>
            </div>
            <div class="crt-overlay" onclick="CartPlugin.close()"></div>
            <div class="crt-panel">
                <div class="crt-header">
                    <h2 class="crt-title">${CONFIG.texts.title}</h2>
                    <button class="crt-close" onclick="CartPlugin.close()">${ICONS.close}</button>
                </div>
                <div class="crt-body"></div>
                <div class="crt-footer">
                    <div class="crt-total-row">
                        <span>${CONFIG.texts.total}</span>
                        <span class="crt-total-amount">$0.00</span>
                    </div>
                    <button class="crt-btn-main crt-btn-checkout" onclick="CartPlugin.checkout()">${CONFIG.texts.checkout}</button>
                </div>
            </div>
            <div class="crt-toast"></div>
        `;
        document.body.appendChild(div);
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

