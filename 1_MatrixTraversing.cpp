/*
========================================================================================
                         PRACTICE PROBLEM: 2D MATRIX TRAVERSALS
========================================================================================

Hey Vasavi! In this problem, you will master 2D Arrays (Matrices) and Functions in C++.
You are given a matrix of size (Rows x Columns). You need to implement 4 different ways 
to traverse (visit and print) every element of the matrix:

  1. Row-by-Row Traversal   (Left-to-Right, Top-to-Bottom)
  2. Column-by-Column Traversal (Top-to-Bottom, Left-to-Right)
  3. Spiral / Ring Traversal (Clockwise boundary-by-boundary from outer to inner)
  4. Diagonal Traversal     (Diagonal-by-diagonal starting from top-left (0,0),
                             finishing the top triangle then bottom triangle)

----------------------------------------------------------------------------------------
                        ILLUSTRATION: 5 x 5 MATRIX EXAMPLE
----------------------------------------------------------------------------------------
Let's take a 5x5 matrix with values from 1 to 25:

       Col 0   Col 1   Col 2   Col 3   Col 4
Row 0 [   1       2       3       4       5   ]
Row 1 [   6       7       8       9      10   ]
Row 2 [  11      12      13      14      15   ]
Row 3 [  16      17      18      19      20   ]
Row 4 [  21      22      23      24      25   ]

----------------------------------------------------------------------------------------
HOW EACH TRAVERSAL WORKS:
----------------------------------------------------------------------------------------

1. ROW-BY-ROW TRAVERSAL:
   - Read Row 0: 1 2 3 4 5
   - Read Row 1: 6 7 8 9 10
   - Read Row 2: 11 12 13 14 15
   - Read Row 3: 16 17 18 19 20
   - Read Row 4: 21 22 23 24 25
   => Output: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25

2. COLUMN-BY-COLUMN TRAVERSAL:
   - Read Col 0: 1 6 11 16 21
   - Read Col 1: 2 7 12 17 22
   - Read Col 2: 3 8 13 18 23
   - Read Col 3: 4 9 14 19 24
   - Read Col 4: 5 10 15 20 25
   => Output: 1 6 11 16 21 2 7 12 17 22 3 8 13 18 23 4 9 14 19 24 5 10 15 20 25

3. SPIRAL / RING TRAVERSAL (Clockwise):
   - Outer Ring:
       * Top row (left to right)    : 1  2  3  4  5
       * Right col (top to bottom)  : 10 15 20 25
       * Bottom row (right to left) : 24 23 22 21
       * Left col (bottom to top)   : 16 11 6
   - Inner Ring:
       * Top row (left to right)    : 7  8  9
       * Right col (top to bottom)  : 14 19
       * Bottom row (right to left) : 18 17
       * Left col (bottom to top)   : 12
   - Center Element:
       * Center                     : 13
   => Output: 1 2 3 4 5 10 15 20 25 24 23 22 21 16 11 6 7 8 9 14 19 18 17 12 13

4. DIAGONAL TRAVERSAL (Top-Left to Bottom-Right by diagonals):
   Notice the property of diagonals where (row + col = sum):
   - Top Triangle (starting with sum = 0 to 4):
       * Diag 0 (sum=0): (0,0) -> 1
       * Diag 1 (sum=1): (0,1) -> 2,  (1,0) -> 6
       * Diag 2 (sum=2): (0,2) -> 3,  (1,1) -> 7,  (2,0) -> 11
       * Diag 3 (sum=3): (0,3) -> 4,  (1,2) -> 8,  (2,1) -> 12, (3,0) -> 16
       * Diag 4 (sum=4): (0,4) -> 5,  (1,3) -> 9,  (2,2) -> 13, (3,1) -> 17, (4,0) -> 21
   - Bottom Triangle (sum = 5 to 8):
       * Diag 5 (sum=5): (1,4) -> 10, (2,3) -> 14, (3,2) -> 18, (4,1) -> 22
       * Diag 6 (sum=6): (2,4) -> 15, (3,3) -> 19, (4,2) -> 23
       * Diag 7 (sum=7): (3,4) -> 20, (4,3) -> 24
       * Diag 8 (sum=8): (4,4) -> 25
   => Output: 1 2 6 3 7 11 4 8 12 16 5 9 13 17 21 10 14 18 22 15 19 23 20 24 25

========================================================================================
*/

