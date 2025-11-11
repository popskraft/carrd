---
description: Review Carrd customization code for standards compliance and best practices
---

# Code Review Workflow

This workflow checks customization code against Carrd project standards and best practices.

## Review Checklist

### 1. File Structure & Format
- [ ] File is `.html` format
- [ ] Contains only `<style>` and `<script>` blocks
- [ ] HTML comment at top describes functionality (one line)
- [ ] CSS comment describes styles (one line)
- [ ] JS comment describes functionality (one line)
- [ ] No HTML structure or doctype

### 2. Code Comments
- [ ] All comments in English
- [ ] Comments are concise and descriptive
- [ ] One-line descriptions for CSS and JS blocks
- [ ] No unnecessary inline comments

### 3. CSS Best Practices
- [ ] Uses semantic class names (kebab-case)
- [ ] No inline styles
- [ ] No `!important` unless absolutely necessary
- [ ] Follows project's CSS patterns
- [ ] Responsive design uses standard breakpoints from `BREAKPOINTS.md`
- [ ] No hardcoded values (use variables/rem units)

### 4. JavaScript Best Practices
- [ ] Uses IIFE (Immediately Invoked Function Expression) to avoid global scope
- [ ] Checks for element existence before manipulation
- [ ] Uses `const`/`let` (not `var`)
- [ ] Proper error handling
- [ ] No console.log in production code
- [ ] Efficient DOM queries (no nested loops with selectors)
- [ ] Uses `classList` for class manipulation (not string concatenation)

### 5. DOM Manipulation
- [ ] Does NOT modify original HTML structure
- [ ] Only adds/wraps elements via JavaScript
- [ ] Uses proper DOM methods (`createElement`, `appendChild`, `insertBefore`)
- [ ] Handles edge cases (empty selections, missing elements)
- [ ] Verifies selectors match actual HTML structure

### 6. Performance
- [ ] No memory leaks
- [ ] Efficient selector usage
- [ ] No unnecessary DOM operations
- [ ] Debouncing/throttling for resize/scroll if needed
- [ ] Code is compact and minified

### 7. Carrd Compliance
- [ ] Ready to copy-paste into Carrd custom code
- [ ] No external dependencies
- [ ] Works with Carrd's HTML structure
- [ ] Verified against project's `index.html`
- [ ] Uses project's design system (colors, spacing, breakpoints)

### 8. Testing
- [ ] Code tested against actual HTML structure
- [ ] Works across all standard breakpoints
- [ ] No console errors
- [ ] Handles dynamic content if applicable

## Review Process

1. **Read the code** — understand what it does
2. **Check structure** — verify file format and comments
3. **Verify CSS** — check styles follow project patterns
4. **Analyze JS** — ensure best practices and efficiency
5. **Test compatibility** — verify against `index.html`
6. **Document findings** — note any issues or improvements

## Common Issues

### ❌ Issues Found
- Hardcoded values instead of variables
- Missing error handling
- Inefficient DOM queries
- Global scope pollution
- Missing comments

### ✅ Best Practices
- Use semantic naming
- Add defensive checks
- Optimize selectors
- Use IIFE for scope
- Document functionality

## Example Review

**File:** `grid-cluster.html`

**Status:** ✅ COMPLIANT

**Findings:**
- ✅ Proper file structure (comment + style + script)
- ✅ IIFE pattern prevents global scope pollution
- ✅ Checks for empty selection (`if (!items.length) return`)
- ✅ Efficient DOM manipulation
- ✅ Clear comments in English
- ✅ Uses `const` for variables
- ✅ Semantic class naming
- ✅ No external dependencies
- ✅ Ready for Carrd integration

**Recommendations:** None — code meets all standards.
