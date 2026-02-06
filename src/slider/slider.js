/*
 * Plugin: Slider
 * Version: 0.1.8aaaaaaaaaaaaaa
 * Purpose: Slider/carousel behavior for consecutive `.slider` containers.
 * Admin placement: Code element in BODY END.
 *
 * Features:
 * - Touch swipe support
 * - Mouse drag support
 * - Navigation dots
 * - Optional arrow navigation
 * - Responsive slidesPerView with breakpoints
 */
(function() {
  'use strict';

  // ==========================================
  // CONFIGURATION
  // ==========================================
  
  const DEFAULTS = {
    showDots: true,
    showArrows: true,
    loop: false,
    autoplay: false,
    autoplayInterval: 5000,
    dragThreshold: 50,
    snapThreshold: 0.3,
    gap: 16, // Gap between slides in pixels
    // Responsive slides per view
    slidesPerView: 1,
    peek: 0, // Fraction of next slide to show (e.g. 0.1 for 10%)
    equalHeight: true, // Stretch slides to same height
    breakpoints: {
      // Tablet/Mobile (737px+)
      737: { slidesPerView: 3 },
      // Desktop M (1280px+)
      1280: { slidesPerView: 4 }
    }
  };

  // Merge with external options
  const externalOptions = (typeof window !== 'undefined' && 
    window.CarrdPluginOptions && 
    window.CarrdPluginOptions.slider) || {};
  
  // Deep merge for breakpoints
  const BASE_CONFIG = { 
    ...DEFAULTS, 
    ...externalOptions,
    breakpoints: { ...DEFAULTS.breakpoints, ...(externalOptions.breakpoints || {}) }
  };
  const INSTANCE_CONFIGS = externalOptions.instances || {};
  
  const SELECTORS = {
    slideSelector: '.slider',
    wrapperClass: 'theme-slider-wrapper',
    trackClass: 'theme-slider-track',
    slideClass: 'theme-slider-slide',
    dotsContainerClass: 'theme-slider-dots',
    dotClass: 'theme-slider-dot',
    navClass: 'theme-slider-nav',
    navPrevClass: 'theme-slider-nav--prev',
    navNextClass: 'theme-slider-nav--next'
  };

  // ==========================================
  // ICONS
  // ==========================================
  
  const ICONS = {
    prev: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    next: `<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"></polyline></svg>`
  };
  const SLIDER_INSTANCES = [];

  // ==========================================
  // SLIDER CLASS
  // ==========================================
  
  class Slider {
    constructor(slides, config) {
      this.slides = slides;
      this.config = config;
      this.currentIndex = 0;
      this.isDragging = false;
      this.startX = 0;
      this.currentX = 0;
      this.translateX = 0;
      this.autoplayTimer = null;
      this.slidesPerView = this.config.slidesPerView;
      this.eventHandlers = [];
      this.dotHandlers = [];
      this.resizeTimeout = null;
      
      this.init();
    }
    
    init() {
      this.createWrapper();
      this.createTrack();
      this.wrapSlides();
      
      if (this.config.showDots && this.slides.length > 1) {
        this.createDots();
      }
      
      if (this.config.showArrows && this.slides.length > 1) {
        this.createArrows();
      }
      
      this.bindEvents();
      this.updateSlidesPerView();
      this.updateSlider();
      
      if (this.config.autoplay && this.slides.length > 1) {
        this.startAutoplay();
      }
    }
    
    createWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.className = SELECTORS.wrapperClass;
      
      if (this.config.equalHeight) {
        this.wrapper.classList.add('is-equal-height');
      }
      
      // Insert wrapper before first slide
      this.slides[0].parentNode.insertBefore(this.wrapper, this.slides[0]);
    }
    
    createTrack() {
      this.track = document.createElement('div');
      this.track.className = SELECTORS.trackClass;
      this.wrapper.appendChild(this.track);
    }
    
    wrapSlides() {
      this.slides.forEach((slide, index) => {
        const slideWrapper = document.createElement('div');
        slideWrapper.className = SELECTORS.slideClass;
        slideWrapper.dataset.slideIndex = index;
        
        // Move the container into the slide wrapper
        slideWrapper.appendChild(slide);
        this.track.appendChild(slideWrapper);
      });
      
      this.slideElements = Array.from(this.track.querySelectorAll(`.${SELECTORS.slideClass}`));
    }
    
    createDots() {
      this.dotsContainer = document.createElement('div');
      this.dotsContainer.className = SELECTORS.dotsContainerClass;
      
      // Dots will be regenerated based on slidesPerView
      this.wrapper.appendChild(this.dotsContainer);
    }
    
    updateDots() {
      if (!this.dotsContainer) return;
      
      // Clear existing dots
      this.clearDotListeners();
      this.dotsContainer.innerHTML = '';
      
      // Calculate number of "pages"
      const totalPages = this.getTotalPages();
      
      if (totalPages <= 1) {
        this.dotsContainer.style.display = 'none';
        return;
      }
      
      this.dotsContainer.style.display = 'flex';
      
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.className = SELECTORS.dotClass;
        if (i === this.currentIndex) {
          dot.classList.add('is-active');
        }
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.dataset.index = i;
        
        const handler = () => this.goToSlide(i);
        dot.addEventListener('click', handler);
        this.dotHandlers.push({ element: dot, handler });
        
        this.dotsContainer.appendChild(dot);
      }
      
      this.dots = this.dotsContainer.querySelectorAll('.' + SELECTORS.dotClass);
    }
    
    createArrows() {
      // Previous button
      this.prevBtn = document.createElement('button');
      this.prevBtn.className = SELECTORS.navClass + ' ' + SELECTORS.navPrevClass;
      this.prevBtn.setAttribute('aria-label', 'Previous slide');
      this.prevBtn.innerHTML = ICONS.prev;
      this.prevHandler = () => this.prev();
      this.addListener(this.prevBtn, 'click', this.prevHandler);
      
      // Next button
      this.nextBtn = document.createElement('button');
      this.nextBtn.className = SELECTORS.navClass + ' ' + SELECTORS.navNextClass;
      this.nextBtn.setAttribute('aria-label', 'Next slide');
      this.nextBtn.innerHTML = ICONS.next;
      this.nextHandler = () => this.next();
      this.addListener(this.nextBtn, 'click', this.nextHandler);
      
      this.wrapper.appendChild(this.prevBtn);
      this.wrapper.appendChild(this.nextBtn);
    }
    
    bindEvents() {
      const dragTarget = this.wrapper;
      this.onDragStartHandler = this.onDragStart.bind(this);
      this.onDragMoveHandler = this.onDragMove.bind(this);
      this.onDragEndHandler = this.onDragEnd.bind(this);
      this.onDragPreventHandler = (e) => e.preventDefault();
      
      // Touch events (capture to avoid inner elements blocking the drag start)
      this.addListener(dragTarget, 'touchstart', this.onDragStartHandler, { passive: true, capture: true });
      this.addListener(dragTarget, 'touchmove', this.onDragMoveHandler, { passive: false, capture: true });
      this.addListener(dragTarget, 'touchend', this.onDragEndHandler, { capture: true });
      this.addListener(dragTarget, 'touchcancel', this.onDragEndHandler, { capture: true });
      
      // Mouse events
      this.addListener(dragTarget, 'mousedown', this.onDragStartHandler, { capture: true });
      this.addListener(dragTarget, 'mousemove', this.onDragMoveHandler, { capture: true });
      this.addListener(dragTarget, 'mouseup', this.onDragEndHandler, { capture: true });
      this.addListener(dragTarget, 'mouseleave', this.onDragEndHandler, { capture: true });
      
      // Prevent image dragging
      this.addListener(dragTarget, 'dragstart', this.onDragPreventHandler);
      
      // Keyboard navigation
      this.wrapper.setAttribute('tabindex', '0');
      this.onKeydownHandler = (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      };
      this.addListener(this.wrapper, 'keydown', this.onKeydownHandler);
      
      // Pause autoplay on hover
      if (this.config.autoplay) {
        this.onMouseEnterHandler = () => this.stopAutoplay();
        this.onMouseLeaveHandler = () => this.startAutoplay();
        this.addListener(this.wrapper, 'mouseenter', this.onMouseEnterHandler);
        this.addListener(this.wrapper, 'mouseleave', this.onMouseLeaveHandler);
      }
      
      // Resize handler for responsive slidesPerView
      this.onResizeHandler = () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          this.updateSlidesPerView();
          this.updateSlider();
        }, 100);
      };
      this.addListener(window, 'resize', this.onResizeHandler);
    }

    addListener(target, event, handler, options) {
      target.addEventListener(event, handler, options);
      this.eventHandlers.push({ target, event, handler, options });
    }

    clearDotListeners() {
      this.dotHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
      this.dotHandlers = [];
    }

    destroy() {
      this.stopAutoplay();
      this.clearDotListeners();
      this.eventHandlers.forEach(({ target, event, handler, options }) => {
        target.removeEventListener(event, handler, options);
      });
      this.eventHandlers = [];
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
    
    updateSlidesPerView() {
      const windowWidth = window.innerWidth;
      let newSlidesPerView = this.config.slidesPerView;
      
      // Sort breakpoints in ascending order
      const breakpointKeys = Object.keys(this.config.breakpoints)
        .map(Number)
        .sort((a, b) => a - b);
      
      // Find the applicable breakpoint
      for (const bp of breakpointKeys) {
        if (windowWidth >= bp) {
          newSlidesPerView = this.config.breakpoints[bp].slidesPerView || newSlidesPerView;
        }
      }
      
      // Add peek value if configured
      if (this.config.peek) {
        newSlidesPerView += this.config.peek;
      }
      
      // Don't exceed the number of slides
      this.slidesPerView = Math.min(newSlidesPerView, this.slides.length);
      
      // Update slide widths
      this.updateSlideWidths();
      
      // Update dots
      this.updateDots();
      
      // Clamp current index
      const maxIndex = this.getTotalPages() - 1;
      if (this.currentIndex > maxIndex) {
        this.currentIndex = Math.max(0, maxIndex);
      }
    }
    
    updateSlideWidths() {
      const gap = this.config.gap;
      const totalGaps = Math.ceil(this.slidesPerView) - 1;
      const slideWidth = `calc((100% - ${totalGaps * gap}px) / ${this.slidesPerView})`;
      
      this.slideElements.forEach((slide, index) => {
        slide.style.flex = `0 0 ${slideWidth}`;
        slide.style.width = slideWidth;
        slide.style.marginRight = index < this.slides.length - 1 ? `${gap}px` : '0';
      });
    }
    
    getTotalPages() {
      // Number of "stops" - each stop shows slidesPerView slides
      return Math.ceil(Math.max(1, this.slides.length - this.slidesPerView + 1));
    }
    
    onDragStart(e) {
      if (this.slides.length <= 1) return;
      
      this.isDragging = true;
      this.wrapper.classList.add('is-dragging');
      this.startX = this.getPositionX(e);
      this.currentX = this.startX;
      
      // Stop autoplay during drag
      this.stopAutoplay();
    }
    
    onDragMove(e) {
      if (!this.isDragging) return;
      
      this.currentX = this.getPositionX(e);
      const diff = this.currentX - this.startX;
      
      // Calculate new position with resistance at edges
      let newTranslate = this.translateX + diff;
      const maxTranslate = 0;
      const minTranslate = this.getMinTranslate();
      
      // Apply resistance at edges
      if (newTranslate > maxTranslate) {
        newTranslate = maxTranslate + (diff * 0.2);
      } else if (newTranslate < minTranslate) {
        newTranslate = minTranslate + ((newTranslate - minTranslate) * 0.2);
      }
      
      this.track.style.transform = `translateX(${newTranslate}px)`;
      
      // Prevent scrolling while dragging (only if event is cancelable)
      if (e.cancelable && Math.abs(diff) > 10) {
        e.preventDefault();
      }
    }
    
    onDragEnd() {
      if (!this.isDragging) return;
      
      this.isDragging = false;
      this.wrapper.classList.remove('is-dragging');
      
      const diff = this.currentX - this.startX;
      const slideWidth = this.getSlideWidth();
      const threshold = slideWidth * this.config.snapThreshold;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.prev();
        } else {
          this.next();
        }
      } else {
        // Snap back to current slide
        this.updateSlider();
      }
      
      // Resume autoplay
      if (this.config.autoplay) {
        this.startAutoplay();
      }
    }
    
    getPositionX(e) {
      if (e.type.includes('touch')) {
        const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
        return touch ? touch.clientX : 0;
      }
      return e.clientX;
    }
    
    getSlideWidth() {
      if (!this.slideElements || !this.slideElements[0]) return 0;
      return this.slideElements[0].offsetWidth + this.config.gap;
    }
    
    getMinTranslate() {
      const slideWidth = this.getSlideWidth();
      return -(slideWidth * (this.getTotalPages() - 1));
    }
    
    goToSlide(index) {
      const maxIndex = this.getTotalPages() - 1;
      
      if (index < 0) {
        index = this.config.loop ? maxIndex : 0;
      } else if (index > maxIndex) {
        index = this.config.loop ? 0 : maxIndex;
      }
      
      this.currentIndex = index;
      this.updateSlider();
    }
    
    prev() {
      this.goToSlide(this.currentIndex - 1);
    }
    
    next() {
      this.goToSlide(this.currentIndex + 1);
    }
    
    updateSlider() {
      const slideWidth = this.getSlideWidth();
      this.translateX = -slideWidth * this.currentIndex;
      this.track.style.transform = `translateX(${this.translateX}px)`;
      
      // Update dots
      if (this.dots) {
        this.dots.forEach((dot, index) => {
          dot.classList.toggle('is-active', index === this.currentIndex);
        });
      }
      
      // Update arrows
      if (this.prevBtn && this.nextBtn && !this.config.loop) {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.getTotalPages() - 1;
      }
    }
    
    startAutoplay() {
      this.stopAutoplay();
      this.autoplayTimer = setInterval(() => {
        this.next();
      }, this.config.autoplayInterval);
    }
    
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
      }
    }
  }

  // ==========================================
  // CLUSTER DETECTION (like columns plugin)
  // ==========================================
  
  function findSliderClusters() {
    const allSliders = document.querySelectorAll(SELECTORS.slideSelector);
    if (!allSliders.length) return [];
    
    const clusters = [];
    const processed = new Set();
    
    allSliders.forEach(slide => {
      if (processed.has(slide)) return;
      if (slide.dataset.sliderInitialized === 'true') return;
      
      // Start a new cluster
      const cluster = [slide];
      processed.add(slide);
      
      // Find consecutive siblings with .slider class
      let sibling = slide.nextElementSibling;
      while (sibling && sibling.classList.contains('slider')) {
        if (processed.has(sibling)) break;
        cluster.push(sibling);
        processed.add(sibling);
        sibling = sibling.nextElementSibling;
      }
      
      // Mark as initialized
      cluster.forEach(el => el.dataset.sliderInitialized = 'true');
      clusters.push(cluster);
    });
    
    return clusters;
  }

  function buildInstanceConfig(instanceId) {
    const instanceOptions = (instanceId && INSTANCE_CONFIGS[instanceId]) || {};
    return {
      ...BASE_CONFIG,
      ...instanceOptions,
      breakpoints: {
        ...BASE_CONFIG.breakpoints,
        ...(instanceOptions.breakpoints || {})
      }
    };
  }

  function registerInstance(instance, slides, instanceId) {
    SLIDER_INSTANCES.push({ instance, slides, instanceId });
  }

  function destroyById(instanceId) {
    const index = SLIDER_INSTANCES.findIndex(entry => entry.instanceId === instanceId);
    if (index === -1) return false;
    SLIDER_INSTANCES[index].instance.destroy();
    SLIDER_INSTANCES.splice(index, 1);
    return true;
  }

  function destroyAll() {
    SLIDER_INSTANCES.forEach(entry => entry.instance.destroy());
    SLIDER_INSTANCES.length = 0;
  }

  function getInstances() {
    return SLIDER_INSTANCES.map(entry => entry.instance);
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  
  function init() {
    const clusters = findSliderClusters();
    
    clusters.forEach(cluster => {
      if (cluster.length >= 1) {
        const instanceId = cluster[0].dataset.sliderId || '';
        const instanceConfig = buildInstanceConfig(instanceId);
        const instance = new Slider(cluster, instanceConfig);
        registerInstance(instance, cluster, instanceId);
      }
    });
  }

  // Expose API for SPA/manual cleanup usage.
  window.CarrdSlider = {
    init,
    destroyAll,
    destroyById,
    getInstances
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
