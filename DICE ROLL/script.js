// =========================================================================
// PART 3: JAVASCRIPT LOGIC & DOM MANIPULATION
// =========================================================================

// =========================================================================
// STEP 1: DEFINE THE PIP POSITIONS FOR EACH DIE FACE (1 TO 6)
// =========================================================================
// Imagine a 3x3 tic-tac-toe board where cells are numbered 0 to 8:
// [ 0 ][ 1 ][ 2 ]
// [ 3 ][ 4 ][ 5 ]
// [ 6 ][ 7 ][ 8 ]
// For example, rolling a "1" lights up only the center cell (index 4).
// Rolling a "5" lights up the four corners (0, 2, 6, 8) plus the center (4).
const PIP_PATTERNS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8]
};

// =========================================================================
// STEP 2: APPLICATION STATE (Variables that remember what's happening)
// =========================================================================
let numberOfDice = 1;      // Can be 1 or 2
let isRolling = false;     // Prevents clicking "Roll" while already rolling
let soundEnabled = true;   // Controls Web Audio dice click sound
let inspectGridMode = false; // Shows/hides the 0-8 grid numbers on the dice
let rollHistory = [];      // Array to store past rolls

// =========================================================================
// STEP 3: SELECT DOM ELEMENTS USING document.getElementById()
// =========================================================================
const die1El = document.getElementById('die1');
const die2El = document.getElementById('die2');
const die2Wrapper = document.getElementById('die2Wrapper');
const plusSign = document.getElementById('plusSign');
const die1Caption = document.getElementById('die1Caption');
const die2Caption = document.getElementById('die2Caption');
const diceArena = document.getElementById('diceArena');

const oneDieBtn = document.getElementById('oneDieBtn');
const twoDiceBtn = document.getElementById('twoDiceBtn');
const rollBtn = document.getElementById('rollBtn');
const rollBtnText = document.getElementById('rollBtnText');

const resultStatusText = document.getElementById('resultStatusText');
const resultBreakdownText = document.getElementById('resultBreakdownText');
const totalValueDisplay = document.getElementById('totalValueDisplay');

const historyList = document.getElementById('historyList');
const emptyHistoryMessage = document.getElementById('emptyHistoryMessage');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

const statCount = document.getElementById('statCount');
const statHigh = document.getElementById('statHigh');
const statAvg = document.getElementById('statAvg');

const inspectGridBtn = document.getElementById('inspectGridBtn');
const inspectGridIndicator = document.getElementById('inspectGridIndicator');
const soundToggleBtn = document.getElementById('soundToggleBtn');
const soundIcon = document.getElementById('soundIcon');
const soundLabel = document.getElementById('soundLabel');

// =========================================================================
// STEP 4: CORE HELPER FUNCTIONS (Randomness & Drawing a Die Face)
// =========================================================================

/**
 * Generates a random integer between 1 and 6 (inclusive).
 * Why is this unbiased?
 * - Math.random() returns a float in [0, 1)
 * - Multiplying by 6 gives [0, 5.9999...)
 * - Math.floor() turns that into 0, 1, 2, 3, 4, or 5 with equal 1/6 probability
 * - Adding 1 shifts the range to 1, 2, 3, 4, 5, or 6!
 */
function getRandomDieValue() {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Creates the 9 grid cells (0 to 8) inside a die element when the page loads.
 */
function buildDieGridCells(dieElement) {
  dieElement.innerHTML = ''; // Clear anything inside

  for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
    // 1. Create the cell container
    const cell = document.createElement('div');
    cell.className = 'pip-cell';

    // 2. Create the small number label (0-8) used in "Inspect 3x3 Grid" mode
    const indexLabel = document.createElement('span');
    indexLabel.className = 'cell-index-label';
    indexLabel.textContent = cellIndex;

    // 3. Create the actual dot (pip)
    const pip = document.createElement('span');
    pip.className = 'pip';

    // 4. Put the label and pip inside the cell, and put the cell in the die
    cell.appendChild(indexLabel);
    cell.appendChild(pip);
    dieElement.appendChild(cell);
  }
}

/**
 * Updates a die element to visually show a number between 1 and 6.
 */
function renderDieFace(dieElement, value) {
  // Save the current number on a data-value attribute (used by CSS to color "1" red)
  dieElement.setAttribute('data-value', value);

  // Look up which cell indices (0-8) should have visible dots for this number
  const activeIndices = PIP_PATTERNS[value];

  // Select all 9 `.pip` elements inside this specific die
  const allPips = dieElement.querySelectorAll('.pip');

  // Loop through all 9 pips and toggle the `.active` class
  allPips.forEach((pipElement, index) => {
    const shouldShowPip = activeIndices.includes(index);
    pipElement.classList.toggle('active', shouldShowPip);
  });
}

