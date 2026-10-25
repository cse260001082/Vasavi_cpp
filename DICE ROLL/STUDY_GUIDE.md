# 🎲 Dice Roll Website — Beginner Study Guide

This guide walks through **every part** of the project, in the order a browser reads it.
You can read it top to bottom and then open the code files side by side.

## 0. The big picture

| File | Job | Think of it as |
|------|-----|----------------|
| `index.html` | The **structure**: what elements exist (buttons, dice box, list) | The skeleton |
| `style.css` | The **looks**: colors, sizes, grid, animation | Skin and clothes |
| `script.js` | The **behaviour**: random numbers, clicks, updating the page | The brain and muscles |

**How they connect**
- `index.html` has `<link rel="stylesheet" href="style.css" />` → loads the CSS.
- `index.html` has `<script src="script.js"></script>` → loads the JS.
- JS finds HTML elements by their `id`, then changes their text or their CSS classes. CSS reacts to those classes and changes how things look.

```
You click "Roll"  →  JS runs  →  JS adds class "rolling"  →  CSS sees the class  →  die shakes
```

**Run it:** double-click `index.html`. It needs internet once, because Tailwind and the Google fonts load from the web.

### Words you need first
- **Element / tag**: one piece of HTML, like `<button>...</button>`.
- **Attribute**: extra info inside a tag, like `id="rollBtn"` or `class="die-face"`.
- **id**: a unique name for one element (only one element per id).
- **class**: a label that many elements can share. CSS styles by class.
- **DOM** (Document Object Model): the live "tree" of elements the browser builds from your HTML. JavaScript can read and change this tree.
- **Pip**: a dot on a die.

---

## 1. `index.html` — line by line

### 1.1 The `<head>` (information about the page, not shown on screen)

```html
<!DOCTYPE html>
```
Tells the browser "this is modern HTML5".

```html
<html lang="en">
```
The root element that contains everything. `lang="en"` says the page is in English (helps screen readers and translation).

```html
<meta charset="UTF-8" />
```
Character set. UTF-8 lets the page show emojis (🎲) and symbols (×, –, •) correctly.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
Makes the page fit phone screens properly instead of showing a tiny zoomed-out desktop page. Needed for responsive design.

```html
<title>Dice Roll Website — Beginner JS & DOM Project</title>
```
The text shown on the browser tab.

```html
<script src="https://cdn.tailwindcss.com"></script>
```
Loads **Tailwind CSS** from the internet. Tailwind gives ready-made classes like `bg-white` (white background) or `p-4` (padding). That is why the HTML has so many class names. You did not write that CSS; Tailwind provides it.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter...&family=JetBrains+Mono..." rel="stylesheet">
```
Loads two fonts: **Inter** (normal text) and **JetBrains Mono** (code-looking numbers).

```html
<link rel="stylesheet" href="style.css" />
```
Loads **our own** CSS file. `rel="stylesheet"` says what kind of file it is, and `href` says where it is.

### 1.2 The `<body>` and its layout

```html
<body class="min-h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
```
Tailwind class meanings (read them one by one):
- `min-h-screen` → at least as tall as the window
- `flex flex-col` → stack children vertically (flexbox column)
- `justify-between` → spread children apart vertically
- `py-6` → padding top and bottom; `px-4` → padding left and right
- `sm:px-6 lg:px-8` → **responsive**: bigger side padding on bigger screens (`sm` ≥ 640px, `lg` ≥ 1024px)

```html
<div class="max-w-5xl w-full mx-auto space-y-6">
```
The main container. `max-w-5xl` stops it from getting too wide, `w-full` fills available width, `mx-auto` centers it, `space-y-6` adds a gap between its children.

### 1.3 The header

```html
<header class="bg-white rounded-2xl ... flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
```
`<header>` is the top card. On phones, children stack (`flex-col`). On `sm` screens and up, they go side by side (`sm:flex-row`).

Inside it:
- A small badge (`inline-flex ... rounded-full`) with `<span>Beginner Level</span>`, a dot `•`, and `<span>Problem Statement 1</span>`.
- `<h1>` is the main page title (there should be only one `h1` per page).
- `<p>` is a subtitle.

**Two control buttons** (these matter, JS uses them):

```html
<button id="inspectGridBtn" type="button" ... title="...">
  <span id="inspectGridIndicator" class="w-2 h-2 rounded-full bg-slate-400"></span>
  <span>Inspect 3×3 Grid (0–8)</span>
