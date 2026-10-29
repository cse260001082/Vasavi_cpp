# 🎨 Design System

> Extracted from the Dice Roll study guide. Use this color scheme and typography for **every HTML artifact** created in this repo (summaries, guides, study pages, etc.).

---

## Colors (Light Mode — default)

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FFFFEB` | Page background (warm cream) |
| `--surface` | `#FFFFFF` | Cards, inputs, elevated surfaces |
| `--border` | `#E4E4D0` | Borders, dividers |
| `--ink` | `#1A1A1A` | Primary text |
| `--ink-2` | `#3D3D36` | Secondary text |
| `--muted` | `#6E6E64` | Captions, labels, meta text |
| `--accent` | `#034F46` | Primary buttons, links, active states (deep teal) |
| `--on-accent` | `#FFFFEB` | Text on accent backgrounds |
| `--accent-text` | `#034F46` | Accent-colored text, link color |
| `--lav` | `#F0D7FF` | Highlight background (soft lavender) |
| `--on-lav` | `#1A1A1A` | Text on lavender backgrounds |
| `--ember` | `#FFA946` | Call-to-action, warnings, emphasis (warm orange) |
| `--ember-soft` | `#FFEBCF` | Soft ember background (hints, changed rows) |
| `--on-ember` | `#1A1A1A` | Text on ember backgrounds |
| `--hero-bg` | `#034F46` | Hero section background (deep teal) |
| `--hero-fg` | `#FFFFEB` | Hero text |
| `--hero-fg-2` | `#CFE3DC` | Hero secondary text |
| `--hero-chip` | `#0A5F55` | Hero stat cards background |
| `--hero-line` | `#2F7A70` | Hero stat card borders |

## Colors (Dark Mode)

| Token | Hex |
|---|---|
| `--bg` | `#1A1A1A` |
| `--surface` | `#222222` |
| `--border` | `#36362F` |
| `--ink` | `#FFFFEB` |
| `--ink-2` | `#DADAC8` |
| `--muted` | `#A3A397` |
| `--accent` | `#F0D7FF` |
| `--on-accent` | `#1A1A1A` |
| `--accent-text` | `#F0D7FF` |
| `--lav` | `#3A2D47` |
| `--on-lav` | `#FFFFEB` |
| `--ember` | `#FFA946` |
| `--ember-soft` | `#3B2C18` |

## Code Block Colors

| Token | Hex | Usage |
|---|---|---|
| `--code-bg` | `#222222` | Code background |
| `--code-fg` | `#FFFFEB` | Code text |
| `--syn-key` | `#F0D7FF` | Keywords (lavender) |
| `--syn-str` | `#FFA946` | Strings (ember) |
| `--syn-num` | `#8FD9C9` | Numbers (mint) |
| `--syn-attr` | `#C9E6DF` | Attributes/function names |
| `--syn-dim` | `#8A8A80` | Comments, dimmed text |

---

## Typography

| Role | Font | Fallback |
|---|---|---|
| **Display** (headings) | Bricolage Grotesque (500–800) | Segoe UI, system-ui, sans-serif |
| **Body** (paragraphs) | Atkinson Hyperlegible (400, 700) | Segoe UI, system-ui, sans-serif |
| **Mono** (code) | JetBrains Mono (400, 600) | Consolas, Courier New, monospace |

### Google Fonts import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=JetBrains+Mono:wght@400;600&display=swap">
```

---

## Sizing & Spacing

| Element | Value |
|---|---|
| Body font size | `17px` (desktop), `16px` (mobile) |
| Line height | `1.6` |
| Max content width | `1200px` |
| Reading column | `68ch` max-width |
| Border radius (cards) | `14px` |
| Border radius (buttons) | `999px` (pill) |
| Border radius (chips/badges) | `999px` |
| Border radius (code blocks) | `14px` |

---

## Component Patterns

### Buttons
- **Primary**: `background: var(--accent)`, `color: var(--on-accent)`, pill shape
- **Ghost**: transparent background, accent-colored border, accent text
- **Ember (CTA)**: `background: var(--ember)`, `color: var(--on-ember)`

### Cards / Boxes
- `background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: 14px`, `padding: 16px 18px`

### Callouts
- `background: var(--lav)`, `color: var(--on-lav)`, `border-radius: 14px`, `padding: 18px 24px`

### Hints
- `background: var(--ember-soft)`, `color: var(--ink)`, `border-radius: 10px`, `padding: 10px 14px`

### Hero Sections
- `background: var(--hero-bg)`, `color: var(--hero-fg)`
- Eyebrow: uppercase, letter-spacing `.1em`, `color: var(--lav)`
- Stat chips: `background: var(--hero-chip)`, `border: 1px solid var(--hero-line)`

### Tables
- Collapse borders, `padding: 10px 12px`, bottom border per row
- Header: uppercase, `letter-spacing .09em`, `color: var(--muted)`

### Badges / Level Tags
- Easy: lavender background
- Medium: ember-soft background with ember border
- Hard: ink background, bg text (inverted)

---

## Accessibility

- Dark mode supported via `prefers-color-scheme: dark` and `data-theme` attribute
- Focus visible: `outline: 3px solid var(--ember), offset 2px`
- Reduced motion: disables all animations and transitions
- Text size adjust: `100%`
- Safe area insets respected for mobile notches
