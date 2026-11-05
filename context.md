# Repository context

Last updated: 2026-11-05.

Read this with `AGENTS.md` at the start of a chat. It provides background so agents can open only the files relevant to the task. Source files and the user's latest message take precedence over an outdated snapshot. This document summarizes the repo; it does not replace inspecting code before editing or reviewing it.

## People and working agreement

- **Dinesh** is a repo contributor, Vasavi's brother and the person preparing tasks, codebases and study resources. He identified himself in the conversation that created this file. Address him as Dinesh when he is speaking; do not assume every future chat has the same speaker.
- **Vasavi** is a first-semester CSE student at IIT Indore learning C/C++, introductory OOP, HTML, CSS and JavaScript. Her Dice Roll project is for the Programming Club Software Division induction, where she must explain every line.
- With Dinesh, carry out requested content-development work, including complete reference solutions when requested. With Vasavi, guide first: ask about her approach, offer hints and small traces, review attempts, and ask only 1–2 questions at a time. After enough genuine attempts, the tutoring exception allows completing an unfinished part with an explanation.
- Keep learner code simple and appropriate to her level. Do not silently solve practice exercises while improving the surrounding guides.

## Repo map and learning flow

| Path | Purpose / when to open |
| --- | --- |
| `AGENTS.md` | Teaching rules, startup workflow and detailed tutor progress notes. |
| `README.md` | Vasavi's task checklist and overview. She owns its checkmarks; some lag behind code. |
| `Design.md` | Shared visual system for guides and HTML material made for Vasavi. |
| `githubCommands.md` | Beginner Git/GitHub instructions. Encourage Vasavi to commit finished steps in her own words. |
| `CPP Coding/Practice/` | Five standalone C++ practice programs: digits, matrix traversal, palindrome, reverse, pointers/references. Problems, hints and tests are in comments. |
| `CPP Coding/OOPs/notes.md` | Classes, objects, member functions, access modifiers, constructors, beginner mistakes and a teaching plan for Dinesh. |
| `CPP Coding/OOPs/practice/` | 15 exercises in order. 01–08 fill `___` blanks; 09–15 are comment-only prompts for independent programs. Its README is the exercise index/checklist. |
| `CPP Coding/OOPs/functions_1.cpp`, `random.cpp` | Additional experiments/practice; inspect only when relevant. |
| `Development/README.md` | Development learning order and guide coverage. |
| `Development/Dice Roll/` | Induction project: `index.html`, `style.css`, `script.js`, six local SVG dice images. |
| `Development/Dice Roll/prep/` | Induction PDF, `practice.md` with ten tasks and hidden answers, `practice/` task folders, and `study_guide.html`. |
| `Development/Playground/vasavi.html` | Vasavi's own About Me experiment. |
| `Development/Web Dev Guide/html_css_guide.html` | Large interactive guide covering how the web works, HTML and CSS. Read targeted sections rather than loading the entire file for orientation. |
| `Google STEP/README.html` | Personalized visual roadmap, preparation routine, program overview, selection, intern life, timeline, resources and video watchlist. |
| `Google STEP/sprint_tracker.html` | Daily DSA problems, checkboxes, notes, filters, completion metrics and focus timer. |
| `Google STEP/README.md` | Markdown roadmap, full day-by-day syllabus and matching video resources. |

## Teaching and learner progress

The following exercise status is carried from `AGENTS.md`, **not a fresh audit of all learner files**. Before reviewing an exercise, inspect that exercise or its check panel. Commit messages and unchecked README boxes alone do not establish completion. Detailed debugging hints remain in the AGENTS progress table.

| Area | Recorded state / next step |
| --- | --- |
| `01_MiniTest.cpp` | `digitDetail` and `reversedNum` done; `sumDigits` still needs debugging. Review the loop using small hand traces. |
| `02_MatrixTraversing.cpp` | Row, column and diagonal traversal done; spiral still has layer/corner bugs and assumes a square. Vasavi developed the diagonal `i + j` idea herself. Fix the basic spiral before extending to rectangles. |
| Practice 03–05 | Recorded as done. |
| OOP exercises | 01–02 done; next is `03_access_a_member.cpp`; 03–15 recorded as not started. The OOP README checkboxes have not all caught up. |
| Dice tasks 01–03 | Done. |
| Dice task 04 | Hover step missing; a green header does not validate manual checks. |
| Dice task 05 | Animation duration still differs from the final task requirement. |
| Dice task 06 | Responsive media condition and shrinking square/image unfinished. |
| Dice task 07 | Done; discuss `textContent` versus `innerHTML`; console logging step skipped. |
| Dice task 08 | Runs but random-number approach can produce an out-of-range face at an edge case. Ask her to trace it. |
| Dice task 09 | Face changes before the timeout rather than after the shake. |
| Dice task 10 | Only step 1; history placement and `addHistory` unfinished. |