</button>
```
- `type="button"` means "just a button, do not submit a form".
- `title` is the tooltip when hovering.
- `inspectGridIndicator` is a tiny round dot (2×2 units, `rounded-full` = circle). JS changes its color and makes it pulse when the mode is on.

```html
<button id="soundToggleBtn" ...>
  <span id="soundIcon">🔊</span>
  <span id="soundLabel">Sound: ON</span>
</button>
```
JS changes the icon and label text when you click it.

### 1.4 The main workspace

```html
<main class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
```
A **CSS grid**. One column on phones, **12 columns** on large screens. The left section takes 7 of them (`lg:col-span-7`) and the right takes 5 (`lg:col-span-5`).

#### Left section: the dice

**Mode selector**
```html
<button id="oneDieBtn" ...>1 Die (1–6)</button>
<button id="twoDiceBtn" ...>2 Dice + Total (2–12)</button>
```
Two buttons that look like a switch. JS swaps their classes so the "selected" one looks white and raised.

**Dice arena**
```html
<div id="diceArena" class="... flex flex-wrap items-center justify-center gap-6 ...">
```
The box that holds the dice. JS adds/removes the class `inspect-grid` on this element to turn teaching mode on and off.

```html
<div id="die1" class="die-face" data-value="1" aria-label="Die 1"></div>
```
- `class="die-face"` → styled by our CSS (a 3×3 grid, see section 2).
- `data-value="1"` → a **custom data attribute**. JS stores the die's current number here, and CSS reads it (to make a "1" red).
- `aria-label` → description for screen readers.
- It is **empty on purpose**. JS fills it with 9 cells when the page loads.

```html
<span ... id="die1Caption">Die #1: 1</span>
```
Text under the die. JS updates it.

```html
<div id="plusSign" class="hidden ...">+</div>
```
The "+" between the dice. `hidden` is a Tailwind class meaning `display: none`. JS removes it in 2-dice mode.

```html
<div id="die2Wrapper" class="hidden flex-col items-center gap-2">
```
Holds die 2 and its caption. Hidden at first. Note it has both `hidden` and `flex-col`. When JS shows it, it swaps `hidden` for `flex` (see `setDiceMode`).

**Result banner**
- `resultStatusText` → the headline ("You rolled a 4!").
- `resultBreakdownText` → the details ("Die #1 [3] + Die #2 [4] = 7"). It starts with a `<kbd>Space</kbd>`; `<kbd>` is the tag for a keyboard key.
- `totalValueDisplay` → the big total number.

**Roll button**
```html
<button id="rollBtn" ... class="... disabled:opacity-60 disabled:cursor-not-allowed">
  <span id="rollBtnIcon">🎲</span>
  <span id="rollBtnText">Roll Dice</span>
</button>
```
`disabled:` classes only apply when JS sets `rollBtn.disabled = true`. That is how the button looks greyed out during a roll. The text lives in its own `<span>` (`rollBtnText`) so JS can change just the words and keep the emoji.

#### Right section: history and stats

```html
<aside ...> ... </aside>
```
`<aside>` = side content.

- `clearHistoryBtn` → wipes the history.
- Three small boxes: `statCount` (number of rolls), `statHigh` (highest total), `statAvg` (average). They start as `0`, `-`, `-`.
- ```html
  <ul id="historyList" class="... overflow-y-auto max-h-[300px] ...">
  ```
  A list (`ul`) that gets new `<li>` rows from JS. `overflow-y-auto` + `max-h-[300px]` means it scrolls after 300px.
- ```html
  <li id="emptyHistoryMessage">No rolls yet! ...</li>
  ```
  A placeholder message. JS hides it after the first roll and shows it again after Clear.

### 1.5 The teaching section at the bottom

Five cards, one per concept, plus a checklist. This is only static text and `<pre>` code samples. Notes:
- `<code>` marks inline code. `<pre>` keeps spaces and line breaks exactly.
- `&gt;` and `&lt;` are how you write `>` and `<` as visible text in HTML. If you typed `<` directly the browser would think a tag was starting.

### 1.6 The script tag at the very end

```html
<script src="script.js"></script>
```
Placed **last on purpose**. The browser reads top to bottom. If JS ran earlier, `document.getElementById('die1')` would return `null` because that element would not exist yet.

---

## 2. `style.css` — line by line

### 2.1 Base styles

```css
body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #0f172a; }
```
Use the Inter font (fall back to any sans-serif), a very light grey-blue background, and dark navy text. Colors like `#f8fafc` are **hex codes** (red, green, blue in base 16).

