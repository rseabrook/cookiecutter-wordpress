---
name: normalize-svg-files
description: Normalize SVG files exported from Adobe Illustrator for use in WordPress projects
---

# Normalize SVG Files

This skill processes all SVG files in the theme's `assets/images` directory to normalize them for WordPress usage. SVG files exported from Adobe Illustrator often contain unnecessary XML declarations, hard-coded colors, and class-based styles that should be cleaned up.

## Prerequisites: Find the Theme Directory

Before proceeding, you must locate the custom theme directory. Look in `wp-content/themes/` for a directory that is NOT one of these default WordPress themes:
- `twentytwentyone`
- `twentytwentytwo`
- `twentytwentythree`
- `twentytwentyfour`
- `twentytwentyfive`

The remaining directory is the custom theme. Use this theme directory name for all paths below, referred to as `{theme-slug}`.

## File Location

- **SVG directory**: `wp-content/themes/{theme-slug}/assets/images/`

## Instructions

### Step 1: Find All SVG Files

Scan the `wp-content/themes/{theme-slug}/assets/images/` directory for all `.svg` files.

### Step 2: Process Each SVG File

For each SVG file found, apply the following normalizations in order:

#### 2a. Remove XML Declaration

If the file starts with an XML declaration like:
```xml
<?xml version="1.0" encoding="UTF-8"?>
```

Remove it entirely. The SVG should start with the `<svg>` tag (or possibly a comment/doctype, which can also be removed).

#### 2b. Replace Hard-coded Color with currentColor

Illustrator typically exports SVGs with a `<style>` block containing class definitions with hard-coded colors. For example:

```xml
<style>
  .cls-1 {
    fill: #231f20;
  }
</style>
```

If there is only ONE color defined in the entire SVG (a single fill or stroke color), replace that color with `currentColor`. This allows the SVG color to be controlled via CSS.

**Rules:**
- Only replace if there's a single unique color in the SVG
- If multiple different colors are used, leave them as-is and note this in the summary
- Replace the color value with `currentColor` (e.g., `fill: currentColor;`)

#### 2c. Inline All Styles

Remove the `<style>` block entirely and apply all styles directly to the SVG elements as inline `style` attributes.

**Before:**
```xml
<svg>
  <style>
    .cls-1 {
      fill: currentColor;
      stroke-width: 0;
    }
  </style>
  <path class="cls-1" d="..."/>
  <circle class="cls-1" cx="10" cy="10" r="5"/>
</svg>
```

**After:**
```xml
<svg>
  <path style="fill: currentColor; stroke-width: 0;" d="..."/>
  <circle style="fill: currentColor; stroke-width: 0;" cx="10" cy="10" r="5"/>
</svg>
```

**Steps:**
1. Parse the `<style>` block to extract class definitions and their properties
2. For each element with a `class` attribute, look up the corresponding styles
3. Add those styles as an inline `style` attribute on the element
4. Remove the `class` attribute from the element
5. Remove the entire `<style>` block from the SVG

**Note:** If an element already has a `style` attribute, merge the class styles into it.

#### 2d. Clean Up Extra Whitespace

After processing, clean up any excessive blank lines or whitespace left behind from removing the XML declaration or style block.

### Step 3: Confirm Completion

After processing all SVG files, show the user a summary:
- List of files processed
- For each file, note:
  - Whether XML declaration was removed
  - Whether color was converted to currentColor (and what the original color was)
  - If multiple colors were found (file was left with original colors)
  - Number of elements that had styles inlined
- Any errors or files that couldn't be processed
