# FAQ

Converts `FAQContainer` blocks into accessible accordions with smooth animations.

## Features
- **Automatic Toggles**: Turns `divider` + `heading` patterns into interactive questions.
- **Accessible**: Manages ARIA attributes and keyboard navigation.
- **Mini Theme**: Inherits shared palette and motion if Mini Theme is loaded.

## Setup
1. **Container**: Add a Container element with class `FAQContainer`.
2. **Structure**: Sequence elements as: `Divider` → `Heading (H1-H3)` → `Content` → `Divider`.
3. **Content**: Any Carrd components between the heading and the next divider become the answer.

## Installation
**CSS (Hidden, Head)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/style.css">
```

**JS (Hidden, Body End)**
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/script.js" defer></script>
```

## Example Usage
For easy integration with Carrd, use the `example.html` file which contains ready-to-copy code for embedding:

1. Open `example.html`
2. Copy the entire code content
3. In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: FAQ
   - **Style**: Hidden → Body End
   - **Code**: Paste the copied code from example.html

**Important**: Place HTML Elements at the very bottom of the page below the footer, ensuring they don't fall into containers with hidden content.

## CDN Installation
Alternatively, you can manually include the plugin files directly from CDN using two separate Embed elements:

### 1. CSS Embed Element
In Carrd, add ( + ) an Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: CSS CDN FAQ
   - **Style**: Hidden → Head
   - **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/faq/style.css">
```

### 2. JavaScript Embed Element
In Carrd, add ( + ) another Element → Embed with these parameters:
   - **Type**: Code
   - **Title**: JS CDN FAQ
   - **Style**: Hidden → Body End
   - **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/faq/script.js"></script>
```
