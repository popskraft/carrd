---
description: Create a new Carrd customization code snippet as a single HTML file
---

# Create Carrd Customization Snippet

This workflow creates a new customization for Carrd.co as a single HTML file containing CSS and JavaScript.

## Steps

1. **Provide the customization prompt**
   - Describe what functionality you need
   - Example: "Group style-3 blocks into a 3-column grid"

2. **Create HTML file**
   - File name should be descriptive and short (kebab-case)
   - Location: `/Users/popskraft/projects/carrd/{name}.html`
   - Example: `grid-cluster.html`, `smooth-scroll.html`

3. **Structure the HTML file**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <title>{Descriptive Title}</title>
     <style>
       /* CSS: One-line description of what styles do */
       /* Your CSS code here */
     </style>
   </head>
   <body>
     <script>
       // JavaScript: One-line description of what script does
       // Your JavaScript code here
     </script>
   </body>
   </html>
   ```

4. **Code requirements**
   - **CSS comment**: Single line describing the styles (English)
   - **JS comment**: Single line describing the functionality (English)
   - Keep code compact and follow best practices
   - Do NOT modify original HTML — only add/wrap elements via JavaScript
   - All DOM changes must be done through JavaScript

5. **Commit and push**
   ```bash
   git add {name}.html
   git commit -m "Add {name}: {short description}"
   git push
   ```

## Example Workflow

**Prompt:** "Group consecutive style-3 blocks into a 3-column grid"

**Result:** `grid-cluster.html` with:
- CSS: Grid layout (3 columns, 1rem gap)
- JS: Detects adjacent style-3 blocks, wraps clusters in `.custom-grid-container`

## Usage in Carrd

Copy the `<style>` and `<script>` sections from the HTML file and paste them into your Carrd site's custom code sections.

Or embed the entire file as an iframe if needed.
