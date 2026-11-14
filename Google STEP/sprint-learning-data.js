/* One authored concept check and worked trace for each of the 86 tracker items.
   options[0] is correct; the interface shuffles choices on every opening.
   Traces illustrate the stated example; they do not execute the learner's code. */
(function () {
  'use strict';
  const lessons = {};
  const R = (label, values, active = [], markers = {}, kind = 'array') => ({ label, values: Array.from(values), active, markers, kind });
  const S = (note, rows, stats = {}) => ({ note, rows, stats });
  const F = (note, values, active = [], stats = {}) => S(note, [R('Array', values, active)], stats);
  const L = (note, values, markers = {}, stats = {}) => S(note, [R('Nodes; arrows show next links', values, Object.keys(markers).map(Number), markers, 'list')], stats);
  const M = (note, matrix, active = [], stats = {}) => S(note, matrix.map((row, i) => R('Row ' + i, row, active.filter(p => p[0] === i).map(p => p[1]))), stats);
  function add(id, quiz, options, hint, idea, complexity, example, edge, algorithm, frames) {
    const [time, space] = complexity.split(' | ');
    lessons[id] = { quiz, options, hint, idea, time, space, example, edge, algorithm, frames, explanation: options[0].replace(/[.!]$/, '') + '. ' + idea };
  }

  // Days 1–7: arrays and matrices.
  add('q_1_1', 'Your array is [-8, -3, -10]. Which initial maximum keeps a one-pass solution correct?',
    ['The first array element', 'Always 0', 'The array length', 'The last index'],
    'Try tracing an array containing only negative values. Does your initial value actually belong to it?',
    'Keep the largest value seen so far, updating it only when the next element is larger.',
    'Time O(n) | Extra space O(1)', '[-8, -3, -10] → -3', 'one element; all negatives; repeated maximum; reject an empty array before reading a[0].',
    'Require a non-empty array\nbest = a[0]\nFor each remaining value x:\n  best = max(best, x)\nReturn best',
    [F('Start with a real array value, -8.', [-8,-3,-10], [0], {best:-8}), F('-3 is larger than -8, so replace best.', [-8,-3,-10], [1], {best:-3}), F('-10 is smaller. The maximum stays -3.', [-8,-3,-10], [2], {result:-3})]);

  add('q_1_2', 'For [5, 5, 2], what is the second-largest distinct value?',
    ['2', '5', '0', 'There is never a second-largest value when duplicates appear'],
    'Distinct means a repeated copy of the maximum cannot take second place.',
    'Track two distinct best values. When a new maximum arrives, the old maximum becomes second.',
    'Time O(n) | Extra space O(1)', '[4, 7, 7, 2, 6] → 6', 'fewer than two distinct values; negative values; avoid a numeric sentinel that can also be valid input.',
    'Keep largest and second as initially unset\nFor x in a:\n  If largest is unset or x > largest:\n    second = largest; largest = x\n  Else if x < largest and (second unset or x > second):\n    second = x\nReturn second, or report that it does not exist',
    [F('The first distinct value fills largest.', [4,7,7,2,6], [0], {largest:4,second:'unset'}), F('7 becomes largest; 4 moves into second.', [4,7,7,2,6], [1], {largest:7,second:4}), F('Another 7 is not a distinct runner-up.', [4,7,7,2,6], [2], {largest:7,second:4}), F('2 cannot improve second.', [4,7,7,2,6], [3], {largest:7,second:4}), F('6 improves second without changing largest.', [4,7,7,2,6], [4], {result:6})]);

  add('q_1_3', 'Which adjacent pair proves [1, 3, 2, 4] is not sorted in non-decreasing order?',
    ['3 followed by 2', '1 followed by 3', '2 followed by 4', 'The first and last elements'],
    'A non-decreasing array may keep the same value or go up. Look for a drop.',
    'Compare neighbours. A single a[i] < a[i-1] is enough to return false.',
    'Time O(n) | Extra space O(1)', '[1, 3, 2, 4] → false', 'empty or single-element arrays; equal neighbours are allowed.',
    'For i from 1 to n-1:\n  If a[i] < a[i-1]: return false\nReturn true',
    [F('Begin with the first neighbour pair.', [1,3,2,4], [0,1]), F('1 ≤ 3: no problem yet.', [1,3,2,4], [0,1], {sortedSoFar:true}), F('3 > 2 is a drop. Stop immediately.', [1,3,2,4], [1,2], {result:false})]);

  add('q_1_4', 'After removing duplicates in place from [1, 1, 2, 2, 3], which part must contain the answer?',
    ['The first k positions, where k is the unique count', 'Every original position must disappear', 'Only the last position', 'A sorted array cannot contain duplicates'],
    'The usual in-place contract returns a logical length; the backing array can remain the same size.',
    'Use a write index for the unique prefix and a read index to discover the next new value.',
    'Time O(n) | Extra space O(1)', '[1, 1, 2, 2, 3] → k = 3, prefix [1, 2, 3]', 'empty input; all duplicates; ignore the unused suffix after k.',
    'If empty: return 0\nwrite = 1\nFor read from 1 to n-1:\n  If a[read] != a[write-1]:\n    a[write] = a[read]; write++\nReturn write',
    [F('Keep the first 1. The unique prefix has length 1.', [1,1,2,2,3], [0], {write:1}), F('Skip the repeated 1; copy the first 2 into position 1.', [1,2,2,2,3], [1,2], {write:2}), F('Skip the repeated 2; copy 3 into position 2.', [1,2,3,2,3], [2,4], {write:3}), S('Only the prefix belongs to the answer; the suffix is unused.', [R('Unique prefix',[1,2,3],[0,1,2]),R('Unused suffix',[2,3])], {result:'k = 3'})]);

  add('q_2_1', 'A left rotation of [10, 20, 30] by one position produces which array?',
    ['[20, 30, 10]', '[30, 10, 20]', '[30, 20, 10]', '[10, 20, 30, 10]'],
    'Follow the original first element. A left rotation sends it to the end.',
    'Save the first value, shift every other value one position left, then fill the last slot.',
    'Time O(n) | Extra space O(1)', '[10, 20, 30] → [20, 30, 10]', 'empty array; one element.',
    'If n < 2: stop\nfirst = a[0]\nFor i from 1 to n-1: a[i-1] = a[i]\na[n-1] = first',
    [F('Save 10 before overwriting its slot.', [10,20,30],[0],{saved:10}), F('Move 20 left.', [20,20,30],[0,1],{saved:10}), F('Move 30 left, then place saved 10 at the end.', [20,30,10],[1,2],{result:'[20, 30, 10]'})]);

  add('q_2_2', 'Before rotating a non-empty array of length n left by d, why use d %= n?',
    ['A whole n-position rotation leaves the array unchanged', 'It sorts the array', 'It makes d equal to n', 'It removes duplicate values'],
    'Compare rotating a five-element array by 2 and by 7.',
    'For a left rotation, reverse the first d values, reverse the rest, then reverse the whole array.',
    'Time O(n) | Extra space O(1)', '[1, 2, 3, 4, 5], d = 2 → [3, 4, 5, 1, 2]', 'n = 0 before modulo; d = 0; d ≥ n; this example assumes non-negative d.',
    'If n == 0: stop\nd = d % n\nReverse a[0..d-1]\nReverse a[d..n-1]\nReverse a[0..n-1]',
    [F('Split after the first two values.', [1,2,3,4,5],[0,1],{d:2}), F('Reverse the first part.', [2,1,3,4,5],[0,1]), F('Reverse the second part.', [2,1,5,4,3],[2,3,4]), F('Reverse everything to restore each part’s internal order.', [3,4,5,1,2],[0,1,2,3,4],{result:'[3, 4, 5, 1, 2]'})]);

  add('q_2_3', 'When moving zeros to the end while preserving non-zero order, what should the write pointer identify?',
    ['The next slot for a non-zero value', 'The largest value', 'The last zero only', 'The number of negative values'],
    'Imagine building a prefix containing every non-zero value seen so far, in order.',
    'Scan left to right. Swap each non-zero value into the next write slot and advance that slot.',
    'Time O(n) | Extra space O(1)', '[0, 1, 0, 3, 2] → [1, 3, 2, 0, 0]', 'all zeros; no zeros; negative non-zero values.',
    'write = 0\nFor read from 0 to n-1:\n  If a[read] != 0:\n    swap(a[write], a[read])\n    write++',
    [F('The next non-zero belongs at position 0.',[0,1,0,3,2],[0],{write:0}),F('Swap 1 into the first write slot.',[1,0,0,3,2],[0,1],{write:1}),F('Skip the zero, then swap 3 into slot 1.',[1,3,0,0,2],[1,3],{write:2}),F('Swap 2 into slot 2. Non-zero order is unchanged.',[1,3,2,0,0],[2,4],{result:'[1, 3, 2, 0, 0]'})]);

  add('q_2_4', 'Can ordinary linear search find a target in an unsorted array?',
    ['Yes; it compares values one by one', 'Only after sorting', 'Only if all values are positive', 'Only when the target is in the middle'],
    'Does checking equality with each value require any ordering?',
    'Inspect one element at a time and stop at the first match. Return -1 if no match exists.',
    'Time O(n) | Extra space O(1)', '[7, 2, 9, 2], target = 9 → index 2', 'target absent; repeated target; empty array.',
    'For i from 0 to n-1:\n  If a[i] == target: return i\nReturn -1',
    [F('Compare 7 with 9: no match.',[7,2,9,2],[0],{target:9}),F('Compare 2 with 9: no match.',[7,2,9,2],[1],{target:9}),F('9 matches. Return its zero-based index.',[7,2,9,2],[2],{result:2})]);

  add('q_3_1', 'What is the sorted union of [1, 1, 3] and [1, 2, 3]?',
    ['[1, 2, 3]', '[1, 1, 1, 2, 3, 3]', '[1, 3]', '[2]'],
    'A union includes values from either input, with each distinct value appearing once.',
    'Merge with two pointers, appending a value only when it differs from the last output value.',
    'Time O(n + m) | Output space O(n + m)', 'A = [1, 1, 3], B = [1, 2, 3] → [1, 2, 3]', 'one input empty; repeated values; remaining tail after one input ends.',
    'While either input has values left:\n  Take the smaller current value (or from the non-empty input)\n  Advance that input pointer\n  Append only if output is empty or last output != value',
    [S('Read the smallest available value: 1.',[R('A',[1,1,3],[0]),R('B',[1,2,3],[0]),R('Union',[1])]),S('Skip repeated 1s. The next new value is 2.',[R('A',[1,1,3],[2]),R('B',[1,2,3],[1]),R('Union',[1,2])]),S('Append 3 once, even though both arrays contain it.',[R('Union',[1,2,3],[2])],{result:'[1, 2, 3]'})]);

  add('q_3_2', 'During intersection of two sorted arrays, A[i] < B[j]. Which pointer should move?',
    ['i, because A[i] cannot match any later value in B', 'j only', 'Both pointers must move two places', 'Neither; the arrays must be re-sorted'],
    'Later values in B are at least B[j]. Can the smaller A[i] ever match them?',
    'Advance the smaller value’s pointer. When equal, output a match and advance both. This trace keeps duplicate matches.',
    'Time O(n + m) | Output space O(min(n, m))', '[1, 2, 2, 4] ∩ [2, 2, 3] → [2, 2] (duplicate-preserving variant)', 'no common values; empty input; check whether the prompt wants distinct or duplicate-preserving output.',
    'While i < n and j < m:\n  If A[i] < B[j]: i++\n  Else if B[j] < A[i]: j++\n  Else: append A[i]; i++; j++',
    [S('1 is smaller than 2, so move i.',[R('A',[1,2,2,4],[0]),R('B',[2,2,3],[0])]),S('The first 2 matches. Move both pointers.',[R('A',[1,2,2,4],[1]),R('B',[2,2,3],[0]),R('Matches',[2])]),S('The second 2 matches as well.',[R('A',[1,2,2,4],[2]),R('B',[2,2,3],[1]),R('Matches',[2,2])]),S('3 < 4: B ends after advancing. Stop.',[R('Matches',[2,2])],{result:'[2, 2]'})]);

  add('q_3_3', 'Why does XOR find the single value when every other integer appears exactly twice?',
    ['x XOR x is 0, and x XOR 0 is x', 'XOR sorts the values', 'XOR always returns the largest number', 'Every negative number becomes zero'],
    'Group equal pairs together conceptually, then ask what each pair contributes.',
    'XOR all values. Equal pairs cancel, leaving the unpaired value.',
    'Time O(n) | Extra space O(1)', '[4, 1, 4, 2, 2] → 1', 'the pairing assumption must hold; one-element array.',
    'answer = 0\nFor x in a: answer = answer XOR x\nReturn answer',
    [F('Start at 0, then XOR with 4.',[4,1,4,2,2],[0],{xor:4}),F('4 XOR 1 = 5.',[4,1,4,2,2],[1],{xor:5}),F('The next 4 cancels the first one: 5 XOR 4 = 1.',[4,1,4,2,2],[2],{xor:1}),F('The two 2s cancel each other. Only 1 remains.',[4,1,4,2,2],[3,4],{result:1})]);

  add('q_3_4', 'For an n-element array of distinct values from 0 through n with one missing, what can expectedSum − actualSum find?',
    ['The missing value', 'The most frequent value', 'The first index', 'The number of duplicates'],
    'Write out 0 + 1 + … + n and cancel every value present in the input.',
    'Compare the sum of 0..n with the input sum, where n is the array length. Use a wide integer type for arithmetic.',
    'Time O(n) | Extra space O(1)', 'n = 5, [0, 1, 2, 4, 5] → 3', 'missing 0 or n; a one-element input; large n can overflow a narrow integer.',
    'n = length of input, converted to a wide integer\nexpected = n * (n + 1) / 2\nactual = sum of input values using a wide type\nReturn expected - actual',
    [F('The complete range 0..5 has sum 15.',[0,1,2,4,5],[],{expected:15}),F('Sum the five supplied values: 0 + 1 + 2 + 4 + 5 = 12.',[0,1,2,4,5],[0,1,2,3,4],{actual:12}),F('The difference is the missing value.',[0,1,2,4,5],[],{result:3})]);

  add('q_4_1', 'For Two Sum, why look up target − x before inserting the current x into the map?',
    ['To avoid using the current element twice', 'To force the array to be sorted', 'To remove negative values', 'To make every pair adjacent'],
    'With target 6 and just one value 3, should the same index count as both elements?',
    'Store previously seen values and their indices. Each new value searches for its complement among earlier elements.',
    'Expected time O(n) | Extra space O(n)', '[2, 7, 11, 15], target = 9 → indices [0, 1]', 'repeated values such as [3, 3]; absent pair; do not reuse one index.',
    'seen = empty map\nFor each index i:\n  needed = target - a[i]\n  If needed is in seen: return [seen[needed], i]\n  seen[a[i]] = i\nReport no pair',
    [F('For 2, look for 7 in an empty map.',[2,7,11,15],[0],{needed:7,seen:'{}'}),F('Store 2 at index 0. For 7, look for 2.',[2,7,11,15],[1],{needed:2,seen:'{2: 0}'}),F('2 was already seen, so two different indices form the pair.',[2,7,11,15],[0,1],{result:'[0, 1]'})]);

  add('q_4_2', 'Why can a shrinking sliding window solve longest-sum-K for non-negative values?',
    ['Removing a value from the left cannot increase the sum', 'Every subarray has the same sum', 'Negative values can never appear in C++', 'A larger window always has fewer elements'],
    'Compare how the sum changes when you remove a positive value versus a negative value.',
    'Extend right, shrink while the sum exceeds K, and record the longest window whenever the sum equals K.',
    'Time O(n) | Extra space O(1)', '[1, 2, 1, 1, 1], K = 3 → length 3', 'zeros; no match; K = 0; use prefix sums if negatives are allowed.',
    'left = 0; sum = 0; best = 0\nFor right from 0 to n-1:\n  sum += a[right]\n  While left <= right and sum > K: sum -= a[left++]\n  If sum == K: best = max(best, right-left+1)',
    [F('Expand to [1, 2]. Sum is 3; best length is 2.',[1,2,1,1,1],[0,1],{sum:3,best:2}),F('Add 1, then remove the leftmost 1. [2, 1] sums to 3.',[1,2,1,1,1],[1,2],{left:1,best:2}),F('Add another 1; remove 2 because sum exceeds 3.',[1,2,1,1,1],[2,3],{sum:2,left:2}),F('Add the last 1. [1, 1, 1] has sum 3 and length 3.',[1,2,1,1,1],[2,3,4],{result:3})]);

  add('q_4_3', 'For longest subarray sum K with negative values, which index should a prefix-sum map retain?',
    ['The earliest index for each prefix sum', 'Only the latest index', 'Only indices containing positive values', 'An arbitrary index each time'],
    'For a fixed ending index, which matching starting prefix gives the greatest distance?',
    'If prefix − K was seen earlier, the values between the two prefix positions sum to K. Keep the earliest occurrence for maximum length.',
    'Expected time O(n) | Extra space O(n)', '[1, -1, 5, -2, 3], K = 3 → length 4', 'negative numbers; repeated prefix sums; a valid subarray starting at index 0.',
    'first = {0: -1}; prefix = 0; best = 0\nFor i from 0 to n-1:\n  prefix += a[i]\n  If prefix-K in first: best = max(best, i-first[prefix-K])\n  If prefix not in first: first[prefix] = i',
    [F('Seed prefix 0 at index -1, before the array.',[1,-1,5,-2,3],[],{first:'{0: -1}'}),F('After 1 and -1, prefix returns to 0. Keep index -1.',[1,-1,5,-2,3],[0,1],{prefix:0}),F('After 5, prefix is 5; prefix-K = 2 is unseen.',[1,-1,5,-2,3],[2],{prefix:5,best:0}),F('After -2, prefix is 3. Prefix 0 at -1 gives length 3 - (-1) = 4.',[1,-1,5,-2,3],[0,1,2,3],{result:4})]);

  add('q_5_1', 'In Dutch National Flag sorting, what happens after swapping a 2 at mid with a[high]?',
    ['Decrease high and re-check mid', 'Increase mid immediately in every case', 'Decrease low', 'The array is already fully sorted'],
    'The value arriving from high has not been classified yet.',
    'Maintain 0s before low, 1s before mid, an unknown region mid..high, and 2s after high.',
    'Time O(n) | Extra space O(1)', '[2, 0, 1, 2, 0] → [0, 0, 1, 2, 2]', 'all one value; empty input; only the values 0, 1 and 2 are valid here.',
    'low = mid = 0; high = n-1\nWhile mid <= high:\n  If a[mid] == 0: swap(a[low++], a[mid++])\n  Else if a[mid] == 1: mid++\n  Else: swap(a[mid], a[high--])',
    [F('mid sees 2. Swap with high, then re-check mid.',[0,0,1,2,2],[0,4],{low:0,mid:0,high:3}),F('Classify the first 0, then the second 0.',[0,0,1,2,2],[0,1],{low:2,mid:2,high:3}),F('1 belongs in the middle. Advance mid.',[0,0,1,2,2],[2],{mid:3}),F('Classify the remaining 2. The unknown region is empty.',[0,0,1,2,2],[3,4],{result:'[0, 0, 1, 2, 2]'})]);

  add('q_5_2', 'If a majority element is not guaranteed, what must follow Moore’s candidate-selection pass?',
    ['Count the candidate and verify its frequency is greater than n/2', 'Always return the candidate without checking', 'Sort only the first two values', 'Return the final vote count as the element'],
    'Try [1, 2, 3]. A voting pass still leaves a candidate, even though no majority exists.',
    'Cancel different values in pairs. A true strict majority survives; a second pass verifies whether it really exists.',
    'Time O(n) | Extra space O(1)', '[2, 2, 1, 1, 2] → 2', 'no majority; n = 0; exactly n/2 occurrences are not enough.',
    'votes = 0\nFor x in a:\n  If votes == 0: candidate = x\n  votes += (x == candidate ? 1 : -1)\nCount candidate; return it only if count > n/2',
    [F('Choose 2; the first two values give two votes.',[2,2,1,1,2],[0,1],{candidate:2,votes:2}),F('Each 1 cancels one vote; votes reaches 0.',[2,2,1,1,2],[2,3],{votes:0}),F('The last 2 becomes the candidate again.',[2,2,1,1,2],[4],{candidate:2,votes:1}),F('Verification finds three 2s: 3 > 5/2.',[2,2,1,1,2],[0,1,4],{result:2})]);

  add('q_5_3', 'For an all-negative non-empty array, which Kadane initialization preserves the largest negative answer?',
    ['Initialize best and ending sum from the first value', 'Initialize best to 0 and allow only larger answers', 'Return the array length', 'Replace all negatives with 0 first'],
    'If every valid non-empty subarray is negative, should an empty sum of zero be allowed to win?',
    'At each position, choose between starting a new subarray and extending the best subarray ending just before it.',
    'Time O(n) | Extra space O(1)', '[-2, 3, -1, 4, -5] → maximum sum 6', 'all negatives; one element; require a non-empty input for this variant.',
    'ending = best = a[0]\nFor i from 1 to n-1:\n  ending = max(a[i], ending + a[i])\n  best = max(best, ending)\nReturn best',
    [F('Start from -2.',[-2,3,-1,4,-5],[0],{ending:-2,best:-2}),F('Starting fresh at 3 beats extending -2.',[-2,3,-1,4,-5],[1],{ending:3,best:3}),F('Extend through -1: ending sum becomes 2.',[-2,3,-1,4,-5],[1,2],{ending:2,best:3}),F('Adding 4 gives 6. The final -5 cannot improve it.',[-2,3,-1,4,-5],[1,2,3],{result:6})]);

  add('q_5_4', 'To print Kadane’s winning subarray, when should you save its start and end indices?',
    ['Whenever the running subarray improves the best sum', 'Only after the final loop, without remembering anything', 'Whenever any negative number appears', 'Always use the entire array'],
    'The current best may end before the final element. Which boundaries would otherwise be lost?',
    'Track the start of the current candidate and copy its boundaries whenever it produces a better global sum.',
    'Time O(n) | Extra space O(1), excluding output', '[-2, 3, -1, 4, -5] → [3, -1, 4]', 'all negatives; tied best sums need a stated tie policy; this trace keeps the first best.',
    'ending = best = a[0]; start = bestLeft = bestRight = 0\nFor i from 1 to n-1:\n  If a[i] > ending+a[i]: ending=a[i]; start=i\n  Else: ending += a[i]\n  If ending > best: best=ending; bestLeft=start; bestRight=i\nPrint a[bestLeft..bestRight]',
    [F('Candidate starts at index 0.',[-2,3,-1,4,-5],[0],{bestLeft:0,bestRight:0}),F('Restart at 3 and save [1, 1].',[-2,3,-1,4,-5],[1],{start:1,best:3}),F('Extending through -1 and 4 improves the best to 6.',[-2,3,-1,4,-5],[1,2,3],{bestLeft:1,bestRight:3}),S('Read exactly the saved interval.',[R('Winning subarray',[3,-1,4],[0,1,2])],{result:'[3, -1, 4]'})]);

  add('q_6_1', 'In the single-transaction stock problem, why track the minimum price from earlier days?',
    ['The buy must happen before the sell', 'You must buy the largest price', 'Selling before buying is allowed', 'Every day must be a transaction'],
    'A profitable pair of prices is valid only if their days occur in the correct order.',
    'Track the cheapest earlier buy and the best profit from selling today. Zero profit means choosing no transaction.',
    'Time O(n) | Extra space O(1)', '[7, 1, 5, 3, 6, 4] → profit 5', 'falling prices; one day; buy and sell order.',
    'lowest = infinity; best = 0\nFor price in prices:\n  best = max(best, price-lowest) if a previous price exists\n  lowest = min(lowest, price)\nReturn best',
    [F('Day 0 offers only a possible buy at 7.',[7,1,5,3,6,4],[0],{lowest:7,best:0}),F('Day 1 gives a cheaper buy: 1.',[7,1,5,3,6,4],[1],{lowest:1}),F('Sell at 5 for profit 4.',[7,1,5,3,6,4],[1,2],{best:4}),F('Sell at 6 for profit 5; the final 4 cannot improve it.',[7,1,5,3,6,4],[1,4],{result:5})]);

  add('q_6_2', 'With equal counts of positive and negative values, how can you alternate signs while preserving each group’s order?',
    ['Write positives to even output indices and negatives to odd indices', 'Sort by absolute value', 'Reverse every negative value', 'Always swap the first and last values'],
    'Reserve separate output slots for each sign, advancing each slot by two.',
    'Build an output array with positive positions 0,2,4… and negative positions 1,3,5…. This variant starts positive and excludes zeros.',
    'Time O(n) | Extra space O(n)', '[3, 1, -2, -5, 2, -4] → [3, -2, 1, -5, 2, -4]', 'unequal sign counts and zeros need a separately specified rule; preserve relative order.',
    'positive = 0; negative = 1\nFor x in a:\n  If x > 0: out[positive]=x; positive+=2\n  Else: out[negative]=x; negative+=2\nReturn out',
    [F('Reserve alternating positions in the output.',['_','_','_','_','_','_'],[],{positive:0,negative:1}),F('Write 3 and 1 into positive slots.',[3,'_',1,'_','_','_'],[0,2]),F('Write -2 and -5 into negative slots.',[3,-2,1,-5,'_','_'],[1,3]),F('Place 2 and -4 into the remaining slots.',[3,-2,1,-5,2,-4],[4,5],{result:'[3, -2, 1, -5, 2, -4]'})]);

  add('q_6_3', 'When scanning for strict leaders from right to left, which value must you remember?',
    ['The maximum among values already scanned to the right', 'The minimum of the full array', 'The first array index', 'The number of zeros'],
    'A strict leader must be greater than every value after it.',
    'The last value is a leader. Moving left, accept only values greater than the maximum to their right; reverse collected answers for original order.',
    'Time O(n) | Output space O(n)', '[10, 22, 12, 3, 0, 6] → [22, 12, 6]', 'equal values under the strict-greater definition; one value; negative values.',
    'rightMax = unset; answer = []\nScan from right to left:\n  If rightMax unset or a[i] > rightMax: append a[i]\n  rightMax = max(rightMax, a[i])\nReverse answer',
    [F('6 is the rightmost value, so it is a leader.',[10,22,12,3,0,6],[5],{rightMax:6}),F('0 and 3 are smaller than 6; skip both.',[10,22,12,3,0,6],[3,4],{rightMax:6}),F('12 beats 6, then 22 beats 12.',[10,22,12,3,0,6],[1,2],{collected:'[6, 12, 22]'}),S('10 is not a leader. Reverse the collected output.',[R('Leaders',[22,12,6])],{result:'[22, 12, 6]'})]);

  add('q_6_4', 'In the set-based longest-consecutive algorithm, when should x start a sequence?',
    ['Only when x − 1 is absent from the set', 'Whenever x is even', 'Whenever x + 1 is absent', 'Only if x is the first array element'],
    'Starting in the middle of a run repeats work that its smallest value can do once.',
    'Put values in a set. Expand only from sequence starts, so each distinct value is visited a bounded number of times.',
    'Expected time O(n) | Extra space O(n)', '[100, 4, 200, 1, 3, 2] → length 4', 'duplicates; empty input; guard integer boundaries when computing x±1.',
    'values = set(a); best = 0\nFor x in values:\n  If x-1 is absent:\n    length = 1\n    While x+length exists: length++\n    best = max(best, length)',
    [F('Build a set; original order does not matter.',[100,4,200,1,3,2],[],{best:0}),F('1 starts a run because 0 is absent.',[1,2,3,4],[0],{length:1}),F('Find 2, then 3, then 4. Stop because 5 is absent.',[1,2,3,4],[1,2,3],{length:4}),F('100 and 200 form shorter runs; 2,3,4 are not starts.',[1,2,3,4],[0,1,2,3],{result:4})]);

  add('q_7_1', 'Why should matrix zero locations be recorded before zeroing their full rows and columns?',
    ['Newly written zeros must not create extra zeroing decisions', 'Zeros cannot be stored in a matrix', 'Only square matrices support zeros', 'Every non-zero value must become one'],
    'If you treat a zero you just wrote as an original zero, what could spread across the matrix?',
    'First record original zero rows and columns. In a second pass, zero every cell belonging to a marked row or column.',
    'Time O(rows × cols) | Extra space O(rows + cols)', '[[1,2,3],[4,0,6],[7,8,9]] → middle row and middle column zeroed', 'zeros in the first row/column; multiple original zeros; rectangular matrices.',
    'markedRows = set(); markedCols = set()\nFor every original cell (r,c):\n  If matrix[r][c] == 0: mark r and c\nFor every cell (r,c):\n  If r or c marked: matrix[r][c] = 0',
    [M('Find the original zero at row 1, column 1.',[[1,2,3],[4,0,6],[7,8,9]],[[1,1]],{markedRow:1,markedCol:1}),M('Zero the marked row.',[[1,2,3],[0,0,0],[7,8,9]],[[1,0],[1,1],[1,2]]),M('Zero the marked column. No new markers are created.',[[1,0,3],[0,0,0],[7,0,9]],[[0,1],[2,1]],{result:'[[1,0,3],[0,0,0],[7,0,9]]'})]);

  add('q_7_2', 'Which two operations rotate a square matrix 90° clockwise?',
    ['Transpose, then reverse each row', 'Transpose twice', 'Reverse each row twice', 'Reverse every column, then every row'],
    'Trace where the top-left value should end up after a clockwise turn.',
    'Transpose across the main diagonal, then reverse every row. The in-place method assumes a square matrix.',
    'Time O(n²) | Extra space O(1)', '[[1,2,3],[4,5,6],[7,8,9]] → [[7,4,1],[8,5,2],[9,6,3]]', '1×1; distinguish clockwise from anticlockwise; rectangles need a differently shaped output.',
    'For r from 0 to n-1:\n  For c from r+1 to n-1: swap(matrix[r][c], matrix[c][r])\nReverse each row',
    [M('Start with the original square.',[[1,2,3],[4,5,6],[7,8,9]],[[0,0]]),M('Swap cells across the diagonal to transpose.',[[1,4,7],[2,5,8],[3,6,9]],[[0,1],[1,0],[0,2],[2,0],[1,2],[2,1]]),M('Reverse each row to turn the transpose clockwise.',[[7,4,1],[8,5,2],[9,6,3]],[[0,0],[1,0],[2,0]],{result:'[[7,4,1],[8,5,2],[9,6,3]]'})]);

  add('q_7_3', 'After printing a spiral’s top row and right column, why check top <= bottom before printing the bottom row?',
    ['A single remaining row may already have been consumed', 'The matrix must always be square', 'It sorts the bottom row', 'The check changes the values'],
    'Try a 1×4 matrix. Would a second pass across that same row print duplicates?',
    'Move four boundaries inward: top, right, bottom, left. Check that a row or column still exists before traversing it.',
    'Time O(rows × cols) | Extra space O(1), excluding output', '[[1,2,3],[4,5,6]] → [1,2,3,6,5,4]', '1×N; N×1; rectangular matrices; an odd centre cell.',
    'While top <= bottom and left <= right:\n  Print top row left→right; top++\n  Print right column top→bottom; right--\n  If top <= bottom: print bottom row right→left; bottom--\n  If left <= right: print left column bottom→top; left++',
    [M('Print the top edge: 1,2,3; move top down.',[[1,2,3],[4,5,6]],[[0,0],[0,1],[0,2]],{output:'1 2 3'}),M('Print the remaining right edge: 6; move right left.',[[1,2,3],[4,5,6]],[[1,2]],{output:'1 2 3 6'}),M('A bottom row still exists. Print 5,4 right to left.',[[1,2,3],[4,5,6]],[[1,1],[1,0]],{output:'1 2 3 6 5 4'}),M('The row boundaries cross, so stop without revisiting cells.',[[1,2,3],[4,5,6]],[],{result:'[1, 2, 3, 6, 5, 4]'})]);

  // Days 8–12: strings.
  add('q_8_1', 'When removing outermost parentheses from valid primitives, which opening parentheses should be kept?',
    ['Those encountered when the existing depth is greater than 0', 'Only openings encountered at depth 0', 'Every opening parenthesis', 'No opening parentheses at all'],
    'The opening bracket at depth 0 is the outer boundary of a primitive.',
    'Track nesting depth. Skip openings that start a primitive and closings that finish it.',
    'Time O(n) | Output space O(n)', '(()())() → ()()', 'an empty string; one primitive (); multiple primitives; input must be balanced.',
    'depth = 0; output = empty\nFor ch in s:\n  If ch is opening: if depth > 0 append ch; depth++\n  Else: depth--; if depth > 0 append ch',
    [S('Skip the first opening: it starts the primitive.',[R('Input','(()())()',[0])],{depth:1,output:'empty'}),S('Keep the inner () pairs at indices 1..4.',[R('Input','(()())()',[1,2,3,4]),R('Output','()()')],{depth:1}),S('Skip the closing at 5, then both outer brackets of the final ().',[R('Input','(()())()',[5,6,7]),R('Output','()()')],{result:'()()'})]);

  add('q_8_2', 'Reversing word order in "  learn   C++ now " should give which result?',
    ['now C++ learn', 'nrael ++C won', 'learn C++ now', 'won ++C nrael'],
    'The words move, but the letters inside each word stay in their original order.',
    'Read non-empty words, reverse their order, and join with single spaces.',
    'Time O(n) | Extra space O(n)', '"  learn   C++ now " → "now C++ learn"', 'multiple spaces; leading/trailing spaces; one word; no words.',
    'Read whitespace-separated words into a list\nReverse that list\nJoin words with one space and no leading/trailing space',
    [S('Split by whitespace, discarding empty pieces.',[R('Words',['learn','C++','now'])]),S('Reverse the order of the words, not their characters.',[R('Words',['now','C++','learn'],[0,2])]),S('Join with one space between words.',[R('Output',['now','C++','learn'])],{result:'now C++ learn'})]);

  add('q_8_3', 'To find the largest odd-valued substring of a decimal digit string, where should its right end be?',
    ['At the rightmost odd digit', 'Always at the final digit', 'At the first even digit', 'At the largest digit regardless of parity'],
    'A decimal integer is odd exactly when its final digit is odd.',
    'Scan from the right for an odd digit and return the full prefix through it. If none exists, return an empty string.',
    'Time O(n) | Output space O(n)', '"35420" → "35"', 'all even digits; already odd; input is a non-negative decimal representation.',
    'For i from length-1 down to 0:\n  If digit(s[i]) is odd: return s[0..i]\nReturn empty string',
    [S('0 is even, so a prefix ending here is not odd.',[R('Digits','35420',[4])]),S('2 and 4 are also even. Keep moving left.',[R('Digits','35420',[2,3])]),S('5 is the rightmost odd digit. Keep the prefix through it.',[R('Digits','35420',[0,1]),R('Answer','35')],{result:'35'})]);

  add('q_9_1', 'For ["flower", "flow", "flight"], what is the longest common prefix?',
    ['fl', 'flow', 'flight', 'ower'],
    'A common prefix must start at position zero in every string.',
    'Compare each character position across all strings. Stop at the first mismatch or the shortest string’s end.',
    'Time O(number of strings × shortest length) | Extra space O(1), excluding output', '[flower, flow, flight] → fl', 'empty input; an empty member string; all strings equal.',
    'If no strings: return empty\nFor i over positions of the first string:\n  If any string ends at i or differs at i: return first[0..i-1]\nReturn the first string',
    [S('Position 0 is f in every string.',[R('flower','flower',[0]),R('flow','flow',[0]),R('flight','flight',[0])]),S('Position 1 is l in every string.',[R('flower','flower',[1]),R('flow','flow',[1]),R('flight','flight',[1])]),S('Position 2 differs: o, o, i. Keep only fl.',[R('Prefix','fl',[0,1])],{result:'fl'})]);

  add('q_9_2', 'Why are "ab" and "cc" not isomorphic?',
    ['Two different source characters would map to the same target character', 'They have different lengths', 'They contain no repeated source characters', 'Only identical strings can be isomorphic'],
    'A valid mapping must work in both directions, with no two source characters sharing one target.',
    'Keep forward and reverse character maps. Every new pair must agree with both maps.',
    'Time O(n) | Extra space O(alphabet size)', 'egg → add is valid; ab → cc is invalid', 'unequal lengths; repeated source characters; repeated target characters.',
    'If lengths differ: return false\nFor each pair (s[i], t[i]):\n  If either existing direction disagrees: return false\n  Save s[i]→t[i] and t[i]→s[i]\nReturn true',
    [S('Map e to a, and a back to e.',[R('Source','egg',[0]),R('Target','add',[0])],{forward:'e→a'}),S('Map g to d, and d back to g.',[R('Source','egg',[1]),R('Target','add',[1])],{forward:'e→a, g→d'}),S('The final g/d pair agrees with both saved directions.',[R('Source','egg',[2]),R('Target','add',[2])],{result:true})]);

  add('q_9_3', 'To test whether t is a rotation of s using s+s, which extra check is necessary?',
    ['s and t must have the same length', 's must be alphabetically sorted', 't must have no repeated letters', 's must contain only vowels'],
    'A shorter unrelated string may occur inside s+s without being a rotation.',
    'Two copies of s contain every rotation as a contiguous segment of length |s|. Check equal lengths before substring search.',
    'Time O(n²) with naive substring search | Extra space O(n)', 's = abcd, t = cdab → true', 'different lengths; repeated characters; two empty strings are rotations under this convention.',
    'If lengths differ: return false\nReturn whether t appears in s+s\n(A linear-time string matcher can improve search time)',
    [S('Join two copies of abcd.',[R('s+s','abcdabcd')]),S('Search for the four-character target cdab.',[R('s+s','abcdabcd',[2,3,4,5])]),S('A length-four match starts at index 2.',[R('Match','cdab',[0,1,2,3])],{result:true})]);

  add('q_10_1', 'Why are "aab" and "abb" not anagrams?',
    ['Their character counts differ', 'Their lengths differ', 'Anagrams must have the same first character', 'Repeated characters are forbidden'],
    'Having the same set of letters is weaker than having the same number of each letter.',
    'Compare character frequencies, not just membership. Every character must occur equally often.',
    'Time O(n) | Extra space O(alphabet size)', 'listen and silent → true', 'unequal lengths; repeated letters; decide case and whitespace rules before comparing.',
    'If lengths differ: return false\nCount each character in s\nSubtract one for each character in t\nReturn true only if every remaining count is zero',
    [S('Count each character of listen.',[R('Characters',['l','i','s','t','e','n'])],{counts:'each = 1'}),S('Remove the matching counts while reading silent.',[R('Target','silent',[0,1,2,3,4,5])],{remaining:'all zero'}),S('Every frequency balances.',[R('Counts',[0,0,0,0,0,0])],{result:true})]);

  add('q_10_2', 'When sorting "tree" by decreasing character frequency, which character must come first?',
    ['e, because it occurs twice', 't, because it was first', 'r, because it is alphabetically smaller', 'Any character, regardless of frequency'],
    'Count occurrences before deciding the output order.',
    'Count characters, sort distinct characters by decreasing count, then repeat each character by its count. This trace breaks ties alphabetically.',
    'Time O(n + u log u), u distinct characters | Extra space O(n + u)', 'tree → eert (alphabetical tie-break)', 'equal frequencies; one distinct character; tie order may vary if the prompt permits it.',
    'Count frequency of each character\nSort distinct characters by (-frequency, character)\nFor each sorted character:\n  Append it frequency times',
    [S('Read tree and build counts.',[R('Input','tree')],{e:2,r:1,t:1}),S('Sort the distinct characters: e, then r, then t.',[R('Order',['e ×2','r ×1','t ×1'],[0])]),S('Expand the counts into the output string.',[R('Output','eert',[0,1])],{result:'eert'})]);

  add('q_10_3', 'While scanning balanced parentheses, when should maximum depth be updated?',
    ['Immediately after increasing depth for an opening parenthesis', 'Only at the final character', 'Only when depth becomes zero', 'Only when a digit appears'],
    'The deepest point occurs just after opening another nested level.',
    'Increase depth at each opening bracket, decrease it at each closing bracket, and remember the largest depth reached.',
    'Time O(n) | Extra space O(1)', '((())) → maximum depth 3', 'no parentheses; deeply nested input; this depth calculation assumes balanced parentheses.',
    'depth = best = 0\nFor ch in s:\n  If ch == opening: depth++; best=max(best, depth)\n  If ch == closing: depth--\nIgnore other characters',
    [S('The first opening creates depth 1.',[R('Nesting','((()))',[0])],{depth:1,best:1}),S('Two more nested openings reach depth 3.',[R('Nesting','((()))',[1,2])],{depth:3,best:3}),S('Closing brackets reduce current depth, not the saved maximum.',[R('Nesting','((()))',[3,4,5])],{depth:0,result:3})]);

  add('q_11_1', 'While converting Roman numerals left to right, when should the current symbol’s value be subtracted?',
    ['When it is smaller than the next symbol’s value', 'Whenever it is I', 'Whenever it is the last symbol', 'Only when the string length is even'],
    'Compare IV with VI. The same symbols use a different order.',
    'A smaller value immediately before a larger one contributes negatively; all other symbols contribute positively.',
    'Time O(n) | Extra space O(1)', 'MCMXCIV → 1994', 'single symbol; subtractive pairs; this algorithm assumes a valid Roman numeral.',
    'total = 0\nFor i from 0 to n-1:\n  If next exists and value(s[i]) < value(s[i+1]): subtract current\n  Else: add current\nReturn total',
    [S('M contributes 1000.',[R('Roman','MCMXCIV',[0])],{total:1000}),S('CM contributes -100 + 1000 = 900.',[R('Roman','MCMXCIV',[1,2])],{total:1900}),S('XC contributes -10 + 100 = 90.',[R('Roman','MCMXCIV',[3,4])],{total:1990}),S('IV contributes -1 + 5 = 4.',[R('Roman','MCMXCIV',[5,6])],{result:1994})]);

  add('q_11_2', 'Why must a greedy integer-to-Roman table include 900, 400, 90, 40, 9 and 4?',
    ['To produce the standard subtractive forms such as CM and IV', 'To make every result the same length', 'To allow negative Roman numerals', 'To avoid using the symbol M'],
    'What would a table containing only 1,5,10,50,100,500,1000 produce for 4?',
    'Visit values from largest to smallest, repeatedly appending each fitting symbol, including subtractive pairs.',
    'Time O(number of output symbols) | Output space O(number of output symbols)', '1994 → MCMXCIV (standard range 1..3999)', '4,9,40,90,400,900; range is 1..3999 for this standard representation.',
    'Use pairs: 1000 M, 900 CM, 500 D, 400 CD, ... , 9 IX, 5 V, 4 IV, 1 I\nFor each pair in descending order:\n  While number >= value: append symbol; number -= value',
    [S('1994 fits M. Subtract 1000.',[R('Output',['M'])],{remaining:994}),S('994 fits CM. Subtract 900.',[R('Output',['M','CM'],[1])],{remaining:94}),S('94 fits XC. Subtract 90.',[R('Output',['M','CM','XC'],[2])],{remaining:4}),S('4 fits IV. Nothing remains.',[R('Output',['M','CM','XC','IV'],[3])],{remaining:0,result:'MCMXCIV'})]);

  add('q_11_3', 'For atoi on "  -42x9", what should parsing do at x?',
    ['Stop and return -42', 'Ignore x and return -429', 'Return 0 because any letter invalidates earlier digits', 'Restart parsing at 9'],
    'After optional whitespace and a sign, only one consecutive run of decimal digits is read.',
    'Skip leading spaces, read one optional sign, accumulate consecutive digits, and clamp before overflow to the signed 32-bit range.',
    'Time O(n) | Extra space O(1)', '"  -42x9" → -42', 'no digits; sign alone; + and - together; values outside [-2147483648,2147483647].',
    'Skip leading spaces; read an optional + or -\nlimit = sign positive ? 2147483647 : 2147483648\nWhile current character is a digit:\n  If value > (limit-digit)/10: return signed limit\n  value = value*10 + digit\nReturn sign*value (use a wide accumulator)',
    [S('Skip spaces and read the minus sign.',[R('Input',['space','space','-','4','2','x','9'],[0,1,2])],{sign:-1,value:0}),S('Read 4, then 2: magnitude becomes 42.',[R('Input',['space','space','-','4','2','x','9'],[3,4])],{value:42}),S('x ends the digit run. The later 9 is ignored.',[R('Input',['space','space','-','4','2','x','9'],[5])],{result:-42})]);

  add('q_12_1', 'In a two-pointer palindrome check, which action follows a matching outer pair?',
    ['Move left rightward and right leftward', 'Move both pointers rightward', 'Compare only the first character again', 'Return true before checking any inner pairs'],
    'After the outside pair is confirmed, which part remains untested?',
    'Compare mirrored positions while moving inward. This walkthrough compares characters exactly as supplied.',
    'Time O(n) | Extra space O(1)', 'racecar → true', 'empty string; one character; a mismatch near the centre; normalization rules depend on the prompt.',
    'left=0; right=n-1\nWhile left < right:\n  If s[left] != s[right]: return false\n  left++; right--\nReturn true',
    [S('The outer r characters match.',[R('String','racecar',[0,6])],{left:0,right:6}),S('The a characters match, then the c characters match.',[R('String','racecar',[1,2,4,5])],{left:3,right:3}),S('Pointers meet at e. Every mirrored pair matched.',[R('String','racecar',[3])],{result:true})]);

  add('q_12_2', 'Why must expand-around-centre check both (i,i) and (i,i+1)?',
    ['Palindromes can have odd or even length', 'Every string has two longest answers', 'Only adjacent letters can form palindromes', 'It avoids all character comparisons'],
    'Where is the centre of "aba"? Where is the centre of "bb"?',
    'Expand each possible odd and even centre while the two ends match, remembering the longest interval.',
    'Time O(n²) | Extra space O(1), excluding output', 'cbbd → bb', 'empty string; all same letters; odd/even answers; tied longest substrings.',
    'For each i:\n  Expand(left=i, right=i)\n  Expand(left=i, right=i+1)\nDuring expansion, save any longer matching interval\nReturn the saved substring',
    [S('Single-character centres initially give length 1.',[R('String','cbbd',[0])],{best:'c'}),S('The even centre between indices 1 and 2 has matching b values.',[R('String','cbbd',[1,2])],{best:'bb',length:2}),S('Expanding again compares c with d, which fails.',[R('String','cbbd',[0,3])],{result:'bb'})]);

  add('q_12_3', 'How can exactly-K-distinct substring counts be obtained from at-most counts?',
    ['atMost(K) − atMost(K−1)', 'atMost(K) + atMost(K−1)', 'atMost(K) × K', 'Always subtract the string length'],
    'The substrings with fewer than K distinct characters are included in the at-most-K total.',
    'Count valid windows with at most K distinct characters, then subtract those with at most K−1.',
    'Time O(n) | Extra space O(alphabet size)', 'aba, K = 2 → 3 substrings: ab, ba, aba', 'K = 0; K exceeds the alphabet present; define atMost(negative) as 0.',
    'atMost(limit): return 0 if limit < 0\n  Extend right and update character frequencies\n  While distinct > limit: remove from left\n  Add right-left+1 to total at each right\nReturn atMost(K) - atMost(K-1)',
    [S('At most 2 distinct: valid endings contribute 1, then 2, then 3.',[R('String','aba',[0,1,2])],{atMost2:6}),S('At most 1 distinct: only a, b, a contribute, one each.',[R('String','aba',[1])],{atMost1:3}),S('Subtract the nested counts: 6 - 3 = 3.',[R('Exactly two',['ab','ba','aba'],[0,1,2])],{result:3})]);

  // Days 13–15: building and editing linked lists.
  add('q_13_1', 'What does a singly linked-list node need in addition to its stored value?',
    ['A pointer to the next node', 'The full array containing every node', 'A pointer to every earlier node', 'A fixed numeric index equal to its value'],
    'How would traversal reach a node that was allocated somewhere else in memory?',
    'Each node stores data and a next pointer. The head points to the first node, and the last next pointer is null.',
    'Time O(1) per node creation | Space O(n) for n nodes', 'Create nodes 10 and 20, then link 10 → 20 → null', 'an empty head; initializing next; nodes need not occupy adjacent memory.',
    'struct Node { int data; Node* next; };\nfirst = new Node{10, nullptr}\nsecond = new Node{20, nullptr}\nfirst->next = second\nhead = first',
    [L('Allocate a node containing 10; initialize next to null.',[10,'null'],{0:'head'}),L('Allocate 20 separately, then set the first next pointer to it.',[10,20,'null'],{0:'head',1:'new node'}),L('The head and next links now make both nodes reachable.',[10,20,'null'],{0:'head'},{result:'10 → 20 → null'})]);

  add('q_13_2', 'When should a singly linked-list traversal stop?',
    ['When the traversal pointer is nullptr', 'When the node’s data is 0', 'When the pointer equals the head again in every list', 'After exactly two nodes'],
    'A node may validly store zero. Which value means there is no node to read?',
    'Use a temporary pointer so traversal does not lose the head. Visit data, then follow next.',
    'Time O(n) | Extra space O(1)', '10 → 20 → 30 → null prints 10, 20, 30', 'empty head; data equal to zero; this traversal assumes no cycle.',
    'temp = head\nWhile temp != nullptr:\n  Visit temp->data\n  temp = temp->next',
    [L('temp starts at the head. Visit 10.',[10,20,30,'null'],{0:'head / temp'},{output:'10'}),L('Follow next and visit 20, then 30.',[10,20,30,'null'],{2:'temp'},{output:'10 20 30'}),L('temp becomes null. Stop before dereferencing it.',[10,20,30,'null'],{3:'temp'},{result:'10 20 30'})]);

  add('q_13_3', 'What should the length of a linked list with head == nullptr be?',
    ['0', '1', '-1 in every implementation', 'The address stored in head'],
    'How many times would a loop with condition temp != nullptr execute?',
    'Count one per visited node, following next until null.',
    'Time O(n) | Extra space O(1)', '5 → 8 → 13 → null has length 3', 'empty list; one node; cyclic lists require separate handling.',
    'count = 0\nFor temp=head; temp != nullptr; temp=temp->next:\n  count++\nReturn count',
    [L('Visit the first node.',[5,8,13,'null'],{0:'temp'},{count:1}),L('Visit the second node.',[5,8,13,'null'],{1:'temp'},{count:2}),L('Visit the third, then reach null.',[5,8,13,'null'],{3:'temp'},{result:3})]);

  add('q_13_4', 'If a linked-list search reaches nullptr without finding the target, what does that mean?',
    ['The target is absent', 'The target must be the head', 'The last node must match', 'The list automatically sorts itself'],
    'Every reachable node has already been compared by the time traversal reaches null.',
    'Traverse and compare each node’s data, stopping on the first match or at null.',
    'Time O(n) | Extra space O(1)', '5 → 8 → 13, target 8 → found', 'empty list; repeated target values; absent target.',
    'For temp=head; temp != nullptr; temp=temp->next:\n  If temp->data == target: return true\nReturn false',
    [L('Compare 5 with target 8.',[5,8,13,'null'],{0:'temp'},{target:8}),L('Advance once. The current node stores 8.',[5,8,13,'null'],{1:'temp'},{match:true}),L('Stop at the first match; there is no need to inspect 13.',[5,8,13,'null'],{1:'found'},{result:true})]);

  add('q_14_1', 'When inserting a new head, which pointer should the new node’s next hold?',
    ['The old head', 'The new node itself', 'Always nullptr, even for a non-empty list', 'The last node’s data'],
    'The old list must remain reachable after head changes.',
    'Link the new node to the old head first, then update head to the new node.',
    'Time O(1) | Extra space O(1) per inserted node', 'Insert 5 before 10 → 20 → null', 'empty list; preserving the old head before changing it.',
    'node = new Node{value, head}\nhead = node\nReturn head',
    [L('The old head points to 10.',[10,20,'null'],{0:'old head'}),S('Create 5 and set its next to the old head.',[R('New next chain',[5,10,20,'null'],[0],{0:'new node',1:'old head'},'list')]),L('Move head to the new node.',[5,10,20,'null'],{0:'head'},{result:'5 → 10 → 20'})]);

  add('q_14_2', 'Using 1-based insertion positions, what is special about inserting at position 1?',
    ['It changes head and has no predecessor node', 'It always means append after the tail', 'It must delete the existing first node', 'It is impossible in an empty list'],
    'Which existing node would come before position 1?',
    'For insertion after a predecessor, set the new node’s next first, then the predecessor’s next. Tail insertion uses the last node as predecessor.',
    'Time O(n) to locate position/tail | Extra space O(1) per insertion', 'Append 4 to [1,2,3], then insert 9 at position 2 → [1,9,2,3,4]', 'empty-list insertion at 1; position n+1; reject positions outside 1..n+1.',
    'If k == 1: insert at head\nOtherwise find the node at position k-1\nIf it does not exist: report invalid position\nnode->next = predecessor->next\npredecessor->next = node\nFor append, use k = length+1',
    [L('Start with the original chain.',[1,2,3,'null'],{0:'head'}),L('Append 4: the previous tail now points to it.',[1,2,3,4,'null'],{2:'old tail',3:'new tail'}),L('For position 2, predecessor is node 1. Save its old successor 2 in newNode.next.',[1,2,3,4,'null'],{0:'predecessor',1:'old successor'}),L('Set predecessor.next to 9; the remainder stays reachable.',[1,9,2,3,4,'null'],{1:'inserted'},{result:'[1, 9, 2, 3, 4]'})]);

  add('q_14_3', 'What must deleting the only node of a singly linked list do to head?',
    ['Set head to nullptr after preserving and deleting the old node', 'Leave head pointing to freed memory', 'Point head to itself', 'Change the data to zero and keep counting it'],
    'After deletion there are no valid nodes left for head to identify.',
    'Head deletion advances head before freeing the old node. Tail deletion locates the penultimate node; handle a one-node list separately.',
    'Time O(1) head / O(n) tail | Extra space O(1)', '[1,2,3] → delete head → [2,3] → delete tail → [2]', 'empty list; one node; never dereference or reuse a freed node.',
    'Delete head: if head exists, save old=head; head=head->next; delete old\nDelete tail:\n  If empty: stop\n  If one node: delete head; head=nullptr\n  Else find node before tail; delete its next; set its next=nullptr',
    [L('Save the first node before advancing head.',[1,2,3,'null'],{0:'delete',1:'next head'}),L('Head deletion leaves 2 → 3.',[2,3,'null'],{0:'head'}),L('To delete the tail, stop at 2 and unlink/free 3.',[2,'null'],{0:'head / tail'},{result:'[2]'})]);

  add('q_14_4', 'Before deleting a non-head node, which link must be changed?',
    ['predecessor.next must skip the target and point to target.next', 'head must always become nullptr', 'target.next must point back to target', 'Every earlier node must be copied'],
    'The predecessor currently leads into the node that is about to disappear.',
    'Find the target by 1-based position or first matching value, keep its predecessor, unlink it, then free it.',
    'Time O(n) | Extra space O(1)', '[1,2,3,4] → delete position 3 → [1,2,4] → delete value 2 → [1,4]', 'deleting head/tail; absent value; invalid position; duplicates delete the first match in this variant.',
    'Locate the target and its predecessor\nIf no target: leave list unchanged\nIf target is head: head=target->next\nElse: predecessor->next=target->next\nDelete target',
    [L('Position 3 contains 3; its predecessor is 2.',[1,2,3,4,'null'],{1:'predecessor',2:'target'}),L('Link 2 directly to 4, then free 3.',[1,2,4,'null'],{1:'predecessor'}),L('Now delete value 2 by linking 1 directly to 4.',[1,4,'null'],{0:'predecessor'},{result:'[1, 4]'})]);

  add('q_15_1', 'Compared with a singly linked-list node, what does a doubly linked-list node add?',
    ['A prev pointer to the previous node', 'A second copy of the entire list', 'A fixed array index', 'A rule that all data must be distinct'],
    'Which extra connection would allow moving backwards from the current node?',
    'A doubly linked node keeps data, prev and next. Head.prev and tail.next are null.',
    'Time O(1) per node creation | Space O(n)', '10 ↔ 20 ↔ 30; head.prev = null and tail.next = null', 'empty list; one node with both links null; consistent links in both directions.',
    'struct Node { int data; Node* prev; Node* next; };\nFor adjacent nodes left and right:\n  left->next = right\n  right->prev = left\nSet boundary pointers to nullptr',
    [L('The next links let us move from 10 to 20 to 30.',[10,20,30,'null'],{0:'head'}),S('The prev links let us move back from 30 to 20 to 10.',[R('Following prev',[30,20,10,'null'],[0,1,2],{},'list')]),L('The two boundaries have null outward pointers.',[10,20,30,'null'],{0:'prev = null',2:'next = null'},{result:'10 ↔ 20 ↔ 30'})]);

  add('q_15_2', 'When inserting between two nodes of a doubly linked list, which connections need attention?',
    ['Both next and prev links around the insertion', 'Only the new node’s data', 'Only head, regardless of position', 'No links if the value is unique'],
    'Try moving forwards and backwards across the insertion point.',
    'Connect the new node to both neighbours, then reconnect both neighbours to it. Deletion reconnects the neighbours directly.',
    'Time O(1) with node/neighbours known; O(n) to locate | Extra space O(1) per edit', '[1,3] → insert 2 between → [1,2,3] → delete 2 → [1,3]', 'head/tail edits; empty list; one-node deletion; check for null neighbours.',
    'Insert: node.prev=left; node.next=right\n  If left exists: left.next=node; else head=node\n  If right exists: right.prev=node\nDelete target:\n  Connect target.prev and target.next in both directions\n  Update head if needed; free target',
    [L('Nodes 1 and 3 are neighbours.',[1,3,'null'],{0:'left',1:'right'}),L('Insert 2 and set all four local links.',[1,2,3,'null'],{1:'prev→1; next→3'},{backLinks:'3.prev=2, 2.prev=1'}),L('Delete 2: connect 1.next=3 and 3.prev=1.',[1,3,'null'],{0:'next→3',1:'prev→1'},{result:'[1, 3]'})]);

  add('q_15_3', 'After swapping prev and next in the current doubly linked-list node, which pointer follows the original forward direction?',
    ['The new prev pointer', 'The new next pointer', 'Always head', 'The data field'],
    'The old next pointer has just moved into a different field.',
    'Swap both links at each node, advance through the original next direction, and make the old tail the new head.',
    'Time O(n) | Extra space O(1)', '1 ↔ 2 ↔ 3 → 3 ↔ 2 ↔ 1', 'empty list; one node; preserve the original traversal direction after swapping.',
    'current=head; newHead=nullptr\nWhile current exists:\n  swap(current->prev, current->next)\n  newHead=current\n  current=current->prev  // this is the original next\nhead=newHead',
    [L('Begin at 1 and swap its two links.',[1,2,3,'null'],{0:'current'},{newHead:1}),S('After processing 2, its next points back to 1. Continue via its new prev to 3.',[R('Reversed next chain',[2,1,'null'],[0],{},'list'),R('Still to process',[3])],{newHead:2}),L('Process 3; it becomes the new head.',[3,2,1,'null'],{0:'new head'},{result:'3 ↔ 2 ↔ 1'})]);

  // Days 16–18: pointer techniques and linked-list arithmetic.
  add('q_16_1', 'With slow moving one link and fast moving two, what happens when fast reaches the end?',
    ['slow is at the middle (the second middle for even length in this variant)', 'slow is always at the tail', 'slow returns to head', 'The list has been reversed'],
    'After fast travels about twice as many links, where has slow travelled?',
    'Start both at head. Advance slow once and fast twice while fast and fast.next exist.',
    'Time O(n) | Extra space O(1)', '[1,2,3,4,5] → middle 3', 'empty list; even length returns the second middle; guard both fast and fast.next.',
    'slow=fast=head\nWhile fast != nullptr and fast->next != nullptr:\n  slow=slow->next\n  fast=fast->next->next\nReturn slow',
    [L('Both pointers start at 1.',[1,2,3,4,5,'null'],{0:'slow / fast'}),L('One round: slow is 2, fast is 3.',[1,2,3,4,5,'null'],{1:'slow',2:'fast'}),L('Another round: slow is 3, fast is 5. fast.next is null, so stop.',[1,2,3,4,5,'null'],{2:'slow',4:'fast'},{result:3})]);

  add('q_16_2', 'What proves a cycle in Floyd’s slow/fast-pointer algorithm?',
    ['The two pointers meet at the same node after moving', 'Two different nodes contain equal data', 'The list contains a zero', 'The head address is non-null'],
    'Compare node identity, not stored values. Separate nodes can store the same integer.',
    'Move slow one link and fast two. If a cycle exists, their relative movement eventually makes them meet.',
    'Time O(n) | Extra space O(1)', '1 → 2 → 3 → 4 → node 2 has a cycle', 'acyclic list; one-node self-loop; repeated data values without a cycle.',
    'slow=fast=head\nWhile fast and fast.next:\n  slow=slow.next; fast=fast.next.next\n  If slow == fast: return true\nReturn false',
    [S('Both start at node 1; check equality only after a move.',[R('Next path',[1,2,3,4,'↩ 2'],[],{0:'slow / fast'},'list')]),S('After one move: slow=2, fast=3.',[R('Next path',[1,2,3,4,'↩ 2'],[],{1:'slow',2:'fast'},'list')]),S('After two moves: slow=3, fast=2.',[R('Next path',[1,2,3,4,'↩ 2'],[],{2:'slow',1:'fast'},'list')]),S('After three moves, both reach the same node 4.',[R('Next path',[1,2,3,4,'↩ 2'],[3],{3:'meeting'},'list')],{result:true})]);

  add('q_16_3', 'After Floyd’s pointers meet in a cycle, how can the cycle entry be found?',
    ['Reset one pointer to head, then move both one link at a time until they meet', 'Return the first meeting node in every case', 'Move both two links at a time', 'Delete the head and repeat'],
    'The first meeting can lie inside the cycle without being its entry.',
    'After detecting a meeting, equal-speed pointers from head and the meeting node converge at the cycle entry.',
    'Time O(n) | Extra space O(1)', '1 → 2 → 3 → 4 → node 2; first meeting 4, entry 2', 'no cycle returns null; a cycle beginning at head; a one-node cycle.',
    'Run Floyd cycle detection\nIf no meeting: return nullptr\np=head; q=meeting\nWhile p != q: p=p.next; q=q.next\nReturn p',
    [S('Cycle detection has found a meeting at node 4.',[R('Next path',[1,2,3,4,'↩ 2'],[3],{3:'meeting'},'list')]),S('Reset p to head; leave q at the meeting.',[R('Next path',[1,2,3,4,'↩ 2'],[],{0:'p',3:'q'},'list')]),S('Move each once. 1→2 and 4→2 meet at the entry.',[R('Next path',[1,2,3,4,'↩ 2'],[1],{1:'p / q: entry'},'list')],{result:2})]);

  add('q_16_4', 'Once a node inside a cycle is known, how is the cycle length counted?',
    ['Walk once around the cycle until returning to that same node', 'Count only nodes before the cycle', 'Subtract the stored values of two nodes', 'Always divide the full list length by two'],
    'Use node identity to recognize the return to the starting point.',
    'Find a Floyd meeting, then count next-links until a walking pointer returns to that meeting.',
    'Time O(n) | Extra space O(1)', 'Cycle 2 → 3 → 4 → 2 has length 3', 'no cycle returns 0; self-loop has length 1; ignore the non-cyclic prefix.',
    'Find a meeting using Floyd\nIf no meeting: return 0\ncount=1; current=meeting.next\nWhile current != meeting: count++; current=current.next\nReturn count',
    [S('Use meeting node 4 as the reference.',[R('Cycle path',[4,2,3,'↩ 4'],[],{0:'meeting'},'list')],{count:0}),S('One link reaches 2, a second reaches 3.',[R('Cycle path',[4,2,3,'↩ 4'],[1,2],{},'list')],{links:2}),S('The third link returns to node 4. One full lap has length 3.',[R('Cycle path',[4,2,3,'↩ 4'],[3],{},'list')],{result:3})]);

  add('q_17_1', 'Before setting current.next = previous during list reversal, what must be saved?',
    ['The original current.next pointer', 'Only the head’s data', 'The final list length', 'A copy of every node'],
    'Changing current.next removes the forward route to the unprocessed remainder.',
    'Save the next node, reverse the current link, then advance previous and current.',
    'Time O(n) | Extra space O(1)', '1 → 2 → 3 → null becomes 3 → 2 → 1 → null', 'empty list; one node; do not lose the unprocessed chain.',
    'previous=nullptr; current=head\nWhile current:\n  next=current.next\n  current.next=previous\n  previous=current; current=next\nhead=previous',
    [S('Save 2, then reverse node 1’s link to null.',[R('Reversed prefix',[1,'null'],[0],{},'list'),R('Unprocessed',[2,3,'null'],[],{},'list')],{previous:1,current:2}),S('Save 3, then link 2 back to 1.',[R('Reversed prefix',[2,1,'null'],[0],{},'list'),R('Unprocessed',[3,'null'],[],{},'list')],{previous:2,current:3}),L('Link 3 back to 2. current is null; previous is the new head.',[3,2,1,'null'],{0:'head'},{result:'[3, 2, 1]'})]);

  add('q_17_2', 'For an O(1)-extra-space linked-list palindrome check that preserves the input, what should happen after comparing the halves?',
    ['Reverse the second half again to restore the original links', 'Delete the second half', 'Sort the nodes', 'Replace every node’s data with zero'],
    'The comparison may work after reversing half the list, but the caller may still expect the original list.',
    'Find the first half’s end, reverse the second half, compare values, then restore that half even if a mismatch was found.',
    'Time O(n) | Extra space O(1)', '[1,2,2,1] → true; original links restored', 'empty or one-node list; odd/even length; restore after both successful and unsuccessful comparisons.',
    'Find the end of the first half with slow/fast\nsecond = reverse(firstHalfEnd.next)\nCompare head and second until second ends\nSave whether every compared pair matched\nRestore with firstHalfEnd.next = reverse(second)\nReturn the saved result',
    [L('Find the end of the first half at the first 2.',[1,2,2,1,'null'],{1:'first-half end'}),S('Reverse the second half. Compare the two value sequences.',[R('First half',[1,2],[0],{},'list'),R('Reversed second half',[1,2],[0],{},'list')],{pair:'1 = 1'}),S('The next values are both 2.',[R('First half',[1,2],[1]),R('Reversed second half',[1,2],[1])],{pair:'2 = 2'}),L('Reverse the second half back and reconnect it.',[1,2,2,1,'null'],{0:'restored head'},{result:true})]);

  add('q_17_3', 'In odd-even linked-list grouping, does “odd” refer to node values or positions?',
    ['Positions, using 1-based indexing', 'Values divisible by two', 'Memory addresses', 'Only nodes with negative data'],
    'For values [8,7,6], positions 1 and 3 belong together despite both values being even.',
    'Build odd-position and even-position chains in place, preserve each chain’s order, then attach evenHead after the odd tail.',
    'Time O(n) | Extra space O(1)', '[1,2,3,4,5] → [1,3,5,2,4]', 'empty list; one/two nodes; positions are based on the original order.',
    'If fewer than 2 nodes: return head\nodd=head; even=head.next; evenHead=even\nWhile even and even.next:\n  odd.next=even.next; odd=odd.next\n  even.next=odd.next; even=even.next\nodd.next=evenHead',
    [L('Remember evenHead at node 2.',[1,2,3,4,5,'null'],{0:'odd',1:'evenHead'}),S('Separate by original positions, preserving order.',[R('Odd positions',[1,3,5],[],{},'list'),R('Even positions',[2,4],[],{},'list')]),L('Attach the saved even chain after the odd tail.',[1,3,5,2,4,'null'],{2:'odd tail',3:'evenHead'},{result:'[1, 3, 5, 2, 4]'})]);

  add('q_17_4', 'Why is a dummy node useful when removing the Nth node from the end?',
    ['It gives the head a predecessor so head deletion follows the same unlinking pattern', 'It makes the list sorted', 'It doubles the number of data nodes', 'It removes the need to check invalid N'],
    'What predecessor would you otherwise use if the target itself is the head?',
    'Start two pointers at a dummy, advance fast N links, then move both until fast is last. slow is the target’s predecessor.',
    'Time O(n) | Extra space O(1)', '[1,2,3,4,5], N = 2 → [1,2,3,5]', 'N = length deletes head; N = 1 deletes tail; reject N ≤ 0 or N > length.',
    'dummy.next=head; slow=fast=&dummy\nAdvance fast N times; reject if a move reaches null\nWhile fast.next: slow=slow.next; fast=fast.next\ntarget=slow.next; slow.next=target.next; delete target\nReturn dummy.next',
    [L('Start slow at dummy and lead with fast by 2 links.',['dummy',1,2,3,4,5,'null'],{0:'slow',2:'fast'}),L('Move together until fast reaches 5. slow reaches 3.',['dummy',1,2,3,4,5,'null'],{3:'slow',5:'fast'}),L('Skip and delete slow.next, which is node 4.',[1,2,3,5,'null'],{2:'predecessor'},{result:'[1, 2, 3, 5]'})]);

  add('q_18_1', 'If a most-significant-digit-first list represents 999, what extra structure is needed after adding 1?',
    ['A new leading node containing 1', 'No nodes; return an empty list', 'A trailing negative node', 'A cycle linking the tail to head'],
    'Write 999 + 1 on paper and count the digits in the answer.',
    'Reverse the digit list, propagate carry from the units place, append a remaining carry, then reverse back.',
    'Time O(n) | Extra space O(1), plus a possible new node', '1 → 2 → 9 represents 129; adding 1 gives 1 → 3 → 0', 'all 9s; a single zero; this version expects a non-empty list of decimal digits.',
    'Reverse the list; carry=1\nFor each node while carry != 0:\n  sum=node.data+carry\n  node.data=sum%10; carry=sum/10\nIf carry remains after the last node: append it\nReverse back',
    [L('Reverse to bring the units digit to the front.',[9,2,1,'null'],{0:'units'},{carry:1}),L('9+1=10. Write 0 and carry 1.',[0,2,1,'null'],{0:'updated'},{carry:1}),L('2+1=3. Carry becomes 0; the remaining digit stays 1.',[0,3,1,'null'],{1:'updated'},{carry:0}),L('Reverse back to most-significant-digit-first order.',[1,3,0,'null'],{0:'head'},{result:'130'})]);

  add('q_18_2', 'For reverse-order digit lists, what must the addition loop include after both input lists end?',
    ['Any remaining carry', 'The larger head address', 'Only a count of nodes', 'A copy of the shorter input’s first digit'],
    'Try adding 9 and 1. Their input nodes end before the final leading 1 is written.',
    'Read corresponding digits from units upward, treat an ended input as zero, emit sum%10, and carry sum/10.',
    'Time O(max(n,m)) | Output space O(max(n,m))', '[2,4,3] + [5,6,4] represent 342+465 → [7,0,8]', 'unequal lengths; final carry; this problem stores the units digit first.',
    'carry=0; use a dummy output head\nWhile a or b or carry:\n  sum=(a ? a.data : 0)+(b ? b.data : 0)+carry\n  Append sum%10; carry=sum/10\n  Advance each non-null input pointer\nReturn dummy.next',
    [S('Units: 2+5=7, carry 0.',[R('A: units first',[2,4,3],[0]),R('B: units first',[5,6,4],[0]),R('Output',[7])],{carry:0}),S('Tens: 4+6=10. Emit 0 and carry 1.',[R('A',[2,4,3],[1]),R('B',[5,6,4],[1]),R('Output',[7,0],[1])],{carry:1}),S('Hundreds: 3+4+1=8. No carry remains.',[R('Output: units first',[7,0,8],[2],{},'list')],{result:'[7, 0, 8] = 807'})]);

  add('q_18_3', 'What identifies the intersection of two singly linked lists?',
    ['Both pointers refer to the same node object', 'Two separate nodes contain equal data', 'The two lists have equal lengths', 'Their head values match'],
    'Sharing a node also means sharing the remaining chain from that node onward.',
    'Walk each pointer through its own list and then the other list. Switching heads balances unequal prefix lengths.',
    'Time O(n + m) | Extra space O(1)', 'A: 1→2→8→9, B: 3→8→9; nodes 8 and 9 are physically shared', 'no intersection ends with both null; identical heads; matching data in separate nodes is insufficient.',
    'p=headA; q=headB\nWhile p != q:\n  p = p ? p.next : headB\n  q = q ? q.next : headA\nReturn p  // shared node, or nullptr',
    [S('The two prefixes have different lengths, but the suffix nodes are shared.',[R('A',[1,2,'shared 8','shared 9'],[],{0:'p'},'list'),R('B',[3,'shared 8','shared 9'],[],{0:'q'},'list')]),S('Pointers move through their chains; their first arrival at 8 need not be simultaneous.',[R('A',[1,2,'shared 8','shared 9'],[],{2:'p'},'list'),R('B',[3,'shared 8','shared 9'],[],{2:'q'},'list')]),S('After reaching null, each switches to the other head, balancing the prefix lengths.',[R('Routes',['A then B','B then A'])]),S('Both meet at the same shared node 8.',[R('Shared suffix',[8,9,'null'],[0],{0:'p / q'},'list')],{result:'shared node 8'})]);

  // Days 19–23: stacks, queues and their applications.
  add('q_19_1', 'With top = -1 representing an empty array stack, where does the first push store its value?',
    ['At index 0, after incrementing top', 'At index -1', 'Always at the final array slot', 'At an index equal to the pushed value'],
    'The first valid array index is zero; -1 describes the empty state rather than a storage slot.',
    'Keep top as the index of the newest item. Push increments it; pop reads and decrements it after checking bounds.',
    'Time O(1) per operation | Storage O(capacity)', 'push 5, push 8, pop → returns 8; stack keeps 5', 'overflow at capacity; pop/top on empty; negative stored values are valid.',
    'Initially top=-1\nPush x: reject if top+1 == capacity; data[++top]=x\nPop: reject if top == -1; return data[top--]\nPeek: return data[top] only if non-empty',
    [S('Push 5 into index 0.',[R('Stack: newest at top',[5],[0],{0:'top'},'stack')],{top:0}),S('Push 8 into index 1.',[R('Stack: newest at top',[5,8],[1],{1:'top'},'stack')],{top:1}),S('Pop reads 8, then top decreases to 0.',[R('Remaining stack',[5],[0],{0:'top'},'stack')],{result:'pop = 8'})]);

  add('q_19_2', 'For a circular array queue tracked by front and size, how can full and empty be distinguished?',
    ['Empty means size == 0; full means size == capacity', 'front must always be zero when empty', 'Every zero-valued slot is empty', 'A queue can never be full'],
    'Stored values cannot reliably describe occupancy: zero can be real data.',
    'Keep front and size. Enqueue at (front+size)%capacity; dequeue at front, then advance front modulo capacity.',
    'Time O(1) per operation | Storage O(capacity)', 'Capacity 3: enqueue 10,20; dequeue 10; enqueue 30,40 → queue [20,30,40]', 'full/empty; wraparound; capacity must be positive.',
    'Enqueue x: reject if size==capacity\n  data[(front+size)%capacity]=x; size++\nDequeue: reject if size==0\n  answer=data[front]; front=(front+1)%capacity; size--',
    [S('Enqueue 10 and 20 into slots 0 and 1.',[R('Physical buffer',[10,20,'_'],[0,1])],{front:0,size:2}),S('Dequeue 10. front moves to 1; slot 0 is available again.',[R('Physical buffer',['_',20,'_'],[1])],{front:1,size:1}),S('Enqueue 30 at slot 2; enqueue 40 wraps around to slot 0.',[R('Physical buffer',[40,20,30],[0,2]),R('Logical queue: front first',[20,30,40])],{front:1,size:3,result:'[20, 30, 40]'})]);

  add('q_19_3', 'To implement a stack with one queue, what makes the newly pushed value become the next value popped?',
    ['Rotate all older queue values behind the new value', 'Sort the queue', 'Always remove the smallest value', 'Insert a zero before every value'],
    'A queue removes from its front. The newest stack value must be brought to that front.',
    'Append the new value, then rotate the old queue size times. The queue front now acts as stack top.',
    'Time O(n) push / O(1) pop | Storage O(n)', 'push 10,20,30 → queue [30,20,10]; pop returns 30', 'empty pop; one element; rotate only the pre-push number of items.',
    'Push x:\n  oldSize=queue.size; queue.push(x)\n  Repeat oldSize times: queue.push(queue.front); queue.pop()\nPop: remove queue.front after checking non-empty',
    [S('Push 10. No older values need rotation.',[R('Queue: front at left',[10],[0])]),S('Append 20, then rotate 10 behind it.',[R('Queue: front at left',[20,10],[0])]),S('Append 30, then rotate the two older values.',[R('Queue: front at left',[30,20,10],[0])]),S('Pop the front: it is the most recently pushed value.',[R('Remaining queue',[20,10])],{result:'pop = 30'})]);

  add('q_19_4', 'In the two-stack queue, when should values transfer from the input stack to the output stack?',
    ['Only when the output stack is empty and a front/pop is needed', 'After every push even if output is non-empty', 'Only when the queue has exactly two values', 'Never; stacks already remove in queue order'],
    'The output stack may already contain older values that must leave before the newer input values.',
    'Push into input. When output is empty, reverse input into output; output’s top is now the oldest value.',
    'Amortized time O(1) per operation; a transfer is O(n) | Storage O(n)', 'enqueue 1,2,3; dequeue 1; enqueue 4 → front is still 2', 'empty queue; multiple transfers; never transfer onto non-empty output.',
    'Enqueue x: input.push(x)\nBefore front/dequeue:\n  If output empty: move all input tops into output\n  If output still empty: report empty\n  Otherwise use output.top (and pop for dequeue)',
    [S('Enqueue 1,2,3 into input.',[R('Input stack',[1,2,3],[],{},'stack'),R('Output stack',[],[],{},'stack')]),S('Output is empty, so transfer all three. Its top becomes 1.',[R('Input stack',[],[],{},'stack'),R('Output stack',[3,2,1],[2],{2:'oldest'},'stack')]),S('Dequeue 1, then enqueue 4 into input.',[R('Input stack',[4],[],{},'stack'),R('Output stack',[3,2],[1],{1:'front'},'stack')],{result:'front = 2'})]);

  add('q_20_1', 'Which linked-list position gives O(1) push and pop for a stack?',
    ['The head', 'The tail of a singly linked list without a predecessor pointer', 'A randomly chosen middle node', 'The node with smallest data'],
    'Which end can be changed without finding the node before it?',
    'Use head as stack top. Push inserts at head; pop removes head after saving its successor.',
    'Time O(1) per operation | Storage O(n)', 'push 4, push 9 → 9→4; pop returns 9', 'empty pop; free removed nodes; preserve the remaining chain.',
    'Push x: head = new Node{x, head}\nPop:\n  If head null: report empty\n  save old=head and its data\n  head=head.next; delete old\n  Return saved data',
    [L('Push 4; head is stack top.',[4,'null'],{0:'top'}),L('Push 9 at the head.',[9,4,'null'],{0:'top'}),L('Pop 9 and advance head to 4.',[4,'null'],{0:'top'},{result:'pop = 9'})]);

  add('q_20_2', 'When removing the final node from a linked-list queue, what should happen to tail?',
    ['Set tail to nullptr as well as head', 'Leave tail pointing at the freed node', 'Point tail back to the removed node’s data', 'Allocate a duplicate of the removed node'],
    'A queue with no nodes cannot have a valid tail node.',
    'Keep head for dequeue and tail for enqueue. Maintain both pointers when transitioning to or from an empty queue.',
    'Time O(1) per operation | Storage O(n)', 'enqueue 4,9; dequeue 4; dequeue 9 → empty', 'first insertion; last removal; head and tail must both be null when empty.',
    'Enqueue: create node with next=null\n  If empty: head=tail=node\n  Else: tail.next=node; tail=node\nDequeue: remove head, then if head null set tail=null',
    [L('Enqueue 4, then 9. The oldest value is at head.',[4,9,'null'],{0:'head',1:'tail'}),L('Dequeue 4. Both head and tail now identify 9.',[9,'null'],{0:'head / tail'}),S('Dequeue 9 and clear both pointers.',[R('Queue',[])],{head:'null',tail:'null',result:'empty'})]);

  add('q_20_3', 'Why is "([)]" not balanced?',
    ['The closing ) does not match the most recent unmatched opening [', 'It contains an odd number of brackets', 'It starts with an opening bracket', 'Different bracket types can never be mixed'],
    'Bracket matching follows last-opened, first-closed order.',
    'Push opening brackets. For a closing bracket, require the matching opening at stack top. The stack must be empty at the end.',
    'Time O(n) | Extra space O(n)', '([{}]) → balanced', 'an early closing bracket; leftover openings; mixed types; empty input.',
    'For bracket in s:\n  If opening: push it\n  Else: if stack empty or top is not matching opening: return false\n        otherwise pop\nReturn stack.empty()',
    [S('Read the three openings and push each one.',[R('Input','([{}])',[0,1,2]),R('Unmatched openings',['(','[','{'],[2],{},'stack')]),S('} matches { at the top; pop it. Then ] matches [.',[R('Input','([{}])',[3,4]),R('Unmatched openings',['('],[0],{},'stack')]),S(') matches the remaining (. The stack is empty.',[R('Input','([{}])',[5]),R('Unmatched openings',[],[],{},'stack')],{result:true})]);

  add('q_20_4', 'A Min Stack contains [2, 2]. After popping once, what should getMin return?',
    ['2', 'No minimum exists', '0', 'The previous top index'],
    'Popping one occurrence does not remove every occurrence of the minimum.',
    'Store a pair (value, minimum so far) at every stack level. Popping naturally restores the previous minimum, including duplicate minima.',
    'Time O(1) per operation | Storage O(n)', 'push 5,3,7; pop 7; pop 3 → minimum 5', 'duplicate minima; negative values; getMin on empty.',
    'Push x: push (x, empty ? x : min(x, top.minimum))\nPop: remove the top pair after checking non-empty\nTop: top.value\ngetMin: top.minimum',
    [S('Each pushed value carries the minimum at its level.',[R('(value, minimum)', ['5 / 5','3 / 3','7 / 3'],[2],{},'stack')],{minimum:3}),S('Pop 7; the pair for 3 still says minimum 3.',[R('(value, minimum)',['5 / 5','3 / 3'],[1],{},'stack')],{minimum:3}),S('Pop 3; the remaining level restores minimum 5.',[R('(value, minimum)',['5 / 5'],[0],{},'stack')],{result:5})]);

  add('q_21_1', 'For a strictly next-greater value, what should happen to stack-top values <= the current value during a right-to-left scan?',
    ['Pop them before choosing the answer', 'Keep all of them as greater candidates', 'Add them to the current value', 'Return them all as answers'],
    'An equal or smaller value cannot be strictly greater than the current one.',
    'Scan right to left with a monotonic stack. Remove unsuitable candidates; the remaining top is the nearest greater value to the right.',
    'Time O(n) | Extra space O(n)', '[2,1,2,4,3] → [4,2,4,-1,-1]', 'duplicates; decreasing input; no greater value uses -1.',
    'For i from n-1 down to 0:\n  While stack not empty and top <= a[i]: pop\n  answer[i] = empty ? -1 : top\n  push a[i]',
    [S('3 has nothing to its right. At 4, pop 3; 4 also has no greater value.',[R('Array',[2,1,2,4,3],[3,4]),R('Candidates',[4],[],{},'stack')],{answers:'_ _ _ -1 -1'}),S('At the second 2, stack top 4 is its answer.',[R('Array',[2,1,2,4,3],[2]),R('Candidates',[4,2],[],{},'stack')],{answer:4}),S('At 1, top 2 is the answer.',[R('Array',[2,1,2,4,3],[1]),R('Candidates',[4,2,1],[],{},'stack')],{answer:2}),F('At the first 2, pop 1 and equal 2. The next greater candidate is 4.',[4,2,4,-1,-1],[0],{result:'[4, 2, 4, -1, -1]'})]);

  add('q_21_2', 'Why scan a circular next-greater problem over 2n virtual positions?',
    ['To expose values after wrapping from the end back to the start', 'To duplicate the output length', 'To sort both halves', 'To allow the same value to count as strictly greater than itself'],
    'For the last element, a valid greater neighbour might occur near the start.',
    'Use i%n to visit a virtual doubled array. Build candidates during the first reverse pass, then fill answers during the second.',
    'Time O(n) | Extra space O(n)', '[1,2,1] → [2,-1,2]', 'all equal; one element; only strict greater values qualify.',
    'For i from 2*n-1 down to 0:\n  value=a[i%n]\n  While stack not empty and top <= value: pop\n  If i < n: answer[i] = empty ? -1 : top\n  Push value',
    [S('A virtual doubled view makes wraparound visible.',[R('Virtual array',[1,2,1,1,2,1],[3,4,5])]),S('For original index 2 (value 1), wrapping reaches the 2 at original index 1.',[R('Original',[1,2,1],[1,2])],{answerAt2:2}),S('2 has no strictly greater value, even after wrapping.',[R('Original',[1,2,1],[1])],{answerAt1:-1}),F('The first 1 also finds 2 next.',[2,-1,2],[0],{result:'[2, -1, 2]'})]);

  add('q_21_3', 'For strictly next-smaller values, which stack tops are removed when scanning right to left?',
    ['Values greater than or equal to the current value', 'Only values strictly smaller than the current value', 'No values are ever removed', 'Only negative values'],
    'The answer must be smaller, so an equal value is not a valid candidate.',
    'Maintain smaller candidates to the right. Pop values >= current; the remaining top is the next strictly smaller value.',
    'Time O(n) | Extra space O(n)', '[4,8,5,2,25] → [2,5,2,-1,-1]', 'equal values; increasing/decreasing arrays; missing answers.',
    'Scan i from n-1 down to 0\nWhile stack not empty and top >= a[i]: pop\nanswer[i] = empty ? -1 : top\nPush a[i]',
    [S('25 has no smaller value to its right. At 2, pop 25.',[R('Array',[4,8,5,2,25],[3,4]),R('Candidates',[2],[],{},'stack')],{answers:'_ _ _ -1 -1'}),S('5 finds 2, then 8 finds 5.',[R('Array',[4,8,5,2,25],[1,2]),R('Candidates',[2,5,8],[],{},'stack')]),F('At 4, pop 8 and 5. The nearest remaining smaller value is 2.',[2,5,2,-1,-1],[0],{result:'[2, 5, 2, -1, -1]'})]);

  add('q_21_4', 'For [3,4,2,7,5], how many values strictly greater than 3 occur to its right?',
    ['3: the values 4, 7 and 5', '1: only the nearest greater value 4', '4: every later element', '0: 3 is not the smallest element'],
    'This task counts every qualifying value to the right, rather than returning just the nearest one.',
    'For each queried index, scan its suffix and count all strictly greater values. A direct query scan is simple and correct for this exercise’s query limits.',
    'Time O(n × number of queries) | Output space O(number of queries)', 'Array [3,4,2,7,5], queried indices [0,2] → [3,2]', 'equal values do not count; query at the last index; queries need valid indices.',
    'For each queried position i:\n  count=0\n  For j from i+1 to n-1:\n    If a[j] > a[i]: count++\n  Append count to answers',
    [F('For index 0, use threshold 3. The value 4 qualifies.',[3,4,2,7,5],[0,1],{count:1}),F('2 does not qualify; 7 and 5 do. The first answer is 3.',[3,4,2,7,5],[1,3,4],{count:3}),F('For index 2, threshold is 2. Both 7 and 5 qualify.',[3,4,2,7,5],[2,3,4],{result:'[3, 2]'})]);

  add('q_22_1', 'How much water can one position hold once its left and right maximum boundaries are known?',
    ['max(0, min(leftMax, rightMax) − height)', 'leftMax + rightMax + height', 'Always its own height', 'max(leftMax, rightMax) without subtracting height'],
    'Water escapes over the lower boundary, and the bar itself occupies part of that height.',
    'Process the lower endpoint with two pointers, maintaining the highest boundary seen from each side. Accumulate the gap above each processed bar.',
    'Time O(n) | Extra space O(1)', '[3,0,2,0,4] → 7 units of water', 'empty input; flat/increasing heights; non-negative bar heights.',
    'left=0; right=n-1; leftMax=rightMax=water=0\nWhile left <= right:\n  If a[left] <= a[right]:\n    leftMax=max(leftMax,a[left]); water+=leftMax-a[left]; left++\n  Else:\n    rightMax=max(rightMax,a[right]); water+=rightMax-a[right]; right--',
    [F('3 is the lower endpoint. Establish leftMax=3.',[3,0,2,0,4],[0,4],{water:0}),F('At index 1, boundary 3 above height 0 holds 3 units.',[3,0,2,0,4],[1],{water:3}),F('At index 2, height 2 holds 1 more unit.',[3,0,2,0,4],[2],{water:4}),F('Index 3 holds 3 more. The final boundary adds none.',[3,0,2,0,4],[3],{result:7})]);

  add('q_22_2', 'Which adjacent surviving asteroids can collide when positive moves right and negative moves left?',
    ['A positive value on the left and a negative value arriving from the right', 'A negative on the left and a positive on the right', 'Any two positive values', 'Any two negative values'],
    'Draw their movement arrows and check whether the pair moves towards each other.',
    'Use a stack of survivors. An incoming negative asteroid collides repeatedly with positive stack tops until one side is destroyed or the directions no longer meet.',
    'Time O(n) | Extra space O(n)', '[10,2,-5] → [10]', 'equal magnitudes destroy both; chain reactions; same-direction values do not collide.',
    'For each asteroid x:\n  While x survives, x<0, and stack top>0:\n    Smaller top: pop it and continue\n    Equal magnitudes: pop top and destroy x\n    Larger top: destroy x\n  If x survives: push x',
    [S('10 and 2 both move right, so both survive initially.',[R('Survivors',[10,2],[1],{},'stack')]),S('-5 arrives from the right and destroys the smaller 2.',[R('Survivors',[10],[0],{},'stack'),R('Incoming',[-5])]),S('The remaining 10 destroys -5. No more collision is pending.',[R('Survivors',[10],[0],{},'stack')],{result:'[10]'})]);

  add('q_22_3', 'For stock span, should an earlier equal price be included in today’s consecutive span?',
    ['Yes; the span includes consecutive earlier prices <= today’s price', 'No; equality always stops the span', 'Only if it is the first day', 'The span counts future prices instead'],
    'The standard span definition includes prices less than or equal to today’s.',
    'Keep indices of previous strictly greater prices. Pop smaller or equal prices; the nearest remaining greater index marks the span’s left boundary.',
    'Time O(n) total | Extra space O(n)', '[100,80,60,70,60,75,85] → [1,1,1,2,1,4,6]', 'equal prices; rising prices; count today itself.',
    'For each day i:\n  While stack not empty and price[top] <= price[i]: pop\n  span[i] = empty ? i+1 : i-top\n  Push index i',
    [F('The first three days have decreasing prices, so their spans are 1.',[100,80,60,70,60,75,85],[0,1,2],{spans:'1 1 1'}),F('70 includes the preceding 60. Previous greater is 80 at index 1: span 3-1=2.',[100,80,60,70,60,75,85],[2,3],{span:2}),F('75 spans indices 2..5; the previous greater remains 80 at 1.',[100,80,60,70,60,75,85],[2,3,4,5],{span:4}),F('85 spans indices 1..6; only 100 stops it.',[100,80,60,70,60,75,85],[1,2,3,4,5,6],{result:'[1, 1, 1, 2, 1, 4, 6]'})]);

  add('q_23_1', 'When a histogram bar at index p is popped at current index i, and the new stack top is left, what width can that bar span?',
    ['i − left − 1, treating an empty stack as left = -1', 'i + left + 1', 'Always p', 'Only one bar regardless of neighbours'],
    'The usable positions lie strictly between the smaller boundaries.',
    'Keep increasing-height indices. A shorter bar finalizes rectangles for popped heights; calculate each popped bar’s widest supported interval.',
    'Time O(n) | Extra space O(n)', '[2,1,5,6,2,3] → area 10 (height 5, width 2)', 'empty histogram; equal heights; flush remaining bars with a virtual final height 0.',
    'Scan i from 0 through n, using current=0 at i==n\nWhile stack non-empty and height[top] >= current:\n  h=height[pop()]; left=empty ? -1 : top\n  best=max(best, h*(i-left-1))\nIf i<n: push i',
    [F('Heights 5 and 6 are candidates when the scan reaches index 3.',[2,1,5,6,2,3],[2,3],{stackIndices:'1, 2, 3'}),F('At index 4, height 2 pops height 6: width 1, area 6.',[2,1,5,6,2,3],[3,4],{area:6}),F('Then pop height 5. Left boundary is index 1; width 4-1-1=2.',[2,1,5,6,2,3],[2,3],{area:10}),F('Finish the scan and flush the stack; no larger area appears.',[2,1,5,6,2,3],[2,3],{result:10})]);

  add('q_23_2', 'In the row-by-row histogram method for a binary matrix, what happens to height[c] when the current cell is 0?',
    ['Reset height[c] to 0', 'Keep increasing height[c]', 'Set every column height to 1', 'Delete the previous row'],
    'A zero breaks any vertical run of consecutive ones in that column.',
    'Build heights of consecutive ones ending at each row, then run largest-histogram-rectangle on those heights.',
    'Time O(rows × cols) | Extra space O(cols)', 'Rows 10100 / 10111 / 11111 / 10010 → maximum rectangle area 6', 'all zeros; one row/column; rectangular input; histogram heights reset on zeros.',
    'heights initially all 0; best=0\nFor each matrix row:\n  For each column c:\n    heights[c] = cell==1 ? heights[c]+1 : 0\n  best=max(best, largestHistogramRectangle(heights))',
    [S('First row builds the initial heights.',[R('Binary row',[1,0,1,0,0]),R('Histogram',[1,0,1,0,0])],{rowBest:1}),S('Second row extends vertical runs only where its cells are 1.',[R('Binary row',[1,0,1,1,1]),R('Histogram',[2,0,2,1,1])],{rowBest:3}),S('At row 2, columns 2..4 support height 2 across width 3.',[R('Binary row',[1,1,1,1,1]),R('Histogram',[3,1,3,2,2],[2,3,4])],{area:6}),S('The last row resets columns containing zero. Its best area is 4; global best remains 6.',[R('Binary row',[1,0,0,1,0]),R('Histogram',[4,0,0,3,0])],{result:6})]);

  add('q_23_3', 'Why does a sliding-window maximum deque store indices rather than only values?',
    ['Indices identify candidates that have left the current window', 'Values cannot be compared', 'Every index is also the maximum', 'It avoids needing a window size'],
    'Two equal values at different positions leave the window at different times.',
    'Keep indices in decreasing value order, expire old indices from the front, and remove dominated candidates from the back.',
    'Time O(n) | Extra space O(k)', '[1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]', 'k = 1; k = n; equal values; reject k ≤ 0 or k > n.',
    'For each index i:\n  Remove deque front indices <= i-k\n  While deque non-empty and a[back] <= a[i]: pop back\n  Push i\n  If i>=k-1: append a[deque.front]',
    [F('Window [1,3,-1]: index 1 holds its maximum 3.',[1,3,-1,-3,5,3,6,7],[0,1,2],{dequeIndices:'[1,2]',output:'[3]'}),F('Window [3,-1,-3] still has maximum 3.',[1,3,-1,-3,5,3,6,7],[1,2,3],{output:'[3,3]'}),F('When 5 arrives, expire old index 1 and remove smaller candidates.',[1,3,-1,-3,5,3,6,7],[2,3,4],{dequeIndices:'[4]',output:'[3,3,5]'}),F('The next maxima are 5, then 6, then 7.',[1,3,-1,-3,5,3,6,7],[5,6,7],{result:'[3, 3, 5, 5, 6, 7]'})]);

  // Day 24 revisits the same algorithms deliberately, with separate review checks.
  function review(id, source, quiz, options, hint) {
    lessons[id] = { ...lessons[source], quiz, options, hint, explanation: options[0] + '. ' + lessons[source].idea };
  }
  review('q_24_1', 'q_5_3', 'Re-solving Kadane from memory: for [-2,3,-1,4,-5], which non-empty subarray sum is optimal?',
    ['6 from [3,-1,4]', '7 from taking only the positive values, ignoring the gap', '0 because the input contains negatives', '4 because a subarray must contain exactly one value'],
    'A subarray is contiguous. Track the best sum ending at each position.');
  review('q_24_2', 'q_12_2', 'Re-solving longest palindromic substring: what does the even centre in "cbbd" find?',
    ['bb, of length 2', 'cbbd, of length 4', 'cbd, because skipping letters is allowed in a substring', 'No palindrome, because the string length is even'],
    'A substring uses consecutive positions. Try expanding around the gap between the two b characters.');

  add('q_24_3', 'For the reverse-list and cycle-detection review, which pair of tests checks genuinely different pointer behaviour?',
    ['An acyclic multi-node list and a one-node self-loop', 'The same acyclic list run twice', 'Two arrays with different sums', 'Only a list’s printed data, without checking links'],
    'A self-loop has a valid node whose next points back to itself. A null-terminated chain has a different stopping condition.',
    'Practise cycle detection separately, then reverse a null-terminated list with previous/current/next. Check pointer structure as well as values.',
    'Time O(n) for each algorithm | Extra space O(1)', 'Detect no cycle in [1,2,3], then reverse it to [3,2,1]', 'empty list; one node; self-loop; longer cycle; reverse only the acyclic input in this walkthrough.',
    lessons.q_16_2.algorithm + '\n\nFor a list established to be acyclic:\n' + lessons.q_17_1.algorithm,
    [L('First run slow/fast on the original null-terminated chain.',[1,2,3,'null'],{0:'slow / fast'}),L('slow reaches 2 and fast reaches 3; fast.next is null. No cycle.',[1,2,3,'null'],{1:'slow',2:'fast'},{cycle:false}),...lessons.q_17_1.frames]);

  add('q_24_4', 'Why do balanced-parentheses and next-greater-element solutions use different stack rules?',
    ['One matches bracket types; the other maintains ordered candidate values', 'Both should pop after every input without checking', 'Both require sorting the input first', 'A stack can store brackets but cannot store numbers'],
    'Ask what each stack represents and what makes its top invalid.',
    'State the stack invariant before coding: unmatched openings for brackets, or decreasing candidate values for next greater.',
    'Time O(n + m) for the two inputs | Extra space O(n + m) in the worst case', 'Check ([{}]), then find NGE for [2,1,2,4,3]', 'mismatched/leftover brackets; equal array values; absent greater values.',
    'Bracket task:\n' + lessons.q_20_3.algorithm + '\n\nNext-greater task:\n' + lessons.q_21_1.algorithm,
    [...lessons.q_20_3.frames,...lessons.q_21_1.frames]);

  add('q_24_5', 'In your think-out-loud session, which explanation best demonstrates understanding?',
    ['Trace an example, explain why the method works, test an edge case, and justify time/space costs', 'Read memorized code without discussing it', 'Name an algorithm and stop', 'Skip assumptions and claim every solution is O(1)'],
    'Your brother should be able to follow your decisions and check them, even before seeing the final code.',
    'Use one solved problem to practise a complete conversation: clarify, trace, explain, test, and discuss complexity.',
    'Time: a short practice conversation | Space: your scratch work', 'Explain one completed sprint problem to your brother', 'a question you cannot answer yet: say what you know, trace a smaller case, and ask for clarification.',
    'Clarify the input and expected output\nTrace a small example by hand\nExplain the invariant and main steps\nTest an ordinary case and an edge case\nJustify time and extra space\nInvite one follow-up question',
    [S('Start by stating the input contract and expected output.',[R('Conversation',['Clarify','Trace','Explain','Test','Complexity'],[0])]),S('Work through a small example, keeping variables visible.',[R('Conversation',['Clarify','Trace','Explain','Test','Complexity'],[1])]),S('Explain why each step is valid, then try an edge case.',[R('Conversation',['Clarify','Trace','Explain','Test','Complexity'],[2,3])]),S('Count the work and extra storage; discuss a follow-up with your brother.',[R('Conversation',['Clarify','Trace','Explain','Test','Complexity'],[4])],{result:'Explain, trace, test, justify'})]);

  globalThis.SprintLessons = lessons;
})();
