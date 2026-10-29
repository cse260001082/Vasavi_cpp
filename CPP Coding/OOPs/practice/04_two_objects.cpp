// Q4: Fill each blank with the correct object name.
// Give first a value of 3 and second a value of 8.
// Print first's value, then second's value, on separate lines.
// Check: expected output is 3 followed by 8.
// Experiment: change only first's value and run again. Does second change?

#include <iostream>

class Box {
public:
    int value = 0;
};

int main() {
    Box first;
    Box second;
    ___.value = 3;
    ___.value = 8;
    std::cout << ___.value << '\n';
    std::cout << ___.value << '\n';
    return 0;
}
