/*
 * Plugin: No Load Waiting
 * Version: 0.0.0
 * Purpose: Mark the page ready immediately and skip loader delays.
 * Admin placement: Code element in BODY END.
 */
(function () {
  "use strict";

  // ==========================================
  // CONFIGURATION
  // ==========================================
  
  const DEFAULTS = {
    animationDuration: 750,      // Duration for is-playing class (ms)
    observerTimeout: 5000,       // Auto-disconnect observers after this time (ms)
    scrollPulseInterval: 60,     // Interval between scroll/resize pulses (ms)
    scrollPulseCount: 10,        // Number of interval pulses
    rafPulseCount: 4             // Number of requestAnimationFrame pulses
  };

  // Merge with external options
  const externalOptions = (typeof window !== 'undefined' && 
    window.CarrdPluginOptions && 
    window.CarrdPluginOptions.noLoadwaiting) || {};
    
  const CONFIG = {};
  for (const key in DEFAULTS) {
    CONFIG[key] = Object.prototype.hasOwnProperty.call(externalOptions, key)
      ? externalOptions[key]
      : DEFAULTS[key];
  }

  // ==========================================
  // PLUGIN LOGIC
  // ==========================================

  let initialized = false;
  let cachedBody = null;

  function getBody() {
    if (cachedBody && cachedBody.isConnected) return cachedBody;
    cachedBody = document.body;
    return cachedBody;
  }

  // FIX for Lighthouse NO_FCP error:
  // Carrd's default CSS hides the body with `opacity: 0` until `is-ready` class is present.
  // Previously, `is-ready` was added after a 750ms delay, causing Lighthouse to see
  // an invisible page during its First Contentful Paint measurement window.
  // Now we add `is-ready` immediately to ensure content is visible from the start.
  // The `is-playing` class is kept for visual animation purposes but no longer
  // blocks the initial paint.
  function markReadyNow() {
    const body = getBody();
    if (!body) return;

    body.classList.remove("is-loading", "with-loader");

    if (!body.classList.contains("is-ready")) {
      // Add is-ready immediately so Lighthouse sees visible content (fixes NO_FCP)
      body.classList.add("is-ready");

      // Trigger Carrd's entry animations via is-playing class
      body.classList.add("is-playing");
      setTimeout(function () {
        body.classList.remove("is-playing");
      }, CONFIG.animationDuration);
    }
  }

  function hideLoaderIfPresent() {
    const loader = document.getElementById("loader");
    if (!loader) return false;

    // Instead of removing, we just hide it.
    // This prevents "NotFoundError: Failed to execute 'removeChild'" if Carrd's native script
    // tries to remove it later.
    loader.style.cssText = "display:none !important; visibility:hidden !important; opacity:0 !important; pointer-events:none !important;";
    return true;
  }

  function kickScrollHandlers() {
    let pulses = 0;

    const timer = setInterval(function () {
      if (++pulses >= CONFIG.scrollPulseCount) {
        clearInterval(timer);
        return;
      }
      dispatchLayoutEvents();
    }, CONFIG.scrollPulseInterval);

    let rafPulses = 0;
    (function rafTick() {
      dispatchLayoutEvents();
      if (++rafPulses < CONFIG.rafPulseCount) requestAnimationFrame(rafTick);
    })();
  }

  function dispatchLayoutEvents() {
    try {
      window.dispatchEvent(new Event("resize"));
      window.dispatchEvent(new Event("scroll"));
    } catch (e) {
      /* ignore */
    }
  }

  function setupObservers() {
    const body = getBody();
    if (!body) return;

    const classObserver = new MutationObserver(function () {
      if (body.classList.contains("with-loader")) {
        body.classList.remove("with-loader");
      }
    });

    const childObserver = new MutationObserver(function () {
      if (hideLoaderIfPresent()) {
        childObserver.disconnect();
      }
    });

    classObserver.observe(body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    childObserver.observe(body, { childList: true });

    setTimeout(function () {
      classObserver.disconnect();
      childObserver.disconnect();
    }, CONFIG.observerTimeout);
  }

  function init() {
    if (initialized) return;
    initialized = true;

    try {
      markReadyNow();
      hideLoaderIfPresent();
      setupObservers();
      kickScrollHandlers();
    } catch (e) {
      console.warn("early-animate-override failed:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
