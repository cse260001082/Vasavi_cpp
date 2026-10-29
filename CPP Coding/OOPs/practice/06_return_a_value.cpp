// Q6: Complete the function's return type and the statement in its body.
// getValue must return the integer stored in value.
// Check: expected output is 12.
// Explain: why does this function need a return value instead of just printing?

#include <iostream>

class Number {
public:
    int value = 12;

    ___ getValue() {
        ___ value;
    }
};

int main() {
    Number number;
    std::cout << number.getValue() << '\n';
    return 0;
}
