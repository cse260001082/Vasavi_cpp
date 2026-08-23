#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n;
    cout << "Take the input ";
    cin >> n;
    int rev = 0;

    int temp = n;
    while (temp > 0)
    {
        rev = rev * 10 + (temp % 10);
        temp = temp / 10;
    }

    cout << "The Reverse of " << n << " is " << rev;
    return 0;
}