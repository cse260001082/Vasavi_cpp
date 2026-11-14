# Sprint tracker link audit

Checked: 2026-11-05T17:36:55+00:00

Source: `Google STEP/sprint_tracker.html`. Includes navigation, every problem/review link, stylesheets and scripts. Preconnect/DNS hints are excluded: an origin is not a page endpoint.

- 115 URL references; 101 unique destinations.
- 86 problem/review rows, all included below.
- Results: 101 verified, 0 broken, 0 blocked, 0 unverified, 0 not checked online.
- Link lint errors: 0.

HTTP success confirms availability, not future permanence. Blocked/timeout responses are not counted as verified. Problem-topic matches and exercise variants were reviewed separately.

## Lint findings

No link lint errors found in this run.

## Topic and variant review

- Day 2 Linear Search points to Linear Search, not the working but incorrect binary-search exercise. Rotation by D points to left rotation.
- Day 8 uses the practice problem whose examples reverse word order; the similarly named blog reverses individual words and is not used.
- Introduction rows use linked-list reading resources. Combined insertion/deletion and Day 24 review rows have separate links for both named operations.
- The maximum-subarray printing task explicitly extends the sum-only Kadane exercise; its shared URL is intentional.
- Integer-to-Roman and exactly-K-distinct-character substring counting use matching GeeksforGeeks problems where the old TUF destinations were unavailable.

## Updated problem links

