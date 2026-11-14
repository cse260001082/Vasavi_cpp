/* No network calls or libraries: the lesson data and all visuals are local. */
(function () {
  'use strict';
  window.SprintLearning = { attach };

  function attach({ checkboxes, isPersistent = () => true }) {
    const lessons = window.SprintLessons;
    const dialog = document.createElement('dialog');
    dialog.className = 'learn-dialog';
    dialog.setAttribute('aria-labelledby', 'learnTitle');
    dialog.innerHTML = `
      <header class="learn-head"><div><p class="learn-eyebrow" id="learnEyebrow"></p><h2 id="learnTitle"></h2></div><button type="button" class="learn-close" aria-label="Close understanding check">×</button></header>
      <div class="learn-body">
        <section id="learnConfirm"><h3>Ready to mark this done?</h3><p>Run your code and test a few edge cases first. Then try one quick question about the idea behind your solution.</p><p class="learn-muted">Your tick is added after the check. The animated walkthrough opens afterwards.</p><div class="learn-actions"><button type="button" class="btn btn-ember" id="learnStart">I've tested it — quiz me</button><button type="button" class="btn btn-ghost" id="learnCancel">Keep practising</button></div></section>
        <form class="learn-quiz" id="learnQuiz" hidden><fieldset><legend id="learnQuestion"></legend><div class="learn-options" id="learnOptions"></div></fieldset><div class="learn-feedback" id="learnFeedback" role="status" hidden></div><div class="learn-actions"><button type="submit" class="btn" id="learnSubmit" disabled>Check my answer</button><button type="button" class="btn btn-ghost" id="learnQuizCancel">Back to my code</button></div></form>
        <section class="learn-success" id="learnSuccess" hidden><div class="learn-medal" aria-hidden="true">✓</div><h3>You earned this tick.</h3><p class="learn-explanation" id="learnExplanation"></p><p class="learn-muted" id="learnSaved"></p><div class="learn-actions"><button type="button" class="btn btn-ember" id="learnWatch">Watch the walkthrough</button><button type="button" class="btn btn-ghost" id="learnDone">Back to tracker</button></div></section>
        <section id="learnWalk" hidden><div class="walk-summary"><p id="walkIdea"></p><div class="walk-complexity" id="walkComplexity"></div></div><p class="walk-example" id="walkExample"></p><div class="walk-stage"><div id="walkVisual" aria-label="Algorithm state"></div><div class="walk-stats" id="walkStats"></div><p class="walk-caption" id="walkCaption" aria-live="polite" aria-atomic="true"></p></div><div class="walk-controls"><button type="button" class="btn btn-ghost" id="walkPrev" aria-label="Previous step">← Back</button><button type="button" class="btn" id="walkPlay">Play</button><button type="button" class="btn btn-ghost" id="walkNext" aria-label="Next step">Next →</button><button type="button" class="btn btn-ghost" id="walkReset">Restart</button><label class="walk-speed">Pace <select id="walkSpeed"><option value="2200">Slow</option><option value="1400" selected>Normal</option><option value="800">Quick</option></select></label></div><div class="walk-position"><span id="walkCount"></span><input type="range" id="walkSeek" min="0" value="0" aria-label="Walkthrough step"></div><details class="walk-algorithm"><summary>The algorithm in plain steps</summary><pre id="walkAlgorithm"></pre></details><p class="walk-edge" id="walkEdge"></p><div class="learn-actions"><button type="button" class="btn btn-ghost" id="walkDone">Back to tracker</button></div></section>
        <div class="learn-confetti" id="learnConfetti" aria-hidden="true"></div>
      </div>`;
    document.body.append(dialog);
    const $ = id => dialog.querySelector('#' + id);
    $('walkVisual').setAttribute('role', 'group');
    const panels = ['learnConfirm', 'learnQuiz', 'learnSuccess', 'learnWalk'];
    const reviews = new Map();
    let current, lesson, returnTo, frameIndex = 0, timer = null, confettiTimer = null;
    let answerOrder = [];

    function show(panel) {
      stop();
      panels.forEach(id => { $(id).hidden = id !== panel; });
      dialog.scrollTop = 0;
    }
    function open(cb, review, trigger) {
      current = cb;
      lesson = lessons[cb.id];
      returnTo = trigger || cb;
      $('learnTitle').textContent = cb.closest('.problem-row').querySelector('.problem-title').dataset.problemTitle;
      $('learnEyebrow').textContent = 'Day ' + cb.id.split('_')[1] + ' · ' + (review ? 'Solution walkthrough' : 'Understanding check');
      dialog.querySelector('.learn-close').setAttribute('aria-label', review ? 'Close walkthrough' : 'Close understanding check');
      clearConfetti();
      show(review ? 'learnWalk' : 'learnConfirm');
      if (review) prepareWalk();
      document.body.classList.add('learning-open');
      dialog.showModal();
      (review ? $('walkPlay') : $('learnStart')).focus();
    }
    function close() { dialog.close(); }
    dialog.querySelector('.learn-close').addEventListener('click', close);
    ['learnCancel', 'learnQuizCancel', 'learnDone', 'walkDone'].forEach(id => $(id).addEventListener('click', close));
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
    });
    dialog.addEventListener('close', () => {
      stop(); clearConfetti();
      document.body.classList.remove('learning-open');
      if (returnTo && returnTo.getClientRects().length) returnTo.focus({ preventScroll: true });
      else document.getElementById('searchInput').focus({ preventScroll: true });
    });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });

    checkboxes.forEach(cb => {
      if (!lessons[cb.id]) throw new Error('Missing lesson: ' + cb.id);
      const title = cb.closest('.problem-row').querySelector('.problem-title');
      const label = document.createElement('label');
      label.className = title.className;
      label.htmlFor = cb.id;
      label.dataset.problemTitle = title.textContent.replace(/\$/g, '').replace(/`/g, '');
      label.append(...title.childNodes);
      title.replaceWith(label);
      cb.addEventListener('click', event => {
        // Native checkbox activation toggles before click; cancelling restores it.
        if (cb.checked) {
          event.preventDefault();
          queueMicrotask(() => { if (!dialog.open) open(cb, false); });
        }
      });
      const review = document.createElement('button');
      review.type = 'button'; review.className = 'walkthrough-link'; review.textContent = 'Walkthrough';
      review.setAttribute('aria-label', 'Watch walkthrough: ' + label.dataset.problemTitle);
      review.addEventListener('click', () => open(cb, true, review));
      cb.closest('.problem-row').querySelector('.problem-right').append(review);
      reviews.set(cb, review);
    });

    $('learnStart').addEventListener('click', () => {
      show('learnQuiz');
      $('learnQuestion').textContent = lesson.quiz;
      $('learnFeedback').hidden = true;
      $('learnSubmit').disabled = true;
      answerOrder = lesson.options.map((text, index) => ({ text, correct: index === 0 }));
      for (let i = answerOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerOrder[i], answerOrder[j]] = [answerOrder[j], answerOrder[i]];
      }
      $('learnOptions').replaceChildren(...answerOrder.map((option, index) => {
        const label = document.createElement('label'); label.className = 'learn-option';
        const radio = document.createElement('input'); radio.type = 'radio'; radio.name = 'understanding'; radio.value = index;
        const text = document.createElement('span'); text.textContent = option.text;
        label.append(radio, text); return label;
      }));
      $('learnOptions').querySelector('input').focus();
    });
    $('learnOptions').addEventListener('change', () => { $('learnSubmit').disabled = false; $('learnFeedback').hidden = true; });
    $('learnQuiz').addEventListener('submit', event => {
      event.preventDefault();
      const selected = $('learnOptions').querySelector('input:checked');
      if (!selected) return;
      if (!answerOrder[Number(selected.value)].correct) {
        $('learnFeedback').textContent = 'Try another trace. ' + lesson.hint;
        $('learnFeedback').hidden = false;
        return;
      }
      current.checked = true;
      current.dispatchEvent(new Event('change', { bubbles: true }));
      refresh();
      show('learnSuccess');
      $('learnExplanation').textContent = lesson.explanation;
      $('learnSaved').textContent = isPersistent() ? 'Tick saved. Come back to the walkthrough whenever you want.' : 'Tick added for this visit. Browser storage is unavailable, so this tick cannot survive a reload.';
      $('learnWatch').focus();
      celebrate();
    });

    function clearConfetti() { clearTimeout(confettiTimer); $('learnConfetti').replaceChildren(); }
    function celebrate() {
      clearConfetti();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const colours = ['#4285f4', '#ea4335', '#fbbc05', '#34a853'];
      const width = Math.min(dialog.clientWidth, 800);
      for (let i = 0; i < 36; i++) {
        const particle = document.createElement('span'); particle.className = 'learn-particle';
        particle.style.setProperty('--particle-color', colours[i % colours.length]);
        particle.style.setProperty('--dx', ((Math.random() - .5) * width * .95) + 'px');
        particle.style.setProperty('--dy', (120 + Math.random() * 260) + 'px');
        particle.style.setProperty('--spin', ((Math.random() - .5) * 600) + 'deg');
        particle.style.animationDelay = (Math.random() * .18) + 's';
        if (i % 7 === 0) {
          particle.classList.add('is-g'); const img = document.createElement('img'); img.src = '../assets/google-g.png'; img.alt = ''; particle.append(img);
        } else if (i % 7 === 1) { particle.classList.add('is-code'); particle.textContent = '</>'; }
        else if (i % 7 === 2) particle.classList.add('is-chrome');
        $('learnConfetti').append(particle);
      }
      confettiTimer = setTimeout(clearConfetti, 2100);
    }
    function refresh() { reviews.forEach((button, cb) => { button.hidden = !cb.checked; }); }

    $('learnWatch').addEventListener('click', () => {
      clearConfetti(); show('learnWalk');
      $('learnEyebrow').textContent = 'Day ' + current.id.split('_')[1] + ' · Solution walkthrough';
      dialog.querySelector('.learn-close').setAttribute('aria-label', 'Close walkthrough');
      prepareWalk(); $('walkPlay').focus();
    });
    function prepareWalk() {
      frameIndex = 0;
      $('walkIdea').textContent = lesson.idea;
      $('walkExample').textContent = 'Example: ' + lesson.example;
      $('walkComplexity').replaceChildren(...[lesson.time, lesson.space].map(value => { const span = document.createElement('span'); span.textContent = value; return span; }));
      $('walkAlgorithm').textContent = lesson.algorithm;
      dialog.querySelector('.walk-algorithm').open = false;
      $('walkEdge').textContent = 'Also test: ' + lesson.edge;
      $('walkSeek').max = lesson.frames.length - 1;
      renderFrame();
    }
    function renderFrame() {
      const frame = lesson.frames[frameIndex];
      $('walkVisual').replaceChildren(...frame.rows.map(row => {
        const lane = document.createElement('div'); lane.className = 'walk-lane'; lane.dataset.kind = row.kind || 'array';
        const label = document.createElement('div'); label.className = 'walk-lane-label'; label.textContent = row.label;
        const cells = document.createElement('div'); cells.className = 'walk-cells';
        const values = row.values.length ? row.values : ['∅'];
        values.forEach((value, index) => {
          const wrap = document.createElement('div'); wrap.className = 'walk-cell-wrap';
          const cell = document.createElement('div'); cell.className = 'walk-cell'; cell.textContent = String(value);
          if ((row.active || []).includes(index)) cell.classList.add('is-active');
          if (row.markers && row.markers[index]) cell.classList.add('is-marked');
          const indexLabel = document.createElement('span'); indexLabel.className = 'walk-index'; indexLabel.textContent = row.values.length ? index : '';
          wrap.append(cell, indexLabel);
          if (row.markers && row.markers[index]) { const marker = document.createElement('span'); marker.className = 'walk-marker'; marker.textContent = row.markers[index]; wrap.append(marker); }
          cells.append(wrap);
        });
        lane.append(label, cells); return lane;
      }));
      $('walkStats').replaceChildren(...Object.entries(frame.stats || {}).map(([key, value]) => { const span = document.createElement('span'); span.textContent = key + ': ' + value; return span; }));
      $('walkCaption').textContent = frame.note;
      $('walkCount').textContent = (frameIndex + 1) + ' / ' + lesson.frames.length;
      $('walkSeek').value = frameIndex;
      $('walkPrev').disabled = frameIndex === 0;
      $('walkNext').disabled = frameIndex === lesson.frames.length - 1;
      if (frameIndex === lesson.frames.length - 1) stop();
    }
    function stop() { clearInterval(timer); timer = null; $('walkPlay').textContent = 'Play'; }
    function play() {
      if (frameIndex === lesson.frames.length - 1) { frameIndex = 0; renderFrame(); }
      $('walkPlay').textContent = 'Pause';
      timer = setInterval(() => { frameIndex++; renderFrame(); }, Number($('walkSpeed').value));
    }
    $('walkPlay').addEventListener('click', () => timer ? stop() : play());
    $('walkPrev').addEventListener('click', () => { stop(); frameIndex = Math.max(0, frameIndex - 1); renderFrame(); });
    $('walkNext').addEventListener('click', () => { stop(); frameIndex = Math.min(lesson.frames.length - 1, frameIndex + 1); renderFrame(); });
    $('walkReset').addEventListener('click', () => { stop(); frameIndex = 0; renderFrame(); });
    $('walkSeek').addEventListener('input', () => { stop(); frameIndex = Number($('walkSeek').value); renderFrame(); });
    $('walkSpeed').addEventListener('change', () => { if (timer) { stop(); play(); } });
    refresh();
    return { refresh };
  }
})();
