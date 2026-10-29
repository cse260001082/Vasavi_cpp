#include <bits/stdc++.h>
using namespace std;

int areaSquare(int l)
{
    int area = l * l;

    return area;
}
int areaRectangle(int l, int w)
{
    int area = l * w;
    return area;
}
double areaCircle(int r)
{
    double area = 3.14 * r * r;
    return area;
}

int main()
{
    int n;

    while (true)
    {

        cout << "Select a 2D shape:\n\t1. Square\n\t2. Rectangle\n\t3. Circle\n";
        cin >> n;

        switch (n)
        {
        case 1:
            int side;
            cout << "Enter the length of the Square Side: ";
            cin >> side;
            cout << " Area of Square of side " << side << " " << areaSquare(side) << endl;
            break;
        case 2:
            int length, width;
            cout << "Enter the length and width of the rectangle: ";
            cin >> length >> width;
            cout << "Area of rectange with len(" << length << ") width (" << width << ") is : " << areaRectangle(length, width) << endl;
            break;
        case 3:
            int radius;
            cout << "Enter the radius of the circle: ";
            cin >> radius;
            cout << "Area of the circle with radius r(" << radius << ") is : " << areaCircle(radius);
            break;
        default:
            cout << "Enter right Choice: (1-3)\n\n";
        }
        if (n >= 1 && n <= 3)
        {
            break;
        }
    }
    return 0;
}