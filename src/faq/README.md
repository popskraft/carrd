# FAQ

## What is it?
Accordion plugin for Carrd that converts every block inside a `FAQContainer` into interactive questions with proper aria attributes and Mini Theme driven animation.

## Why use it
Lets you build FAQ lists without custom markup: keep the `divider-component` + heading pattern and the plugin creates toggles automatically, adding `faq-question`/`faq-answer` wrappers and smooth transitions.

## How to use it
1. **Create the container.** Add a Container element and assign it the `FAQContainer` class; every child inside will be processed.
2. **Author the questions.** Follow the sequence per Q&A: `hr.divider-component → <h1-3> question → answer nodes → hr.divider-component`. You can mix any Carrd components inside the answer cluster—the script wraps them into a single answer block.
3. **Embed the plugin.**
   - Head →  
     ```html
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/style.css">
     ```
   - Body End →  
     ```html
     <script src="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/faq/script.js" defer></script>
     ```
4. **Preview the page.** Each heading becomes a toggle button, answers collapse into `.faq-answer`, and the script manages aria attributes plus `.is-open` / `.is-closed` classes. Keyboard interactions are wired in by default.

### Example skeleton
```
<div class="FAQContainer">
  <hr class="divider-component">
  <h3 class="text-component">Q. Can I mix different VLT on one vehicle?</h3>
  <p class="text-component">Yes. Combine tint types by zone—just mind the legal limits.</p>
  <hr class="divider-component">

  <hr class="divider-component">
  <h3 class="text-component">Q. Can I install it myself?</h3>
  <p class="text-component">Sure. Follow the kit guide and wipe the surface clean first.</p>
  <hr class="divider-component">
</div>
```

## Behavior and styling tips
- On every breakpoint the animation adjusts `max-height`, `opacity`, and spacing so collapsed answers don’t disrupt the layout.
- If a paragraph follows the opening divider before any heading, the script promotes it into the “question” node to keep the accordion workable.
- The stylesheet consumes Mini Theme tokens. When you load `themes/mini/style.css` (Head → `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/popskraft/carrd@main/dist/themes/mini/style.css">`) the FAQ inherits the shared palette and motion, while still shipping fallbacks for non-Mini pages.
