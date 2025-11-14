# FAQ Toggle

## Purpose
This plugin converts a list of FAQ items into an accessible accordion. Each question header becomes a focusable button that reveals or hides the answer while keeping the section tidy for Carrd pages with a lot of documentation.

## How to use
1. Wrap your FAQ in a container with `data-faq` and give each entry the `faq-item` class.
2. Inside each entry, add a `.faq-header` element for the question and a `.faq-content` element for the answer.
3. Include both the CSS and JS via Carrd embeds (or the CDN links listed below) so the toggle styles and behaviour load together.

Example markup skeleton:
```
<section data-faq>
  <div class="faq-item">
    <div class="faq-header">How does this plugin work?</div>
    <div class="faq-content">It wires FAQ headers to toggle their answers.</div>
  </div>
</section>
```

[[ADD MANUAL HERE]]
