/* Run with node scripts/check_sprint_learning.cjs. No packages required.
   Checks lesson coverage and compares worked answers with independent brute-force
   calculations, especially where similar problem names have different meanings. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
require(path.join(root, 'Google STEP/sprint-learning-data.js'));
const lessons = globalThis.SprintLessons;
const html = fs.readFileSync(path.join(root, 'Google STEP/sprint_tracker.html'), 'utf8');
const ids = [...html.matchAll(/<input type="checkbox" id="(q_\d+_\d+)"/g)].map(match => match[1]);
assert.equal(ids.length, 86);
assert.deepEqual(Object.keys(lessons).sort(), [...ids].sort());
const quizTexts = new Set();
let frames = 0;
for (const id of ids) {
  const lesson = lessons[id];
  assert.equal(lesson.options.length, 4, id + ': four choices');
  assert.equal(new Set(lesson.options).size, 4, id + ': distinct choices');
  assert(!quizTexts.has(lesson.quiz), id + ': problem-specific question');
  quizTexts.add(lesson.quiz);
  for (const key of ['quiz', 'hint', 'idea', 'time', 'space', 'example', 'edge', 'algorithm', 'explanation']) {
    assert.equal(typeof lesson[key], 'string', id + ': ' + key);
    assert(lesson[key].trim().length > 0, id + ': non-empty ' + key);
  }
  assert(lesson.frames.length >= 3, id + ': worked trace');
  assert(Object.hasOwn(lesson.frames.at(-1).stats, 'result'), id + ': explicit result');
  for (const frame of lesson.frames) {
    frames++;
    assert(frame.note && frame.rows.length, id + ': narrated state');
    for (const row of frame.rows) {
      assert(Array.isArray(row.values) && row.label, id + ': visual lane');
      for (const i of [...row.active, ...Object.keys(row.markers).map(Number)]) {
        assert(Number.isInteger(i) && i >= 0 && i < row.values.length, id + ': valid visual index ' + i);
      }
    }
  }
}
function result(id, expected) { assert.deepEqual(lessons[id].frames.at(-1).stats.result, expected, id + ': worked answer'); }
function arrayResult(id, expected) { result(id, '[' + expected.join(', ') + ']'); }
result('q_1_1', Math.max(...lessons.q_1_1.frames[0].rows[0].values));
result('q_1_2', [...new Set(lessons.q_1_2.frames[0].rows[0].values)].sort((a,b) => b-a)[1]);
const missingInput = lessons.q_3_4.frames[0].rows[0].values;
result('q_3_4', Array.from({length:missingInput.length+1}, (_,i) => i).find(x => !missingInput.includes(x)));
const subarraySums = a => a.flatMap((_, start) => a.slice(start).map((_, offset) => ({ length: offset+1, sum: a.slice(start, start+offset+1).reduce((s,x) => s+x, 0) })));
result('q_5_3', Math.max(...subarraySums([-2,3,-1,4,-5]).map(x => x.sum)));
result('q_24_1', Math.max(...subarraySums([-2,3,-1,4,-5]).map(x => x.sum)));
result('q_4_3', Math.max(...subarraySums([1,-1,5,-2,3]).filter(x => x.sum === 3).map(x => x.length)));
result('q_4_2', Math.max(...subarraySums([1,2,1,1,1]).filter(x => x.sum === 3).map(x => x.length)));
let exact = 0;
for (let i=0;i<3;i++) for (let j=i+1;j<=3;j++) if (new Set('aba'.slice(i,j)).size === 2) exact++;
result('q_12_3', exact);
const next = (a, compare) => a.map((x,i) => a.slice(i+1).find(y => compare(y,x)) ?? -1);
arrayResult('q_21_1', next([2,1,2,4,3], (y,x) => y>x));
arrayResult('q_21_3', next([4,8,5,2,25], (y,x) => y<x));
const circular = [1,2,1];
arrayResult('q_21_2', circular.map((x,i) => Array.from({length:circular.length-1},(_,j) => circular[(i+j+1)%circular.length]).find(y => y>x) ?? -1));
const countInput = [3,4,2,7,5];
arrayResult('q_21_4', [0,2].map(i => countInput.slice(i+1).filter(x => x>countInput[i]).length));
const prices = [100,80,60,70,60,75,85];
arrayResult('q_22_3', prices.map((x,i) => { let j=i; while(j>=0 && prices[j]<=x) j--; return i-j; }));
const rain = [3,0,2,0,4];
result('q_22_1', rain.reduce((sum,h,i) => sum + Math.min(Math.max(...rain.slice(0,i+1)),Math.max(...rain.slice(i)))-h, 0));
function histogram(a) {
  let best=0;
  for (let l=0;l<a.length;l++) for (let r=l;r<a.length;r++) best=Math.max(best, Math.min(...a.slice(l,r+1))*(r-l+1));
  return best;
}
result('q_23_1', histogram([2,1,5,6,2,3]));
const matrix = [[1,0,1,0,0],[1,0,1,1,1],[1,1,1,1,1],[1,0,0,1,0]];
let maxRectangle=0;
for(let top=0;top<4;top++) for(let bottom=top;bottom<4;bottom++) for(let left=0;left<5;left++) for(let right=left;right<5;right++) {
  let allOnes=true;
  for(let r=top;r<=bottom;r++) for(let c=left;c<=right;c++) if(matrix[r][c] !== 1) allOnes=false;
  if(allOnes) maxRectangle=Math.max(maxRectangle,(bottom-top+1)*(right-left+1));
}
result('q_23_2', maxRectangle);
const windowInput = [1,3,-1,-3,5,3,6,7];
arrayResult('q_23_3', windowInput.slice(2).map((_,i) => Math.max(...windowInput.slice(i,i+3))));
assert.deepEqual(lessons.q_7_2.frames.at(-1).rows.map(row => row.values), [[7,4,1],[8,5,2],[9,6,3]]);
assert.deepEqual(lessons.q_7_1.frames.at(-1).rows.map(row => row.values), [[1,0,3],[0,0,0],[7,0,9]]);
result('q_11_1', 1000-100+1000-10+100-1+5);
result('q_18_1', String(129+1));
result('q_18_2', '[7, 0, 8] = ' + (342+465));
console.log(`Passed: ${ids.length} lessons, ${frames} narrated frames, complete quiz coverage and independent worked-answer checks.`);
