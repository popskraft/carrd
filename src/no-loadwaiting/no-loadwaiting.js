// No Load Waiting: force the ready state on DOMContentLoaded so animations run immediately after removing Carrd's loader.
(function () {
  "use strict";

  // Configuration constants
  var ANIMATION_DURATION_MS = 750;      // Duration for is-playing class
  var OBSERVER_TIMEOUT_MS = 5000;       // Auto-disconnect observers after this time
  var SCROLL_PULSE_INTERVAL_MS = 60;    // Interval between scroll/resize pulses
  var SCROLL_PULSE_COUNT = 10;          // Number of interval pulses
  var RAF_PULSE_COUNT = 4;              // Number of requestAnimationFrame pulses

  var initialized = false;
  var cachedBody = null;

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
    var body = getBody();
    if (!body) return;

    body.classList.remove("is-loading", "with-loader");

    if (!body.classList.contains("is-ready")) {
      // Add is-ready immediately so Lighthouse sees visible content (fixes NO_FCP)
      body.classList.add("is-ready");

      // Trigger Carrd's entry animations via is-playing class
      body.classList.add("is-playing");
      setTimeout(function () {
        body.classList.remove("is-playing");
      }, ANIMATION_DURATION_MS);
    }
  }

  function hideLoaderIfPresent() {
    var loader = document.getElementById("loader");
    if (!loader) return false;

    // Instead of removing, we just hide it.
    // This prevents "NotFoundError: Failed to execute 'removeChild'" if Carrd's native script
    // tries to remove it later.
    loader.style.cssText = "display:none !important; visibility:hidden !important; opacity:0 !important; pointer-events:none !important;";
    return true;
  }

  function kickScrollHandlers() {
    var pulses = 0;

    var timer = setInterval(function () {
      if (++pulses >= SCROLL_PULSE_COUNT) {
        clearInterval(timer);
        return;
      }
      dispatchLayoutEvents();
    }, SCROLL_PULSE_INTERVAL_MS);

    var rafPulses = 0;
    (function rafTick() {
      dispatchLayoutEvents();
      if (++rafPulses < RAF_PULSE_COUNT) requestAnimationFrame(rafTick);
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
    var body = getBody();
    if (!body) return;

    var classObserver = new MutationObserver(function () {
      if (body.classList.contains("with-loader")) {
        body.classList.remove("with-loader");
      }
    });

    var childObserver = new MutationObserver(function () {
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
    }, OBSERVER_TIMEOUT_MS);
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