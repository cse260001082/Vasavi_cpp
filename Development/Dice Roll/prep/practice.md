# Practice tasks: HTML to JavaScript

Ten small tasks that build up to the Dice Roll project. Each task adds one or two ideas, and every idea appears somewhere in `index.html`, `style.css` or `script.js`. By task 10 she will have built a one-die version of the project with her own hands.

## How to use this

- Do one or two tasks per sitting. The CSS tasks are quick, the JS ones need more time.
- She types everything. No copy-paste, not even from the answers.
- Let her try first. Open the answer only after a real attempt, or to check her work.
- Each task ends with two questions. Ask them one at a time. Several are the kind of thing the interviewer will ask.
- After each task, open the dice project and have her point to the same idea there.
- When the checker shows a ✗, let her read the hint and fix it herself before you step in. A task is done when its panel header turns green.

## Setup

Everything is ready in the `practice` folder, one folder per task:

```
practice/
  check.js     the checker, she never needs to open it
  task01/      index.html with only the check line, images/
  task02/      index.html, style.css (empty), images/
  task03/      index.html, style.css, images/
  ...
  task07/      adds script.js (empty)
  ...
  task10/
```

Each task folder starts where the previous task ends. If task 4 went badly, task 5 still starts clean.

The finished dice project (`index.html`, `style.css`, `script.js`, `images/`) is one folder up, in `Dice Roll/`, next to this `prep/` folder.