#include <iostream>
using namespace std;

// Maximum size for matrix rows and columns
const int MAX = 20;

// -------------------------------------------------------------------------------------
// 1. ROW-BY-ROW TRAVERSAL
// -------------------------------------------------------------------------------------
// HINT: Outer loop goes through each row (0 to rows-1).
//       Inner loop goes through each column (0 to cols-1).
void traverseRowByRow(int mat[MAX][MAX], int rows, int cols)
{
    int i,j;
    // TODO: Write your code here
    for(int i = 0;i < rows;i++){
        for(int j = 0;j < cols;j++){
            cout << mat[i][j] << " ";
        }
    }
    cout << endl;
}

// -------------------------------------------------------------------------------------
// 2. COLUMN-BY-COLUMN TRAVERSAL
// -------------------------------------------------------------------------------------
// HINT: Outer loop goes through each column (0 to cols-1).
//       Inner loop goes through each row (0 to rows-1).
void traverseColByCol(int mat[MAX][MAX], int rows, int cols)
{
    int i,j;
    // TODO: Write your code here
    for(i = 0;i < cols; i++){
        for(j = 0;j < rows;j++){
            cout << mat[j][i] << " ";
        }
    }
    cout << endl;
}

// -------------------------------------------------------------------------------------
// 3. SPIRAL / RING TRAVERSAL
// -------------------------------------------------------------------------------------
// HINT: Maintain four boundaries:
//       int top = 0, bottom = rows - 1;
//       int left = 0, right = cols - 1;
//       Use a while loop: while (top <= bottom && left <= right)
//       1. Print top row from left to right, then top++
//       2. Print right column from top to bottom, then right--
//       3. If top <= bottom: print bottom row from right to left, then bottom--
//       4. If left <= right: print left column from bottom to top, then left++
void traverseSpiral(int mat[MAX][MAX], int rows, int cols)
{
    // TODO: Write your code here
    
    cout << endl;
}

// -------------------------------------------------------------------------------------
// 4. DIAGONAL TRAVERSAL
// -------------------------------------------------------------------------------------
// HINT: 
// Part 1 (Top Triangle): 
//   For each starting column c from 0 to cols-1:
//   Start at row = 0, col = c. Move down-left (row++, col--) while row < rows and col >= 0.
// Part 2 (Bottom Triangle):
//   For each starting row r from 1 to rows-1:
//   Start at row = r, col = cols-1. Move down-left (row++, col--) while row < rows and col >= 0.
void traverseDiagonal(int mat[MAX][MAX], int rows, int cols)
{
    // TODO: Write your code here
    
    cout << endl;
}

// -------------------------------------------------------------------------------------
// HELPER FUNCTION: Print Matrix in Grid Format
// -------------------------------------------------------------------------------------
void printMatrix(int mat[MAX][MAX], int rows, int cols)
{
    cout << "\nGiven Matrix (" << rows << "x" << cols << "):\n";
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            cout << mat[i][j] << "\t";
        }
        cout << "\n";
    }
    cout << "\n";
}

