/*
 * Plugin: Cookie Banner
 * Version: 0.1.10aaaaaaaaaaaaaaaaaaaaa
 * Purpose: Shows a banner with id='cookie-baner' until first acceptance.
 *          After acceptance, hides it for 1 year (via cookie).
 * Admin placement: Code element in BODY END.
 *
 * Usage:
 * 1. Add an element with id='cookie-baner' to the page (Columns block)
 * 2. Inside, there should be an accept button/link (first <a> with role='button')
 * 3. Include this script before </body>
 */
(function() {
  'use strict';

  // ==========================================
  // CONFIGURATION
  // ==========================================

  const DEFAULTS = {
    bannerId: 'cookie-baner',       // Banner element ID
    cookieName: 'cookies_accepted', // Cookie name for storing consent
    cookieDays: 7,                  // Cookie lifetime in days
    fadeOutDuration: 300,           // Fade-out animation duration (ms)
    fadeInDuration: 400,            // Fade-in animation duration (ms)
    showDelay: 1000,                // Delay before showing banner (ms) - allows page to fully load
    position: 'bottom-left'         // Position: bottom-left, bottom-right, bottom-center, top-left, top-right, top-center
  };

  // Merge with external options via standard window.CarrdPluginOptions
  const externalOptions =
    (typeof window !== 'undefined' &&
      window.CarrdPluginOptions &&
      window.CarrdPluginOptions.cookieBanner) ||
    {};

  const CONFIG = {};
  for (const key in DEFAULTS) {
    if (Object.prototype.hasOwnProperty.call(DEFAULTS, key)) {
      CONFIG[key] = Object.prototype.hasOwnProperty.call(externalOptions, key)
        ? externalOptions[key]
        : DEFAULTS[key];
    }
  }

  // ==========================================
  // HELPER FUNCTIONS (Cookie utilities)
  // ==========================================

  /**
   * Get cookie value by name
   * @param {string} name - Cookie name
   * @returns {string|null} - Value or null
   */
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  /**
   * Set a cookie
   * @param {string} name - Cookie name
   * @param {string} value - Cookie value
   * @param {number} days - Lifetime in days
   */
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/; SameSite=Lax';
  }

  // ==========================================
  // POSITIONING (Styles for different positions)
  // ==========================================

  /**
   * Get positioning styles
   * @param {string} position - Banner position
   * @returns {Object} - CSS properties object
   */
  function getPositionStyles(position) {
    const base = {
      position: 'fixed',
      zIndex: '9999',
      margin: '0',
      maxWidth: 'calc(100vw - 2rem)'
    };

    switch (position) {
      case 'bottom-right':
        base.bottom = '1rem';
        base.right = '1rem';
        base.left = 'auto';
        base.top = 'auto';
        break;
      case 'bottom-center':
        base.bottom = '1rem';
        base.left = '50%';
        base.right = 'auto';
        base.top = 'auto';
        base.transform = 'translateX(-50%)';
        break;
      case 'top-left':
        base.top = '1rem';
        base.left = '1rem';
        base.bottom = 'auto';
        base.right = 'auto';
        break;
      case 'top-right':
        base.top = '1rem';
        base.right = '1rem';
        base.bottom = 'auto';
        base.left = 'auto';
        break;
      case 'top-center':
        base.top = '1rem';
        base.left = '50%';
        base.right = 'auto';
        base.bottom = 'auto';
        base.transform = 'translateX(-50%)';
        break;
      case 'bottom-left':
      default:
        base.bottom = '1rem';
        base.left = '1rem';
        base.right = 'auto';
        base.top = 'auto';
        break;
    }

    return base;
  }

  /**
   * Apply styles object to element
   * @param {HTMLElement} element - DOM element
   * @param {Object} styles - CSS properties object
   */
  function applyStyles(element, styles) {
    for (const prop in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, prop)) {
        element.style[prop] = styles[prop];
      }
    }
  }

  // ==========================================
  // MAIN PLUGIN LOGIC
  // ==========================================

  /**
   * Accept cookies and hide banner
   * @param {HTMLElement} banner - Banner element
   */
  function acceptCookies(banner) {
    // Save consent to cookie
    setCookie(CONFIG.cookieName, '1', CONFIG.cookieDays);

    // Smooth fade-out effect
    banner.style.transition = 'opacity ' + CONFIG.fadeOutDuration + 'ms ease';
    banner.style.opacity = '0';

    // After animation completes — fully hide
    setTimeout(function() {
      banner.style.display = 'none';
    }, CONFIG.fadeOutDuration);
  }

  /**
   * Initialize the banner
   */
  function init() {
    // If cookie already set — hide banner and exit
    if (getCookie(CONFIG.cookieName) === '1') {
      const existingBanner = document.getElementById(CONFIG.bannerId);
      if (existingBanner) {
        existingBanner.style.display = 'none';
      }
      return;
    }

    // Find banner by ID
    const banner = document.getElementById(CONFIG.bannerId);
    if (!banner) {
      // Banner not found — do nothing (maybe not needed on this page)
      return;
    }

    if (banner.dataset.cookieBannerInitialized === 'true') return;
    banner.dataset.cookieBannerInitialized = 'true';

    // Apply positioning styles
    const positionStyles = getPositionStyles(CONFIG.position);
    applyStyles(banner, positionStyles);

    // Find accept button (priority: role='button', then .icons-component a, then any a)
    const acceptBtn =
      banner.querySelector('a[role="button"]') ||
      banner.querySelector('.icons-component a') ||
      banner.querySelector('a');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function(e) {
        e.preventDefault();
        acceptCookies(banner);
      });
    }

    // Initially hide the banner for smooth fade-in
    banner.style.display = '';
    banner.style.visibility = 'visible';
    banner.style.opacity = '0';
    banner.style.transition = 'opacity ' + CONFIG.fadeInDuration + 'ms ease';

    // Show banner after delay to ensure page is fully loaded and animation works
    setTimeout(function() {
      banner.style.opacity = '1';
    }, CONFIG.showDelay);
  }

  // ==========================================
  // RUN (after DOM is loaded)
  // ==========================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
