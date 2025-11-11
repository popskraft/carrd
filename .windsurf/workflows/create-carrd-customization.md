---
description: Create a new Carrd customization code snippet as a single HTML file
---

# Create Carrd Customization Snippet

This workflow creates a new customization for Carrd.co as a single HTML file containing CSS and JavaScript.

## Project Structure

The project uses a folder-based structure:
```
/Users/popskraft/projects/carrd/
├── BREAKPOINTS.md          # Standard breakpoints for all projects
├── mini/                    # Example project folder
│   ├── src/                # Source files (reference)
│   │   ├── index.html     # Final build example
│   │   └── assets/
│   │       ├── main.css   # Project-specific styles
│   │       └── main.js    # Project-specific scripts
│   └── grid-cluster.html   # Customization code
├── another-project/        # Another project folder
│   ├── src/
│   │   ├── index.html
│   │   └── assets/
│   └── custom-code.html
└── README.md
```

**Important:** 
- Create customization files in the **current project folder** where you are working, not in the root directory or src folder
- Use standard breakpoints from `BREAKPOINTS.md` for responsive design
- Specific values (padding, font-size, etc.) depend on each project's design system
- Reference files are in `{project}/src/` folder

## File Structure

Each customization is a single `.html` file containing:
```html
<!-- One-line description of what this code does -->

<style>
  /* One-line description of CSS */
  /* Your CSS code here */
</style>

<script>
  // One-line description of JavaScript functionality
  // Your JavaScript code here
</script>
```

## Steps

1. **Provide the customization prompt**
   - Describe what functionality you need
   - Example: "Group style-3 blocks into a 3-column grid"

2. **Create HTML file in current project folder**
   - File name should be descriptive and short (kebab-case)
   - Location: `{current_project_folder}/{name}.html`
   - Example: `mini/grid-cluster.html`, `mini/smooth-scroll.html`
   - **Reference files:** 
     - `{current_project_folder}/src/index.html` — final build with target HTML structure
     - `{current_project_folder}/src/assets/main.css` — CSS patterns
     - `{current_project_folder}/src/assets/main.js` — JS patterns

3. **File content requirements**
   - **Top comment**: HTML comment with one-line description (English)
   - **CSS comment**: Single line describing the styles (English)
   - **JS comment**: Single line describing the functionality (English)
   - Keep code compact and follow best practices
   - Do NOT modify original HTML — only add/wrap elements via JavaScript
   - All DOM changes must be done through JavaScript
   - **No HTML structure** — only `<style>` and `<script>` tags (ready to copy-paste)
   - Code should work with the HTML structure in `src/index.html`

4. **Verification**
   - Check the code against `src/index.html` to ensure compatibility
   - Test selectors and DOM manipulation against actual HTML structure
   - Reference CSS patterns from `src/assets/main.css`

5. **Commit and push**
   - You commit and push manually
   - Commit message format: `Add {folder}/{name}: {short description}`

## Example

**Current folder:** `mini/`

**Prompt:** "Group consecutive style-3 blocks into a 3-column grid"

**Reference:** `mini/src/index.html` contains the target HTML with `.style-3` elements

**Result:** `mini/grid-cluster.html`
```html
<!-- Groups consecutive style-3 blocks into grid containers (3 columns, 1rem gap) -->

<style>
  /* Grid container: 3 columns, 1rem gap */
  .custom-grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
</style>

<script>
  // Groups consecutive style-3 blocks into grid containers (3 columns, 1rem gap)
  (function() {
    // ... code ...
  })();
</script>
```

## Usage in Carrd

1. Open the `.html` file in the project folder
2. Copy all content (comment + `<style>` + `<script>`)
3. Paste into your Carrd site's custom code section
