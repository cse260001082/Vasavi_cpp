// Checks your work for the tasks in practice.md.
// You don't need to read or change this file.
(function () {
  const task = Number(document.currentScript.dataset.task);

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const css = (el, prop) => getComputedStyle(el).getPropertyValue(prop).trim();
  const wait = (ms) => new Promise((done) => setTimeout(done, ms));
  const blank = (c) => c === "" || c === "transparent" || c === "rgba(0, 0, 0, 0)";
  const black = (c) => c === "rgb(0, 0, 0)";
  const white = (c) => c === "rgb(255, 255, 255)";
  const dark = (c) => {
    const n = c.match(/\d+/g);
    return !blank(c) && !!n && (Number(n[0]) + Number(n[1]) + Number(n[2])) / 3 < 128;
  };
  const size = (el, w, h) => css(el, "width") === w && css(el, "height") === h;
  const round = (el) => css(el, "border-top-left-radius") === "50%";
  const rounded = (el) => parseFloat(css(el, "border-top-left-radius")) > 0;
  const midX = (el) => { const r = el.getBoundingClientRect(); return r.left + r.width / 2; };
  const midY = (el) => { const r = el.getBoundingClientRect(); return r.top + r.height / 2; };
  const centered = (el) => Math.abs(midX(el) - midX(el.parentElement)) < 3;
  const narrow = () => matchMedia("(max-width: 500px)").matches;

  let start = {};
  let lastError = "";
  let sawNarrow = false;
  let sawWide = false;
  window.addEventListener("error", (e) => { lastError = e.message; });
  const errNote = () => (lastError ? " The Console shows an error: " + lastError : "");

  function need(sel, what) {
    const el = $(sel);
    if (!el) throw new Error("Can't find " + what + ".");
    return el;
  }

  async function until(test, ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      if (test()) return true;
      await wait(20);
    }
    return test();
  }

  function probe(cls) {
    const el = document.createElement("div");
    el.className = cls;
    el.style.cssText = "position: absolute; left: -9999px; top: 0; width: 10px; height: 10px;";
    document.body.appendChild(el);
    const anims = el.getAnimations ? el.getAnimations() : [];
    const info = {
      name: css(el, "animation-name"),
      duration: css(el, "animation-duration"),
      count: css(el, "animation-iteration-count"),
      frames: anims.length ? anims[0].effect.getKeyframes() : null
    };
    el.remove();
    return info;
  }

  async function doRoll(withShake) {
    const btn = need("#roll", 'a button with id="roll"');
    const msg = need("#message", 'a paragraph with id="message"');
    const img = need("#dice", 'an image with id="dice"');
    btn.click();
    await until(() => /You rolled [1-6]/.test(msg.textContent) && !(withShake && img.classList.contains("shake")), 2000);
    const m = msg.textContent.match(/You rolled ([1-6])/);
    if (!m) {
      throw new Error('After clicking Roll the message says "' + msg.textContent.trim() + '". It should say "You rolled 4" (with the real number).' + errNote());
    }
    return Number(m[1]);
  }

  async function settle() {
    const msg = need("#message", 'a paragraph with id="message"');
    const img = need("#dice", 'an image with id="dice"');
    await until(() => /You rolled [1-6]/.test(msg.textContent) && !img.classList.contains("shake"), 2000);
  }

  const checks = {
    1: [
      {
        name: "The page starts with <!DOCTYPE html>",
        test: () => (!!document.doctype && document.doctype.name.toLowerCase() === "html") || "Write <!DOCTYPE html> as the very first line."
      },
      {
        name: '<meta charset="UTF-8"> is inside <head>',
        test: () => !!document.head.querySelector("meta[charset]") || 'Add <meta charset="UTF-8"> inside <head>.'
      },
      {
        name: "The viewport line is inside <head>",
        test: () => {
          const m = document.head.querySelector('meta[name="viewport"]');
          return (!!m && /width=device-width/.test(m.content)) || "Copy the viewport <meta> line from the dice project's index.html into <head>.";
        }
      },
      {
        name: 'The title is "Practice"',
        test: () => document.title.trim().toLowerCase() === "practice" || "Put <title>Practice</title> inside <head>."
      },
      {
        name: "There is an <h1> with text",
        test: () => { const h = $("h1"); return (!!h && h.textContent.trim() !== "") || "Add an <h1> heading."; }
      },
      {
        name: "There is a <p> with text",
        test: () => { const p = $("p"); return (!!p && p.textContent.trim() !== "") || "Add a <p> with a sentence."; }
      },
      {
        name: "The image shows images/dice3.svg",
        test: () => {
          const i = need("img", "an <img>");
          if (i.getAttribute("src") !== "images/dice3.svg") return 'Set src="images/dice3.svg" on the <img>.';
          return i.naturalWidth > 0 || "The path looks right but the picture didn't load. Is the images folder next to index.html?";
        }
      },
      {
        name: "The image has alt text",
        test: () => { const i = need("img", "an <img>"); return (i.getAttribute("alt") || "").trim() !== "" || 'Add alt="Dice" to the <img>.'; }
      },
      {
        name: 'There is a button that says "Click me"',
        test: () => $$("button").some((b) => b.textContent.trim().toLowerCase() === "click me") || "Add <button>Click me</button>."
      },
      {
        name: "There is a <ul> with 3 <li> items",
        test: () => $$("ul").some((u) => u.querySelectorAll(":scope > li").length >= 3) || "Add a <ul> with three <li> inside it."
      }
    ],

    2: [
      {
        name: "style.css is linked inside <head>",
        test: () => !!document.head.querySelector('link[rel="stylesheet"][href="style.css"]') || 'Add <link rel="stylesheet" href="style.css"> inside <head>.'
      },
      {
        name: "body has a background color",
        test: () => !blank(css(document.body, "background-color")) || "Give body a background-color, like #eef2f7."
      },
      {
        name: "body uses the Arial font",
        test: () => /arial/i.test(css(document.body, "font-family")) || "Add font-family: Arial, sans-serif; to body."
      },
      {
        name: "body text is centered",
        test: () => css(document.body, "text-align") === "center" || "Add text-align: center; to body."
      },
      {
        name: 'Two paragraphs have class="note"',
        test: () => { const n = $$("p.note").length; return n >= 2 || "Found " + n + '. Both paragraphs need class="note".'; }
      },
      {
        name: ".note text is 18px",
        test: () => { const n = $$("p.note"); return (n.length > 0 && n.every((p) => css(p, "font-size") === "18px")) || "Add font-size: 18px; to the .note rule."; }
      },
      {
        name: ".note text has a color (like gray)",
        test: () => { const p = need("p.note", 'a <p class="note">'); return !black(css(p, "color")) || "Add color: gray; to the .note rule."; }
      },
      {
        name: 'The heading has id="title"',
        test: () => { const t = $("#title"); return (!!t && t.tagName === "H1") || 'Write the heading as <h1 id="title">.'; }
      },
      {
        name: "#title has a color (like dark blue)",
        test: () => { const t = need("#title", 'an element with id="title"'); return !black(css(t, "color")) || "Add color: #2c3e50; to the #title rule."; }
      }
    ],

    3: [
      {
        name: 'There is a <div class="square">',
        test: () => !!$(".square") || 'Add <div class="square"></div> below the image.'
      },
      {
        name: "The square is 100px by 100px",
        test: () => size(need(".square", "the square"), "100px", "100px") || "Give .square width: 100px; and height: 100px;"
      },
      {
        name: "The square has a background color",
        test: () => !blank(css(need(".square", "the square"), "background-color")) || "Give .square a background-color."
      },
      {
        name: "The square has a 4px solid border",
        test: () => {
          const q = need(".square", "the square");
          return (css(q, "border-top-width") === "4px" && css(q, "border-top-style") === "solid") || "Add border: 4px solid #2c3e50; to .square.";
        }
      },
      {
        name: "The square is centered",
        test: () => centered(need(".square", "the square")) || "Add margin: 20px auto; to .square."
      },
      {
        name: "The padding experiment is undone",
        test: () => css(need(".square", "the square"), "padding-top") === "0px" || "Remove the padding from .square after measuring it."
      },
      {
        name: 'Everything is inside <div class="container">',
        test: () => {
          const kids = Array.from(document.body.children).filter((k) => k.tagName !== "SCRIPT" && k.id !== "practice-check");
          return (kids.length === 1 && kids[0].classList.contains("container")) || 'Put one <div class="container"> right inside <body> and move everything else into it.';
        }
      },
      {
        name: "The container has a white background",
        test: () => white(css(need(".container", "the container"), "background-color")) || "Add background-color: white; to .container."
      },
      {
        name: "The container is at most 500px wide",
        test: () => css(need(".container", "the container"), "max-width") === "500px" || "Add max-width: 500px; to .container."
      },
      {
        name: "The container is centered",
        test: () => centered(need(".container", "the container")) || "Add margin: 0 auto; to .container."
      },
      {
        name: "The container has 20px padding and rounded corners",
        test: () => {
          const c = need(".container", "the container");
          return (css(c, "padding-top") === "20px" && rounded(c)) || "Add padding: 20px; and border-radius: 10px; to .container.";
        }
      }
    ],

    4: [
      {
        name: "The circle is 80px by 80px",
        test: () => size(need(".circle", 'a <div class="circle">'), "80px", "80px") || "Give .circle width: 80px; and height: 80px;"
      },
      {
        name: "The circle is round",
        test: () => round(need(".circle", "the circle")) || "Add border-radius: 50%; to .circle."
      },
      {
        name: "The circle has a color and is centered",
        test: () => {
          const c = need(".circle", "the circle");
          if (blank(css(c, "background-color"))) return "Give .circle a background-color.";
          return centered(c) || "Add margin: 20px auto; to .circle.";
        }
      },
      {
        name: "The die face is 100px by 100px and white",
        test: () => {
          const f = need(".face", 'a <div class="face">');
          if (!size(f, "100px", "100px")) return "Give .face width: 100px; and height: 100px;";
          return white(css(f, "background-color")) || "Add background-color: white; to .face.";
        }
      },
      {
        name: "The die face has a 4px border, rounded corners and is centered",
        test: () => {
          const f = need(".face", "the die face");
          if (css(f, "border-top-width") !== "4px") return "Add border: 4px solid #2c3e50; to .face.";
          if (!rounded(f) || round(f)) return "Add border-radius: 16px; to .face.";
          return centered(f) || "Add margin: 20px auto; to .face.";
        }
      },
      {
        name: "There is a dot inside the die face",
        test: () => !!$(".face .dot") || 'Put <div class="dot"></div> inside the .face div.'
      },
      {
        name: "The dot is 20px, dark and round",
        test: () => {
          const d = need(".face .dot", "the dot");
          if (!size(d, "20px", "20px")) return "Give .dot width: 20px; and height: 20px;";
          if (!dark(css(d, "background-color"))) return "Give .dot a dark background-color.";
          return round(d) || "Add border-radius: 50%; to .dot.";
        }
      },
      {
        name: "The dot is in the middle of the die face",
        test: () => {
          const f = need(".face", "the die face");
          const d = need(".face .dot", "the dot");
          return (Math.abs(midX(d) - midX(f)) < 3 && Math.abs(midY(d) - midY(f)) < 3) || "Add display: flex; justify-content: center; align-items: center; to .face.";
        }
      },
      {
        name: "The button is styled",
        test: () => {
          const b = need("button", "a button");
          const miss = [];
          if (css(b, "padding-top") !== "10px" || css(b, "padding-left") !== "20px") miss.push("padding: 10px 20px");
          if (!dark(css(b, "background-color"))) miss.push("a dark background-color");
          if (!white(css(b, "color"))) miss.push("color: white");
          if (css(b, "font-size") !== "16px") miss.push("font-size: 16px");
          if (css(b, "border-top-style") !== "none") miss.push("border: none");
          if (!rounded(b)) miss.push("border-radius: 5px");
          if (css(b, "cursor") !== "pointer") miss.push("cursor: pointer");
          return miss.length === 0 || "Still missing: " + miss.join(", ") + ".";
        }
      },
      { name: "Move the mouse over the button. Its color should change.", manual: true }
    ],

    5: [
      {
        name: "@keyframes spin turns all the way to 360deg",
        test: () => {
          const p = probe("spin");
          if (!p.frames) return "Write @keyframes spin, and a .spin rule that uses it.";
          return p.frames.some((f) => /360deg/.test(f.transform || "")) || "spin should go from rotate(0deg) to rotate(360deg).";
        }
      },
      {
        name: ".spin lasts 1s and runs once",
        test: () => {
          const p = probe("spin");
          if (p.duration !== "1s") return ".spin should use animation: spin 1s;";
          return p.count === "1" || "Remove the word infinite from .spin.";
        }
      },
      {
        name: 'The square has class="square spin"',
        test: () => need(".square", "the square").classList.contains("spin") || 'Change the square to <div class="square spin">.'
      },
      {
        name: "@keyframes shake has 5 steps: 0, 20, -20, 20, 0 degrees",
        test: () => {
          const p = probe("shake");
          if (!p.frames) return "Write @keyframes shake, and a .shake rule that uses it.";
          const offsets = p.frames.map((f) => f.offset).join();
          const turns = p.frames.map((f) => f.transform || "").join();
          return (offsets === "0,0.25,0.5,0.75,1" && /-20deg/.test(turns) && /[^-]20deg/.test(turns)) || "Use steps at 0%, 25%, 50%, 75% and 100% with rotate 0, 20, -20, 20 and 0 degrees.";
        }
      },
      {
        name: ".shake lasts 0.5s",
        test: () => probe("shake").duration === "0.5s" || ".shake should use animation: shake 0.5s;"
      },
      {
        name: 'The image has class="shake"',
        test: () => need("img", "the image").classList.contains("shake") || 'Add class="shake" to the <img>.'
      }
    ],

    6: [
      {
        name: "The viewport line is still inside <head>",
        test: () => !!document.head.querySelector('meta[name="viewport"]') || "Put the viewport <meta> line back inside <head>."
      },
      {
        name: "500px or narrower: the square is 60px by 60px and the image is 60px wide",
        test: () => {
          if (!narrow()) return sawNarrow || { wait: "Make the page 500px wide or less to test this. Press F12, then Ctrl+Shift+M." };
          const ok = size(need(".square", "the square"), "60px", "60px") && css(need("img", "the image"), "width") === "60px";
          if (ok) sawNarrow = true;
          return ok || "Inside @media (max-width: 500px), make .square 60px by 60px and img 60px wide.";
        }
      },
      {
        name: "Wider than 500px: everything is back to normal size",
        test: () => {
          if (!sawNarrow) return { wait: "Do the 500px check above first, then come back to a wide page." };
          if (narrow()) return sawWide || { wait: "Now make the page wider than 500px to test this." };
          const ok = size(need(".square", "the square"), "100px", "100px") && css(need("img", "the image"), "width") !== "60px";
          if (ok) sawWide = true;
          return ok || "The small sizes should only apply inside the @media block.";
        }
      },
      { name: "Delete the viewport line, look in phone view, then put it back.", manual: true }
    ],

    7: [
      {
        name: "script.js is linked at the end of <body>",
        test: () => {
          const s = $('script[src="script.js"]');
          if (!s) return 'Add <script src="script.js"></script> just before </body>.';
          return s.parentElement === document.body || "Move the script tag to the end of <body>, after the container.";
        }
      },
      {
        name: 'There is a <button id="btn">',
        test: () => { const b = $("#btn"); return (!!b && b.tagName === "BUTTON") || 'Add id="btn" to the Click me button.'; }
      },
      {
        name: 'There is a <p id="message"> that starts as "Not clicked yet"',
        test: () => {
          const m = $("#message");
          if (!m || m.tagName !== "P") return 'Add <p id="message">Not clicked yet</p>.';
          return start.message === "Not clicked yet" || 'When the page loaded it said "' + start.message + '".';
        }
      },
      {
        name: "count is a let variable that starts at 0",
        test: () => {
          if (typeof count === "undefined") return "Make a variable in script.js: let count = 0;";
          if ("count" in window) return "Use let, not var.";
          return start.count === 0 || "count should start at 0.";
        }
      },
      {
        name: "Each click adds 1 and shows it in the message",
        click: true,
        test: async () => {
          const b = need("#btn", 'a button with id="btn"');
          const m = need("#message", 'a paragraph with id="message"');
          const read = () => { const x = m.textContent.match(/Clicked (\d+) times?/); return x ? Number(x[1]) : null; };
          const before = read() || 0;
          b.click();
          await wait(50);
          const one = read();
          if (one === null) return 'After a click the message says "' + m.textContent.trim() + '". It should say "Clicked 1 times".' + errNote();
          b.click();
          await wait(50);
          return (one === before + 1 && read() === before + 2) || "The number should go up by exactly 1 on each click." + errNote();
        }
      },
      { name: 'Open the Console (F12). It shows "JS is connected".', manual: true }
    ],

    8: [
      {
        name: "getRandom() exists",
        test: () => typeof getRandom === "function" || "Write a function called getRandom() in script.js."
      },
      {
        name: "getRandom() only gives whole numbers from 1 to 6",
        test: () => {
          if (typeof getRandom !== "function") return "Write getRandom() first.";
          for (let i = 0; i < 6000; i++) {
            const v = getRandom();
            if (!Number.isInteger(v) || v < 1 || v > 6) return "getRandom() returned " + v + ".";
          }
          return true;
        }
      },
      {
        name: "getRandom() is fair: each number about 1 in 6",
        test: () => {
          if (typeof getRandom !== "function") return "Write getRandom() first.";
          const c = [0, 0, 0, 0, 0, 0, 0];
          for (let i = 0; i < 6000; i++) c[getRandom()]++;
          const nums = c.slice(1);
          if (nums.every((x) => x > 800 && x < 1200)) return true;
          return "Out of 6000 rolls: " + nums.map((x, i) => i + 1 + " came " + x + " times").join(", ") + ". Each should be near 1000. Did you use Math.round instead of Math.floor?";
        }
      },
      {
        name: 'The image has id="dice"',
        test: () => { const d = $("#dice"); return (!!d && d.tagName === "IMG") || 'Add id="dice" to the <img>.'; }
      },
      {
        name: 'There is a <button id="roll"> that says Roll',
        test: () => { const r = $("#roll"); return (!!r && r.tagName === "BUTTON" && /roll/i.test(r.textContent)) || 'Add <button id="roll">Roll</button>.'; }
      },
      {
        name: "Roll shows the number and the matching picture",
        click: true,
        test: async () => {
          const img = need("#dice", 'an image with id="dice"');
          const seen = new Set();
          for (let i = 0; i < 8; i++) {
            const n = await doRoll(false);
            const src = img.getAttribute("src");
            if (src !== "images/dice" + n + ".svg") return "The message says " + n + ' but the image src is "' + src + '". It should be "images/dice' + n + '.svg".';
            seen.add(n);
          }
          return seen.size > 1 || "8 rolls in a row gave the same number.";
        }
      },
      { name: "Fill in the Math.random table in practice.md.", manual: true }
    ],

    9: [
      {
        name: "The image doesn't shake when the page loads",
        test: () => !start.diceShake || 'Remove class="shake" from the <img> in index.html.'
      },
      {
        name: "Clicking Roll adds the shake class right away",
        click: true,
        test: async () => {
          const img = need("#dice", 'an image with id="dice"');
          if (img.classList.contains("shake")) return 'The image has the shake class before any click. Remove class="shake" from the <img> in index.html.';
          need("#roll", 'a button with id="roll"').click();
          const on = img.classList.contains("shake");
          await settle();
          return on || 'Add dice.classList.add("shake") at the start of the click function.' + errNote();
        }
      },
      {
        name: 'It shows "Rolling..." while the die shakes',
        click: true,
        test: async () => {
          const msg = need("#message", 'a paragraph with id="message"');
          need("#roll", 'a button with id="roll"').click();
          const text = msg.textContent.trim();
          await settle();
          return text === "Rolling..." || 'Right after the click the message said "' + text + '". It should say "Rolling...".';
        }
      },
      {
        name: "The result shows after about half a second",
        click: true,
        test: async () => {
          const msg = need("#message", 'a paragraph with id="message"');
          need("#roll", 'a button with id="roll"').click();
          const t0 = Date.now();
          const ok = await until(() => /You rolled [1-6]/.test(msg.textContent), 3000);
          const ms = Date.now() - t0;
          if (!ok) return "No result after 3 seconds." + errNote();
          return (ms >= 350 && ms <= 900) || "The result showed after " + ms + "ms. Put the result code inside setTimeout with 500.";
        }
      },
      {
        name: "After the shake, the class is removed and the picture matches",
        click: true,
        test: async () => {
          const n = await doRoll(true);
          const img = $("#dice");
          if (img.classList.contains("shake")) return 'Inside setTimeout, remove the class: dice.classList.remove("shake").';
          return img.getAttribute("src") === "images/dice" + n + ".svg" || "The message says " + n + " but the picture doesn't match.";
        }
      },
      {
        name: "It shakes again on the next click",
        click: true,
        test: async () => {
          await doRoll(true);
          if ($("#dice").classList.contains("shake")) return "The shake class stays on after the roll, so the next click can't restart it. Remove it inside setTimeout.";
          need("#roll", 'a button with id="roll"').click();
          const on = $("#dice").classList.contains("shake");
          await settle();
          return on || "The second click didn't shake. Is the class removed after each roll?";
        }
      }
    ],

    10: [
      {
        name: 'There is an <h2> that says "History"',
        test: () => $$("h2").some((h) => h.textContent.trim().toLowerCase() === "history") || "Add <h2>History</h2> at the bottom of the container."
      },
      {
        name: 'There is an empty <ul id="history">',
        test: () => {
          const l = need("#history", 'an element with id="history"');
          if (l.tagName !== "UL") return 'id="history" should be on a <ul>.';
          return start.historyCount === 0 || "The list should be empty in index.html: <ul id=\"history\"></ul>.";
        }
      },
      {
        name: "addHistory() exists",
        test: () => typeof addHistory === "function" || "Write a function called addHistory(n) in script.js."
      },
      {
        name: "The list has no bullets and no padding",
        test: () => {
          const l = need("#history", 'a <ul id="history">');
          return (css(l, "list-style-type") === "none" && css(l, "padding-left") === "0px") || "Give #history list-style: none; and padding: 0;";
        }
      },
      {
        name: "Each roll adds its number at the top",
        click: true,
        test: async () => {
          const l = need("#history", 'a <ul id="history">');
          const n = await doRoll(true);
          const first = l.firstElementChild;
          if (!first) return "Nothing was added to the list. Call addHistory(n) inside setTimeout." + errNote();
          return first.textContent.trim() === String(n) || 'The top item says "' + first.textContent.trim() + '" but the roll was ' + n + ". Use prepend.";
        }
      },
      {
        name: "Only the last 5 rolls stay, newest first",
        click: true,
        test: async () => {
          const l = need("#history", 'a <ul id="history">');
          const got = [];
          for (let i = 0; i < 6; i++) got.unshift(await doRoll(true));
          const items = Array.from(l.children).map((li) => li.textContent.trim());
          if (items.length !== 5) return "The list has " + items.length + " items. It should have 5.";
          return items.join() === got.slice(0, 5).join() || "The items should be the last 5 rolls, newest on top.";
        }
      }
    ]
  }[task] || [];

  const hasClicks = checks.some((c) => c.click);
  const ui = {};
  let busy = false;

  function buildPanel() {
    const host = document.createElement("div");
    host.id = "practice-check";
    host.style.cssText = "position: fixed; right: 12px; bottom: 12px; z-index: 2147483647;";
    const root = host.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        .box { font: 13px/1.4 Arial, sans-serif; color: #1a1a1a; background: #fff; border: 1px solid #c9d1db; border-radius: 10px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18); width: 320px; max-width: calc(100vw - 24px); text-align: left; }
        .head { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #2c3e50; color: #fff; border-radius: 9px 9px 0 0; }
        .done .head { background: #1e7e34; }
        .head b { flex: 1; }
        .toggle { font: inherit; font-size: 12px; background: rgba(255, 255, 255, 0.15); color: #fff; border: none; border-radius: 4px; padding: 2px 8px; cursor: pointer; }
        .body { max-height: 55vh; overflow-y: auto; padding: 6px 10px 10px; }
        .hidden .body { display: none; }
        ul { list-style: none; margin: 0; padding: 0; }
        li { display: flex; gap: 8px; padding: 5px 0; border-bottom: 1px solid #eee; }
        .icon { flex: none; width: 14px; font-weight: bold; }
        .pass .icon { color: #1e7e34; }
        .fail .icon { color: #c62828; }
        .wait .icon, .manual .icon { color: #8a8f98; }
        .manual { color: #555; }
        .hint { display: block; margin-top: 2px; font-size: 12px; color: #666; }
        .fail .hint { color: #a33; }
        .run { margin-top: 8px; width: 100%; padding: 7px; font: inherit; color: #fff; background: #2c3e50; border: none; border-radius: 6px; cursor: pointer; }
        .run:disabled { opacity: 0.6; cursor: wait; }
        .note { margin: 6px 0 0; font-size: 12px; color: #666; }
      </style>
      <div class="box">
        <div class="head"><b>Task ${task} check</b><span class="score"></span><button class="toggle">Hide</button></div>
        <div class="body"><ul></ul><button class="run"></button><p class="note"></p></div>
      </div>`;
    document.body.appendChild(host);

    ui.box = root.querySelector(".box");
    ui.score = root.querySelector(".score");
    ui.list = root.querySelector("ul");
    ui.run = root.querySelector(".run");
    ui.note = root.querySelector(".note");
    const toggle = root.querySelector(".toggle");

    ui.run.textContent = hasClicks ? "Run all checks" : "Check again";
    ui.note.textContent = hasClicks ? "Run all checks clicks your buttons for you. Reload the page afterwards to start fresh." : "Save your files, press F5, and the checks run again.";
    if (!checks.length) ui.note.textContent = 'This check line needs data-task="1" to "10".';

    ui.run.addEventListener("click", () => run(hasClicks));
    toggle.addEventListener("click", () => {
      ui.box.classList.toggle("hidden");
      toggle.textContent = ui.box.classList.contains("hidden") ? "Show" : "Hide";
    });
  }

  function addHint(span, text) {
    if (!text) return;
    const hint = document.createElement("span");
    hint.className = "hint";
    hint.textContent = text;
    span.appendChild(hint);
  }

  async function run(withClicks) {
    if (busy) return;
    busy = true;
    ui.run.disabled = true;
    const label = ui.run.textContent;
    if (withClicks) ui.run.textContent = "Testing...";
    ui.list.innerHTML = "";
    let passed = 0;
    let total = 0;

    for (const c of checks) {
      const li = document.createElement("li");
      const icon = document.createElement("span");
      const text = document.createElement("span");
      icon.className = "icon";
      text.textContent = c.name;
      li.append(icon, text);
      ui.list.appendChild(li);

      if (c.manual) {
        li.className = "manual";
        icon.textContent = "?";
        text.textContent = "By hand: " + c.name;
        continue;
      }
      total++;
      if (c.click && !withClicks) {
        li.className = "wait";
        icon.textContent = String.fromCharCode(8230);
        addHint(text, "Press Run all checks to test this.");
        continue;
      }

      icon.textContent = String.fromCharCode(8230);
      let result;
      try {
        lastError = "";
        result = await c.test();
      } catch (e) {
        result = e.message;
      }

      if (result === true) {
        passed++;
        li.className = "pass";
        icon.textContent = String.fromCharCode(10003);
      } else if (result && result.wait) {
        li.className = "wait";
        icon.textContent = String.fromCharCode(8230);
        addHint(text, result.wait);
      } else {
        li.className = "fail";
        icon.textContent = String.fromCharCode(10007);
        addHint(text, typeof result === "string" ? result : "Not done yet.");
      }
    }

    ui.score.textContent = passed + " / " + total;
    ui.box.classList.toggle("done", total > 0 && passed === total);
    ui.run.textContent = label;
    ui.run.disabled = false;
    busy = false;
  }

  function init() {
    const msg = $("#message");
    const img = $("#dice");
    const list = $("#history");
    start = {
      message: msg ? msg.textContent.trim() : null,
      diceShake: img ? img.classList.contains("shake") : false,
      historyCount: list ? list.children.length : null,
      count: typeof count !== "undefined" ? count : undefined
    };
    buildPanel();
    run(false);

    if (task === 6) {
      let was = narrow();
      setInterval(() => {
        if (narrow() !== was) {
          was = narrow();
          run(false);
        }
      }, 300);
    }
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init);
})();