1. Open `practice/task01/index.html` in Chrome by double-clicking it.
2. Edit the files in VS Code. After every change, save and press F5 in Chrome.
3. A "Task 1 check" panel sits in the bottom-right corner of the page. Each step gets a ✓ when it's right, or a ✗ with a hint. The Hide button folds it away.
4. From task 7 on, some checks need button clicks. Press "Run all checks" and the checker clicks the buttons for her. Reload the page afterwards to reset it.
5. The last line of `<body>` in every task is `<script src="../check.js" data-task="1"></script>` (with that task's number). That line loads the checker, so it has to stay there.

## Overview

| # | Task | New ideas | Same idea in the dice project |
|---|---|---|---|
| 1 | Page skeleton | tags, nesting, attributes | all of `index.html` |
| 2 | Selectors and colors | linking CSS, tag, class and id selectors | `body`, `#result`, `#history` |
| 3 | A square | width, height, border, padding, margin, centering | `.container` |
| 4 | Circles and a button | `border-radius`, `:hover`, flexbox centering | `button`, `button:hover`, the dice images |
| 5 | Animation | `@keyframes`, `animation`, `transform` | `.shake`, `@keyframes shake` |
| 6 | Phone-friendly | viewport meta, `@media` | `@media` at the end of `style.css` |
| 7 | First JavaScript | `<script>`, `getElementById`, `textContent`, `addEventListener`, `let` and `const` | top and bottom of `script.js` |
| 8 | Random number and image | `Math.random`, `Math.floor`, `return`, changing `src` | `getRandom()`, `dice1.src = ...` |
| 9 | Shake on click | `classList.add`, `classList.remove`, `setTimeout` | `roll()` |
| 10 | History list | `createElement`, `prepend`, `children.length`, `remove()` | `addHistory()` |

---

## Task 1: Page skeleton

Folder: `practice/task01`

A plain page with a heading, a paragraph, a dice image, a button and a list. No styling yet.

**Steps**

1. Open `practice/task01/index.html`. It only has a comment and the check line. Write the whole page in this file, and make sure the check line ends up just before `</body>`.
2. Write the basic structure: `<!DOCTYPE html>`, then `<html>` with a `<head>` and a `<body>` inside it.
3. In `<head>`, add `<meta charset="UTF-8">`, the viewport line from the dice project's `index.html` (task 6 explains it), and a `<title>` that says "Practice".
4. In `<body>`, add:
   - an `<h1>` that says "My Practice Page"
   - a `<p>` with any sentence
   - an `<img>` that shows `images/dice3.svg`, with `alt="Dice"`
   - a `<button>` that says "Click me"
   - a `<ul>` with three `<li>` items, like favourite foods
5. Indent every tag two spaces inside its parent, so the nesting is easy to see.

**Check**

- The browser tab says "Practice".
- The image shows a die with three dots.
- Change the `src` to `images/dice9.svg` and reload. What shows up? Change it back.

**Hints**

- `<img>` has no closing tag.
- The `src` path starts from the folder that holds `index.html`.

**Questions to ask her**

1. What goes in `<head>`, and what goes in `<body>`?
2. When the image path was wrong, what appeared instead? So what is `alt` for?

<details>
<summary>Answer (open only after trying)</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practice</title>
</head>
<body>
  <h1>My Practice Page</h1>
  <p>I am learning HTML.</p>
  <img src="images/dice3.svg" alt="Dice">
  <button>Click me</button>
  <ul>
    <li>Dosa</li>
    <li>Biryani</li>
    <li>Pani puri</li>
  </ul>
</body>
</html>
```

Expected answers:
1. `<head>` holds information about the page that isn't shown on screen, like the title, the character set and the CSS link. `<body>` holds everything you see.
2. A broken image icon and the word "Dice". `alt` is the text shown when the image can't load, and screen readers read it out for blind users.

</details>

---

## Task 2: Selectors and colors

Folder: `practice/task02`

Connect a CSS file and style elements in three ways: by tag name, by class and by id.

**Steps**

1. `style.css` is already in the folder, empty. Link it inside `<head>` with `<link rel="stylesheet" href="style.css">`.
2. Write one rule for `body`: a light gray background, the Arial font, and all text centered.
3. Give the paragraph `class="note"`. In CSS, make `.note` gray with a font size of 18px.
4. Give the heading `id="title"`. In CSS, make `#title` dark blue.
5. Add a second `<p class="note">` with another sentence. Don't write any new CSS for it.

**Check**

- Both paragraphs are gray, even though she wrote CSS only once.
- If nothing changed at all, the `<link>` line is wrong. Check the file name and spelling.

**Questions to ask her**

1. Why did the second paragraph get styled without any new CSS?
2. When do you use a class, and when an id?

<details>
<summary>Answer (open only after trying)</summary>

```html
<head>
  ...
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1 id="title">My Practice Page</h1>
  <p class="note">I am learning HTML.</p>
  <p class="note">CSS makes it look nice.</p>
  ...
```

```css
body {
  background-color: #eef2f7;
  font-family: Arial, sans-serif;
  text-align: center;
}

.note {
  color: gray;
  font-size: 18px;
}

#title {
  color: #2c3e50;
}
```

Expected answers:
1. The `.note` rule applies to every element with that class.
2. A class is for a style that many elements share. An id is for one unique element. JavaScript uses ids to find elements, which is why every button and image in the dice project has an id.

</details>

---

## Task 3: Make a square

Folder: `practice/task03`

Learn the box model: every element is a box with content, padding, a border and a margin.

**Steps**

1. Add `<div class="square"></div>` below the image.
2. In CSS, make `.square` 100px wide and 100px tall, with any background color.
3. The square sits on the left, even though `body` has `text-align: center`. Center it with `margin: 20px auto`.
4. Add `border: 4px solid #2c3e50`.
5. Add `padding: 20px`. Did the square get bigger? Right-click it, choose Inspect, and hover over the square to see its real size. Then remove the padding.
6. Wrap everything inside `<body>`, except the check line, in `<div class="container">`. Give `.container` a white background, `max-width: 500px`, `margin: 0 auto`, `padding: 20px` and `border-radius: 10px`. Drag the browser window narrow and wide and watch the white card.

**Check**

- The square is centered and has a dark border.
- The white card never gets wider than 500px, but it shrinks on a narrow window.

**Hint**

`text-align: center` only centers text and inline things like `<img>` and `<button>`. A `<div>` is a block. To center a block, set its left and right margins to `auto`.

**Questions to ask her**

1. What's the difference between padding and margin?
2. Why does `.container` use `max-width` and not `width`?

<details>
<summary>Answer (open only after trying)</summary>

```html
<body>
  <div class="container">
    <h1 id="title">My Practice Page</h1>
    ...
    <img src="images/dice3.svg" alt="Dice">
    <div class="square"></div>
    ...
  </div>
</body>
```

```css
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
}

.square {
  width: 100px;
  height: 100px;
  background-color: #f4b400;
  border: 4px solid #2c3e50;
  margin: 20px auto;
}
```

With `padding: 20px` the square was 148px wide: 100 content + 20 + 20 padding + 4 + 4 border. Padding and border are added on top of `width`.

Expected answers:
1. Padding is space inside the border, between the border and the content. Margin is space outside the border, between this box and its neighbours.
2. `width: 500px` would stay 500px even on a 375px phone and stick out of the screen. `max-width` lets the card shrink on small screens.

</details>

---

## Task 4: Circles, rounded corners and a button

Folder: `practice/task04`

**Steps**

1. Add `<div class="circle"></div>`. Make it 80px by 80px, give it a color, center it like the square, and add `border-radius: 50%`.
2. Change the circle's width to 160px. What shape is it now? Change it back.
3. Make an empty die: add `<div class="face"></div>`. Make it 100px by 100px with a white background, `border: 4px solid #2c3e50`, `border-radius: 16px`, and center it.
4. Put a dot inside the die: `<div class="dot"></div>` goes inside the `.face` div. Make the dot 20px by 20px, dark, and round.
5. The dot is stuck in the top-left corner. Add these three lines to `.face` to center it:
   ```css
   display: flex;
   justify-content: center;
   align-items: center;
   ```
   Now it's a die showing 1.
6. Style the button: padding `10px 20px`, a dark background, white text, `font-size: 16px`, `border: none`, `border-radius: 5px` and `cursor: pointer`.
7. Add a `button:hover` rule with a lighter background color.

**Check**

- A circle, a die showing 1, and a button that changes color when the mouse is over it.
- Bonus: open `images/dice1.svg` in Notepad. The dice images are built the same way, a `rect` with rounded corners (`rx="16"`) and a `circle`.

**Questions to ask her**

1. What does `border-radius: 50%` do to a square? And to a rectangle?
2. What does `:hover` mean?

<details>
<summary>Answer (open only after trying)</summary>

```html
<div class="circle"></div>
<div class="face">
  <div class="dot"></div>
</div>
<button>Click me</button>
```

```css
.circle {
  width: 80px;
  height: 80px;
  background-color: #e74c3c;
  border-radius: 50%;
  margin: 20px auto;
}

.face {
  width: 100px;
  height: 100px;
  background-color: white;
  border: 4px solid #2c3e50;
  border-radius: 16px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 20px;
  height: 20px;
  background-color: #2c3e50;
  border-radius: 50%;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #2c3e50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #4a6584;
}
```

Expected answers:
1. A square becomes a circle. A rectangle becomes an oval.
2. The style applies only while the mouse pointer is over the element. Phones have no mouse, so hover effects don't really work there.

</details>

---

## Task 5: Animation

Folder: `practice/task05`

**Steps**

1. Write a `@keyframes` rule called `spin` that goes from `rotate(0deg)` to `rotate(360deg)`.
2. Write a class `.spin` with `animation: spin 1s;`.
3. Add the class to the square: `class="square spin"`. Reload. It spins once.
4. Change `1s` to `3s`. Then add the word `infinite` after it. Then set it back to `1s` with no `infinite`.
5. Now the shake from the dice project. Write `@keyframes shake` with five steps: at 0%, 25%, 50%, 75% and 100%, rotate to 0, 20, -20, 20 and 0 degrees.
6. Write `.shake { animation: shake 0.5s; }` and add `class="shake"` to the `<img>`. Reload.

**Check**

On every reload, the square spins once and the die image shakes for half a second.

**Questions to ask her**

1. What do the percentages inside `@keyframes shake` mean?
2. Why put the animation in its own class instead of writing it straight into the image's style?

<details>
<summary>Answer (open only after trying)</summary>

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 1s;
}

