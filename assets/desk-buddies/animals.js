/* Small articulated sprites. Coordinates are shared by the portraits and the live habitat.
   Each drawing faces the viewer and rests at (56, 94) in its own coordinate space. */
window.DeskBuddies = (() => {
  "use strict";
  const TAU = Math.PI * 2;
  const ink = "#43343b", cream = "#fff1ce", blush = "#ec9b91";
  const paths = new Map();

  function path(c, outline, colour, edge, width = 1.65) {
    if (!paths.has(outline)) paths.set(outline, new Path2D(outline));
    const p = paths.get(outline);
    c.fillStyle = colour;
    c.fill(p);
    if (edge) {
      c.strokeStyle = edge; c.lineWidth = width; c.stroke(p);
    }
  }
  function oval(c, x, y, rx, ry, colour, edge) {
    c.beginPath();
    c.ellipse(x, y, rx, ry, 0, 0, TAU);
    c.fillStyle = colour; c.fill();
    if (edge) { c.strokeStyle = edge; c.lineWidth = 1.65; c.stroke(); }
  }
  function line(c, outline, colour, width = 1.7) {
    if (!paths.has(outline)) paths.set(outline, new Path2D(outline));
    c.strokeStyle = colour; c.lineWidth = width; c.stroke(paths.get(outline));
  }
  // Rotate and stretch an individual joint around its hinge.
  function joint(c, x, y, angle, draw, sx = 1, sy = 1) {
    c.save(); c.translate(x, y); c.rotate(angle); c.scale(sx, sy);
    c.translate(-x, -y); draw(); c.restore();
  }
  function mirror(c, pivot, direction, draw) {
    joint(c, pivot, 0, 0, draw, direction, 1);
  }
  function eye(c, x, y, s, size = 1) {
    c.save(); c.translate(x, y); c.scale(size, size);
    if (s.closed || s.joy > .55) {
      line(c, "M-3 0 Q0 -3.8 3 0", ink, 1.8);
    } else {
      oval(c, 0, 0, 3.35, 4.05, ink);
      oval(c, .2 + s.look, 1.5, 1.9, 1.35, "#89634d");
      oval(c, -.9 + s.look, -1.3, 1.15, 1.2, "#fffbe4");
    }
    c.restore();
  }
  function paws(c, x, y, colour, pad) {
    oval(c, x, y, 6, 3.8, colour, ink);
    oval(c, x - 1.7, y - .6, 2.1, 1.05, pad);
  }
  function leaf(c, x, y, angle, colour) {
    c.save(); c.translate(x, y); c.rotate(angle);
    path(c, "M0 0 Q-5 -6 -1 -12 Q6 -7 0 0Z", colour, "#436442", 1);
    line(c, "M0 -1 -1 -8", "#b1d484", .9); c.restore();
  }
  const pulse = (p, start, end) => Math.sin(Math.PI * Math.min(1, Math.max(0, (p - start) / (end - start))));
  function ease(p, start, end) {
    const u = Math.min(1, Math.max(0, (p - start) / (end - start)));
    return u * u * (3 - 2 * u);
  }

  function maple(c, s) {
    const rust = "#d96d39", gold = "#ef9851", dark = "#684339", ear = "#efc9ac";
    const curl = pulse(s.trick, .10, .85);
    joint(c, 66, 76, -.10 + .14 * s.wave - .5 * curl, () => {
      const tail = "M64 73 Q75 81 82 71 Q86 64 83 56 Q80 47 86 38 Q91 32 95 31 Q93 36 97 40 Q104 51 103 64 Q101 85 87 89 Q72 95 62 83Z";
      path(c, tail, gold, ink, 2);
      c.save(); c.clip(paths.get(tail));
      path(c, "M68 73 77 74 79 93 68 91ZM83 66 101 72 96 82 80 73ZM82 51 103 53 104 62 82 60ZM86 35 98 36 100 44 83 43Z", "#aa5036");
      path(c, "M93 31 99 31 98 40 89 38Z", cream);
      line(c, "M98 45 Q103 66 91 78", "#f7bb6b", 2.3); c.restore();
    });
    path(c, "M38 61 Q52 53 65 62 Q77 72 73 85 Q68 94 53 92 Q35 92 32 83 Q29 72 38 61Z", dark, ink, 2);
    oval(c, 53, 77, 14, 13, "#a25b3f"); oval(c, 52, 74, 9, 9, "#d7834d");
    paws(c, 40, 90, dark, "#9b715a"); paws(c, 65, 90, dark, "#9b715a");
    joint(c, 52, 63, s.wave * .035 + s.lean * .09 + .18 * curl - .12 * s.fidget, () => {
      for (const dir of [1, -1]) mirror(c, 52, dir, () => {
        joint(c, 36, 36, s.twitch * .22, () => {
          path(c, "M27 39 Q18 23 23 15 Q33 14 44 29Z", cream, ink, 2);
          path(c, "M28 34 Q23 25 25 20 Q32 20 37 29Z", dark);
          path(c, "M29 31 27 24 34 28Z", ear);
        });
      });
      path(c, "M25 43 Q27 31 38 28 L45 27 43 24 52 26 58 23 58 26 Q74 26 80 41 L82 46 86 49 81 50 85 54 78 55 80 58 Q71 69 52 68 Q34 69 24 60 L19 58 23 54 18 52 23 48Z", rust, ink, 2.1);
      path(c, "M27 41 Q34 29 44 30 Q52 27 65 29 Q76 33 78 41 Q67 32 58 36 L52 40 46 36 Q39 33 27 41Z", gold);
      for (const dir of [1, -1]) mirror(c, 52, dir, () => {
        path(c, "M22 54 Q30 53 34 46 Q38 41 42 44 Q37 49 41 54 Q43 59 50 59 L51 66 Q35 68 24 59 L27 58Z", cream);
        path(c, "M32 43 Q33 37 39 36 Q43 36 44 39 Q38 39 33 44Z", cream);
        oval(c, 32, 55, 3.6, 1.7, blush);
      });
      oval(c, 52, 59, 11.5, 7, cream);
      eye(c, 39, 48.5, s); eye(c, 65, 48.5, s);
      path(c, "M48 55 Q52 53 56 55 Q56 58 52 59 Q49 58 48 55Z", ink);
      line(c, "M52 59 Q51 63 47.5 61 M52 59 Q53 63 56.5 61", ink, 1.35);
    });
    path(c, "M35 63 Q50 70 69 63 L67 68 58 70 54 78 47 70 37 68Z", "#6aa994", "#4d6351", 1.35);
    path(c, "M37 64 Q51 69 64 65 L60 68 Q48 70 38 66Z", "#a3d5b3");
    c.save(); c.translate(-2 * s.fidget, -14 * s.fidget);
    joint(c, 37, 72, s.joy * .9 - .3 * s.chew, () => paws(c, 36, 77, dark, "#af7961"));
    c.restore();
    joint(c, 66, 72, -.4 * s.chew, () => paws(c, 66, 77, dark, "#af7961"));
  }

  function boba(c, s) {
    const edge = "#623c59", pink = "#f5a7bd", pale = "#ffd6d5", rose = "#d75e90";
    const flip = pulse(s.trick, .13, .84);
    joint(c, 63, 74, .17 * s.wave - .48 * flip, () => {
      path(c, "M57 77 Q70 73 75 62 Q78 49 92 48 Q104 44 102 36 Q113 53 102 63 Q96 68 85 67 Q81 86 62 84Z", "#eba1c3", edge, 1.8);
      path(c, "M70 78 Q81 68 82 61 Q84 54 95 52 Q100 51 103 47 Q104 57 93 59 Q85 60 83 67 Q79 78 71 80Z", "#b87eae");
    });
    oval(c, 53, 76, 18, 13, pink, edge); oval(c, 52, 78, 12, 9, pale);
    paws(c, 38, 86, pink, pale); paws(c, 64, 87, pink, pale);
    joint(c, 51, 64, .05 * s.wave + .07 * s.lean, () => {
      for (const dir of [1, -1]) mirror(c, 51, dir, () => {
        joint(c, 30, 52, .10 * s.wave - .33 * flip - .12 * s.chew + .18 * s.fidget, () => {
          path(c, "M33 54 Q19 50 16 42 Q10 42 8 37 L14 38 Q8 31 10 25 Q15 27 17 32 L16 24 Q22 27 22 36 L26 32 Q27 39 25 42 L33 48Z", rose, edge, 1.6);
          path(c, "M31 57 Q22 58 15 54 Q10 57 5 53 L10 50 Q5 49 3 44 Q7 42 14 46 L13 41 Q21 43 24 49 L32 51Z", "#e778a2", edge, 1.5);
          path(c, "M32 60 Q25 67 19 67 Q16 72 11 71 L13 66 Q8 67 6 63 Q10 59 16 59 L14 56 Q21 56 25 58Z", rose, edge, 1.5);
          line(c, "M29 48 Q18 40 13 30M26 52 10 47M27 60 13 64", "#ffaabd", 1.5);
        });
      });
      path(c, "M23 49 Q26 33 42 32 L47 33 Q51 27 56 29 L54 32 Q72 31 79 44 Q87 57 78 64 Q69 74 50 72 Q30 73 23 64 Q17 58 23 49Z", pink, edge, 2);
      path(c, "M24 56 Q32 63 40 59 Q50 55 60 60 Q72 64 79 54 Q81 66 65 69 Q42 75 28 65Z", pale);
      path(c, "M30 42 Q36 35 46 36 L48 38 Q38 37 32 43Z", "#ffe5df");
      oval(c, 30, 55, 5.6, 2.6, "#ed87a1"); oval(c, 72, 55, 5.6, 2.6, "#ed87a1");
      eye(c, 36, 51, s, .93); eye(c, 65, 51, s, .93);
      line(c, "M46 55 Q50 61 56 55", edge, 1.7);
      oval(c, 47, 44, 1.1, 1, cream); oval(c, 51, 42, 1.2, 1, cream); oval(c, 56, 44, 1, .9, cream);
    });
    joint(c, 37, 71, .7 * s.joy, () => oval(c, 36, 75, 4.4, 3.3, pale, edge));
    oval(c, 67, 75 - 2 * s.chew, 4.4, 3.3, pale, edge);
    if (s.idlePhase > 0 && s.idlePhase < .9) {
      const u = s.idlePhase;
      c.save(); c.globalAlpha = Math.sin(u / .9 * Math.PI);
      const bx = 49 - 18 * u, by = 54 - 30 * u, r = 1.7 + 2 * u;
      oval(c, bx, by, r, r, "#b6edf1bb", "#779ba7");
      oval(c, bx - .7, by - .8, .8, .8, "#fffbe6"); c.restore();
    }
  }

  function lumen(c, s) {
    const edge = "#52506c", fluff = "#ffedca";
    const flap = .76 + .21 * Math.sin(s.t * (s.studying ? 1.2 : 4.5)) + .08 * s.joy + .12 * s.fidget;
    for (const dir of [1, -1]) mirror(c, 55, dir, () => {
      joint(c, 54, 56, -.035 * s.wave, () => {
        path(c, "M54 53 Q41 52 26 59 Q23 73 35 79 Q38 82 33 91 Q44 87 46 78 Q53 69 54 60Z", "#91b9ad", edge, 1.8);
        path(c, "M29 64 Q36 66 47 59 Q42 67 39 76 L35 74Z", "#c0e0b8");
        path(c, "M54 51 Q45 32 29 24 Q17 15 6 15 Q6 31 11 47 Q17 62 26 64 Q40 66 53 58Z", "#bad5b5", edge, 1.9);
        path(c, "M6 16 Q18 17 28 25 Q42 33 49 44 Q37 35 27 32 Q17 26 8 28Z", "#777393");
        path(c, "M10 35 Q18 49 29 56 Q38 60 47 57 Q35 65 25 62 Q14 57 10 35Z", "#89afa1");
        line(c, "M10 22 Q24 35 47 48 M11 31 Q18 35 24 35 M27 38 Q28 47 35 52", "#94ab99", 1.15);
        oval(c, 26, 44, 7, 8, "#82768e"); oval(c, 26, 43.5, 5.2, 5.9, "#e9c195");
        oval(c, 26, 43, 3.4, 4, "#89788d"); oval(c, 25, 41.6, 1.6, 1.5, "#fff1c9");
        oval(c, 18, 29, 1.5, 1.5, cream); oval(c, 35, 38, 1, 1, cream);
      }, flap, 1);
    });
    oval(c, 55, 65, 9, 13, "#a08ea5", edge); line(c, "M49 67 Q55 71 62 67 M51 73 Q55 75 60 72", "#d6bcc0");
    for (const dir of [1, -1]) mirror(c, 55, dir, () => {
      joint(c, 49, 39, .07 * s.wave - .1 * s.joy, () => {
        path(c, "M49 40 Q43 34 40 24 L37 23 39 21 35 19 38 18 36 13 Q43 14 44 18 L45 16 47 22 46 25 48 25 48 32 52 38Z", "#eac1ae", edge, 1.4);
        line(c, "M40 18 Q43 31 49 37", "#97768a", 1.2);
      });
    });
    path(c, "M40 53 Q38 43 45 38 Q50 34 57 36 L62 34 62 37 Q74 40 71 52 L74 55 69 56 70 60 64 60 62 64 56 62 52 65 48 61 42 62 42 58 37 57Z", fluff, edge, 1.9);
    path(c, "M44 56 Q49 57 51 59 L55 58 58 60 64 56 68 56 64 60 61 62 56 60 52 62 48 59 44 60Z", "#dbbdaf");
    eye(c, 48, 48, s, .8); eye(c, 63, 48, s, .8);
    oval(c, 43.5, 52, 2.4, 1.2, blush); oval(c, 67, 52, 2.4, 1.2, blush);
    line(c, "M53 52 Q55 54.5 58 52", edge, 1.2);
    line(c, "M49 63 Q45 65 44 62 M61 63 Q65 65 66 61", edge, 1.6);
  }

  function pip(c, s) {
    const navy = "#374963", edge = "#30394c", gold = "#edac59";
    const skate = pulse(s.trick, .14, .84);
    for (const dir of [1, -1]) mirror(c, 55, dir, () => {
      joint(c, 46, 87, -.24 * s.wave - .8 * skate + dir * .55 * s.fidget, () => {
        path(c, "M42 84 Q49 83 50 89 Q46 93 34 91 Q32 89 36 87 L35 86Z", gold, edge, 1.6);
      });
    });
    path(c, "M32 52 Q32 32 46 28 L50 26 47 22 Q55 23 57 27 L61 23 61 28 Q78 30 79 51 Q84 66 79 78 Q74 90 55 89 Q34 90 30 77 Q26 64 32 52Z", navy, edge, 2.1);
    path(c, "M34 46 Q38 31 50 30 Q62 27 70 36 Q59 31 55 35 Q46 32 34 46Z", "#566a83");
    path(c, "M35 54 Q35 42 43 41 Q50 39 55 48 Q61 38 68 41 Q76 42 76 54 Q74 62 68 64 Q80 76 71 83 Q62 89 48 86 Q33 85 35 74 Q35 68 42 63 Q35 62 35 54Z", "#fff0d0");
    path(c, "M37 75 Q43 88 65 82 Q73 80 75 74 Q76 87 56 87 Q39 86 37 81Z", "#ded8bc");
    for (const dir of [1, -1]) mirror(c, 55, dir, () => {
      joint(c, 33, 62, .08 * s.wave + 1.05 * skate + (dir === 1 ? s.joy * .9 : .2 * s.chew + s.fidget), () => {
        path(c, "M33 60 Q27 60 24 69 Q20 78 22 80 Q28 82 36 68Z", navy, edge);
        line(c, "M25 74 29 66", "#63758a", 1.6);
      });
    });
    eye(c, 44, 51, s, .94); eye(c, 66, 51, s, .94);
    oval(c, 38, 56, 3.2, 1.5, blush); oval(c, 72, 56, 3.2, 1.5, blush);
    path(c, "M50 54 Q55 50 60 54 Q58 59 55 59 Q52 59 50 54Z", gold, "#77514c", 1.1);
    path(c, "M34 61 Q54 69 76 61 L75 67 Q53 74 34 67Z", "#da7455", "#784849", 1.4);
    joint(c, 66, 67, -.1 * s.wave - .75 * skate, () => {
      path(c, "M63 66 70 64 Q73 70 80 73 L76 80 Q66 77 63 66Z", "#e89062", "#784849", 1.3);
      line(c, "M70 74 75 69 M73 77 78 72", "#f5c183", 1.3);
    });
  }

  // A belly slide needs a side silhouette, with the head up and the feet trailing.
  function slidingPip(c, t) {
    const edge = "#30394c", navy = "#374963";
    joint(c, 40, 79, .14 * Math.sin(t * 17), () => {
      path(c, "M42 79 Q34 75 29 71 L22 69 24 75 20 75 Q22 82 38 84Z", "#edac59", edge);
      path(c, "M39 82 28 82 22 79 18 80 19 83 16 83 Q21 88 36 87Z", "#edac59", edge);
    });
    path(c, "M32 78 Q42 61 59 63 Q69 65 72 74 L68 84 Q48 92 33 86 L29 85Z", navy, edge, 1.9);
    path(c, "M30 85 Q50 86 70 75 L70 82 Q54 90 36 87Z", cream);
    path(c, "M59 71 Q53 60 62 52 Q67 46 75 48 L74 44 80 49 Q91 51 92 64 Q94 78 81 81 Q66 84 59 71Z", navy, edge, 1.9);
    path(c, "M65 64 Q65 57 72 57 Q77 58 79 63 Q84 53 89 59 Q97 71 85 77 Q74 84 65 71Z", cream);
    eye(c, 75, 65, { joy: .64 }); eye(c, 87, 64, { joy: .64 }, .72);
    path(c, "M83 68 Q91 64 98 68 Q93 73 85 73Z", "#f7b560", edge, 1.15);
    oval(c, 70, 70, 3, 1.4, blush);
    path(c, "M59 68 Q62 76 72 79 L69 83 Q58 79 55 72Z", "#e5825b", "#784849", 1.4);
    joint(c, 58, 71, .09 * Math.sin(t * 16), () => {
      path(c, "M58 69 Q46 65 34 67 L33 61 Q45 60 59 67Z", "#e89062", "#784849", 1.4);
      line(c, "M36 61 37 66 M40 61 41 66", "#f5c183", 1.2);
    });
    path(c, "M57 75 Q52 79 41 77 Q40 73 53 71Z", navy, edge, 1.4);
    line(c, "M43 75 50 73", "#63758a", 1.3);
  }

  function flower(c, x, y, size, colour) {
    for (let i = 0; i < 5; i++) {
      const a = i * TAU / 5;
      oval(c, x + Math.cos(a) * size, y + Math.sin(a) * size, size * .86, size * .89, colour);
    }
    oval(c, x, y, size * .78, size * .78, "#ffc862");
  }
  function moss(c, s) {
    const edge = "#445642", green = "#a8be79", shell = "#587b58";
    const tuck = pulse(s.trick, .04, .45), bloom = ease(s.trick, .32, .58) - ease(s.trick, .83, 1);
    path(c, "M78 76 Q88 74 95 68 Q95 78 83 81Z", green, edge);
    path(c, "M37 77 49 80 46 87 38 87ZM72 77 85 75 84 84 77 85Z", "#8ba06e", edge);
    paws(c, 77, 86 - tuck * 5, "#829665", "#becc91"); paws(c, 53, 88 - tuck * 5, green, "#cfda9e");
    path(c, "M32 75 Q32 54 45 45 Q57 36 71 42 Q86 46 88 73 L91 77 Q87 84 63 85 Q40 84 31 79Z", shell, edge, 2);
    path(c, "M36 65 43 52 51 50 54 60 48 68 38 71ZM54 47 63 43 72 47 71 54 59 58ZM59 62 71 58 80 64 77 73 63 74 56 69ZM75 49 81 54 85 63 79 60 74 55Z", "#89a76d");
    path(c, "M36 73 Q63 82 88 72 L90 77 Q64 88 32 78Z", "#dbbd7e", edge, 1.3);
    line(c, "M54 79 54 82 M65 79 65 83 M78 78 78 81", "#9d8b62", 1.2);
    joint(c, 61, 45, s.wave * .05, () => {
      leaf(c, 59, 45, -.76, "#7fa95f"); leaf(c, 61, 44, .38, "#a7c578");
      path(c, "M68 45 68 38 71 37 73 44Z", cream, edge, 1);
      path(c, "M63 38 Q63 32 69 31 Q75 31 77 36 Q73 40 63 38Z", "#d58260", edge, 1.2);
      oval(c, 67.5, 35.5, 1.35, 1, cream); oval(c, 72, 34.5, .9, .8, cream);
      if (bloom > 0) {
        joint(c, 58, 44, 0, () => {
          line(c, "M58 45 Q55 38 53 33 M61 44 Q63 30 60 24 M65 44 Q70 35 76 32", edge);
          flower(c, 52, 32, 3, "#ffd9ba"); flower(c, 60, 24, 3.2, "#eec6ed"); flower(c, 76, 32, 2.7, cream);
        }, 1, bloom);
      }
    });
    c.save(); c.translate(11 * tuck, 4 * tuck);
    joint(c, 48, 75, s.wave * .045 + s.lean * .08 + s.chew * .07 + s.fidget * .18, () => {
      path(c, "M20 62 Q22 50 34 50 L39 51 42 48 43 51 Q54 51 56 62 Q57 68 51 73 Q49 77 53 79 Q44 84 35 80 Q28 80 21 76 Q13 71 17 65Z", green, edge, 1.9);
      path(c, "M18 69 Q23 73 32 71 Q43 68 49 73 L49 78 Q37 83 22 75Z", "#d7d7a0");
      oval(c, 26, 56, 2.1, 1.2, "#d8df99"); oval(c, 31, 54.2, 1.2, 1, "#d8df99");
      eye(c, 25, 63.4, s, .73); eye(c, 42, 63.5, s, .91);
      oval(c, 46, 68, 3.1, 1.5, blush);
      line(c, "M26 68 Q30 72 34 68", edge, 1.5);
    }); c.restore();
    paws(c, 42, 88 - tuck * 5, green, "#d2dca4"); paws(c, 82, 85 - tuck * 5, "#829665", "#c9d399");
  }

  const animals = [
    { id: "maple", name: "Maple", species: "Red panda", tint: "#f6dfbd", draw: maple,
      bio: "Maple curls a striped tail around your notebook. Finish a tricky trace and this little show-off rolls a victory lap.",
      trick: "Ringtail tumble", snack: "Bamboo shoot", hello: "A nose boop for you!", play: "One victory roll, coming up!", fed: "Crunch, crunch. Thank you!" },
    { id: "boba", name: "Boba", species: "Axolotl", tint: "#f6d9df", draw: boba,
      bio: "Boba drifts up from the pond whenever you open your notebook. A happy wiggle sends a whole string of bubbles to the surface.",
      trick: "Bubble loop", snack: "Tiny shrimp", hello: "Blub! I saved you a spot.", play: "Round and round we go!", fed: "One shrimp, one happy wiggle." },
    { id: "lumen", name: "Lumen", species: "Luna moth", tint: "#e5def1", draw: lumen,
      bio: "Lumen likes the warm glow of a desk lamp. Those moon-marked wings draw tiny loops of light above your evening practice.",
      trick: "Firefly figure eight", snack: "Dewdrop nectar", hello: "Your desk light is my favourite.", play: "Follow the little lights!", fed: "A drop of sweetness." },
    { id: "pip", name: "Pip", species: "Penguin", tint: "#d5e7ed", draw: pip,
      bio: "Pip plants two determined feet beside your keyboard. One wobble, a running start, and this scarf goes flying across the ice.",
      trick: "Belly slide", snack: "Silver sprat", hello: "Flipper five?", play: "Watch my landing!", fed: "Best catch of the day!" },
    { id: "moss", name: "Moss", species: "Garden tortoise", tint: "#e2e8c9", draw: moss,
      bio: "Moss brings a little garden to every study session. Sit quietly for a moment and you might catch a flower opening on that shell.",
      trick: "Pocket garden", snack: "Wild strawberry", hello: "We can take our time.", play: "Look what grew today.", fed: "That was worth the walk." }
  ];

  // The same clock drives the body, its shadow, and its trail so a pause freezes the whole pose.
  function motion(id, p, t, studying) {
    const lift = pulse(p, .15, .82), prep = pulse(p, 0, .17), land = pulse(p, .80, 1);
    const pose = { x: 0, y: 0, angle: 0, sx: 1, sy: 1 };
    switch (id) {
      case "maple":
        pose.y = -23 * lift; pose.x = 15 * Math.sin(TAU * p) * lift;
        pose.angle = TAU * ease(p, .2, .77) - .18 * prep; break;
      case "boba":
        pose.x = 23 * Math.sin(TAU * p) * lift; pose.y = -25 * lift;
        pose.angle = -.37 * Math.sin(TAU * p); pose.sx = 1 - .22 * lift; break;
      case "lumen": {
        const flight = ease(p, .04, .95);
        pose.x = 35 * Math.sin(TAU * flight); pose.y = -7 - 2 * Math.sin(t * 2) - 13 * Math.sin(2 * TAU * flight);
        pose.angle = .30 * Math.sin(TAU * flight); break;
      }
      case "pip":
        pose.x = -13 * prep + 39 * (ease(p, .14, .64) - ease(p, .78, .99));
        pose.y = -9 * pulse(p, .11, .34) + 6 * lift - 4 * (pulse(p, .76, .88) + pulse(p, .88, 1));
        pose.angle = .98 * (ease(p, .13, .3) - ease(p, .66, .83)); break;
      case "moss":
        pose.y = 2 * prep - 2 * pulse(p, .42, .93); break;
    }
    pose.sy *= 1 - .12 * prep - .09 * land;
    pose.sx *= 1 + .09 * prep + .08 * land;
    if (studying && id === "lumen") pose.y = 2;
    return pose;
  }
  function drawBook(c, t) {
    path(c, "M32 78 Q43 74 55 81 Q66 74 79 78 L76 91 Q65 88 55 93 Q43 88 32 90Z", "#6d7394", ink, 1.5);
    path(c, "M32 76 Q45 73 55 79 Q66 73 78 76 L75 87 Q65 85 55 90 Q44 85 33 87Z", "#fff0cd", ink, 1.2);
    line(c, "M55 80v9 M37 79q7-1 12 2m-11 1q6 0 10 2m14-4q5-2 10-2m-11 5q5-2 10-2", "#b59f83", 1);
    const turn = Math.max(0, Math.min(1, ((t % 6) - 4.5) / 1.25));
    if (turn > 0 && turn < 1) {
      const x = 55 + 20 * Math.cos(turn * Math.PI), y = 77 - 5 * Math.sin(turn * Math.PI);
      c.beginPath(); c.moveTo(55, 89); c.quadraticCurveTo(57, 81, x, y); c.lineTo(x - 1, y + 9);
      c.quadraticCurveTo(57, 86, 55, 89); c.fillStyle = "#f2e1bb"; c.fill();
      c.strokeStyle = "#b39b76"; c.lineWidth = 1; c.stroke();
    }
  }
  function drawSnack(c, id) {
    if (id === "maple") {
      path(c, "M-6 5 -4 -2 3 -10 5 -1 5 6 0 9Z", "#94b96b", ink, 1.4);
      line(c, "M-4 -1 3 4 -4 4 M0 -5 4 -2", "#587758", 1.5);
    } else if (id === "boba") {
      path(c, "M-8 -3 Q-3 -9 4 -5 Q10 -1 6 5 Q3 9 -3 6 Q2 6 2 2 Q1 -2 -3 0 L-6 3Z", "#ef9870", ink, 1.4);
      line(c, "M0 -5 0 -2 M4 -4 3 -1 M6 0 4 1", cream, 1);
    } else if (id === "lumen") {
      flower(c, 0, 1, 4, "#f7b1bb"); oval(c, 1, -2, 2, 2.7, "#b4ece2", "#678e82");
    } else if (id === "pip") {
      path(c, "M-9 0 Q-4 -6 3 -3 L8 -6 7 4 3 2 Q-4 7 -9 0Z", "#a7d4de", ink, 1.3);
      oval(c, -5, -1, 1, 1, ink);
    } else {
      path(c, "M-6 -3 Q0 -7 5 -4 Q10 0 1 8 Q-7 5 -6 -3Z", "#df6661", ink, 1.3);
      path(c, "M-4 -5 0 -4 2 -8 3 -5 7 -5 4 -2Z", "#8ba36c", "#55634d", .9);
      oval(c, -2, 0, 1, .8, cream); oval(c, 2, 2, 1, .8, cream);
    }
  }
  function draw(c, animal, options = {}) {
    const { t = 0, trick = 0, hello = 0, snack = 0, look = 0, studying = false, still = false } = options;
    const wave = still ? 0 : Math.sin(t * (studying ? 1.25 : 2.3));
    const joy = pulse(hello, .02, .96), chew = pulse(snack, .43, .96) * (.5 - .5 * Math.cos(snack * TAU * 5));
    const idlePhase = studying || still || trick || hello || snack ? 0 : Math.max(0, (t % 9.7 - 7.4) / 2.1);
    const s = { t, trick, studying, wave, joy, chew, idlePhase, fidget: pulse(idlePhase, 0, 1),
      lean: look, look: look * .7, closed: !still && (t % 4.7 > 4.53 || (studying && t % 6 > 4)),
      twitch: Math.pow(Math.max(0, Math.sin(t * 1.5)), 20) };
    const m = motion(animal.id, trick, still ? 0 : t, studying);
    c.save(); c.lineCap = "round"; c.lineJoin = "round";
    oval(c, 55 + m.x, 93, Math.max(10, 25 + m.y * .32), 3.4, "#263e384d");
    c.translate(m.x, m.y - joy * 3);
    const slide = animal.id === "pip" ? ease(trick, .2, .3) - ease(trick, .65, .76) : 0;
    c.save(); c.globalAlpha *= 1 - slide;
    if (slide < 1) joint(c, 55, 67, m.angle + joy * -.08, () => {
      joint(c, 55, 93, 0, () => {
        animal.draw(c, s);
        if (studying) drawBook(c, t);
      }, m.sx - wave * .008, m.sy + wave * .014 + chew * .035);
    });
    c.restore();
    if (slide > 0) {
      c.globalAlpha *= slide;
      slidingPip(c, t);
    }
    c.restore();
  }
  return { animals, draw, drawSnack, leaf, motion, pulse };
})();