int main()
{
    int rows, cols;
    int mat[MAX][MAX];

    cout << "Enter number of rows and columns: ";
    if (!(cin >> rows >> cols)) return 0;

    cout << "Enter the matrix elements (" << rows * cols << " numbers):\n";
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            cin >> mat[i][j];
        }
    }

    // Display original matrix
    printMatrix(mat, rows, cols);

    // Call all 4 traversal functions
    cout << "--- 1. Row-by-Row Traversal ---\n";
    traverseRowByRow(mat, rows, cols);

    cout << "\n--- 2. Column-by-Column Traversal ---\n";
    traverseColByCol(mat, rows, cols);

    cout << "\n--- 3. Spiral Traversal ---\n";
    traverseSpiral(mat, rows, cols);

    cout << "\n--- 4. Diagonal Traversal ---\n";
    traverseDiagonal(mat, rows, cols);

    return 0;
}

/*
========================================================================================
                                TEST CASES TO RUN
========================================================================================

----------------------------------------------------------------------------------------
TEST CASE 1: 3x3 Matrix
----------------------------------------------------------------------------------------
[INPUT to Copy-Paste]:
3 3
1 2 3
4 5 6
7 8 9

[EXPECTED OUTPUT]:
Row-by-Row: 1 2 3 4 5 6 7 8 9
Column-by-Column: 1 4 7 2 5 8 3 6 9
Spiral: 1 2 3 6 9 8 7 4 5
Diagonal: 1 2 4 3 5 7 6 8 9


----------------------------------------------------------------------------------------
TEST CASE 2: 5x5 Matrix (Illustrated Case)
----------------------------------------------------------------------------------------
[INPUT to Copy-Paste]:
5 5
1  2  3  4  5
6  7  8  9  10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25

[EXPECTED OUTPUT]:
Row-by-Row: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
Column-by-Column: 1 6 11 16 21 2 7 12 17 22 3 8 13 18 23 4 9 14 19 24 5 10 15 20 25
Spiral: 1 2 3 4 5 10 15 20 25 24 23 22 21 16 11 6 7 8 9 14 19 18 17 12 13
Diagonal: 1 2 6 3 7 11 4 8 12 16 5 9 13 17 21 10 14 18 22 15 19 23 20 24 25


----------------------------------------------------------------------------------------
TEST CASE 3: 8x8 Matrix (Big Test Case)
----------------------------------------------------------------------------------------
[INPUT to Copy-Paste]:
8 8
11 12 13 14 15 16 17 18
21 22 23 24 25 26 27 28
31 32 33 34 35 36 37 38
41 42 43 44 45 46 47 48
51 52 53 54 55 56 57 58
61 62 63 64 65 66 67 68
71 72 73 74 75 76 77 78
81 82 83 84 85 86 87 88

[EXPECTED OUTPUT]:
Row-by-Row:
11 12 13 14 15 16 17 18 21 22 23 24 25 26 27 28 31 32 33 34 35 36 37 38 41 42 43 44 45 46 47 48 51 52 53 54 55 56 57 58 61 62 63 64 65 66 67 68 71 72 73 74 75 76 77 78 81 82 83 84 85 86 87 88

Column-by-Column:
11 21 31 41 51 61 71 81 12 22 32 42 52 62 72 82 13 23 33 43 53 63 73 83 14 24 34 44 54 64 74 84 15 25 35 45 55 65 75 85 16 26 36 46 56 66 76 86 17 27 37 47 57 67 77 87 18 28 38 48 58 68 78 88

Spiral:
11 12 13 14 15 16 17 18 28 38 48 58 68 78 88 87 86 85 84 83 82 81 71 61 51 41 31 21 22 23 24 25 26 27 37 47 57 67 77 76 75 74 73 72 62 52 42 32 33 34 35 36 46 56 66 65 64 63 53 43 44 45 55 54

Diagonal:
11 12 21 13 22 31 14 23 32 41 15 24 33 42 51 16 25 34 43 52 61 17 26 35 44 53 62 71 18 27 36 45 54 63 72 81 28 37 46 55 64 73 82 38 47 56 65 74 83 48 57 66 75 84 58 67 76 85 68 77 86 78 87 88
========================================================================================
*/