// =========================================================================
// STEP 5: OPTIONAL WEB AUDIO SOUND EFFECT (No external MP3 needed!)
// =========================================================================
let audioCtx = null;
function playDiceTickSound(pitchMultiplier = 1) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220 * pitchMultiplier, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {
    // Ignore audio errors if browser blocks autoplay
  }
}

// =========================================================================
// STEP 6: MAIN ROLL FUNCTION (Animation + Random Result + DOM Update)
// =========================================================================
function rollDice() {
  // Prevent starting a new roll if the dice are currently mid-animation
  if (isRolling) return;
  isRolling = true;
  rollBtn.disabled = true;
  rollBtnText.textContent = 'Rolling...';
  resultStatusText.textContent = 'Rolling the dice...';

  // 1. Add the `.rolling` CSS class to trigger the shake keyframe animation
  die1El.classList.remove('landed');
  die2El.classList.remove('landed');
  die1El.classList.add('rolling');
  if (numberOfDice === 2) {
    die2El.classList.add('rolling');
  }

  // 2. Rapidly cycle through random dice faces every 75 milliseconds
  const cycleInterval = setInterval(() => {
    renderDieFace(die1El, getRandomDieValue());
    if (numberOfDice === 2) {
      renderDieFace(die2El, getRandomDieValue());
    }
    playDiceTickSound(0.9 + Math.random() * 0.3);
  }, 75);

  // 3. After 550ms, stop the animation and display the TRUE final random roll
  setTimeout(() => {
    clearInterval(cycleInterval);

    // Generate the final unbiased random values (1 to 6)
    const finalDie1 = getRandomDieValue();
    const finalDie2 = numberOfDice === 2 ? getRandomDieValue() : 0;
    const total = finalDie1 + finalDie2;

    // Remove shaking class and add a subtle landing pop animation
    die1El.classList.remove('rolling');
    die2El.classList.remove('rolling');
    die1El.classList.add('landed');
    if (numberOfDice === 2) {
      die2El.classList.add('landed');
    }

    // Draw the final dice faces in the DOM
    renderDieFace(die1El, finalDie1);
    die1Caption.textContent = `Die #1: ${finalDie1}`;

    if (numberOfDice === 2) {
      renderDieFace(die2El, finalDie2);
      die2Caption.textContent = `Die #2: ${finalDie2}`;
    }

    // Play a slightly higher pitched "landed" click sound
    playDiceTickSound(1.4);

    // Update the Result & Total Banner text
    totalValueDisplay.textContent = total;
    if (numberOfDice === 1) {
      resultStatusText.textContent = `You rolled a ${finalDie1}!`;
      resultBreakdownText.textContent = `Single six-sided die result: [${finalDie1}]`;
    } else {
      const isDoubles = finalDie1 === finalDie2;
      resultStatusText.textContent = isDoubles
        ? `🎉 Doubles! You rolled ${finalDie1} and ${finalDie2}!`
        : `You rolled a total of ${total}!`;
      resultBreakdownText.textContent = `Die #1 [${finalDie1}] + Die #2 [${finalDie2}] = ${total}`;
    }

    // Save this roll to the History Log and update stats
    addRollToHistory(finalDie1, finalDie2, total, numberOfDice);

    // Re-enable the Roll button
    isRolling = false;
    rollBtn.disabled = false;
    rollBtnText.textContent = numberOfDice === 1 ? 'Roll Die Again' : 'Roll Both Dice';
  }, 550);
}

// =========================================================================
// STEP 7: ROLL HISTORY & STATISTICS DOM UPDATES
// =========================================================================
function addRollToHistory(d1, d2, total, diceCount) {
  // Create a roll record object and push it into our state array
  const rollNumber = rollHistory.length + 1;
  const timeString = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const rollRecord = {
    rollNumber,
    d1,
    d2,
    total,
    diceCount,
    timeString
  };
  rollHistory.push(rollRecord);

  // Hide the "No rolls yet" empty message
  if (emptyHistoryMessage) {
    emptyHistoryMessage.classList.add('hidden');
  }

  // Create a new <li> DOM element for this roll
  const li = document.createElement('li');
  li.className =
    'flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-sm transition hover:bg-slate-100/70';

  // Build the left & right side of the history row
  const breakdownLabel =
    diceCount === 1
      ? `<span class="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold mono text-slate-800">[${d1}]</span>`
      : `<span class="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold mono text-slate-800">[${d1}]</span>
         <span class="text-slate-400 font-bold">+</span>
         <span class="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold mono text-slate-800">[${d2}]</span>`;

  li.innerHTML = `
    <div class="flex items-center gap-2.5">
      <span class="text-xs font-bold text-slate-400 mono">#${rollNumber}</span>
      <div class="flex items-center gap-1.5">${breakdownLabel}</div>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-[11px] text-slate-400 hidden sm:inline">${timeString}</span>
      <span class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-extrabold mono text-xs">
        Total: ${total}
      </span>
    </div>
  `;

  // Prepend puts the newest roll at the very TOP of the list
  historyList.prepend(li);

  // Update the 3 summary stat boxes (Total Rolls, Highest, Average)
  updateStatistics();
}

