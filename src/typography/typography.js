/*
 * Plugin: Typography
 * Version: 0.1.8aaaaaaaaaaaaaa
 * Purpose: Parse pseudo-Markdown syntax in .txt containers and convert to semantic HTML.
 * Admin placement: Code element in BODY END.
 *
 * Converts:
 *   # Headline    → <h1>
 *   ## Headline   → <h2>
 *   ### Headline  → <h3>
 *   #### Headline → <h4>
 *   ---           → <hr>
 *   - Item        → <ul><li>
 *   1. Item       → <ol><li>
 */
(function () {
  'use strict';

  // Default configuration
  const DEFAULTS = {
    containerSelector: '.txt',
    paragraphSelector: 'span.p',
    headingClasses: {
      h1: 'theme-h1',
      h2: 'theme-h2',
      h3: 'theme-h3',
      h4: 'theme-h4'
    },
    listClasses: {
      ul: 'theme-ul',
      ol: 'theme-ol',
      li: 'theme-li'
    },
    hrClass: 'theme-hr'
  };

  // Merge with external options
  const externalOptions =
    (typeof window !== 'undefined' &&
      window.CarrdPluginOptions &&
      window.CarrdPluginOptions.typography) ||
    {};
  const CONFIG = { ...DEFAULTS, ...externalOptions };

  /**
   * Parse text content from a span.p element
   * @param {string} html - Raw innerHTML of span.p
   * @returns {string|null} Converted HTML or null if no conversion needed
   */
  function parseContent(html) {
    // Normalize line breaks: <br>, <br/>, <br /> → \n
    let text = html.replace(/<br\s*\/?>/gi, '\n').trim();

    // Check for horizontal rule
    if (/^-{3,}$/.test(text)) {
      return `<hr class="${CONFIG.hrClass}">`;
    }

    // Check for headings (# to ####)
    const headingMatch = text.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2].trim();
      const tag = `h${level}`;
      const className = CONFIG.headingClasses[tag] || '';
      return `<${tag} class="${className}">${content}</${tag}>`;
    }

    // Split by newlines for list detection
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    // Check for unordered list (all lines start with - )
    if (lines.length > 0 && lines.every(l => /^-\s+/.test(l))) {
      const items = lines.map(l => {
        const content = l.replace(/^-\s+/, '');
        return `<li class="${CONFIG.listClasses.li}">${content}</li>`;
      });
      return `<ul class="${CONFIG.listClasses.ul}">${items.join('')}</ul>`;
    }

    // Check for ordered list (all lines start with digits followed by . )
    if (lines.length > 0 && lines.every(l => /^\d+\.\s+/.test(l))) {
      const items = lines.map(l => {
        const content = l.replace(/^\d+\.\s+/, '');
        return `<li class="${CONFIG.listClasses.li}">${content}</li>`;
      });
      return `<ol class="${CONFIG.listClasses.ol}">${items.join('')}</ol>`;
    }

    // No conversion needed - return null to keep original span
    return null;
  }



  /**
   * Process a single .txt container
   * @param {HTMLElement} container - The .txt element
   */
  function processContainer(container) {
    if (container.dataset.typographyInitialized === 'true') return;
    container.dataset.typographyInitialized = 'true';

    // Find all span.p elements
    const spans = container.querySelectorAll(CONFIG.paragraphSelector);
    if (!spans.length) return;

    // Find the inner element (Carrd structure: .txt > .inner or direct content)
    const inner = container.querySelector('.inner') || container;

    spans.forEach(span => {
      const html = span.innerHTML;
      const converted = parseContent(html);

      if (converted !== null) {
        // Replace span with converted content
        const temp = document.createElement('div');
        temp.innerHTML = converted;

        // Insert new elements before the span
        while (temp.firstChild) {
          span.parentNode.insertBefore(temp.firstChild, span);
        }
        // Remove the original span
        span.remove();
      }
      // If null, keep the original span.p unchanged
    });
  }

  /**
   * Initialize typography processing
   */
  function init() {
    const containers = document.querySelectorAll(CONFIG.containerSelector);
    containers.forEach(processContainer);
  }

  // Expose API
  window.TypographyPlugin = {
    init,
    process: processContainer,
    parseContent
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
