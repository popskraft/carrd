---
trigger: always_on
---

# Carrd Projects Rules

Standard rules and conventions for all Carrd customization projects.

## Language

- **Project documentation** (README, comments, guides): Russian
- **Code comments** (CSS, JavaScript): English
- **Commit messages**: English

## Project Structure

```
/carrd/
├── BREAKPOINTS.md                    # Standard breakpoints for all projects
├── .windsurf/
│   ├── workflows/
│   │   └── create-carrd-customization.md
│   └── rules/
│       └── carrd-projects-rules.md
├── mini/                             # Project folder
│   ├── src/                          # Source files (reference)
│   │   ├── index.html               # Final build example
│   │   └── assets/
│   │       ├── main.css             # Project-specific styles
│   │       └── main.js              # Project-specific scripts
│   ├── grid-cluster.html            # Customization 1
│   └── smooth-scroll.html           # Customization 2
├── another-project/                 # Another project
│   ├── src/
│   │   ├── index.html
│   │   └── assets/
│   └── custom-code.html
└── README.md
```

## Customization File Rules

### File Location
- Create files in the **current project folder** where you are working
- NOT in the root directory or src folder
- Format: `{current_project_folder}/{name}.html`
- Example: `/Users/popskraft/projects/carrd/mini/grid-cluster.html`

### File Structure
Each customization file contains ONLY:
```html
<\!-- One-line description of what this code does -->

<style>
  /* CSS code (no comments in production) */
</style>

<script>
  // One-line description of JavaScript functionality
  // JS code
</script>
```

### Code Requirements
- **Compact code** following best practices
- **Do NOT modify** original HTML structure
- **All DOM changes** must be done via JavaScript only
- **Comments in English** (one-line descriptions)
- **Ready to copy-paste** into Carrd custom code section
- **Verify against** `{current_folder}/src/index.html` structure
- **Reference CSS patterns** from `{current_folder}/src/assets/main.css`

### File Naming
- Use kebab-case: `grid-cluster.html`, `smooth-scroll.html`, `modal-popup.html`
- Descriptive and short names
- Reflect the functionality

## Responsive Design

### Standard Breakpoints
Use breakpoints from `BREAKPOINTS.md`:
- 1920px (Desktop XL)
- 1680px (Desktop L)
- 1280px (Desktop M)
- 1024px (Desktop)
- 980px (Tablet L)
- 736px (Tablet/Mobile)
- 480px (Mobile S)
- 360px (Mobile XS)

### Implementation
- Specific values for padding, font-size, and layout changes depend on each project's design system
- Always reference the project's `src/assets/main.css` for implementation details
- Use mobile-first approach (min-width) for media queries

## Git Workflow

### Commits
- User commits manually
- Format: `Add {folder}/{name}: {short description}`
- Example: `Add mini/grid-cluster: group style-3 blocks into 3-column grid`

### No Auto-commits
- Cascade does NOT commit or push automatically
- User has full control over version control

## Workflow Reference

Use `/create-carrd-customization` workflow for creating new customizations.

## Reference Files

- **Breakpoints**: `/Users/popskraft/projects/carrd/BREAKPOINTS.md`
- **HTML structure**: `{current_project}/src/index.html`
- **CSS patterns**: `{current_project}/src/assets/main.css`
- **JS patterns**: `{current_project}/src/assets/main.js`
- **Workflow**: `.windsurf/workflows/create-carrd-customization.md`

## Code Quality

- Remove duplicate CSS rules automatically
- Combine media queries for the same breakpoint
- Use mobile-first approach (min-width over max-width)
- Keep code compact (no unnecessary comments in CSS)
- Use IIFE in JavaScript to avoid global scope pollution
- Always optimize and clean code proactively
