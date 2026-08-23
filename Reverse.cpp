/*
Question:
    Reverse an Integer
Input: 12345
Output: 54321
*/

#include <bits/stdc++.h>
using namespace std;

int pow(int n, int r)
{
    int ans = 1;
    for (int j = 0; j < r; j++)
    {
        ans = ans * n;
    }
    return ans;
}

int main()
{
    /*
    1. take input n (Decimal Number)
    2. First let's find the number of digits in the given number...

    */
    cout << "Enter the Value";
    int n;
    cin >> n;
    int numDigits = 1;
    int div = 10;
    while (n / div != 0)
    {
        div = div * 10;
        numDigits++;
    }
    int k = numDigits, rev = 0, org = n;
    /*
    * n = 234
    i = 0, k = 3, rev = 0
    unit = 4
    rev = 0 + 4 * pow(10, 2) = 400
    * n = 23
    i = 1, k = 3, rev = 400
    unit = 3
    rev = 400 + 3 * pow(10, 1) = 430
    * n = 2
    i = 2, k = 3, rev = 430
    unit = 2;
    rev = 430 + 2 * pow(10, 0) = 430 + 2 = 432
    */
    for (int i = 0; i < k; i++)
    {
        int unit = n % 10;
        rev += unit * pow(10, k - i - 1);
        n = n / 10;
    }
    cout << "Reverse Number of " << org << " is " << rev << endl;
}