The finished Dice Roll project and the practice task folders are separate. The project's `script.js` currently supports one or two dice, uses `Math.floor(Math.random() * 6) + 1`, shakes for 500 ms before changing faces, displays the result and prepends up to ten history entries. Its roll history is held in the page and disappears on reload. Do not confuse this with task 10's unfinished attempt or the guides' saved progress.

## Development guides and checks

- Suggested Dice sequence: task folders 01–10 → interview study guide → rebuild from three empty files using the final challenge in `prep/practice.md`.
- Each practice task starts from an independent baseline. Shared `prep/practice/check.js` renders the check panel; preserve its script tag, `data-task` and the specified IDs/classes. Tasks 01–06 check on load; 07–10 include a **Run all checks** button. `?` means a manual check. Task 06 needs a viewport at or below 500 px and then a wider viewport.
- When tutoring, point to the check panel's hint first. Never paste the hidden `<details>` answers from `practice.md` into Vasavi's attempt.
- `prep/study_guide.html` provides line-by-line explanations, a roll-click trace, randomness demo, question bank, mock interview, live-change prompts, Git/hosting revision and glossary. It was the source of the shared visual style.
- Web Dev Guide Parts **1–3 are ready**: Part 1 covers browser/server, URL, DNS, HTTP/HTTPS and rendering; Part 2 covers HTML with 8 challenges; Part 3 covers CSS from selectors/cascade/box model through layout, motion, responsiveness and debugging, with 13 challenges. Part 4 (cheat sheets, glossary, collected interview lines) is announced but not implemented.
- The Web Dev Guide has live HTML/CSS editors, iframe previews, automatic challenge ticks and **Show a hint** buttons. Use its own hint first when Vasavi is stuck. An earlier change fixed Live Server behavior and paths after a rename; preserve the existing iframe sandbox/preview behavior when extending it.

## Google STEP plan and recent work

- Dinesh's goal is a friendly high-level introduction plus a preparation plan and checklist for his sister. The HTML story runs from her current semester → winter sprint → continued DSA → application/selection → intern life. Keep the personal, concrete tone.
- The sprint is **24 days**, around **3–4 hours/day**, based on Striver's A2Z sheet: arrays (days 1–7, 26 problems), strings (8–12, 15), linked lists (13–18, 22), stacks/queues (19–23, 18), then review/mock interview (24, 5 milestones). That is **81 problems + 5 review milestones = 86 checkboxes**. Some static tracker labels still contain older totals such as 70; JavaScript calculates live metrics from checkboxes. Do not propagate old placeholder totals.
- Routine: hand trace → C++ implementation/testing → complexity and notes → explain aloud to Dinesh. The guide suggests asking for a hint after 45 minutes stuck.
- Existing eligibility, recruiting steps, locations, perks and the August/September 2027 application / summer 2028 target are guide planning content, **not freshly verified official promises**. Recheck current Google sources when asked to update those facts. Dinesh wants Bangalore office life emphasized; do not turn that preference into a guaranteed placement.
- On 2026-11-05, Dinesh supplied the STEP video below, approved the shortlist and asked for an additional Bangalore day-in-the-life video. All six were added to `README.html` under **`#videos`**, linked by **Watch** in the sticky navigation, and mirrored in `README.md`.

