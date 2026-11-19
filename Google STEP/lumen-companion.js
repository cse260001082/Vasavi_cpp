(() => {
  "use strict";

  const { animals, draw, drawSnack, motion, pulse } = window.DeskBuddies;
  const lumen = animals.find(animal => animal.id === "lumen");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const storageKeys = {
    perch: "step-lumen-perch-v1",
    dropped: "step-lumen-dropped-v1",
    fed: "step-lumen-fed-v1"
  };
  const inMemory = new Map();
  const tricks = [
    { id: "figure-eight", title: lumen.trick, duration: 2.1 },
    { id: "twirl", title: "Moonwing twirl", duration: 1.5 },
    { id: "wave", title: "Wing wave", duration: 1.3 }
  ];
  const snackReaction = { id: "snack", title: "Thanks for the nectar!", duration: 1.6 };
  const pad = 9;

  function read(key) {
    try { return localStorage.getItem(key); }
    catch { return inMemory.get(key) ?? null; }
  }
  function write(key, value) {
    inMemory.set(key, value);
    try { localStorage.setItem(key, value); } catch { /* Keep this visit usable. */ }
  }
  function dayKey(now = new Date()) {
    // The snack follows the device's calendar day, including local midnight.
    return [now.getFullYear(), now.getMonth() + 1, now.getDate()]
      .map(part => String(part).padStart(2, "0")).join("-");
  }
  function savedPerch() {
    try {
      const position = JSON.parse(read(storageKeys.perch));
      if (position && [position.x, position.y].every(value => Number.isFinite(value) && value >= 0 && value <= 1)) {
        return position;
      }
    } catch { /* A stale setting falls back to the corner. */ }
    return { x: 1, y: 1 };
  }

  const widget = document.createElement("div");
  widget.className = "lumen-companion";
  widget.innerHTML = `
    <canvas class="lumen-art" width="224" height="168" aria-hidden="true"></canvas>
    <button class="lumen-pet" type="button"
      aria-label="Lumen. Activate for a trick or use the arrow keys to move."
      title="Click for a trick · Drag to move"></button>
    <button class="lumen-snack" type="button" aria-label="Feed Lumen today's dewdrop nectar"
      title="Daily snack · Dewdrop nectar" hidden><canvas width="22" height="22" aria-hidden="true"></canvas>Feed Lumen</button>
    <span class="lumen-fed" hidden>Fed today ✓</span>
    <span class="lumen-caption" aria-hidden="true" hidden></span>
    <span class="lumen-announcement" role="status"></span>
  `;
  document.body.append(widget);
  const pet = widget.querySelector(".lumen-pet");
  const snackButton = widget.querySelector(".lumen-snack");
  const fedLabel = widget.querySelector(".lumen-fed");
  const caption = widget.querySelector(".lumen-caption");
  const announcement = widget.querySelector(".lumen-announcement");
  const art = widget.querySelector(".lumen-art");
  const canvas = art.getContext("2d");
  const nectarIcon = snackButton.querySelector("canvas").getContext("2d");

  nectarIcon.translate(11, 10);
  drawSnack(nectarIcon, lumen.id);
  let perch = savedPerch();
  let drag = null;
  let ignorePointerClick = false;
  let nextTrick = 0;
  let claimingSnack = false;
  let pose = null, clock = 0, lastFrame = null, frame = 0;
  let captionTimer, midnightTimer;

  function bounds() {
    return {
      x: Math.max(0, document.documentElement.clientWidth - widget.offsetWidth - 2 * pad),
      y: Math.max(0, document.documentElement.clientHeight - widget.offsetHeight - 2 * pad)
    };
  }
  function positionWidget() {
    const available = bounds();
    const left = pad + available.x * perch.x;
    const top = pad + available.y * perch.y;
    widget.style.setProperty("--lumen-left", left + "px");
    widget.style.setProperty("--lumen-top", top + "px");
    widget.classList.toggle("lumen-near-top", top < 48);
  }
  function moveWidget(x, y) {
    const available = bounds();
    perch = {
      x: Math.max(0, Math.min(1, (x - pad) / (available.x || 1))),
      y: Math.max(0, Math.min(1, (y - pad) / (available.y || 1)))
    };
    positionWidget();
  }
  function savePerch() { write(storageKeys.perch, JSON.stringify(perch)); }

  function say(message) {
    caption.textContent = announcement.textContent = message;
    caption.hidden = false;
    clearTimeout(captionTimer);
    captionTimer = setTimeout(() => {
      caption.hidden = true;
      if (reducedMotion.matches) { pose = null; render(); }
    }, 2200);
  }

  function showSnack() {
    const today = dayKey();
    const fed = read(storageKeys.fed) === today;
    if (fed && document.activeElement === snackButton) pet.focus({ preventScroll: true });
    snackButton.hidden = fed;
    fedLabel.hidden = !fed;
    if (!fed && read(storageKeys.dropped) !== today) {
      write(storageKeys.dropped, today);
      snackButton.classList.remove("lumen-drop");
      void snackButton.offsetWidth;
      snackButton.classList.add("lumen-drop");
      announcement.textContent = "Lumen's daily dewdrop nectar is ready.";
    }
  }
  function refresh() {
    showSnack();
    clearTimeout(midnightTimer);
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    midnightTimer = setTimeout(refresh, tomorrow - now + 100);
  }
  function claimSnack() {
    const today = dayKey();
    if (read(storageKeys.fed) === today) { showSnack(); return; }
    write(storageKeys.fed, today);
    showSnack();
    react(snackReaction);
  }
  snackButton.addEventListener("click", async () => {
    // Serialize simultaneous claims when both guide pages are open on the same origin.
    if (claimingSnack) return;
    claimingSnack = true;
    try {
      if (navigator.locks) await navigator.locks.request(storageKeys.fed, claimSnack);
      else claimSnack();
    } catch {
      claimSnack();
    } finally {
      claimingSnack = false;
    }
  });

  pet.addEventListener("pointerdown", event => {
    if (!event.isPrimary || event.button !== 0) return;
    const box = widget.getBoundingClientRect();
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: box.left, top: box.top, moved: false };
    ignorePointerClick = false;
    pet.setPointerCapture(event.pointerId);
  });
  pet.addEventListener("pointermove", event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      pose = null;
      caption.hidden = true;
      render();
    }
    moveWidget(drag.left + dx, drag.top + dy);
  });
  function playTrick() {
    react(tricks[nextTrick]);
    nextTrick = (nextTrick + 1) % tricks.length;
  }
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.moved) {
      ignorePointerClick = true;
      savePerch();
    }
    if (event.type === "pointerup" && event.pointerType === "touch" && !drag.moved) {
      // A phone may suppress its synthesized click just after a drag.
      ignorePointerClick = true;
      playTrick();
    }
    drag = null;
  }
  pet.addEventListener("pointerup", finishDrag);
  pet.addEventListener("pointercancel", finishDrag);
  pet.addEventListener("lostpointercapture", finishDrag);
  pet.addEventListener("click", event => {
    if (ignorePointerClick && event.detail > 0) {
      ignorePointerClick = false;
      return;
    }
    playTrick();
  });
  pet.addEventListener("keydown", event => {
    const directions = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const box = widget.getBoundingClientRect();
    const step = event.shiftKey ? 56 : 22;
    moveWidget(box.left + direction[0] * step, box.top + direction[1] * step);
    savePerch();
  });

  function react(reaction) {
    pose = { ...reaction, start: clock };
    say(reaction.title);
    render();
  }
  function twinkle(x, y, size, colour) {
    canvas.fillStyle = colour;
    canvas.fillRect(x - size * .5, y - size * 1.5, size, size * 3);
    canvas.fillRect(x - size * 1.5, y - size * .5, size * 3, size);
  }
  function flightTrail(progress) {
    for (let i = 1; i <= 8; i++) {
      const earlier = progress - i * .032;
      if (earlier <= 0) break;
      const path = motion(lumen.id, earlier, clock - i * .035, false);
      canvas.globalAlpha = (1 - i / 9) * pulse(progress, 0, 1);
      twinkle(55 + path.x + i % 3 * 4, 52 + path.y, 3 - i * .24, i % 2 ? "#cc8b35" : "#b995db");
    }
    canvas.globalAlpha = 1;
  }
  function nectar(progress) {
    if (progress < .65) {
      const flight = Math.min(1, progress / .58);
      canvas.save();
      canvas.translate(55 + 23 * (1 - flight), 44 + 61 * (1 - flight) - 9 * Math.sin(flight * Math.PI));
      const size = Math.min(1, (.65 - progress) / .13);
      canvas.scale(size, size);
      drawSnack(canvas, lumen.id);
      canvas.restore();
    } else {
      const burst = (progress - .65) / .35;
      canvas.globalAlpha = 1 - burst;
      twinkle(37 - burst * 6, 45 - burst * 18, 3, "#bb8053");
      twinkle(76 + burst * 6, 37 - burst * 16, 2.6, "#ae8cd9");
      canvas.globalAlpha = 1;
    }
  }
  function render() {
    const still = reducedMotion.matches;
    const elapsed = pose ? (clock - pose.start) / pose.duration : 0;
    if (elapsed >= 1) pose = null;
    const progress = pose ? (still ? .64 : elapsed) : 0;
    const id = pose?.id;
    canvas.clearRect(0, 0, art.width, art.height);
    canvas.save();
    canvas.translate(62, 38);
    canvas.scale(.91, .91);
    const options = { t: still ? 0 : clock, still };
    if (id === "figure-eight" && !still) {
      // Ease inward near an edge so both loops stay visible at the default perch.
      canvas.translate((.5 - perch.x) * 29 * pulse(progress, 0, 1), 0);
      options.trick = progress;
      flightTrail(progress);
    } else if (id === "twirl" && !still) {
      canvas.translate(55, 56 - 15 * pulse(progress, 0, 1));
      const spin = Math.cos(progress * Math.PI * 2);
      canvas.scale(spin < 0 ? Math.min(-.13, spin) : Math.max(.13, spin), 1);
      canvas.translate(-55, -56);
      options.hello = progress;
    } else if (id === "wave" && !still) {
      canvas.translate(55, 62);
      canvas.rotate(.24 * pulse(progress, 0, 1) * Math.sin(progress * 14));
      canvas.translate(-55, -62);
      options.hello = progress;
    } else if (id === "snack") {
      options.hello = Math.max(0, (progress - .5) * 2);
    }
    draw(canvas, lumen, options);
    if (id === "snack" && !still) nectar(progress);
    if (id && still) {
      twinkle(29, 35, 2.4, "#cc8b35");
      twinkle(80, 24, 2, "#b995db");
    }
    canvas.restore();
  }
  function tick(stamp) {
    if (lastFrame == null) lastFrame = stamp;
    const gap = stamp - lastFrame;
    if (gap >= 30) {
      clock += Math.min(gap, 90) / 1000;
      lastFrame = stamp;
      render();
    }
    frame = requestAnimationFrame(tick);
  }
  function updateMotion() {
    cancelAnimationFrame(frame);
    lastFrame = null;
    if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(tick);
    render();
  }

  reducedMotion.addEventListener("change", updateMotion);
  addEventListener("resize", positionWidget);
  addEventListener("pageshow", () => {
    if (!drag) { perch = savedPerch(); positionWidget(); }
    refresh();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refresh();
    updateMotion();
  });
  addEventListener("storage", event => {
    if (event.key === storageKeys.fed || event.key === storageKeys.dropped || event.key === null) showSnack();
    if (!drag && (event.key === storageKeys.perch || event.key === null)) { perch = savedPerch(); positionWidget(); }
  });
  positionWidget();
  refresh();
  updateMotion();
})();