@keyframes shake {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  50% { transform: rotate(-20deg); }
  75% { transform: rotate(20deg); }
  100% { transform: rotate(0deg); }
}

.shake {
  animation: shake 0.5s;
}
```

```html
<img class="shake" src="images/dice3.svg" alt="Dice">
<div class="square spin"></div>
```

Expected answers:
1. They are points in time during the animation. With 0.5s, 25% is at 0.125s, 50% is at 0.25s, and so on. The browser fills in the movement between them.
2. JavaScript can add the class to start the animation and remove it afterwards. That's exactly what task 9 does.

</details>

---

## Task 6: Make it phone-friendly

Folder: `practice/task06`

**Steps**

1. Press F12 to open DevTools, then press Ctrl+Shift+M to turn on the device toolbar. Pick a phone like "iPhone SE" from the list at the top.
2. At the very end of `style.css`, write a media query for screens up to 500px wide. Inside it, make the square 60px by 60px and the image 60px wide.
3. In the device toolbar, switch to "Responsive" and drag the width back and forth across 500. Watch the sizes switch.
4. Experiment: delete the viewport `<meta>` line in `index.html`, save, and reload in phone view. Everything looks tiny. Put the line back.

**Check**

At 500px wide or less, the square and the image get smaller. Above 500px, they go back to normal.

**Questions to ask her**

1. Say `@media (max-width: 500px)` in plain words.
2. Why does the media query go at the end of the file?

<details>
<summary>Answer (open only after trying)</summary>

```css
@media (max-width: 500px) {
  .square {
    width: 60px;
    height: 60px;
  }

  img {
    width: 60px;
  }
}
```

Expected answers:
1. "Use these rules only when the screen is 500px wide or less."
2. When two rules target the same element equally, the one written later wins. If the media query were at the top, the normal `.square` rule below it would override it.

The viewport line tells the phone to use its real width. Without it, the phone pretends to be a desktop about 980px wide and zooms out, so the media query never kicks in.

</details>

---

## Task 7: First JavaScript

Folder: `practice/task07`

**Steps**

1. `script.js` is already in the folder, empty. Add `<script src="script.js"></script>` near the end of `<body>`, just above the check line.
2. In `script.js`, write `console.log("JS is connected");`. Open DevTools (F12), go to the Console tab and reload. The message should appear there.
3. Give the "Click me" button `id="btn"`. Add a new paragraph `<p id="message">Not clicked yet</p>`.
4. In JS, find both elements with `document.getElementById` and store them in `const` variables.
5. Add a click listener to the button that changes the paragraph's text to "You clicked the button!".
6. Now count clicks. Make a variable `count` that starts at 0. On every click, add 1 to it and show "Clicked 3 times" (with the real number).
7. Experiment: change `let count` to `const count`. Click the button and read the red error in the Console. Change it back.
8. Experiment: move the `<script>` tag into `<head>`. Reload and read the Console error. Move it back.

**Check**

The paragraph shows the right count after every click, and the Console has no red errors.

**Questions to ask her**

1. Why does the `<script>` tag go at the end of `<body>`?
2. Why is `btn` a `const` but `count` a `let`?

<details>
<summary>Answer (open only after trying)</summary>

```html
    <button id="btn">Click me</button>
    <p id="message">Not clicked yet</p>
  </div>

  <script src="script.js"></script>
  <script src="../check.js" data-task="7"></script>
