/*
 * Plugin: FAQ
 * Version: 0.1.12
 * Purpose: Accordion behavior for FAQ containers.
 * Admin placement: Code element in BODY END.
 */
(function() {
  'use strict';

  // ==========================================
  // CONFIGURATION
  // ==========================================
  
  const DEFAULTS = {
    containerSelector: '.FAQContainer',
    dividerSelector: 'hr.divider-component',
    headerTags: ['H1', 'H2', 'H3'],
    allowMultipleOpen: false,
    defaultOpen: false  // Open first question by default
  };

  // Merge with external options
  const externalOptions = (typeof window !== 'undefined' && 
    window.CarrdPluginOptions && 
    window.CarrdPluginOptions.faq) || {};
    
  const CONFIG = { ...DEFAULTS, ...externalOptions };
  const HEADER_TAGS = new Set(CONFIG.headerTags);
  const CLASSES = {
    question: 'theme-faq-question',
    answer: 'theme-faq-answer',
    open: 'is-open',
    closed: 'is-closed'
  };

  // ==========================================
  // PLUGIN LOGIC
  // ==========================================
  
  let answerIdCounter = 0;
  let openAnswers = new Set();
  let answerResizeObserver = null;
  const requestFrame = window.requestAnimationFrame || (cb => setTimeout(cb, 16));
  let resizeHandle = null;

  const scheduleOpenAnswerSync = () => {
    if (resizeHandle !== null) return;
    resizeHandle = requestFrame(() => {
      openAnswers.forEach(answer => adjustHeight(answer));
      resizeHandle = null;
    });
  };

  function init() {
    const containers = document.querySelectorAll(CONFIG.containerSelector);
    if (!containers.length) return;

    openAnswers = new Set();
    answerResizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(entries => {
            entries.forEach(entry => {
              if (openAnswers.has(entry.target)) {
                adjustHeight(entry.target);
              }
            });
          })
        : null;

    let firstQuestion = true;

    containers.forEach(container => {
      if (container.dataset.faqInitialized === 'true') return;
      container.dataset.faqInitialized = 'true';

      const dividers = Array.from(container.querySelectorAll(CONFIG.dividerSelector)).filter(
        divider => divider.closest(CONFIG.containerSelector) === container
      );
      if (!dividers.length) return;

      dividers.forEach(startDivider => {
        const endDivider = findNextDivider(startDivider);

        const header = findHeaderBetween(startDivider, endDivider);
        if (!header || header.dataset.faqBound === 'true') {
          return;
        }

        const answerWrapper =
          header.nextElementSibling && header.nextElementSibling.classList.contains(CLASSES.answer)
            ? header.nextElementSibling
            : wrapAnswerContent(header, endDivider);

        if (!answerWrapper) {
          return;
        }

        const shouldOpenByDefault = CONFIG.defaultOpen && firstQuestion;
        prepareToggle(header, answerWrapper, shouldOpenByDefault);
        firstQuestion = false;
      });
    });

    window.addEventListener('resize', scheduleOpenAnswerSync);
    window.addEventListener('orientationchange', scheduleOpenAnswerSync);
  }

  function findNextDivider(divider) {
    let node = divider.nextElementSibling;
    while (node) {
      if (isDivider(node)) {
        return node;
      }
      node = node.nextElementSibling;
    }
    return null;
  }

  function findHeaderBetween(startDivider, endDivider) {
    let node = startDivider.nextElementSibling;
    let firstParagraph = null;

    while (node && node !== endDivider) {
      if (isHeader(node)) {
        return node;
      }
      if (!firstParagraph && node.nodeType === 1 && node.tagName === 'P') {
        firstParagraph = node;
      }
      node = node.nextElementSibling;
    }

    if (!endDivider) {
      while (node) {
        if (isHeader(node)) {
          return node;
        }
        if (!firstParagraph && node.nodeType === 1 && node.tagName === 'P') {
          firstParagraph = node;
        }
        node = node.nextElementSibling;
      }
    }

    return firstParagraph;
  }

  function wrapAnswerContent(header, endDivider) {
    let node = header.nextSibling;
    const wrapper = document.createElement('div');
    wrapper.className = CLASSES.answer;
    let hasContent = false;

    while (node && node !== endDivider) {
      const next = node.nextSibling;
      wrapper.appendChild(node);
      hasContent = true;
      node = next;
    }

    if (!hasContent) {
      return null;
    }

    if (endDivider && endDivider.parentNode) {
      header.parentNode.insertBefore(wrapper, endDivider);
    } else {
      header.parentNode.appendChild(wrapper);
    }
    return wrapper;
  }

  function prepareToggle(header, answer, openByDefault = false) {
    header.classList.add(CLASSES.question);
    header.dataset.faqBound = 'true';
    
    if (!header.hasAttribute('tabindex')) {
      header.setAttribute('tabindex', '0');
    }
    header.setAttribute('role', 'button');

    if (!answer.id) {
      answerIdCounter += 1;
      answer.id = `faq-answer-${answerIdCounter}`;
    }
    header.setAttribute('aria-controls', answer.id);

    if (answerResizeObserver) {
      answerResizeObserver.observe(answer);
    }

    // Set initial state
    if (openByDefault) {
      header.classList.add(CLASSES.open);
      header.classList.remove(CLASSES.closed);
      answer.classList.add(CLASSES.open);
      answer.classList.remove(CLASSES.closed);
      header.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');
      openAnswers.add(answer);
      // Delay height calculation to ensure DOM is ready
      requestFrame(() => adjustHeight(answer));
    } else {
      header.classList.add(CLASSES.closed);
      header.classList.remove(CLASSES.open);
      answer.classList.add(CLASSES.closed);
      answer.classList.remove(CLASSES.open);
      header.setAttribute('aria-expanded', 'false');
      answer.setAttribute('aria-hidden', 'true');
    }

    const toggle = () => toggleAnswer(header, answer);

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  }

  function toggleAnswer(header, answer) {
    const willOpen = !header.classList.contains(CLASSES.open);
    
    // Close others if not allowMultipleOpen
    if (willOpen && !CONFIG.allowMultipleOpen) {
      openAnswers.forEach(openAnswer => {
        if (openAnswer !== answer) {
          const openHeader = document.querySelector(`[aria-controls="${openAnswer.id}"]`);
          if (openHeader) {
            openHeader.classList.remove(CLASSES.open);
            openHeader.classList.add(CLASSES.closed);
            openHeader.setAttribute('aria-expanded', 'false');
          }
          openAnswer.classList.remove(CLASSES.open);
          openAnswer.classList.add(CLASSES.closed);
          openAnswer.setAttribute('aria-hidden', 'true');
          openAnswer.style.maxHeight = '0px';
          openAnswers.delete(openAnswer);
        }
      });
    }

    header.classList.toggle(CLASSES.open, willOpen);
    header.classList.toggle(CLASSES.closed, !willOpen);
    answer.classList.toggle(CLASSES.open, willOpen);
    answer.classList.toggle(CLASSES.closed, !willOpen);
    header.setAttribute('aria-expanded', String(willOpen));
    answer.setAttribute('aria-hidden', String(!willOpen));

    if (willOpen) {
      openAnswers.add(answer);
      adjustHeight(answer);
      scheduleOpenAnswerSync();
    } else {
      openAnswers.delete(answer);
      answer.style.maxHeight = '0px';
    }
  }

  function adjustHeight(answer) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  }

  function isHeader(node) {
    return node && node.nodeType === 1 && HEADER_TAGS.has(node.tagName);
  }

  function isDivider(node) {
    return (
      node &&
      node.nodeType === 1 &&
      node.tagName === 'HR' &&
      node.classList.contains('divider-component')
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
