/*
 * Plugin: Header Nav
 * Version: 0.1.8aaaaaaaaaaa
 * Purpose: Mobile hamburger toggle for #site-header navigation.
 * Admin placement: Code element in BODY END.
 */
(function() {
  'use strict';

  // ==========================================
  // CONFIGURATION
  // ==========================================

  const DEFAULTS = {
    headerId: 'site-header',
    navId: 'site-header-nav',
    breakpoint: 736,
    closeOnLinkClick: true,
    navMaxHeight: '60vh',
    animationDuration: 300
  };

  const externalOptions = (typeof window !== 'undefined' &&
    window.CarrdPluginOptions &&
    window.CarrdPluginOptions.headerNav) || {};

  const CONFIG = { ...DEFAULTS, ...externalOptions };

  const CLASSES = {
    root: 'theme-header-nav',
    toggle: 'theme-header-nav-toggle',
    bar: 'theme-header-nav-bar',
    open: 'is-nav-open',
    mobile: 'is-mobile'
  };

  // ==========================================
  // SETUP
  // ==========================================

  function createToggleButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = CLASSES.toggle;
    button.setAttribute('aria-label', 'Toggle navigation');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', CONFIG.navId);

    for (let i = 0; i < 3; i += 1) {
      const bar = document.createElement('span');
      bar.className = CLASSES.bar;
      button.appendChild(bar);
    }

    return button;
  }

  function init() {
    const header = document.getElementById(CONFIG.headerId);
    const nav = document.getElementById(CONFIG.navId);

    if (!header || !nav) return;
    if (header.dataset.headerNavInitialized === 'true') return;

    header.dataset.headerNavInitialized = 'true';
    header.classList.add(CLASSES.root);
    header.style.setProperty('--mini-header-nav-duration', CONFIG.animationDuration + 'ms');
    header.style.setProperty('--mini-header-nav-max-height', CONFIG.navMaxHeight);
    const initialHeaderHeight = header.style.height;
    const initialHeaderMaxHeight = header.style.maxHeight;

    const toggle = createToggleButton();
    header.appendChild(toggle);

    nav.setAttribute('aria-hidden', 'true');

    const setOpenState = (isOpen) => {
      header.classList.toggle(CLASSES.open, isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      nav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

      if (isOpen) {
        header.style.height = 'auto';
        header.style.maxHeight = 'none';
        const navHeight = nav.scrollHeight;
        if (navHeight) {
          header.style.setProperty('--mini-header-nav-max-height', navHeight + 'px');
        }
      } else {
        header.style.height = initialHeaderHeight;
        header.style.maxHeight = initialHeaderMaxHeight;
      }
    };

    const updateViewportState = () => {
      const isMobile = window.innerWidth <= CONFIG.breakpoint;
      header.classList.toggle(CLASSES.mobile, isMobile);

      if (!isMobile) {
        setOpenState(false);
      }
    };

    toggle.addEventListener('click', () => {
      if (!header.classList.contains(CLASSES.mobile)) return;
      const isOpen = header.classList.contains(CLASSES.open);
      setOpenState(!isOpen);
    });

    if (CONFIG.closeOnLinkClick) {
      nav.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;
        if (!header.classList.contains(CLASSES.mobile)) return;
        setOpenState(false);
      });
    }

    window.addEventListener('resize', updateViewportState);
    updateViewportState();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
