# Practice tasks

Ten small tasks, one folder each. Task 1 is a plain HTML page. By task 10 you have a die that rolls, shakes and keeps a history, the same ideas as the Dice Roll project.

The steps for every task are in `../practice.md`. This file only explains how to use the folders and the check panel.

## What's in here

```
practice/
  check.js      the checker, you don't need to open it
  task01/       index.html (almost empty), images/
  task02/       index.html, style.css (empty), images/
  task03/       index.html, style.css, images/
  ...
  task07/       index.html, style.css, script.js (empty), images/
  ...
  task10/
```

| Folder | Task |
|---|---|
| task01 | Page skeleton |
| task02 | Selectors and colors |
| task03 | Make a square |
| task04 | Circles, rounded corners and a button |
| task05 | Animation |
| task06 | Phone-friendly |
| task07 | First JavaScript |
| task08 | Random number and changing an image |
| task09 | Shake on click |
| task10 | History list |

Each folder starts where the previous task ends. So if task 4 goes badly, task 5 still starts with working code.

## How to do a task

1. Read the task in `practice.md`.
2. Open the task's folder in VS Code.
3. Double-click its `index.html` so it opens in Chrome.
4. Make one change, save with Ctrl+S, then press F5 in Chrome.
5. Look at the check panel in the bottom-right corner of the page.
6. Keep going until the panel header turns green. Then move to the next folder.

## The check panel

Each line in the panel is one step of the task.

| Mark | Meaning |
|---|---|
| ✓ | This step is done. |
| ✗ | Not done yet. The small line under it says what to fix. |
| … | Waiting for you. The line under it says what to do first. |
| ? | "By hand" step. The checker can't see this one, so check it yourself. |

The number at the top, like `3 / 5`, counts the ✓ steps. "By hand" steps are not counted. The Hide button folds the panel away if it covers your page, and Show brings it back.

### Tasks 1 to 6

The checks run every time the page loads. Save, press F5, and the panel updates.

### Tasks 7 to 10

Some steps need a button to be clicked, like "the number goes up after a click". When the page loads, those steps show … and wait. Press **Run all checks** and the checker clicks your buttons for you, then marks each step.

After that the page has changed (the counter went up, the list has items), so press F5 before you try again.

If your JavaScript has an error, the hint says "The Console shows an error:" followed by the error. Read it, find that line in `script.js`, and fix it.

### Task 6

Task 6 checks how the page looks on a phone, so you have to change the page width:

1. Press F12 to open DevTools, then Ctrl+Shift+M for phone view.
2. Pick a phone or type a width of 500 or less at the top. The narrow steps turn ✓.
3. Press Ctrl+Shift+M again to go back to a wide page. The last step turns ✓.

You don't need to press F5 here. The panel notices the width change by itself.

## Rules

- The last line inside `<body>` is the check line, `<script src="../check.js" data-task="1"></script>` (with that folder's number). Don't delete it. In task 7 and after, your own `<script src="script.js">` goes just above it.
- Use the exact ids and class names the task asks for, like `id="title"` or `class="square"`. The checker finds your elements by those names.
- Keep the folders where they are. `check.js` has to stay one level above each task folder, and `images/` has to stay inside it.
- Type everything yourself. Copy-pasting from the answers skips the part where you learn.

## When something goes wrong

- **No panel at all.** The check line is missing, has a typo, or is outside `<body>`. Compare it with the line above.
- **Your change doesn't show up.** You forgot to save, or you are editing a file from a different task folder. Check the folder name in VS Code's title bar.
- **The image is broken.** The `src` path is wrong. It starts from the folder that holds `index.html`, so it should be `images/dice3.svg`.
- **A ✗ hint doesn't make sense.** Read it once more, look at the "Hints" part of the task in `practice.md`, and then ask for help.