| Day | ID | Exercise | Current destination(s) | Result |
| --- | --- | --- | --- | --- |
| 1 | `q_1_1` | Largest Element in an Array | [702. Largest Element](https://takeuforward.org/practice/dsa/largest-element) | ok |
| 1 | `q_1_2` | Second Largest Element in an Array without sorting | [695. Second Largest Element](https://takeuforward.org/practice/dsa/second-largest-element) | ok |
| 1 | `q_1_3` | Check if the array is sorted | [743. Check if the Array is Sorted I](https://takeuforward.org/practice/dsa/check-if-the-array-is-sorted-i) | ok |
| 1 | `q_1_4` | Remove duplicates from sorted array | [196. Remove duplicates from sorted array](https://takeuforward.org/practice/dsa/remove-duplicates-from-sorted-array) | ok |
| 2 | `q_2_1` | Left Rotate an array by one place | [832. Left Rotate Array by One](https://takeuforward.org/practice/dsa/left-rotate-array-by-one) | ok |
| 2 | `q_2_2` | Left rotate an array by D places (The 3-reverse trick!) | [237. Left Rotate Array by K Places](https://takeuforward.org/practice/dsa/left-rotate-array) | ok |
| 2 | `q_2_3` | Move Zeros to the end (In-place two-pointer swap) | [248. Move Zeros to End](https://takeuforward.org/practice/dsa/move-zeros-to-end) | ok |
| 2 | `q_2_4` | Linear Search | [838. Linear Search](https://takeuforward.org/practice/dsa/linear-search) | ok |
| 3 | `q_3_1` | Find the Union of two sorted arrays | [713. Union of two sorted arrays](https://takeuforward.org/practice/dsa/union-of-two-sorted-arrays) | ok |
| 3 | `q_3_2` | Intersection of two sorted arrays | [706. Intersection of two sorted arrays](https://takeuforward.org/practice/dsa/intersection-of-two-sorted-arrays) | ok |
| 3 | `q_3_3` | Find the number that appears once, others twice | [63. Single Number - I](https://takeuforward.org/practice/dsa/single-number---i) | ok |
| 3 | `q_3_4` | Find missing number in an array | [116. Find missing number](https://takeuforward.org/practice/dsa/find-missing-number) | ok |
| 4 | `q_4_1` | Two Sum (Check pair exists & return indices) | [1. Two Sum](https://takeuforward.org/practice/dsa/two-sum) | ok |
| 4 | `q_4_2` | Longest Subarray with given sum K (Positives & Zeros) | [Longest subarray with given sum K(positives)](https://takeuforward.org/practice/dsa/longest-subarray-with-given-sum-k) | ok |
| 4 | `q_4_3` | Longest Subarray with sum K (Positives + Negatives) | [178. Longest subarray with sum K](https://takeuforward.org/practice/dsa/longest-subarray-with-sum-k) | ok |
| 5 | `q_5_1` | Sort an array of 0s, 1s and 2s (Dutch National Flag) | [Sort an array of 0's 1's and 2's](https://takeuforward.org/practice/dsa/sort-an-array-of-0s-1s-and-2s) | ok |
| 5 | `q_5_2` | Find the Majority Element (> N/2 times - Moore's Voting) | [83. Majority Element-I](https://takeuforward.org/practice/dsa/majority-element-i) | ok |
| 5 | `q_5_3` | Kadane’s Algorithm (Maximum Subarray Sum in $O(N)$) | [12. Kadane's Algorithm](https://takeuforward.org/practice/dsa/kadane%27s-algorithm) | ok |
| 5 | `q_5_4` | Print subarray with maximum subarray sum (extend the sum-only exercise) | [12. Kadane's Algorithm](https://takeuforward.org/practice/dsa/kadane%27s-algorithm) | ok |
| 6 | `q_6_1` | Stock Buy and Sell | [50. Best time to buy and sell stock](https://takeuforward.org/practice/dsa/best-time-to-buy-and-sell-stock) | ok |
| 6 | `q_6_2` | Rearrange array in alternating positive and negative items | [375. Rearrange array elements by sign](https://takeuforward.org/practice/dsa/rearrange-array-elements-by-sign) | ok |
| 6 | `q_6_3` | Leaders in an Array (Scan right to left) | [512. Leaders in an Array](https://takeuforward.org/practice/dsa/leaders-in-an-array) | ok |
| 6 | `q_6_4` | Longest Consecutive Sequence in an Array ($O(N)$ with Set) | [97. Longest Consecutive Sequence in an Array](https://takeuforward.org/practice/dsa/longest-consecutive-sequence-in-an-array) | ok |
| 7 | `q_7_1` | Set Matrix Zeroes | [34. Set Matrix Zeroes](https://takeuforward.org/practice/dsa/set-matrix-zeroes) | ok |
| 7 | `q_7_2` | Rotate Matrix by 90 degrees (Transpose + Reverse) | [70. Rotate matrix by 90 degrees](https://takeuforward.org/practice/dsa/rotate-matrix-by-90-degrees) | ok |
| 7 | `q_7_3` | Print matrix in spiral manner (Four boundaries) | [107. Print the matrix in spiral manner](https://takeuforward.org/practice/dsa/print-the-matrix-in-spiral-manner) | ok |
| 8 | `q_8_1` | Remove Outermost Parentheses | [420. Remove Outermost Parentheses](https://takeuforward.org/practice/dsa/remove-outermost-parentheses) | ok |
| 8 | `q_8_2` | Reverse Words in a String | [189. Reverse every word in a string](https://takeuforward.org/practice/dsa/reverse-every-word-in-a-string) | ok |
| 8 | `q_8_3` | Largest Odd Number in a String | [341. Largest Odd Number in a String](https://takeuforward.org/practice/dsa/largest-odd-number-in-a-string) | ok |
| 9 | `q_9_1` | Longest Common Prefix | [79. Longest Common Prefix](https://takeuforward.org/practice/dsa/longest-common-prefix) | ok |
| 9 | `q_9_2` | Isomorphic Strings (Dual character mapping) | [252. Isomorphic Strings](https://takeuforward.org/practice/dsa/isomorphic-string) | ok |
| 9 | `q_9_3` | Check if One String is a Rotation of Another ($s_1 + s_1$ trick) | [324. Rotate String](https://takeuforward.org/practice/dsa/rotate-string) | ok |
| 10 | `q_10_1` | Check if Two Strings are Anagram of Each Other | [52. Valid Anagram](https://takeuforward.org/practice/dsa/valid-anagram) | ok |
| 10 | `q_10_2` | Sort Characters by Frequency | [303. Sort Characters by Frequency](https://takeuforward.org/practice/dsa/sort-characters-by-frequency) | ok |
| 10 | `q_10_3` | Maximum Nesting Depth of the Parentheses | [392. Maximum Nesting Depth of the Parentheses](https://takeuforward.org/practice/dsa/maximum-nesting-depth-of-the-parentheses) | ok |
| 11 | `q_11_1` | Roman Number to Integer | [87. Roman to Integer](https://takeuforward.org/practice/dsa/roman-to-integer) | ok |
| 11 | `q_11_2` | Integer to Roman (Greedy lookup table) | [Decimal to Roman \| Practice \| GeeksforGeeks](https://www.geeksforgeeks.org/problems/convert-to-roman-no/1) | ok |
| 11 | `q_11_3` | Implement Atoi (String to Integer with overflow handling) | [49. String to Integer (atoi)](https://takeuforward.org/practice/dsa/string-to-integer-atoi) | ok |
| 12 | `q_12_1` | Check if String is Palindrome | [278. Check if String is Palindrome or Not](https://takeuforward.org/practice/dsa/check-if-string-is-palindrome-or-not-) | ok |
| 12 | `q_12_2` | Longest Palindromic Substring | [30. Longest Palindromic Substring](https://takeuforward.org/practice/dsa/longest-palindromic-substring) | ok |
| 12 | `q_12_3` | Count Number of Substrings with K distinct characters | [Substrings with K Distinct \| Practice \| GeeksforGeeks](https://www.geeksforgeeks.org/problems/count-number-of-substrings4528/1) | ok |
| 13 | `q_13_1` | Introduction to Linked List & Struct Node Creation in C++ | [Singly Linked List: Structure and Basic Operations](https://takeuforward.org/blogs/data-structure-and-algorithm/singly-linked-list) | ok |
| 13 | `q_13_2` | Traversal in a Linked List (Iterate until `temp == nullptr`) | [1014. Traversal in Linked List](https://takeuforward.org/practice/dsa/traversal-in-linked-list) | ok |
| 13 | `q_13_3` | Find the Length of a Linked List | [998. Find the length of the Linked List](https://takeuforward.org/practice/dsa/find-the-length-of-the-linked-list) | ok |
| 13 | `q_13_4` | Search an Element in a Linked List | [1039. Search in Linked List](https://takeuforward.org/practice/dsa/search-in-linked-list) | ok |
| 14 | `q_14_1` | Insertion at Head of LL | [941. Insertion at the head of Linked List](https://takeuforward.org/practice/dsa/insertion-at-the-head-of-ll) | ok |
| 14 | `q_14_2` | Insertion at Tail & K-th Position of LL | [958. Insertion at the tail of Linked List](https://takeuforward.org/practice/dsa/insertion-at-the-tail-of-ll)<br>[954. Insertion at the Kth position of Linked List](https://takeuforward.org/practice/dsa/insertion-at-the-kth-position-of-ll) | ok |
| 14 | `q_14_3` | Deletion of Head & Tail of LL | [901. Deletion of the head of LL](https://takeuforward.org/practice/dsa/deletion-of-the-head-of-ll)<br>[914. Deletion of the tail of Linked List](https://takeuforward.org/practice/dsa/deletion-of-the-tail-of-ll) | ok |
| 14 | `q_14_4` | Deletion of K-th Node & Node with Value X | [905. Deletion of the Kth element of Linked List](https://takeuforward.org/practice/dsa/deletion-of-the-kth-element-of-ll)<br>[891. Delete the element with value X](https://takeuforward.org/practice/dsa/delete-the-element-with-value-x) | ok |
| 15 | `q_15_1` | Introduction to Doubly Linked List & Representation | [Doubly Linked List: Structure and Basic Operations](https://takeuforward.org/blogs/data-structure-and-algorithm/doubly-linked-list) | ok |
| 15 | `q_15_2` | Insert and Delete in Doubly Linked List | [980. Insert node before head in Doubly Linked List](https://takeuforward.org/practice/dsa/insert-node-before-head-in-dll)<br>[879. Delete head of Doubly Linked List](https://takeuforward.org/practice/dsa/delete-head-of-dll) | ok |
| 15 | `q_15_3` | Reverse a Doubly Linked List (Swap `prev` and `next`) | [601. Reverse a Doubly Linked List](https://takeuforward.org/practice/dsa/reverse-a-doubly-linked-list) | ok |
| 16 | `q_16_1` | Middle of a Linked List (`slow` +1, `fast` +2) | [157. Find Middle of Linked List](https://takeuforward.org/practice/dsa/find-middle-of-linked-list) | ok |
| 16 | `q_16_2` | Detect a Loop/Cycle in a Linked List | [22. Detect a loop in LL](https://takeuforward.org/practice/dsa/detect-a-loop-in-ll) | ok |
| 16 | `q_16_3` | Find the Starting Point of a Loop in LL | [220. Find the starting point in LL](https://takeuforward.org/practice/dsa/find-the-starting-point-in-ll) | ok |
| 16 | `q_16_4` | Length of a Loop in Linked List | [769. Length of loop in LL](https://takeuforward.org/practice/dsa/length-of-loop-in-ll) | ok |
| 17 | `q_17_1` | Reverse a Linked List (Iterative with `prev`, `curr`, `next`) | [3. Reverse a LL](https://takeuforward.org/practice/dsa/reverse-a-ll) | ok |
| 17 | `q_17_2` | Check if a Linked List is a Palindrome | [198. Check if LL is palindrome or not](https://takeuforward.org/practice/dsa/check-if-ll-is-palindrome-or-not) | ok |
| 17 | `q_17_3` | Odd Even Linked List (Group odd indices, then even) | [110. Segregate odd and even nodes in Linked List](https://takeuforward.org/practice/dsa/segregate-odd-and-even-nodes-in-ll) | ok |
| 17 | `q_17_4` | Remove the Nth Node from End of List | [81. Remove Nth node from the back of the LL](https://takeuforward.org/practice/dsa/remove-nth-node-from-the-back-of-the-ll) | ok |
| 18 | `q_18_1` | Add 1 to a number represented as a Linked List | [767. Add one to a number represented by LL](https://takeuforward.org/practice/dsa/add-one-to-a-number-represented-by-ll) | ok |
| 18 | `q_18_2` | Add two numbers represented as Linked Lists | [93. Add two numbers in Linked List](https://takeuforward.org/practice/dsa/add-two-numbers-in-ll) | ok |
| 18 | `q_18_3` | Intersection point of two Y-shaped Linked Lists | [167. Find the intersection point of Y LL](https://takeuforward.org/practice/dsa/find-the-intersection-point-of-y-ll) | ok |
| 19 | `q_19_1` | Implement Stack using Arrays (`top` index pointer) | [144. Implement Stack using Arrays](https://takeuforward.org/practice/dsa/implement-stack-using-arrays) | ok |
| 19 | `q_19_2` | Implement Queue using Arrays (Circular buffer with `% N`) | [147. Implement Queue using Arrays](https://takeuforward.org/practice/dsa/implement-queue-using-arrays) | ok |
| 19 | `q_19_3` | Implement Stack using Queue (Rotation technique) | [155. Implement Stack using Queue](https://takeuforward.org/practice/dsa/implement-stack-using-queue) | ok |
| 19 | `q_19_4` | Implement Queue using Stack (Amortized $O(1)$ dual stacks) | [68. Implement Queue using Stack](https://takeuforward.org/practice/dsa/implement-queue-using-stack) | ok |
| 20 | `q_20_1` | Implement Stack using Linked List | [919. Implement stack using Linkedlist](https://takeuforward.org/practice/dsa/implement-stack-using-linkedlist) | ok |
| 20 | `q_20_2` | Implement Queue using Linked List | [894. Implement queue using Linkedlist](https://takeuforward.org/practice/dsa/implement-queue-using-linkedlist) | ok |
| 20 | `q_20_3` | Check for Balanced Parentheses (Valid Parentheses) | [164. Balanced Paranthesis](https://takeuforward.org/practice/dsa/balanced-paranthesis) | ok |
| 20 | `q_20_4` | Implement Min Stack ($O(1)$ getMin operation) | [23. Implement Min Stack](https://takeuforward.org/practice/dsa/implement-min-stack) | ok |
| 21 | `q_21_1` | Next Greater Element I (NGE - Decreasing monotonic stack) | [102. Next Greater Element](https://takeuforward.org/practice/dsa/next-greater-element) | ok |
| 21 | `q_21_2` | Next Greater Element II (Circular Array via $2N$ traversal) | [300. Next Greater Element - 2](https://takeuforward.org/practice/dsa/next-greater-element---2) | ok |
| 21 | `q_21_3` | Next Smaller Element | [194. Next Smaller Element](https://takeuforward.org/practice/dsa/next-smaller-element) | ok |
| 21 | `q_21_4` | Number of NGEs to the right | [864. Number of Greater Elements to the Right](https://takeuforward.org/practice/dsa/number-of-greater-elements-to-the-right) | ok |
| 22 | `q_22_1` | Trapping Rain Water (Two pointer OR monotonic stack) | [8. Trapping Rainwater](https://takeuforward.org/practice/dsa/trapping-rainwater) | ok |
| 22 | `q_22_2` | Asteroid Collision (Positive/negative rock simulation) | [85. Asteroid Collision](https://takeuforward.org/practice/dsa/asteroid-collision) | ok |
| 22 | `q_22_3` | Stock Span Problem | [217. Stock span problem](https://takeuforward.org/practice/dsa/stock-span-problem) | ok |
| 23 | `q_23_1` | Largest Rectangle in a Histogram | [39. Largest rectangle in a histogram](https://takeuforward.org/practice/dsa/largest-rectangle-in-a-histogram) | ok |
| 23 | `q_23_2` | Maximal Rectangles in Binary Matrix | [Maximum Rectangle Area with all 1's\|(DP-55)](https://takeuforward.org/practice/dsa/maximum-rectangle-area-with-all-1s) | ok |
| 23 | `q_23_3` | Sliding Window Maximum (Monotonic deque) | [57. Sliding Window Maximum](https://takeuforward.org/practice/dsa/sliding-window-maximum) | ok |
| 24 | `q_24_1` | Signature Solve 1 (Array): Kadane's Algorithm from scratch | [12. Kadane's Algorithm](https://takeuforward.org/practice/dsa/kadane%27s-algorithm) | ok |
| 24 | `q_24_2` | Signature Solve 2 (String): Longest Palindromic Substring | [30. Longest Palindromic Substring](https://takeuforward.org/practice/dsa/longest-palindromic-substring) | ok |
| 24 | `q_24_3` | Signature Solve 3 (Linked List): Reverse LL & Detect Cycle | [3. Reverse a LL](https://takeuforward.org/practice/dsa/reverse-a-ll)<br>[22. Detect a loop in LL](https://takeuforward.org/practice/dsa/detect-a-loop-in-ll) | ok |
| 24 | `q_24_4` | Signature Solve 4 (Stack): Valid Parentheses & Next Greater Element | [164. Balanced Paranthesis](https://takeuforward.org/practice/dsa/balanced-paranthesis)<br>[102. Next Greater Element](https://takeuforward.org/practice/dsa/next-greater-element) | ok |
| 24 | `q_24_5` | Think-Out-Loud Simulation: Explain 1 complete problem to your brother! | [Open resource](README.html#selection) | ok |

## All unique destinations

| Destination | Kind | Result | HTTP | Page / detail |
| --- | --- | --- | --- | --- |
| [../assets/guide-theme.js](../assets/guide-theme.js) | local | ok | — | Local file/fragment exists |
| [https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=JetBrains+Mono:wght@400;600&display=swap](https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=JetBrains+Mono:wght@400;600&display=swap) | external | ok | 200 | Local file/fragment exists |
| [https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css](https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css) | external | ok | 200 | Local file/fragment exists |
| [https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js](https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js) | external | ok | 200 | Local file/fragment exists |
| [https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js](https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js) | external | ok | 200 | Local file/fragment exists |
| [../assets/selection.css](../assets/selection.css) | local | ok | — | Local file/fragment exists |
| [../assets/guide-ui.css](../assets/guide-ui.css) | local | ok | — | Local file/fragment exists |
| [README.html](README.html) | local | ok | — | Local file/fragment exists |
| [#phase1](#phase1) | local | ok | — | Local file/fragment exists |
| [#phase2](#phase2) | local | ok | — | Local file/fragment exists |
| [#phase3](#phase3) | local | ok | — | Local file/fragment exists |
| [#phase4](#phase4) | local | ok | — | Local file/fragment exists |
| [#phase5](#phase5) | local | ok | — | Local file/fragment exists |
| [#study-timer](#study-timer) | local | ok | — | Local file/fragment exists |
| [README.html#routine](README.html#routine) | local | ok | — | Local file/fragment exists |
| [https://takeuforward.org/practice/dsa/largest-element](https://takeuforward.org/practice/dsa/largest-element) | external | ok | 200 | 702. Largest Element |
| [https://takeuforward.org/practice/dsa/second-largest-element](https://takeuforward.org/practice/dsa/second-largest-element) | external | ok | 200 | 695. Second Largest Element |
| [https://takeuforward.org/practice/dsa/check-if-the-array-is-sorted-i](https://takeuforward.org/practice/dsa/check-if-the-array-is-sorted-i) | external | ok | 200 | 743. Check if the Array is Sorted I |
| [https://takeuforward.org/practice/dsa/remove-duplicates-from-sorted-array](https://takeuforward.org/practice/dsa/remove-duplicates-from-sorted-array) | external | ok | 200 | 196. Remove duplicates from sorted array |
| [https://takeuforward.org/practice/dsa/left-rotate-array-by-one](https://takeuforward.org/practice/dsa/left-rotate-array-by-one) | external | ok | 200 | 832. Left Rotate Array by One |
| [https://takeuforward.org/practice/dsa/left-rotate-array](https://takeuforward.org/practice/dsa/left-rotate-array) | external | ok | 200 | 237. Left Rotate Array by K Places |
| [https://takeuforward.org/practice/dsa/move-zeros-to-end](https://takeuforward.org/practice/dsa/move-zeros-to-end) | external | ok | 200 | 248. Move Zeros to End |
| [https://takeuforward.org/practice/dsa/linear-search](https://takeuforward.org/practice/dsa/linear-search) | external | ok | 200 | 838. Linear Search |
| [https://takeuforward.org/practice/dsa/union-of-two-sorted-arrays](https://takeuforward.org/practice/dsa/union-of-two-sorted-arrays) | external | ok | 200 | 713. Union of two sorted arrays |
| [https://takeuforward.org/practice/dsa/intersection-of-two-sorted-arrays](https://takeuforward.org/practice/dsa/intersection-of-two-sorted-arrays) | external | ok | 200 | 706. Intersection of two sorted arrays |
| [https://takeuforward.org/practice/dsa/single-number---i](https://takeuforward.org/practice/dsa/single-number---i) | external | ok | 200 | 63. Single Number - I |
| [https://takeuforward.org/practice/dsa/find-missing-number](https://takeuforward.org/practice/dsa/find-missing-number) | external | ok | 200 | 116. Find missing number |
| [https://takeuforward.org/practice/dsa/two-sum](https://takeuforward.org/practice/dsa/two-sum) | external | ok | 200 | 1. Two Sum |
| [https://takeuforward.org/practice/dsa/longest-subarray-with-given-sum-k](https://takeuforward.org/practice/dsa/longest-subarray-with-given-sum-k) | external | ok | 200 | Longest subarray with given sum K(positives) |
| [https://takeuforward.org/practice/dsa/longest-subarray-with-sum-k](https://takeuforward.org/practice/dsa/longest-subarray-with-sum-k) | external | ok | 200 | 178. Longest subarray with sum K |
| [https://takeuforward.org/practice/dsa/sort-an-array-of-0s-1s-and-2s](https://takeuforward.org/practice/dsa/sort-an-array-of-0s-1s-and-2s) | external | ok | 200 | Sort an array of 0's 1's and 2's |
| [https://takeuforward.org/practice/dsa/majority-element-i](https://takeuforward.org/practice/dsa/majority-element-i) | external | ok | 200 | 83. Majority Element-I |
| [https://takeuforward.org/practice/dsa/kadane%27s-algorithm](https://takeuforward.org/practice/dsa/kadane%27s-algorithm) | external | ok | 200 | 12. Kadane's Algorithm |
| [https://takeuforward.org/practice/dsa/best-time-to-buy-and-sell-stock](https://takeuforward.org/practice/dsa/best-time-to-buy-and-sell-stock) | external | ok | 200 | 50. Best time to buy and sell stock |
| [https://takeuforward.org/practice/dsa/rearrange-array-elements-by-sign](https://takeuforward.org/practice/dsa/rearrange-array-elements-by-sign) | external | ok | 200 | 375. Rearrange array elements by sign |
| [https://takeuforward.org/practice/dsa/leaders-in-an-array](https://takeuforward.org/practice/dsa/leaders-in-an-array) | external | ok | 200 | 512. Leaders in an Array |
| [https://takeuforward.org/practice/dsa/longest-consecutive-sequence-in-an-array](https://takeuforward.org/practice/dsa/longest-consecutive-sequence-in-an-array) | external | ok | 200 | 97. Longest Consecutive Sequence in an Array |
| [https://takeuforward.org/practice/dsa/set-matrix-zeroes](https://takeuforward.org/practice/dsa/set-matrix-zeroes) | external | ok | 200 | 34. Set Matrix Zeroes |
| [https://takeuforward.org/practice/dsa/rotate-matrix-by-90-degrees](https://takeuforward.org/practice/dsa/rotate-matrix-by-90-degrees) | external | ok | 200 | 70. Rotate matrix by 90 degrees |
| [https://takeuforward.org/practice/dsa/print-the-matrix-in-spiral-manner](https://takeuforward.org/practice/dsa/print-the-matrix-in-spiral-manner) | external | ok | 200 | 107. Print the matrix in spiral manner |
| [https://takeuforward.org/practice/dsa/remove-outermost-parentheses](https://takeuforward.org/practice/dsa/remove-outermost-parentheses) | external | ok | 200 | 420. Remove Outermost Parentheses |
| [https://takeuforward.org/practice/dsa/reverse-every-word-in-a-string](https://takeuforward.org/practice/dsa/reverse-every-word-in-a-string) | external | ok | 200 | 189. Reverse every word in a string |
| [https://takeuforward.org/practice/dsa/largest-odd-number-in-a-string](https://takeuforward.org/practice/dsa/largest-odd-number-in-a-string) | external | ok | 200 | 341. Largest Odd Number in a String |
| [https://takeuforward.org/practice/dsa/longest-common-prefix](https://takeuforward.org/practice/dsa/longest-common-prefix) | external | ok | 200 | 79. Longest Common Prefix |
| [https://takeuforward.org/practice/dsa/isomorphic-string](https://takeuforward.org/practice/dsa/isomorphic-string) | external | ok | 200 | 252. Isomorphic Strings |
| [https://takeuforward.org/practice/dsa/rotate-string](https://takeuforward.org/practice/dsa/rotate-string) | external | ok | 200 | 324. Rotate String |
| [https://takeuforward.org/practice/dsa/valid-anagram](https://takeuforward.org/practice/dsa/valid-anagram) | external | ok | 200 | 52. Valid Anagram |
| [https://takeuforward.org/practice/dsa/sort-characters-by-frequency](https://takeuforward.org/practice/dsa/sort-characters-by-frequency) | external | ok | 200 | 303. Sort Characters by Frequency |
| [https://takeuforward.org/practice/dsa/maximum-nesting-depth-of-the-parentheses](https://takeuforward.org/practice/dsa/maximum-nesting-depth-of-the-parentheses) | external | ok | 200 | 392. Maximum Nesting Depth of the Parentheses |
| [https://takeuforward.org/practice/dsa/roman-to-integer](https://takeuforward.org/practice/dsa/roman-to-integer) | external | ok | 200 | 87. Roman to Integer |
| [https://www.geeksforgeeks.org/problems/convert-to-roman-no/1](https://www.geeksforgeeks.org/problems/convert-to-roman-no/1) | external | ok | 200 | Decimal to Roman \| Practice \| GeeksforGeeks |
| [https://takeuforward.org/practice/dsa/string-to-integer-atoi](https://takeuforward.org/practice/dsa/string-to-integer-atoi) | external | ok | 200 | 49. String to Integer (atoi) |
| [https://takeuforward.org/practice/dsa/check-if-string-is-palindrome-or-not-](https://takeuforward.org/practice/dsa/check-if-string-is-palindrome-or-not-) | external | ok | 200 | 278. Check if String is Palindrome or Not |
| [https://takeuforward.org/practice/dsa/longest-palindromic-substring](https://takeuforward.org/practice/dsa/longest-palindromic-substring) | external | ok | 200 | 30. Longest Palindromic Substring |
| [https://www.geeksforgeeks.org/problems/count-number-of-substrings4528/1](https://www.geeksforgeeks.org/problems/count-number-of-substrings4528/1) | external | ok | 200 | Substrings with K Distinct \| Practice \| GeeksforGeeks |
| [https://takeuforward.org/blogs/data-structure-and-algorithm/singly-linked-list](https://takeuforward.org/blogs/data-structure-and-algorithm/singly-linked-list) | external | ok | 200 | Singly Linked List: Structure and Basic Operations |
| [https://takeuforward.org/practice/dsa/traversal-in-linked-list](https://takeuforward.org/practice/dsa/traversal-in-linked-list) | external | ok | 200 | 1014. Traversal in Linked List |
| [https://takeuforward.org/practice/dsa/find-the-length-of-the-linked-list](https://takeuforward.org/practice/dsa/find-the-length-of-the-linked-list) | external | ok | 200 | 998. Find the length of the Linked List |
| [https://takeuforward.org/practice/dsa/search-in-linked-list](https://takeuforward.org/practice/dsa/search-in-linked-list) | external | ok | 200 | 1039. Search in Linked List |
| [https://takeuforward.org/practice/dsa/insertion-at-the-head-of-ll](https://takeuforward.org/practice/dsa/insertion-at-the-head-of-ll) | external | ok | 200 | 941. Insertion at the head of Linked List |
| [https://takeuforward.org/practice/dsa/insertion-at-the-tail-of-ll](https://takeuforward.org/practice/dsa/insertion-at-the-tail-of-ll) | external | ok | 200 | 958. Insertion at the tail of Linked List |
| [https://takeuforward.org/practice/dsa/insertion-at-the-kth-position-of-ll](https://takeuforward.org/practice/dsa/insertion-at-the-kth-position-of-ll) | external | ok | 200 | 954. Insertion at the Kth position of Linked List |
| [https://takeuforward.org/practice/dsa/deletion-of-the-head-of-ll](https://takeuforward.org/practice/dsa/deletion-of-the-head-of-ll) | external | ok | 200 | 901. Deletion of the head of LL |
| [https://takeuforward.org/practice/dsa/deletion-of-the-tail-of-ll](https://takeuforward.org/practice/dsa/deletion-of-the-tail-of-ll) | external | ok | 200 | 914. Deletion of the tail of Linked List |
| [https://takeuforward.org/practice/dsa/deletion-of-the-kth-element-of-ll](https://takeuforward.org/practice/dsa/deletion-of-the-kth-element-of-ll) | external | ok | 200 | 905. Deletion of the Kth element of Linked List |
| [https://takeuforward.org/practice/dsa/delete-the-element-with-value-x](https://takeuforward.org/practice/dsa/delete-the-element-with-value-x) | external | ok | 200 | 891. Delete the element with value X |
| [https://takeuforward.org/blogs/data-structure-and-algorithm/doubly-linked-list](https://takeuforward.org/blogs/data-structure-and-algorithm/doubly-linked-list) | external | ok | 200 | Doubly Linked List: Structure and Basic Operations |
| [https://takeuforward.org/practice/dsa/insert-node-before-head-in-dll](https://takeuforward.org/practice/dsa/insert-node-before-head-in-dll) | external | ok | 200 | 980. Insert node before head in Doubly Linked List |
| [https://takeuforward.org/practice/dsa/delete-head-of-dll](https://takeuforward.org/practice/dsa/delete-head-of-dll) | external | ok | 200 | 879. Delete head of Doubly Linked List |
| [https://takeuforward.org/practice/dsa/reverse-a-doubly-linked-list](https://takeuforward.org/practice/dsa/reverse-a-doubly-linked-list) | external | ok | 200 | 601. Reverse a Doubly Linked List |
| [https://takeuforward.org/practice/dsa/find-middle-of-linked-list](https://takeuforward.org/practice/dsa/find-middle-of-linked-list) | external | ok | 200 | 157. Find Middle of Linked List |
| [https://takeuforward.org/practice/dsa/detect-a-loop-in-ll](https://takeuforward.org/practice/dsa/detect-a-loop-in-ll) | external | ok | 200 | 22. Detect a loop in LL |
| [https://takeuforward.org/practice/dsa/find-the-starting-point-in-ll](https://takeuforward.org/practice/dsa/find-the-starting-point-in-ll) | external | ok | 200 | 220. Find the starting point in LL |
| [https://takeuforward.org/practice/dsa/length-of-loop-in-ll](https://takeuforward.org/practice/dsa/length-of-loop-in-ll) | external | ok | 200 | 769. Length of loop in LL |
| [https://takeuforward.org/practice/dsa/reverse-a-ll](https://takeuforward.org/practice/dsa/reverse-a-ll) | external | ok | 200 | 3. Reverse a LL |
| [https://takeuforward.org/practice/dsa/check-if-ll-is-palindrome-or-not](https://takeuforward.org/practice/dsa/check-if-ll-is-palindrome-or-not) | external | ok | 200 | 198. Check if LL is palindrome or not |
| [https://takeuforward.org/practice/dsa/segregate-odd-and-even-nodes-in-ll](https://takeuforward.org/practice/dsa/segregate-odd-and-even-nodes-in-ll) | external | ok | 200 | 110. Segregate odd and even nodes in Linked List |
| [https://takeuforward.org/practice/dsa/remove-nth-node-from-the-back-of-the-ll](https://takeuforward.org/practice/dsa/remove-nth-node-from-the-back-of-the-ll) | external | ok | 200 | 81. Remove Nth node from the back of the LL |
| [https://takeuforward.org/practice/dsa/add-one-to-a-number-represented-by-ll](https://takeuforward.org/practice/dsa/add-one-to-a-number-represented-by-ll) | external | ok | 200 | 767. Add one to a number represented by LL |
| [https://takeuforward.org/practice/dsa/add-two-numbers-in-ll](https://takeuforward.org/practice/dsa/add-two-numbers-in-ll) | external | ok | 200 | 93. Add two numbers in Linked List |
| [https://takeuforward.org/practice/dsa/find-the-intersection-point-of-y-ll](https://takeuforward.org/practice/dsa/find-the-intersection-point-of-y-ll) | external | ok | 200 | 167. Find the intersection point of Y LL |
| [https://takeuforward.org/practice/dsa/implement-stack-using-arrays](https://takeuforward.org/practice/dsa/implement-stack-using-arrays) | external | ok | 200 | 144. Implement Stack using Arrays |
| [https://takeuforward.org/practice/dsa/implement-queue-using-arrays](https://takeuforward.org/practice/dsa/implement-queue-using-arrays) | external | ok | 200 | 147. Implement Queue using Arrays |
| [https://takeuforward.org/practice/dsa/implement-stack-using-queue](https://takeuforward.org/practice/dsa/implement-stack-using-queue) | external | ok | 200 | 155. Implement Stack using Queue |
| [https://takeuforward.org/practice/dsa/implement-queue-using-stack](https://takeuforward.org/practice/dsa/implement-queue-using-stack) | external | ok | 200 | 68. Implement Queue using Stack |
| [https://takeuforward.org/practice/dsa/implement-stack-using-linkedlist](https://takeuforward.org/practice/dsa/implement-stack-using-linkedlist) | external | ok | 200 | 919. Implement stack using Linkedlist |
| [https://takeuforward.org/practice/dsa/implement-queue-using-linkedlist](https://takeuforward.org/practice/dsa/implement-queue-using-linkedlist) | external | ok | 200 | 894. Implement queue using Linkedlist |
| [https://takeuforward.org/practice/dsa/balanced-paranthesis](https://takeuforward.org/practice/dsa/balanced-paranthesis) | external | ok | 200 | 164. Balanced Paranthesis |
| [https://takeuforward.org/practice/dsa/implement-min-stack](https://takeuforward.org/practice/dsa/implement-min-stack) | external | ok | 200 | 23. Implement Min Stack |
| [https://takeuforward.org/practice/dsa/next-greater-element](https://takeuforward.org/practice/dsa/next-greater-element) | external | ok | 200 | 102. Next Greater Element |
| [https://takeuforward.org/practice/dsa/next-greater-element---2](https://takeuforward.org/practice/dsa/next-greater-element---2) | external | ok | 200 | 300. Next Greater Element - 2 |
| [https://takeuforward.org/practice/dsa/next-smaller-element](https://takeuforward.org/practice/dsa/next-smaller-element) | external | ok | 200 | 194. Next Smaller Element |
| [https://takeuforward.org/practice/dsa/number-of-greater-elements-to-the-right](https://takeuforward.org/practice/dsa/number-of-greater-elements-to-the-right) | external | ok | 200 | 864. Number of Greater Elements to the Right |
| [https://takeuforward.org/practice/dsa/trapping-rainwater](https://takeuforward.org/practice/dsa/trapping-rainwater) | external | ok | 200 | 8. Trapping Rainwater |
| [https://takeuforward.org/practice/dsa/asteroid-collision](https://takeuforward.org/practice/dsa/asteroid-collision) | external | ok | 200 | 85. Asteroid Collision |
| [https://takeuforward.org/practice/dsa/stock-span-problem](https://takeuforward.org/practice/dsa/stock-span-problem) | external | ok | 200 | 217. Stock span problem |
| [https://takeuforward.org/practice/dsa/largest-rectangle-in-a-histogram](https://takeuforward.org/practice/dsa/largest-rectangle-in-a-histogram) | external | ok | 200 | 39. Largest rectangle in a histogram |
| [https://takeuforward.org/practice/dsa/maximum-rectangle-area-with-all-1s](https://takeuforward.org/practice/dsa/maximum-rectangle-area-with-all-1s) | external | ok | 200 | Maximum Rectangle Area with all 1's\|(DP-55) |
| [https://takeuforward.org/practice/dsa/sliding-window-maximum](https://takeuforward.org/practice/dsa/sliding-window-maximum) | external | ok | 200 | 57. Sliding Window Maximum |
| [README.html#selection](README.html#selection) | local | ok | — | Local file/fragment exists |
| [../Development/Dice Roll/prep/study_guide.html](../Development/Dice Roll/prep/study_guide.html) | local | ok | — | Local file/fragment exists |

## Run again

```powershell
python scripts/check_tracker_links.py
python scripts/check_tracker_links.py --online
```

The offline command checks files, fragments, schemes and link attributes. `--online` performs GET requests, follows redirects and checks page titles for missing-page responses. Both exit unsuccessfully if any requested check is broken, blocked or unverified.
