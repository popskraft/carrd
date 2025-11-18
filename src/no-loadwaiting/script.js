// No Load Waiting: force the ready state on DOMContentLoaded so animations run immediately after removing Carrd's loader.
(function () {
  "use strict";

  var initialized = false;
  var cachedBody = null;

  function getBody() {
    if (cachedBody && cachedBody.isConnected) return cachedBody;
    cachedBody = document.body;
    return cachedBody;
  }

  function markReadyNow() {
    var body = getBody();
    if (!body) return;

    body.classList.remove("is-loading", "with-loader");

    if (!body.classList.contains("is-ready")) {
      body.classList.add("is-playing");
      setTimeout(function () {
        body.classList.remove("is-playing");
        body.classList.add("is-ready");
      }, 750);
    }
  }

  function hideLoaderIfPresent() {
    var loader = document.getElementById("loader");
    if (!loader) return false;

    if (typeof loader.remove === "function") {
      loader.remove();
    } else {
      loader.style.cssText = "display:none; visibility:hidden; opacity:0";
    }
    return true;
  }

  function kickScrollHandlers() {
    var pulses = 0;
    var maxPulses = 10;

    var timer = setInterval(function () {
      if (++pulses >= maxPulses) {
        clearInterval(timer);
        return;
      }
      dispatchLayoutEvents();
    }, 60);

    var rafPulses = 0;
    (function rafTick() {
      dispatchLayoutEvents();
      if (++rafPulses < 4) requestAnimationFrame(rafTick);
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
    }, 5000);
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
