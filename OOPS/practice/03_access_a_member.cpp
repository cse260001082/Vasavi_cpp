// Q3: Fill in the symbols used to access an object's data member.
// Assign 10 to price, then print that object's price.
// Check: expected output is 10.

#include <iostream>

class Pencil {
public:
    int price = 0;
};

int main() {
    Pencil myPencil;
    myPencil___price = 10;
    std::cout << myPencil___price << '\n';
    return 0;
}
