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

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: FAQ Toggle
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### 1. CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN FAQ Toggle
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/plugins/mini/faq/style.css">
```

### 2. JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: JS CDN FAQ Toggle
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/plugins/mini/faq/script.js"></script>
```
