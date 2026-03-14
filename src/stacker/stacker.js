/*
 * Plugin: Stacker
 * Version: 0.1.13
 * Purpose: Cluster consecutive containers into an overlapping sticky card stack.
 * Admin placement: Code element in BODY END.
 *
 * NOTE: Cannot use position:sticky because Carrd's .site-wrapper has
 * overflow:hidden. This plugin uses scroll-driven transforms instead.
 *
 * Cards keep their native Carrd margins. No spacers are injected.
 * The wrapper simply groups consecutive .stacker siblings, and JS
 * applies translateY on scroll to simulate sticky overlap behavior.
 */
(function() {
  'use strict';

  var DEFAULTS = {
    enabled: true,
    selector: '.stacker',
    top: 180,
    overlap: 0,
    gap: 0,
    zIndexBase: 10,
    breakpoints: {}
  };

  var externalOptions = (typeof window !== 'undefined' &&
    window.CarrdPluginOptions &&
    window.CarrdPluginOptions.stacker) || {};

  var BASE_CONFIG = Object.assign({}, DEFAULTS, externalOptions, {
    breakpoints: Object.assign({}, DEFAULTS.breakpoints, externalOptions.breakpoints || {})
  });

  var INSTANCE_CONFIGS = externalOptions.instances || {};

  var SELECTORS = {
    clusterClass: 'theme-stacker-cluster',
    itemClass: 'theme-stacker-item'
  };

  var STACKER_INSTANCES = [];

  function readLength(value) {
    var parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  /* ── Find consecutive sibling groups ── */
  function findClusters(selector) {
    var items = document.querySelectorAll(selector);
    var clusters = [];
    var processed = new Set();

    items.forEach(function(item) {
      if (processed.has(item)) return;
      if (item.dataset.stackerInitialized === 'true') return;
      if (item.closest('.' + SELECTORS.clusterClass)) return;

      var cluster = [item];
      processed.add(item);

      var sibling = item.nextElementSibling;
      while (sibling && sibling.matches && sibling.matches(selector)) {
        if (processed.has(sibling) || sibling.dataset.stackerInitialized === 'true') break;
        cluster.push(sibling);
        processed.add(sibling);
        sibling = sibling.nextElementSibling;
      }

      if (cluster.length > 1) {
        clusters.push(cluster);
      }
    });

    return clusters;
  }

  /* ── Build per-instance config ── */
  function buildInstanceConfig(instanceId) {
    var instanceOptions = (instanceId && INSTANCE_CONFIGS[instanceId]) || {};

    return Object.assign({}, BASE_CONFIG, instanceOptions, {
      breakpoints: Object.assign(
        {}, BASE_CONFIG.breakpoints,
        (instanceOptions.breakpoints || {})
      )
    });
  }

  /* ── Resolve responsive values ── */
  function resolveResponsiveConfig(config) {
    var resolved = {
      top: config.top,
      overlap: config.overlap,
      gap: config.gap
    };

    var breakpointKeys = Object.keys(config.breakpoints || {})
      .map(Number)
      .sort(function(a, b) { return a - b; });

    breakpointKeys.forEach(function(bp) {
      if (window.innerWidth < bp) return;
      var bpc = config.breakpoints[bp] || {};

      if (Object.prototype.hasOwnProperty.call(bpc, 'top')) resolved.top = bpc.top;
      if (Object.prototype.hasOwnProperty.call(bpc, 'overlap')) resolved.overlap = bpc.overlap;
      if (Object.prototype.hasOwnProperty.call(bpc, 'gap')) resolved.gap = bpc.gap;
    });

    return resolved;
  }

  /* ── Debounce helper ── */
  function debounce(fn, delay) {
    var timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  /* ── StackerCluster class ── */
  function StackerCluster(items, config, instanceId) {
    this.items = items;
    this.config = config;
    this.instanceId = instanceId;
    this.wrapper = null;
    this._originalMargins = [];
    this._cardOffsets = [];
    this._cardHeights = [];
    this._wrapperTop = 0;
    this._ticking = false;

    this._resizeHandler = debounce(this._recalcLayout.bind(this), 100);
    this._scrollHandler = this._onScroll.bind(this);

    this.init();
  }

  StackerCluster.prototype.init = function() {
    this._saveOriginalMargins();
    this.createWrapper();
    this.wrapItems();
    this.bindEvents();
    this._recalcLayout();
  };

  StackerCluster.prototype._saveOriginalMargins = function() {
    var self = this;
    this.items.forEach(function(item) {
      var style = window.getComputedStyle(item);
      self._originalMargins.push({
        top: readLength(style.marginTop),
        bottom: readLength(style.marginBottom)
      });
    });
  };

  StackerCluster.prototype.createWrapper = function() {
    if (!this.items.length || !this.items[0].parentNode) return;

    this.wrapper = document.createElement('div');
    this.wrapper.className = SELECTORS.clusterClass;
    this.wrapper.dataset.stackerCluster = 'true';

    if (this.instanceId) {
      this.wrapper.dataset.stackerId = this.instanceId;
    }

    /* Preserve the first item's top margin and last item's bottom margin on the wrapper */
    var firstMargin = this._originalMargins[0];
    var lastMargin = this._originalMargins[this._originalMargins.length - 1];
    this.wrapper.style.marginTop = firstMargin.top + 'px';
    this.wrapper.style.marginBottom = lastMargin.bottom + 'px';

    this.items[0].parentNode.insertBefore(this.wrapper, this.items[0]);
  };

  StackerCluster.prototype.wrapItems = function() {
    if (!this.wrapper) return;
    var self = this;

    this.items.forEach(function(item, index) {
      item.dataset.stackerInitialized = 'true';
      item.dataset.stackerIndex = String(index);
      item.classList.add(SELECTORS.itemClass);
      item.style.setProperty('--theme-stacker-z-index', String(self.config.zIndexBase + index));

      self.wrapper.appendChild(item);
    });
  };

  StackerCluster.prototype.bindEvents = function() {
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
    window.addEventListener('resize', this._resizeHandler);
    window.addEventListener('orientationchange', this._resizeHandler);
    window.addEventListener('load', this._resizeHandler);
  };

  /**
   * Recalculate all layout measurements.
   * Called on init, resize, orientation change.
   */
  StackerCluster.prototype._recalcLayout = function() {
    if (!this.wrapper) return;

    var responsive = resolveResponsiveConfig(this.config);
    this._stickyTop = Number.isFinite(Number(responsive.top)) ? Number(responsive.top) : DEFAULTS.top;
    this._overlap = Number.isFinite(Number(responsive.overlap)) ? Number(responsive.overlap) : DEFAULTS.overlap;
    this._gap = Number.isFinite(Number(responsive.gap)) ? Number(responsive.gap) : DEFAULTS.gap;

    /* Expose resolved values as CSS custom properties */
    this.wrapper.style.setProperty('--theme-stacker-top-current', this._stickyTop + 'px');
    this.wrapper.style.setProperty('--theme-stacker-overlap-current', this._overlap + 'px');
    this.wrapper.style.setProperty('--theme-stacker-gap-current', this._gap + 'px');

    /* Reset transforms so we can measure natural positions */
    var i;
    for (i = 0; i < this.items.length; i++) {
      this.items[i].style.transform = '';
    }

    /* Measure card heights and natural offsets within wrapper */
    var wrapperRect = this.wrapper.getBoundingClientRect();
    this._wrapperTop = wrapperRect.top + window.pageYOffset;
    this._cardHeights = [];
    this._cardOffsets = [];
    for (i = 0; i < this.items.length; i++) {
      var cardRect = this.items[i].getBoundingClientRect();
      this._cardHeights.push(cardRect.height);
      this._cardOffsets.push(cardRect.top + window.pageYOffset - this._wrapperTop);
    }

    /* Apply scroll transforms immediately */
    this._applyTransforms();
  };

  /**
   * Scroll handler — request animation frame for smooth updates.
   */
  StackerCluster.prototype._onScroll = function() {
    if (this._ticking) return;
    this._ticking = true;
    var self = this;
    requestAnimationFrame(function() {
      self._ticking = false;
      self._applyTransforms();
    });
  };

  /**
   * Core stacking logic.
   *
   * Each card has a natural document position. When scrolling causes that
   * position to pass the stickyTop line, we apply translateY to hold it
   * at stickyTop. The card stays pinned until the wrapper scrolls out,
   * at which point maxTranslate caps the movement and everything scrolls
   * away together.
   *
   * Because later cards have higher z-index, when card N+1 reaches
   * stickyTop it visually covers card N — creating the overlap effect.
   */
  StackerCluster.prototype._applyTransforms = function() {
    if (!this.wrapper) return;

    var scrollY = window.pageYOffset;
    var stickyTop = this._stickyTop;
    var wrapperHeight = this.wrapper.offsetHeight;

    for (var i = 0; i < this.items.length; i++) {
      /* Scroll position at which this card's top edge reaches stickyTop */
      var naturalDocTop = this._wrapperTop + this._cardOffsets[i];
      var pinScrollY = naturalDocTop - stickyTop;

      /* How far past the pin point we've scrolled */
      var scrollPast = scrollY - pinScrollY;

      if (scrollPast <= 0) {
        /* Card hasn't reached stickyTop yet — no transform */
        this.items[i].style.transform = 'translateY(0)';
      } else {
        /* Pin the card at stickyTop.
           Cap so the card doesn't translate beyond the wrapper bottom,
           allowing the whole cluster to scroll away naturally. */
        var cardBottom = this._cardOffsets[i] + this._cardHeights[i];
        var maxTranslate = Math.max(0, wrapperHeight - cardBottom);

        var translateY = Math.min(scrollPast, maxTranslate);
        this.items[i].style.transform = 'translateY(' + translateY + 'px)';
      }
    }
  };

  StackerCluster.prototype.destroy = function() {
    if (!this.wrapper || !this.wrapper.parentNode) return;

    window.removeEventListener('scroll', this._scrollHandler);
    window.removeEventListener('resize', this._resizeHandler);
    window.removeEventListener('orientationchange', this._resizeHandler);
    window.removeEventListener('load', this._resizeHandler);

    var parent = this.wrapper.parentNode;
    var referenceNode = this.wrapper;

    /* Restore items */
    var self = this;
    this.items.forEach(function(item, index) {
      item.classList.remove(SELECTORS.itemClass);
      item.style.removeProperty('--theme-stacker-z-index');
      item.style.transform = '';
      item.removeAttribute('data-stacker-initialized');
      item.removeAttribute('data-stacker-index');

      if (self._originalMargins[index]) {
        item.style.marginTop = self._originalMargins[index].top + 'px';
        item.style.marginBottom = self._originalMargins[index].bottom + 'px';
      }

      parent.insertBefore(item, referenceNode);
    });

    this.wrapper.remove();
    this.wrapper = null;
  };

  /* ── Registry ── */
  function registerInstance(instance, items, instanceId) {
    STACKER_INSTANCES.push({ instance: instance, items: items, instanceId: instanceId });
  }

  function destroyById(instanceId) {
    var index = STACKER_INSTANCES.findIndex(function(entry) {
      return entry.instanceId === instanceId;
    });
    if (index === -1) return false;

    STACKER_INSTANCES[index].instance.destroy();
    STACKER_INSTANCES.splice(index, 1);
    return true;
  }

  function destroyAll() {
    STACKER_INSTANCES.slice().forEach(function(entry) {
      entry.instance.destroy();
    });
    STACKER_INSTANCES.length = 0;
  }

  function getInstances() {
    return STACKER_INSTANCES.map(function(entry) { return entry.instance; });
  }

  /* ── Init ── */
  function init() {
    if (BASE_CONFIG.enabled === false) return;

    var clusters = findClusters(BASE_CONFIG.selector);

    clusters.forEach(function(cluster) {
      var instanceId = cluster[0].dataset.stackerId || '';
      var config = buildInstanceConfig(instanceId);
      var instance = new StackerCluster(cluster, config, instanceId);
      registerInstance(instance, cluster, instanceId);
    });
  }

  window.CarrdStacker = {
    init: init,
    destroyAll: destroyAll,
    destroyById: destroyById,
    getInstances: getInstances
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
