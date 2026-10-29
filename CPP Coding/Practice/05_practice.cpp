#include <iostream>
void increment(int* x) { (*x)++; }
void increment(int& x) { ++x; }

int main(void) {
    int a = 5;
    increment(a);
    std::cout << "a:" << a << std::endl;
    return 0;
}