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

### Option 1: CDN (Recommended)

**1. Styles**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Head
- **Code**:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/style.css">
```

**2. Script**
Add an **Embed** element:
- **Type**: Code
- **Style**: Hidden, Body End
- **Code**:
```html
<script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/script.js" defer></script>
```

### Option 2: Direct Code
Copy the content of the file directly into the Embed element.

**1. Styles**
- **Code**:
```html
<style>
/* Copy content from dist/faq/style.css */
</style>
```

**2. Script**
- **Code**:
```html
<script>
/* Copy content from dist/faq/script.js */
</script>
```