```css
code, .mono { font-family: 'JetBrains Mono', monospace; }
```
The comma means "apply to both `code` tags **and** anything with class `mono`". Monospace means every character has equal width (good for numbers).

### 2.2 `.die-face` — the die body

The dot `.` before a name means "select elements with this **class**".

| Line | Meaning |
|------|---------|
| `width: 132px; height: 132px;` | Square die |
| `background: linear-gradient(145deg, #ffffff, #f1f5f9);` | White fading to light grey diagonally (145°) |
| `border: 3px solid #e2e8f0;` | Light grey border |
| `border-radius: 24px;` | Rounded corners |
| `padding: 16px;` | Space between border and the inside cells |
| `display: grid;` | Turn this box into a **grid** container |
| `grid-template-columns: repeat(3, 1fr);` | 3 columns, each `1fr` (= 1 equal share of space) |
| `grid-template-rows: repeat(3, 1fr);` | 3 equal rows |
| `gap: 6px;` | Space between cells |
| `box-shadow: ...` | Three shadows separated by commas: a big soft one, a small one, and an `inset` one (inside the bottom edge) for a 3D look |
| `transition: transform 0.2s ease, ...` | When these properties change, animate smoothly over 0.2 seconds |
| `position: relative;` | Lets child elements be positioned relative to this box |
| `user-select: none;` | Prevents text selection when clicking quickly |

**The key idea:** 9 children inside a 3×3 grid fill the grid automatically in this order:
```
[0][1][2]
[3][4][5]
[6][7][8]
```
A die face is just "which of these 9 cells show a dot".

### 2.3 `.pip-cell` — one of the 9 cells

```css
display: flex; align-items: center; justify-content: center;
```
Flexbox centering trick: puts the dot exactly in the middle of the cell, both vertically and horizontally.
`position: relative` is so the small number label can sit in the corner. `border-radius: 8px` rounds it (visible in inspect mode).

### 2.4 `.pip` — the dot

- `width/height: 22px` + `border-radius: 50%` → a perfect circle.
- `background: radial-gradient(circle at 35% 35%, #334155, #0f172a);` → a circular gradient whose bright spot is at 35%/35%, giving a 3D "glossy" look.
- `box-shadow: inset ...` → inner shadow for depth.
- **`transform: scale(0);`** → the dot is shrunk to nothing, i.e. **invisible by default**.
- `transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);` → when scale changes it animates with a small "overshoot" bounce.

### 2.5 `.pip.active` and the red "1"

```css
.pip.active { transform: scale(1); }
```
`.pip.active` (no space) means "an element that has **both** classes". When JS adds `active`, the dot grows to full size and pops into view. **JS only toggles a class; CSS does the visual work.**

```css
.die-face[data-value="1"] .pip.active { background: radial-gradient(...red...); width: 26px; height: 26px; }
```
Read it right to left: "a `.pip.active` that is **inside** a `.die-face` whose `data-value` attribute equals 1". The space between selectors means "inside". So the single dot on a 1 becomes bigger and red, like a classic die. This is why JS writes `data-value` on every render.

### 2.6 Inspect (teaching) mode