| Order | Video | Role in the watchlist |
| --- | --- | --- |
| 1 | [How to land a Google internship](https://www.youtube.com/watch?v=KPD8C7c6P1w) — Google Students, Feb 2025 | Official general internship introduction. |
| 2 | [What It Really Takes to Get a Google STEP Internship](https://www.youtube.com/watch?v=SMXm4Gz1d6s) — Dinesh's pick | STEP intern conversation with Bangalore context. |
| 3 | [Google STEP Internship Interview Experience](https://www.youtube.com/watch?v=Nws5vjdbZB4) — Gantavya Malviya / Jahnavi Malhotra, Dec 2022 | Projects, resume, technical rounds, DSA resources and intern experience. |
| 4 | [Google STEP Internship 2025: Interview Experience](https://www.youtube.com/watch?v=jNOlObsg2d4) — TechWithUpasana, Sep 2025 | Another student's preparation/interview perspective. |
| 5 | [Day in the Life of a Software Engineer at Google](https://www.youtube.com/watch?v=eDKlshg-RoU) — Nandika Jain, Jan 2025 | **Bangalore software engineer**, explicitly labelled as such. |
| 6 | [Day In My Life as a Software Engineering Intern at Google](https://www.youtube.com/watch?v=BYBm7jBw4mk) — Johnathan Mo, Aug 2025 | **Sunnyvale SWE intern**, after Bangalore. |

- Cards have numbers, topic/location tags, publication metadata where verified, a short **Why watch**, chapter links and a YouTube button. Four preparation videos precede two office-life videos. A lavender callout asks Vasavi to tell her brother one takeaway and one habit to try.
- Video selection used indexed titles, descriptions and chapters, not full playback assessment. The guide distinguishes personal experiences and publication dates from official current program details.
- Verification of this addition: 13 browser/link checks passed, including video order, Markdown parity, navigation IDs, new-tab attributes, existing summary initialization and layouts at 1440, 390 and 320 px in light/dark mode. Desktop and phone screenshots were visually reviewed; `git diff --check` passed. QA artifacts are temporary, not a repo test suite.

## Design and technical conventions

- This is a set of standalone C++ programs and static HTML/CSS/JS learning pages, not a single framework app. There is no repo-wide package install/build step. Compile only the chosen C++ exercise; unfinished OOP blanks are expected not to compile.
- C++: use the configured VS Code runner, or `g++ "path/to/file.cpp" -o build/exercise.exe` after creating `build/`, then run it and compare the file's tests. `build/`, `bin/`, executables and objects are gitignored.
- Web: open the relevant HTML in Chrome and reload after saving; F12 shows errors. Live Server is also supported by the Web Dev Guide. Preserve relative paths, including spaces in folder names.
- Guides made for Vasavi use `Design.md`: warm cream `#FFFFEB`, teal `#034F46`, lavender `#F0D7FF`, ember `#FFA946`; Bricolage Grotesque headings, Atkinson Hyperlegible body, JetBrains Mono code; 14 px cards, pill buttons, light/dark themes, visible focus and reduced-motion support.
- Apply this styling to learning material, **not** Vasavi's own Dice Roll CSS or task attempts. Keep her code in its plain style without frameworks or CDNs. Guide pages themselves use Google Fonts; the sprint tracker also references KaTeX for math rendering.
- Browser progress is local to the browser/profile/origin; it is not committed to Git. Switching from a file URL to Live Server may show different progress. Ask Vasavi for her current day or editor code when it is not visible in repo files.
- Storage used by existing pages: Web Dev Guide `wg-*` (including `wg-ed-*` editors, `wg-ch` challenge ticks and `wg-done` section ticks); Dice interview guide `dice-roll-prep-v1`; sprint `v_sprint_q_<day>_<question>` and daily notes `v_notes_*`. The STEP roadmap reads the same sprint checkbox keys. Preserve these keys and checkbox IDs to retain saved progress.

## Keeping this useful

- Read only relevant source sections using targeted searches. Reuse this overview and already-loaded instructions instead of re-reading unrelated guides.
- Update this file after meaningful features, confirmed learner progress or changed decisions; update matching AGENTS progress notes when needed. Keep planned work separate from completed work. Part 4 of the Web Dev Guide remains a future option, not an active assignment.
- Check live Git status for uncommitted changes; this summary is not a permanent claim about what has been committed or pushed. Preserve changes from earlier tasks. Do not tick Vasavi's README checklist on her behalf.
- Keep this as a compact current-state summary. Do not paste entire source files, transcripts, test logs, credentials or machine-specific temporary QA paths here.
