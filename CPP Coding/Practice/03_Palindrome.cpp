/*
Question:
    Check a number and tell wether it was a palindrome or not, using this custom
    function, i have created for you

    *Palindome*
        It is a number which gives same when reading from either of the sides
    1221 -> Palindrome (What is the reverse of this number = 1221)
    1234 -> Not Palindrome
*/

#include <bits/stdc++.h>
using namespace std;

int main()
{
    int n;
    cout << "Enter a number to identify it's palindrome nature\n";
    cin >> n;
    int rev = 0;
    int temp = n;

    while (temp > 0)
    {
        rev = rev * 10 + (temp % 10);
        temp /= 10;
    }

    if (rev == n)
    {
        cout << "The number " << n << " is a palindrome";
    }
    else
    {
        cout << "The number " << n << " is not a palindrome";
    }
    return 0;
}