```css
.inspect-grid .pip-cell { border: 1px dashed #94a3b8; background-color: rgba(241,245,249,0.7); }
```
Only cells **inside** something with class `inspect-grid` (that's `diceArena`) get dashed borders and a tint. `rgba(r,g,b,0.7)` is a color with 70% opacity.

```css
.cell-index-label { position: absolute; top: 1px; left: 3px; ... opacity: 0; pointer-events: none; }
```
The small 0–8 number. `position: absolute` pins it to the top-left of its cell (which is `relative`). `opacity: 0` hides it by default. `pointer-events: none` makes clicks pass through it.

```css
.inspect-grid .cell-index-label { opacity: 1; }
```
In inspect mode, the numbers fade in (thanks to the `transition`).

### 2.7 Animations

```css
@keyframes shakeAndRoll {
  0%   { transform: translate(0, 0) rotate(0deg) scale(1); }
  20%  { transform: translate(-8px, -10px) rotate(-14deg) scale(1.05); }
  ...
  100% { transform: translate(0, 0) rotate(0deg) scale(1); }
}
```
`@keyframes` defines an animation as a list of "snapshots". At 20% of the time, the die is moved 8px left and 10px up, tilted 14° counter-clockwise, and slightly bigger. The browser fills in the motion between snapshots. It starts and ends at the same place, so it loops smoothly.

```css
.die-face.rolling { animation: shakeAndRoll 0.45s infinite ease-in-out; border-color: #6366f1; }
```
When JS adds `rolling`: play that animation, 0.45 seconds per cycle, `infinite` times, with easing, and turn the border indigo.

```css
@keyframes landPop { 0% { transform: scale(1.12); } 100% { transform: scale(1); } }
.die-face.landed { animation: landPop 0.25s ease-out; }
```
A single quick "pop" from slightly large to normal size when the result lands. No `infinite`, so it plays once.

### 2.8 Responsive rule

```css
@media (max-width: 640px) { .die-face { width: 116px; ... } .pip { width: 18px; ... } }
```
A **media query**: these rules apply only when the screen is 640px wide or less (phones). Dice and dots shrink a bit.

---

## 3. `script.js` — line by line

### Step 1: `PIP_PATTERNS` (the lookup table)

```js
const PIP_PATTERNS = {
  1: [4],
  2: [0, 8],
  ...
  6: [0, 2, 3, 5, 6, 8]
};
```
- `const` = a variable that cannot be reassigned.
- `{ ... }` is an **object**: pairs of `key: value`. Here the key is the die number and the value is an **array** `[ ... ]` listing which of the 9 cells (0–8) should show a dot.
- Example: `5: [0, 2, 4, 6, 8]` = four corners + center.
- Why this is smart: we never write `if (value === 1) ... else if (value === 2) ...`. We just **look up** `PIP_PATTERNS[value]`.

Try it: `PIP_PATTERNS[3]` gives `[0, 4, 8]` (a diagonal).

### Step 2: State variables

```js
let numberOfDice = 1;
let isRolling = false;
let soundEnabled = true;
let inspectGridMode = false;
let rollHistory = [];
```
**State** = the program's memory. `let` is used (not `const`) because these values change later.
- `numberOfDice`: 1 or 2.
- `isRolling`: a **boolean** flag (true/false). Stops you from starting a second roll while one is in progress.
- `soundEnabled`, `inspectGridMode`: on/off switches.
- `rollHistory`: an empty **array** that will hold one object per roll.

### Step 3: Grabbing elements

```js
const die1El = document.getElementById('die1');
```
- `document` = the whole page (the DOM).
- `getElementById('die1')` = find the element whose `id="die1"`.
- We store it in a variable so we can use it many times without searching again.
- Naming habit: names end in `El`, `Btn`, `Text` etc. so you know what kind of thing they are.

The next ~25 lines all do the same thing for other ids. If you misspell an id, you get `null` and later lines crash with errors like "Cannot read properties of null". Check the browser console (F12) if something breaks.

### Step 4: Helper functions

#### `getRandomDieValue`

```js
function getRandomDieValue() {
  return Math.floor(Math.random() * 6) + 1;
}
```
Evaluate **inside out**:
1. `Math.random()` → decimal ≥ 0 and < 1, e.g. `0.73`.
2. `* 6` → 0 up to (not including) 6, e.g. `4.38`.
3. `Math.floor(...)` → rounds **down** to a whole number: `4`. Possible results: 0,1,2,3,4,5, each equally likely.
4. `+ 1` → 1 to 6.

Common mistake: using `Math.round`. That makes the end values (0 and 6) half as likely, so it is **biased**.

#### `buildDieGridCells`

```js
function buildDieGridCells(dieElement) {
  dieElement.innerHTML = '';
```
`dieElement` is a **parameter** (input). `innerHTML = ''` empties the die so we never get duplicate cells.

```js
  for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
```
A loop that runs 9 times with `cellIndex` = 0,1,…,8. (`cellIndex++` means "add 1 each time".)

```js
    const cell = document.createElement('div');
    cell.className = 'pip-cell';
```
Create a brand-new `<div>` in memory (not on the page yet) and give it the class `pip-cell`.

```js
    const indexLabel = document.createElement('span');
    indexLabel.className = 'cell-index-label';
    indexLabel.textContent = cellIndex;
```
A `<span>` showing the cell number (used by inspect mode). `textContent` sets the plain text inside.

```js
    const pip = document.createElement('span');
    pip.className = 'pip';
```
The dot.

```js
    cell.appendChild(indexLabel);
    cell.appendChild(pip);
    dieElement.appendChild(cell);
```
`appendChild` puts one element inside another (at the end). Now the page gets:
```html
<div class="die-face">
  <div class="pip-cell"><span class="cell-index-label">0</span><span class="pip"></span></div>
  ... (9 times)
</div>
```
Order matters: cells are appended 0 to 8, so the grid places them in the order shown earlier.

#### `renderDieFace`

```js
function renderDieFace(dieElement, value) {
  dieElement.setAttribute('data-value', value);
```
Writes `data-value="4"` (for example) onto the die. CSS uses this for the red 1.

```js
  const activeIndices = PIP_PATTERNS[value];
```
Look up the list of cells to light, e.g. value 4 gives `[0, 2, 6, 8]`.

```js
  const allPips = dieElement.querySelectorAll('.pip');
```
`querySelectorAll` finds **all** elements matching a CSS selector, searching only inside `dieElement`. So die 1 and die 2 do not interfere. It returns 9 pips in order.

```js
  allPips.forEach((pipElement, index) => {
    const shouldShowPip = activeIndices.includes(index);
    pipElement.classList.toggle('active', shouldShowPip);
  });
```
- `forEach` runs the function once for each pip. `index` is 0,1,…,8.
- `(a, b) => { ... }` is an **arrow function** (a short way to write a small function).
- `activeIndices.includes(index)` → `true` if that cell number is in the list.
- `classList.toggle('active', true/false)` → with `true` it **adds** the class; with `false` it **removes** it. So every pip is correctly on or off, every time.

**Hand trace** for `renderDieFace(die, 3)`: list is `[0,4,8]`. Index 0 → true (on), 1 → false (off), 2 → off, 3 → off, 4 → on, 5,6,7 → off, 8 → on. That is a diagonal. ✔

### Step 5: Sound with Web Audio

No MP3 file: the browser **synthesizes** a click.

```js
let audioCtx = null;
```
The audio engine, created lazily (only when first needed, because browsers require a user action before sound).

```js
function playDiceTickSound(pitchMultiplier = 1) {
```
`= 1` is a **default parameter**: if you call it with nothing, `pitchMultiplier` is 1.

```js
  if (!soundEnabled) return;
```
`!` means "not". If sound is off, leave the function immediately.

```js
  try { ... } catch (e) { }
```
`try/catch`: attempt the code, and if it throws an error (e.g. audio blocked), jump to `catch` instead of crashing the whole page. The catch is empty on purpose.

```js
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
```
Create the engine once. `||` means "or": use `AudioContext`, or the old Safari name if the first does not exist.

```js
    const osc = audioCtx.createOscillator();   // makes a tone
    const gain = audioCtx.createGain();        // a volume knob
    osc.type = 'triangle';                     // a soft wave shape
```

```js
    osc.frequency.setValueAtTime(220 * pitchMultiplier, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.045);
```
Start at 220 Hz (times the multiplier) and glide down to 80 Hz in 0.045 seconds. The quick drop sounds like a "tick".

```js
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.045);
```
Volume starts at 0.12 (quiet) and fades to almost zero.

```js
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
```
Wire it up like cables: tone → volume → speakers (`destination`). Start now, stop after 0.05 s.

### Step 6: `rollDice` (the heart of the app)

```js
function rollDice() {
  if (isRolling) return;
  isRolling = true;
```
**Guard clause.** If already rolling, do nothing. Otherwise mark ourselves as rolling.

```js
  rollBtn.disabled = true;
  rollBtnText.textContent = 'Rolling...';
  resultStatusText.textContent = 'Rolling the dice...';
```
Disable the button and update the texts.

```js
  die1El.classList.remove('landed');
  die2El.classList.remove('landed');
  die1El.classList.add('rolling');
  if (numberOfDice === 2) { die2El.classList.add('rolling'); }
```
Remove the old "landed" pop class (so it can play again next time) and add `rolling` so CSS starts the shake. Die 2 only shakes in 2-dice mode. (`===` compares value and type; `=` would assign, a classic bug.)

```js
  const cycleInterval = setInterval(() => {
    renderDieFace(die1El, getRandomDieValue());
    if (numberOfDice === 2) { renderDieFace(die2El, getRandomDieValue()); }
    playDiceTickSound(0.9 + Math.random() * 0.3);
  }, 75);
```
`setInterval(function, 75)` runs the function **every 75 ms** until stopped. Each tick shows a random face (the "tumbling" effect) and plays a tick at a random pitch between 0.9 and 1.2. We save the timer's ID in `cycleInterval` so we can stop it later.

```js
  setTimeout(() => { ... }, 550);
```
`setTimeout(function, 550)` runs the function **once**, after 550 ms. Everything inside is the "landing":

```js
    clearInterval(cycleInterval);
```
Stop the face cycling.

```js
    const finalDie1 = getRandomDieValue();
    const finalDie2 = numberOfDice === 2 ? getRandomDieValue() : 0;
    const total = finalDie1 + finalDie2;
```
The **real** result is chosen now (the cycling faces were just decoration).
`condition ? A : B` is the **ternary operator**: "if 2 dice, roll; else use 0". So in 1-die mode the total is just die 1.

```js
    die1El.classList.remove('rolling');
    die2El.classList.remove('rolling');
    die1El.classList.add('landed');
    if (numberOfDice === 2) { die2El.classList.add('landed'); }
```
Stop shaking, play the landing pop.

```js
    renderDieFace(die1El, finalDie1);
    die1Caption.textContent = `Die #1: ${finalDie1}`;
```
Draw the final face and update the caption. The backticks `` ` `` make a **template literal**: `${...}` inserts a variable's value into the text.

```js
    playDiceTickSound(1.4);
    totalValueDisplay.textContent = total;
```
Higher-pitched "landing" click, then show the total.

```js
    if (numberOfDice === 1) { ...single-die texts... }
    else {
      const isDoubles = finalDie1 === finalDie2;
      resultStatusText.textContent = isDoubles ? `🎉 Doubles! ...` : `You rolled a total of ${total}!`;
      ...
    }
```
`finalDie1 === finalDie2` is `true` or `false`, stored in `isDoubles`; then a ternary picks the message.

```js
    addRollToHistory(finalDie1, finalDie2, total, numberOfDice);
```
Calls the next function to log this roll.

```js
    isRolling = false;
    rollBtn.disabled = false;
    rollBtnText.textContent = numberOfDice === 1 ? 'Roll Die Again' : 'Roll Both Dice';
```
Unlock everything. **If you forgot `isRolling = false`, the app would freeze after one roll.**

**Timeline**
```
 0 ms   click → lock button, add .rolling
75 ms   face changes (tick)
150 ms  face changes ... (every 75 ms)
550 ms  stop timer, pick real result, show it, unlock
```

### Step 7: History and statistics

#### `addRollToHistory(d1, d2, total, diceCount)`

```js
const rollNumber = rollHistory.length + 1;
```
`.length` = number of items in the array. The 1st roll gets #1.

```js
const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
```
`new Date()` = right now. `toLocaleTimeString` formats it in the user's local style. The `{ ... }` object is the options (always 2 digits).

```js
const rollRecord = { rollNumber, d1, d2, total, diceCount, timeString };
rollHistory.push(rollRecord);
```
`{ rollNumber, d1 }` is shorthand for `{ rollNumber: rollNumber, d1: d1 }`. `push` adds it to the end of the array. This is our **data**; the `<li>` below is only how we **show** it.

```js
if (emptyHistoryMessage) { emptyHistoryMessage.classList.add('hidden'); }
```
Hide the "No rolls yet" message (the `if` just checks it exists).

```js
const li = document.createElement('li');
li.className = '...Tailwind classes...';
```
A new list item with styling classes.

```js
const breakdownLabel = diceCount === 1 ? `...[${d1}]...` : `...[${d1}] + [${d2}]...`;
```
Builds a chunk of HTML text: one badge for 1 die, two badges with a `+` for 2 dice.

```js
li.innerHTML = `
  <div> ... #${rollNumber} ... ${breakdownLabel} </div>
  <div> ... ${timeString} ... Total: ${total} </div>
`;
```
`innerHTML` sets the HTML inside the `li` from a string. A multi-line template literal keeps it readable.
(Safe here because all values are numbers we made. Never put user-typed text in `innerHTML`, it can inject scripts.)

```js
historyList.prepend(li);
```
`prepend` inserts at the **start**, so the newest roll is on top (`appendChild` would put it at the bottom).

```js
updateStatistics();
```

#### `updateStatistics`

```js
const count = rollHistory.length;
statCount.textContent = count;
if (count === 0) { statHigh.textContent = '-'; statAvg.textContent = '-'; return; }
```
If empty, show dashes and **return** early (this also avoids dividing by zero).

```js
let sum = 0;
let highest = 0;
for (const item of rollHistory) {
  sum += item.total;
  if (item.total > highest) { highest = item.total; }
}
```
`for...of` visits each roll object. `sum += x` means `sum = sum + x`. `item.total` reads the `total` property. Classic "running maximum": keep the biggest seen so far.

```js
const average = (sum / count).toFixed(1);
```
`toFixed(1)` keeps 1 decimal place (and returns text like `"7.3"`).

#### `clearHistory`

```js
rollHistory = [];                       // forget the data
historyList.innerHTML = '';             // remove all <li> from the page
historyList.appendChild(emptyHistoryMessage);   // put the placeholder back
emptyHistoryMessage.classList.remove('hidden'); // and show it
updateStatistics();                     // stats go back to 0 / - / -
```
Why re-append the placeholder? `innerHTML = ''` deleted it from the page, but our variable still remembers the element, so we can insert it again.

### Step 8: Mode switching and event listeners

#### `setDiceMode(count)`

```js
numberOfDice = count;
```
Saves the choice in state.

**If `count === 1`:**
- `oneDieBtn.className = '...bg-white text-slate-900 shadow-sm'` and `twoDiceBtn.className = '...text-slate-600...'` → rewrite whole class strings so the chosen button looks selected.
- `die2Wrapper.classList.add('hidden'); .remove('flex');` → hide die 2 (we remove `flex` so it does not fight with `hidden`). `plusSign` hidden too.
- ```js
  const currentDie1Val = Number(die1El.getAttribute('data-value')) || 1;
  ```
  Read `data-value` (it is **text**, like `"4"`), convert to a number with `Number(...)`. `|| 1` = "if that fails (gives 0 or NaN), use 1".
- Update the total and the two texts.

**Else (2 dice):** the mirror image: highlight `twoDiceBtn`, show die 2 and the plus sign, and set the total to `d1Val + d2Val`.

#### Event listeners

```js
rollBtn.addEventListener('click', rollDice);
```
"When this button is clicked, run `rollDice`." Note: **no parentheses** after `rollDice`. With `()` it would run immediately instead of on click.

```js
oneDieBtn.addEventListener('click', () => setDiceMode(1));
```
Here we need to pass an argument (1), so we wrap the call in a small arrow function that runs only on click.

```js
inspectGridBtn.addEventListener('click', () => {
  inspectGridMode = !inspectGridMode;
  diceArena.classList.toggle('inspect-grid', inspectGridMode);
  inspectGridIndicator.className = inspectGridMode ? '...animate-ping' : '...bg-slate-400';
});
```
`!` flips true↔false. Then the class `inspect-grid` is added or removed on the arena, and CSS shows or hides the dashed boxes and numbers. The indicator dot also changes.

```js
soundToggleBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
  soundLabel.textContent = soundEnabled ? 'Sound: ON' : 'Sound: OFF';
});
```
Same flip pattern.

```js
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && document.activeElement.tagName !== 'BUTTON') {
    event.preventDefault();
    rollDice();
  }
});
```
- Listens for any key press anywhere in the window.
- `event` is an object describing what happened; `event.code` is the physical key (`'Space'`).
- `&&` = "and". We also require that the focused element is **not** a button. Otherwise pressing Space on a focused button would click it **and** roll again.
- `event.preventDefault()` stops the browser's default Space behaviour (scrolling down the page).

### Step 9: Start-up

```js
buildDieGridCells(die1El);
buildDieGridCells(die2El);
renderDieFace(die1El, 1);
renderDieFace(die2El, 6);
```
Build 9 cells in each die, then draw die 1 as a "1" and die 2 as a "6". This matches the starting `data-value`s and captions in the HTML.

---

## 4. Full story of one click

1. Page loads → HTML builds the DOM → CSS styles it → `script.js` runs; the 9 cells are built; the dice show 1 and 6.
2. You click **Roll Dice** (or press Space) → `rollDice()`.
3. `isRolling` becomes true; the button is disabled; `.rolling` is added → CSS shakes the die.
4. Every 75 ms: random face + tick sound.
5. At 550 ms: timer stops; the real random values are chosen; `.rolling` is removed and `.landed` added; faces and texts update.
6. `addRollToHistory` stores an object in `rollHistory`, creates an `<li>`, `prepend`s it, then `updateStatistics` recalculates count, highest, average.
7. `isRolling` becomes false; the button is enabled again.

---

## 5. Concept cheat-sheet

| Concept | Example | Meaning |
|---------|---------|---------|
| Variable | `let x = 1;` / `const y = 2;` | Named storage (`let` can change, `const` cannot) |
| Array | `[0, 4, 8]` | Ordered list; `.push`, `.length`, `.includes` |
| Object | `{ d1: 3, total: 7 }` | Named properties |
| Function | `function f(a) { ... }` | Reusable block of code |
| Arrow function | `() => { ... }` | Short function, common in callbacks |
| `if / else` | `if (x) {...} else {...}` | Decision |
| Ternary | `a ? b : c` | One-line if/else |
| `for` / `for...of` / `forEach` | | Loops |
| Template literal | `` `Die: ${n}` `` | Text with inserted values |
| `getElementById` | | Find one element by id |
| `querySelectorAll` | | Find all elements by CSS selector |
| `createElement` / `appendChild` / `prepend` | | Build and place new elements |
| `textContent` / `innerHTML` | | Set plain text / set HTML |
| `classList.add/remove/toggle` | | Change classes → CSS reacts |
| `addEventListener` | | Run code on click/key |
| `setInterval` / `setTimeout` | | Repeat / delay |

---

## 6. Practice exercises (do them yourself)

1. Change the roll time from 550 ms to 1000 ms. What else would you change so the animation still looks smooth?
2. Add a 3rd button "3 Dice". What parts of `rollDice` assume only two dice?
3. Change `PIP_PATTERNS[1]` to `[0]`. Which cell lights up? Turn on Inspect mode to confirm.
4. Make the history show only the last 10 rolls (hint: look at `historyList.children` and `removeChild` / `.remove()`).
5. Add a "Lowest" stat box next to "Highest".
6. Replace `Math.floor` with `Math.round` in `getRandomDieValue`, roll 600 times, and count how often 1 and 6 appear. What do you notice?
7. Save `rollHistory` in `localStorage` so it survives a page refresh.

## 7. If something breaks

- Press **F12 → Console** and read the red error. It names the file and line.
- `Cannot read properties of null` → an `id` in JS does not match the HTML.
- Nothing styled → check the `<link href="style.css">` path and that the files are in the same folder.
- No sound → click the page first (browsers block audio before interaction) and check that Sound is ON.
