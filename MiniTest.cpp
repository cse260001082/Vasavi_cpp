/*\
Write one complete C++ program that takes an integer such as: 58342

and prints:

Number: 58342
Reversed: 24385
Sum of digits: 22
Total Digits: 5
Even digits: 3
Odd digits: 2

Try to use at least 2 separate functions.
*/

#include <bits/stdc++.h>
using namespace std;

void digitDetail(int n)
{
    //  Write the whole code logic to print these 3 lines..
    // Total Digits: 5
    // Even digits: 3
    // Odd digits: 2
    int count = 0;
    int even_count = 0;
    int odd_count = 0;

    while (n != 0)
    {
        count = count + 1;

        if (n % 2 == 0)
        {
            even_count = even_count + 1;
        }
        else
        {
            odd_count = odd_count + 1;
        }
        n = n / 10;
    }
    cout << "Total Digits: " << count << endl;
    cout << "even_count: " << even_count << endl;
    cout << "odd_count: " << odd_count << endl;
}

int sumDigits(int n)
{
    int sum = 0;
    // sum = sum +
    while (n / 10 == 0)
    {
        sum = sum + n % 10;
        n = n / 10;
    }

    return sum;
}

int reversedNum(int n)
{

    // Write code again here... with own, without any reference code..
}

int main()
{
    int n;
    cin >> n;

    cout << "Number: " << n << endl;
    // cout << "Reversed Number: " << reversedNum(n);
    // cout << "Sum of Digits: " << sumDigits(n);
    digitDetail(n);
    return 0;
}

/*
Write comments, when you are done with your code.. and
also run these test cases and check your code
|    Input | Reversed |  Sum | Total Digits | Even Digits | Odd Digits |
| -------: | -------: | ---: | -----------: | ----------: | ---------: |
|   58342  |   24385  |  22  |           5  |          3  |         2  |
|   12345  |   54321  |  15  |           5  |          2  |         3  |
|    2468  |    8642  |  20  |           4  |          4  |         0  |
|   13579  |   97531  |  25  |           5  |          0  |         5  |
|       7  |       7  |   7  |           1  |          0  |         1  |
|       8  |       8  |   8  |           1  |          1  |         0  |
|    1002  |    2001  |   3  |           4  |          3  |         1  |
|    1200  |      21  |   3  |           4  |          3  |         1  |
|  999999  |  999999  |  54  |           6  |          0  |         6  |
|  808080  |   80808  |  24  |           6  |          6  |         0  |
*/