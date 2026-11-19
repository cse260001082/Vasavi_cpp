(() => {
  "use strict";
  const { animals, draw, drawSnack, leaf, motion } = window.DeskBuddies;
  const byId = id => document.getElementById(id);
  const scene = byId("scene"), target = byId("pet-target"), canvas = byId("stage");
  const c = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const favouriteKey = "desk-buddies-favourite-v1";
  let favourite = "";
  try { favourite = localStorage.getItem(favouriteKey); } catch { /* The gallery also works in memory. */ }
  let animal = animals.find(pet => pet.id === favourite) || animals[0];
  let paused = reduced.matches, studying = false, mini = false, inView = true;
  let clock = 0, lastFrame = null, frame = 0, look = 0, lookTarget = 0;
  let action = null, speechTimer, width = 0, height = 0;
  const TAU = Math.PI * 2;
  const durations = { hello: 1.55, snack: 2.15, trick: 2.45 };
  const icon = name => '<svg class="icon" aria-hidden="true"><use href="#' + name + '"/></svg>';
  const controls = { trick: byId("trickBtn"), snack: byId("snackBtn"), study: byId("studyBtn") };
  const slots = new Map();

  function announce(text) { byId("announce").textContent = text; }
  function hideSpeech() {
    clearTimeout(speechTimer);
    byId("speech").hidden = true;
  }
  function say(text) {
    hideSpeech();
    byId("speech").textContent = text;
    byId("speech").hidden = false;
    announce(animal.name + " says, “" + text + "”");
    speechTimer = setTimeout(hideSpeech, 2600);
  }
  function updateFavourite() {
    const saved = favourite === animal.id;
    const button = byId("favourite");
    const label = (saved ? "Remove " + animal.name + " from favourites" : "Save " + animal.name + " as your favourite");
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", label); button.title = label;
    for (const pet of animals) {
      const slot = slots.get(pet.id);
      slot.querySelector(".saved-mark").hidden = pet.id !== favourite;
      slot.setAttribute("aria-label", pet.name + ", " + pet.species + (pet.id === favourite ? ", your favourite" : ""));
    }
  }
  function studyLabel() {
    controls.study.setAttribute("aria-pressed", String(studying));
    controls.study.querySelector("span").textContent = studying ? "Finish studying" : "Study together";
    byId("tap-hint").textContent = studying ? "Reading with " + animal.name : "Tap " + animal.name + " to say hello";
  }
  function select(pet) {
    animal = pet; action = null; studying = false; look = lookTarget = 0; hideSpeech();
    byId("species").textContent = pet.species;
    byId("pet-name").textContent = pet.name;
    byId("bio").textContent = pet.bio;
    byId("trick-name").textContent = pet.trick;
    byId("snack-name").textContent = pet.snack;
    document.querySelector(".profile").style.setProperty("--pet-tint", pet.tint);
    target.setAttribute("aria-label", "Say hello to " + pet.name); target.title = "Say hello to " + pet.name;
    for (const [id, button] of slots) button.setAttribute("aria-pressed", String(id === pet.id));
    studyLabel(); updateFavourite(); render();
  }
  for (const pet of animals) {
    const button = document.createElement("button");
    button.type = "button"; button.className = "buddy";
    button.style.setProperty("--pet-tint", pet.tint);
    button.innerHTML = '<span class="portrait"><canvas width="112" height="100" aria-hidden="true"></canvas></span>' +
      '<span class="choice-mark">' + icon("check") + '</span><span class="saved-mark" hidden>' + icon("heart") + '</span>' +
      '<span class="buddy-copy"><span class="buddy-name"></span><span class="buddy-species"></span></span>';
    button.querySelector(".buddy-name").textContent = pet.name;
    button.querySelector(".buddy-species").textContent = pet.species;
    draw(button.querySelector("canvas").getContext("2d"), pet, { still: true });
    button.addEventListener("click", () => { select(pet); announce("Meeting " + pet.name + ", " + pet.species + "."); });
    byId("roster").append(button); slots.set(pet.id, button);
  }
  // On a phone, put the small picker within reach of the stage in both reading and tab order.
  const compact = matchMedia("(max-width: 670px)");
  const collection = document.querySelector(".collection"), showcase = document.querySelector(".showcase");
  const habitat = document.querySelector(".habitat"), profile = document.querySelector(".profile");
  const actions = document.querySelector(".actions");
  function arrangePreview() {
    if (compact.matches) {
      showcase.before(collection);
      habitat.append(actions, controls.study);
    } else {
      showcase.after(collection);
      profile.append(actions, controls.study);
    }
  }
  compact.addEventListener("change", arrangePreview);
  arrangePreview();
  byId("favourite").addEventListener("click", () => {
    favourite = animal.id === favourite ? "" : animal.id;
    let message = favourite ? animal.name + " is your favourite." : "Favourite cleared.";
    try {
      if (favourite) localStorage.setItem(favouriteKey, favourite);
      else localStorage.removeItem(favouriteKey);
    } catch { message += " This choice lasts for this visit."; }
    updateFavourite(); say(message);
  });

  function startAction(type) {
    if (type !== "hello") studying = false;
    action = { type, start: clock };
    if (paused) action.stillPose = type === "snack" ? .24 : .54;
    studyLabel();
    say(type === "trick" ? animal.play : type === "snack" ? animal.fed : animal.hello);
    render();
  }
  controls.trick.addEventListener("click", () => startAction("trick"));
  controls.snack.addEventListener("click", () => startAction("snack"));
  target.addEventListener("click", () => startAction("hello"));
  controls.study.addEventListener("click", () => {
    studying = !studying; action = null;
    studyLabel();
    say(studying ? "I’ll read alongside you." : "Bookmark in. Ready to play!");
    render();
  });
  byId("sizeBtn").addEventListener("click", event => {
    mini = !mini;
    event.currentTarget.setAttribute("aria-pressed", String(mini));
    announce(mini ? "Showing the desk-size companion." : "Showing the full-size companion.");
    render();
  });
  scene.addEventListener("pointermove", event => {
    const box = scene.getBoundingClientRect();
    lookTarget = Math.max(-1, Math.min(1, (event.clientX - box.left - width * .5) / (width * .3)));
  });
  scene.addEventListener("pointerleave", () => { lookTarget = 0; });

  function sparkle(x, y, size, colour) {
    c.fillStyle = colour;
    c.fillRect(x - size * .5, y - size * 1.6, size, size * 3.2);
    c.fillRect(x - size * 1.5, y - size * .5, size * 3, size);
  }
  function heart(x, y, size) {
    c.save(); c.translate(x, y); c.scale(size, size);
    c.fillStyle = "#a54764"; c.fillRect(-3, -1, 7, 3); c.fillRect(-2, 2, 5, 2); c.fillRect(0, 4, 1, 1);
    c.fillStyle = "#ffabb3"; c.fillRect(-3, -2, 3, 3); c.fillRect(1, -2, 3, 3); c.fillRect(-2, 0, 5, 2); c.fillRect(-1, 2, 3, 1);
    c.fillStyle = "#ffe7ce"; c.fillRect(-2, -2, 1, 1); c.restore();
  }
  function fireflies() {
    for (let i = 0; i < 13; i++) {
      const seed = i * 1.83;
      const x = ((i * 71 + 7) % 101) / 101 * width + 5 * Math.sin(clock * .56 + seed);
      const y = (.18 + ((i * 17) % 60) / 100) * height + 6 * Math.cos(clock * .43 + seed);
      c.globalAlpha = .16 + .62 * (1 + Math.sin(clock * 1.7 + seed)) / 2;
      c.fillStyle = "#fff190"; c.fillRect(x, y, 2, 2);
      c.globalAlpha *= .28; c.fillRect(x - 1, y - 1, 4, 4);
    }
    c.globalAlpha = 1;
  }
  function effects(type, progress) {
    if (!type || progress <= 0) return;
    if (type === "snack") {
      if (progress < .73) {
        const u = Math.min(1, progress / .52);
        const mouth = animal.id === "moss" ? [30, 70] : animal.id === "lumen" ? [55, 52] : [53, 57];
        c.save(); c.translate(mouth[0] + 31 * (1 - u), mouth[1] + 12 * (1 - u) - 21 * Math.sin(u * Math.PI));
        c.rotate((1 - u) * .8); const scale = Math.min(1, (.73 - progress) / .19);
        c.scale(scale, scale); drawSnack(c, animal.id); c.restore();
      } else {
        for (let i = 0; i < 3; i++) sparkle(42 + i * 10, 49 - (progress - .73) * 37 + i % 2 * 2, 1.2, "#ffe9a1");
      }
      return;
    }
    const count = type === "hello" ? 5 : 9;
    for (let i = 0; i < count; i++) {
      const u = (progress - i * .038) / .65;
      if (u < 0 || u >= 1) continue;
      c.save(); c.globalAlpha = Math.min(1, (1 - u) * 3, u * 10);
      const angle = i * 2.4, spread = 18 + u * 20;
      let x = 55 + Math.cos(angle) * spread, y = 51 - u * 22 + Math.sin(angle) * 7;
      if (type === "hello") heart(x, y, .75 + (i % 2) * .3);
      else if (animal.id === "maple") leaf(c, x, y, angle + u * 3, ["#e8ad59", "#abcb72", "#d68253"][i % 3]);
      else if (animal.id === "boba") {
        const r = 2 + (i % 3) * 1.5;
        c.beginPath(); c.arc(x, y - u * 5, r, 0, TAU); c.fillStyle = "#b3edf2aa"; c.fill();
        c.lineWidth = .9; c.strokeStyle = "#6da7b4"; c.stroke();
        c.fillStyle = "#fff9e8"; c.fillRect(x - r * .45, y - u * 5 - r * .6, 1.5, 1.5);
      } else if (animal.id === "lumen") {
        const tail = motion(animal.id, Math.max(0, progress - i * .025), clock - i * .04, false);
        sparkle(55 + tail.x + Math.sin(angle) * 7, 62 + tail.y + Math.cos(angle) * 4, 1.6, i % 2 ? "#ffe39d" : "#e8ffbd");
      } else if (animal.id === "pip") {
        const track = motion(animal.id, progress, clock, false);
        sparkle(track.x + 25 - u * 16 + Math.cos(angle) * 10, 92 - Math.sin(u * Math.PI) * (5 + i % 4 * 3), 1.4, "#d7f5f7");
      } else {
        sparkle(x + 5, y - 9, 1.35, i % 2 ? "#ffe69c" : "#fff3d1");
      }
      c.restore();
    }
  }
  function render() {
    if (!width || !height) return;
    // Draw at a low native resolution and let the browser enlarge the finished pixel grid.
    c.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    c.clearRect(0, 0, width, height); fireflies();
    const unit = mini ? .94 : Math.min(width / 167, height / 172);
    const x = width * .5, floor = height * .86;
    let progress = 0;
    if (action) {
      progress = (clock - action.start) / durations[action.type];
      // An action requested while still gets a representative pose and its caption.
      if (action.stillPose != null) progress = action.stillPose;
      if (progress >= 1) { action = null; progress = 0; }
    }
    const type = action?.type;
    const opts = { t: clock, look, studying, [type || "idle"]: progress };
    c.save(); c.translate(x - 56 * unit, floor - 94 * unit); c.scale(unit, unit);
    draw(c, animal, opts); effects(type, progress); c.restore();
    const m = motion(animal.id, opts.trick || 0, clock, studying);
    const left = Math.round(x + (m.x - 36) * unit), top = Math.round(floor + (m.y - 76) * unit);
    const bounds = [left, top, Math.round(76 * unit), Math.round(77 * unit)].join(",");
    if (target.dataset.bounds !== bounds) {
      target.dataset.bounds = bounds;
      Object.assign(target.style, { left: left + "px", top: top + "px", width: Math.round(76 * unit) + "px", height: Math.round(77 * unit) + "px" });
    }
  }
  function resize() {
    width = scene.clientWidth; height = scene.clientHeight;
    canvas.width = Math.max(1, Math.round(width * .65)); canvas.height = Math.max(1, Math.round(height * .65));
    render();
  }
  function tick(stamp) {
    if (lastFrame === null) lastFrame = stamp;
    const elapsed = (stamp - lastFrame) / 1000;
    if (elapsed >= 1 / 40) {
      clock += Math.min(.08, elapsed); lastFrame = stamp;
      look += (lookTarget - look) * .18; render();
    }
    frame = requestAnimationFrame(tick);
  }
  function syncLoop() {
    cancelAnimationFrame(frame); lastFrame = null;
    if (!paused && inView && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function setPaused(value) {
    paused = value;
    if (!paused && action?.stillPose != null) { action.start = clock; delete action.stillPose; }
    const label = paused ? "Resume animation" : "Pause animation";
    const button = byId("motionBtn");
    button.innerHTML = icon(paused ? "play" : "pause"); button.title = label; button.setAttribute("aria-label", label);
    byId("scene-state").textContent = paused ? "Still habitat" : "Live habitat";
    scene.classList.toggle("is-still", paused); render(); syncLoop();
  }
  byId("motionBtn").addEventListener("click", () => setPaused(!paused));
  reduced.addEventListener("change", event => setPaused(event.matches));
  document.addEventListener("visibilitychange", syncLoop);
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncLoop(); }).observe(scene);
  new ResizeObserver(resize).observe(scene);
  select(animal); resize(); setPaused(paused);
})();