</body>
```

```js
const btn = document.getElementById("btn");
const message = document.getElementById("message");
let count = 0;

btn.addEventListener("click", function () {
  count = count + 1;
  message.textContent = "Clicked " + count + " times";
});
```

The errors from the experiments:
- `const count`: "Assignment to constant variable". A `const` can't be given a new value.
- Script in `<head>`: "Cannot read properties of null (reading 'addEventListener')".

Expected answers:
1. The browser runs the JS as soon as it reaches the `<script>` tag. In `<head>`, the button doesn't exist yet, so `getElementById` returns `null`. At the end of `<body>`, every element above already exists.
2. `btn` always holds the same button, so it never changes. `count` gets a new value on every click, so it needs `let`.

</details>

---

## Task 8: Random number and changing an image

Folder: `practice/task08`

**Steps**

1. In the Console, type `Math.random()` and press Enter five times. Then try `Math.random() * 6`, then `Math.floor(Math.random() * 6)`, then `Math.floor(Math.random() * 6) + 1`. Fill in this table:

   | Expression | Smallest possible | Largest possible |
   |---|---|---|
   | `Math.random()` | | |
   | `Math.random() * 6` | | |
   | `Math.floor(Math.random() * 6)` | | |
   | `Math.floor(Math.random() * 6) + 1` | | |

2. Write a function `getRandom()` that returns a number from 1 to 6.
3. Give the image `id="dice"`. Add a new button `<button id="roll">Roll</button>`.
4. When Roll is clicked: get a random number, show "You rolled 4" (with the real number) in the message paragraph, and change the image to the matching dice picture. Build the path by joining strings: `"images/dice" + n + ".svg"`.

**Check**

Click Roll 20 times. Every number from 1 to 6 should show up, and the picture should always match the number.

**Questions to ask her**

1. Why `Math.floor` and not `Math.round`? (The PDF lists "correct and unbiased random logic", so expect this one in the interview.)
2. What would you change to roll a 20-sided die?

<details>
<summary>Answer (open only after trying)</summary>

| Expression | Smallest possible | Largest possible |
|---|---|---|
| `Math.random()` | 0 | 0.999... (never 1) |
| `Math.random() * 6` | 0 | 5.999... |
| `Math.floor(Math.random() * 6)` | 0 | 5 |
| `Math.floor(Math.random() * 6) + 1` | 1 | 6 |

```html
<img id="dice" class="shake" src="images/dice3.svg" alt="Dice">
...
<button id="roll">Roll</button>
```

```js
const dice = document.getElementById("dice");
const rollBtn = document.getElementById("roll");