function updateStatistics() {
  const count = rollHistory.length;
  statCount.textContent = count;

  if (count === 0) {
    statHigh.textContent = '-';
    statAvg.textContent = '-';
    return;
  }

  let sum = 0;
  let highest = 0;
  for (const item of rollHistory) {
    sum += item.total;
    if (item.total > highest) {
      highest = item.total;
    }
  }

  const average = (sum / count).toFixed(1);
  statHigh.textContent = highest;
  statAvg.textContent = average;
}

function clearHistory() {
  rollHistory = [];
  // Remove all <li> items except the emptyHistoryMessage placeholder
  historyList.innerHTML = '';
  historyList.appendChild(emptyHistoryMessage);
  emptyHistoryMessage.classList.remove('hidden');
  updateStatistics();
}

// =========================================================================
// STEP 8: MODE SWITCHING (1 Die vs. 2 Dice) & EVENT LISTENERS
// =========================================================================
function setDiceMode(count) {
  numberOfDice = count;

  if (count === 1) {
    // Style active button
    oneDieBtn.className =
      'px-4 py-1.5 rounded-lg text-sm font-semibold transition bg-white text-slate-900 shadow-sm';
    twoDiceBtn.className =
      'px-4 py-1.5 rounded-lg text-sm font-semibold transition text-slate-600 hover:text-slate-900';

    // Hide second die & plus sign
    die2Wrapper.classList.add('hidden');
    die2Wrapper.classList.remove('flex');
    plusSign.classList.add('hidden');

    // Update total display to match Die #1's current value
    const currentDie1Val = Number(die1El.getAttribute('data-value')) || 1;
    totalValueDisplay.textContent = currentDie1Val;
    resultStatusText.textContent = '1-Die Mode Active';
    resultBreakdownText.textContent = 'Rolling 1 standard six-sided die (1–6).';
  } else {
    // Style active button
    twoDiceBtn.className =
      'px-4 py-1.5 rounded-lg text-sm font-semibold transition bg-white text-slate-900 shadow-sm';
    oneDieBtn.className =
      'px-4 py-1.5 rounded-lg text-sm font-semibold transition text-slate-600 hover:text-slate-900';

    // Show second die & plus sign
    die2Wrapper.classList.remove('hidden');
    die2Wrapper.classList.add('flex');
    plusSign.classList.remove('hidden');

    // Update total display to sum both dice
    const d1Val = Number(die1El.getAttribute('data-value')) || 1;
    const d2Val = Number(die2El.getAttribute('data-value')) || 6;
    totalValueDisplay.textContent = d1Val + d2Val;
    resultStatusText.textContent = '2-Dice Mode Active';
    resultBreakdownText.textContent = `Die #1 [${d1Val}] + Die #2 [${d2Val}] = ${d1Val + d2Val}`;
  }
}

// Attach click listeners to buttons
rollBtn.addEventListener('click', rollDice);
oneDieBtn.addEventListener('click', () => setDiceMode(1));
twoDiceBtn.addEventListener('click', () => setDiceMode(2));
clearHistoryBtn.addEventListener('click', clearHistory);

// Toggle "Inspect 3x3 Grid" mode for teaching
inspectGridBtn.addEventListener('click', () => {
  inspectGridMode = !inspectGridMode;
  diceArena.classList.toggle('inspect-grid', inspectGridMode);
  inspectGridIndicator.className = inspectGridMode
    ? 'w-2 h-2 rounded-full bg-indigo-600 animate-ping'
    : 'w-2 h-2 rounded-full bg-slate-400';
});

// Toggle Sound Effects
soundToggleBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
  soundLabel.textContent = soundEnabled ? 'Sound: ON' : 'Sound: OFF';
});

// Allow pressing the Spacebar to roll the dice
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && document.activeElement.tagName !== 'BUTTON') {
    event.preventDefault();
    rollDice();
  }
});

// =========================================================================
// STEP 9: INITIALIZE THE PAGE ON LOAD
// =========================================================================
buildDieGridCells(die1El);
buildDieGridCells(die2El);
renderDieFace(die1El, 1);
renderDieFace(die2El, 6);
