# mono

A classless CSS framework and lightweight JavaScript companion built on strict black, white, and gray.

No classes. No build step. No dependencies. Just semantic HTML.

## Features

- Strict monochrome palette — black, white, and grays only
- Classless — styles native HTML elements directly
- Generous internal padding on every element
- System font stack, no external fonts
- Custom `::selection` with inverted colors
- `:focus-visible` outlines for keyboard accessibility
- Smooth transitions on interactive elements
- Zero border-radius on structural elements
- Responsive breakpoints at 900px and 600px
- Dark mode via `prefers-color-scheme`
- High-contrast mode via `prefers-contrast`
- Reduced-motion support
- Print styles
- Optional JavaScript enhancements

## Install

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/RyuuX444/mono@1.0.0/styles.css">
<script src="https://cdn.jsdelivr.net/gh/RyuuX444/mono@1.0.0/script.js"></script>
```




### Download

Grab `styles.css` and `script.js` from the repository and drop them into your project.

## Usage

Write plain semantic HTML. No classes anywhere.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My page</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/RyuuX444/mono@1.0.0/styles.css">
</head>
<body>

  <nav>
    <header>
      <a href="#">brand</a>
      <a href="#">Home</a>
      <a href="#">Docs</a>
      <a href="#">About</a>
    </header>
  </nav>

  <main>
    <h1>Hello</h1>
    <p>Just write semantic HTML.</p>

    <section>
      <h2>A section</h2>
      <p>Paragraphs breathe. Headings have padding. Everything has room.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2025</p>
    <nav>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </nav>
  </footer>

  <script src="https://cdn.jsdelivr.net/gh/RyuuX444/mono@1.0.0/script.js"></script>
</body>
</html>
```

## What's covered

### Elements

- Document: `html`, `body`, `head`, `title`, `meta`, `link`, `style`, `script`, `noscript`
- Sections: `header`, `footer`, `main`, `nav`, `section`, `article`, `aside`, `address`, `hgroup`
- Headings: `h1` through `h6`, each with distinct sizing and spacing
- Text: `p`, `br`, `hr`, `wbr`, `a`, `strong`, `b`, `em`, `i`, `u`, `s`, `del`, `ins`, `mark`, `small`, `sub`, `sup`, `abbr`, `cite`, `q`, `dfn`, `kbd`, `samp`, `var`, `time`, `data`, `bdi`, `bdo`, `ruby`, `rt`, `rp`
- Lists: `ul`, `ol`, `li`, `menu`, `dl`, `dt`, `dd`
- Quotes: `blockquote`, `figure`, `figcaption`
- Code: `pre`, `code`, `pre code`
- Tables: `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `colgroup`, `col`
- Forms: `form`, `fieldset`, `legend`, `label`, all `input` types, `textarea`, `select`, `optgroup`, `option`, `datalist`, `output`, `progress`, `meter`, `button`
- Media: `img`, `picture`, `source`, `video`, `audio`, `track`, `iframe`, `embed`, `object`, `canvas`, `svg`, `map`, `area`
- Interactive: `details`, `summary`, `dialog`
- Flow: `template`, `slot`

### JavaScript enhancements

- Closes dialogs on button click, backdrop click, and Escape
- Opens dialogs via `data-dialog` triggers with `showModal()`
- Button press feedback and click confirmation
- Form submit with loading state and reset
- Auto-collapses other details when one opens
- Smooth-scrolls anchor links
- Highlights the active nav link
- Adds copy-to-clipboard on `pre code` blocks
- Animates progress and meter values from zero
- Handles `data-toggle-group` toggle buttons
- Switches `role="tab"` tabs
- Marks external links with `target="_blank"` and `rel="noopener noreferrer"`
- Fills missing image sources with a placeholder
- Selects heading text on double-click
- Auto-styles footer elements, including dynamically injected ones via `MutationObserver`

The script is optional. Without it, every element still renders correctly — you just lose the enhancements.

## Customization

Every color, spacing value, and radius lives on `:root` as a custom property.

```css
:root {
  --bg: #ffffff;
  --text: #111111;
  --text-soft: #333333;
  --text-muted: #555555;
  --border-light: #cccccc;
  --border-medium: #999999;
  --border-dark: #333333;
  --black: #000000;
  --white: #ffffff;
  --gray-50: #f7f7f7;
  --gray-100: #efefef;
  --gray-200: #e0e0e0;
  --gray-300: #d0d0d0;
  --gray-400: #b0b0b0;
  --gray-500: #888888;
  --gray-600: #666666;
  --gray-700: #444444;
  --gray-800: #222222;
  --gray-900: #0a0a0a;
  --radius-pill: 9999px;
  --font-system: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --line-height: 1.6;
}
```

Override any of them in a `:root` block after the stylesheet and the whole framework adapts.

### Common tweaks

**Square corners:**

```css
:root {
  --radius-pill: 0;
}
```

**Subtle rounding:**

```css
:root {
  --radius-pill: 6px;
}
```

**Remove borders globally:**

```css
*,
*::before,
*::after {
  border: none !important;
}
```

Then re-add borders only where you want them, e.g. on form controls.

## Browser support

Modern evergreen browsers. Uses `:focus-visible`, `:has()`, CSS custom properties, `dialog`, `details`, `progress`, `meter`, `MutationObserver`, and `dataset`. Falls back gracefully where `:has()` isn't supported.

## Accessibility

- Semantic HTML defaults preserved
- `:focus-visible` outlines on all interactive elements
- Sufficient contrast in both light and dark modes
- `prefers-reduced-motion` respected
- `prefers-contrast: more` bumps borders and muted text to full black
- Dialog closes on Escape
- External links get `rel="noopener noreferrer"`

## Files

- `styles.css` — the classless framework
- `script.js` — optional JavaScript enhancements

## License

MIT