function getRandom() {
  return Math.floor(Math.random() * 6) + 1;
}

rollBtn.addEventListener("click", function () {
  const n = getRandom();
  message.textContent = "You rolled " + n;
  dice.src = "images/dice" + n + ".svg";
});
```

Expected answers:
1. `Math.floor` cuts 0 to 5.999 into six equal slices: 0 to 0.999 becomes 0, 1 to 1.999 becomes 1, and so on. Each number gets exactly 1/6. With `Math.round(Math.random() * 5) + 1`, the number 1 only comes from 0 to 0.5 and 6 only from 4.5 to 5. Those slices are half as wide, so 1 and 6 would come up half as often as the others. That's a biased die.
2. Change `* 6` to `* 20`.

</details>

---

## Task 9: Shake on click

Folder: `practice/task09`

**Steps**

1. Remove `class="shake"` from the image in HTML, so it doesn't shake when the page loads.
2. At the start of the Roll click function, add the class: `dice.classList.add("shake")`. Click Roll a few times. It shakes only on the first click. Why?
3. Use `setTimeout` to wait 500 milliseconds. Inside it, remove the `shake` class, then pick the number and change the image. Move the code from task 8 inside the timeout.
4. While waiting, show "Rolling..." in the message paragraph.

**Check**

Every click shakes the die and shows "Rolling...", and only after the shake does the new number appear.

**Questions to ask her**

1. Why did it shake only once in step 2?
2. The animation is 0.5s and the timer is 500ms. What happens if you change the timer to 2000?

<details>
<summary>Answer (open only after trying)</summary>

```js
rollBtn.addEventListener("click", function () {
  dice.classList.add("shake");
  message.textContent = "Rolling...";

  setTimeout(function () {
    dice.classList.remove("shake");
    const n = getRandom();
    message.textContent = "You rolled " + n;
    dice.src = "images/dice" + n + ".svg";
  }, 500);
});
```

Expected answers:
1. After the first click the class was already on the image. Adding it again changes nothing, so the animation doesn't restart. Removing it after each roll lets the next click add it fresh.
2. The die stops shaking after 0.5s, then sits still for 1.5 seconds before the result shows. The animation length and the timer should match.

</details>

---

## Task 10: History list

Folder: `practice/task10`

**Steps**

1. At the bottom of the container, add `<h2>History</h2>` and an empty list `<ul id="history"></ul>`.
2. In JS, find the list and store it in `const list`.
3. Write a function `addHistory(n)` that creates an `<li>` with `document.createElement("li")`, sets its text to `n`, and adds it to the list with `list.appendChild(item)`.
4. Call `addHistory(n)` after each roll, inside the timeout.
5. Change `appendChild` to `prepend`. What changed?
6. Keep only the last 5 rolls. After adding an item, if `list.children.length` is more than 5, remove `list.lastElementChild`.
7. The bullets sit far to the left of the centered numbers. In CSS, give `#history` the rules `list-style: none` and `padding: 0`.

**Check**

The newest roll is at the top, the list never has more than 5 items, and there are no stray bullets.

**Questions to ask her**

1. What's the difference between `appendChild` and `prepend`?
2. Why remove the last child and not the first?

<details>
<summary>Answer (open only after trying)</summary>

```html
    <h2>History</h2>
    <ul id="history"></ul>
  </div>
```

```js
const list = document.getElementById("history");

function addHistory(n) {
  const item = document.createElement("li");
  item.textContent = n;
  list.prepend(item);

  if (list.children.length > 5) {
    list.lastElementChild.remove();
  }
}
```

And inside the timeout, after the image changes:

```js
    addHistory(n);
```

```css
#history {
  list-style: none;
  padding: 0;
}
```

Expected answers:
1. `appendChild` adds the new item at the end of the list. `prepend` adds it at the start.
2. With `prepend`, the newest roll goes on top, so the oldest one is at the bottom. The last child is the oldest roll.

</details>

---

## After task 10

She now has a one-die version of the Dice Roll project. The real project adds only two new things:

- A second die and two buttons. The function `roll(count)` takes a parameter, so `roll(1)` rolls one die and `roll(2)` rolls two.
- `dice2.style.display = "none"` hides the second die in 1-die mode, and `"inline"` shows it again.

Final challenge: close everything, start from three empty files, and rebuild the full dice project from memory. She can peek at the original when stuck, but should write down each thing she had to peek at. That list is what to revise before the interview.
