// Q7: Fill in both access labels and the member assignment.
// Keep points private. Allow main() to call setPoints and getPoints.
// setPoints must copy newPoints into the object's points member.
// Check: expected output is 25.
// Experiment: try accessing score.points in main(), observe the compiler error,
// then remove that experiment so the program compiles again.

#include <iostream>

class Score {
___:
    int points = 0;

___:
    void setPoints(int newPoints) {
        ___ = ___;
    }

    int getPoints() {
        return points;
    }
};

int main() {
    Score score;
    score.setPoints(25);
    std::cout << score.getPoints() << '\n';
    return 0;
}
