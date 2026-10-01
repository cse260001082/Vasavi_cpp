#include <iostream>
#include <string>
using namespace std;

// 1. THE CLASS (The Blueprint)
class Car {
public:
    // Attributes (State)
    string brand;
    string color;
    int speed;

    // Constructor to initialize new objects
    Car(string b, string c) {
        brand = b;
        color = c;
        speed = 0; // Every new car starts at 0 km/h
    }

    // Methods (Behavior)
    void accelerate(int increase) {
        speed += increase;
        cout << brand << " accelerated to " << speed << " km/h.\n";
    }

    void brake() {
        speed = 0;
        cout << brand << " came to a complete stop.\n";
    }
};

int main() {
    // 2. THE OBJECTS (Instances created from the blueprint)
    Car car1("Toyota", "Red");
    Car car2("Tesla", "Blue");

    // Each object maintains its own independent state in memory
    car1.accelerate(50); // Toyota speed becomes 50
    car2.accelerate(80); // Tesla speed becomes 80

    // Modifying one object does not affect the other
    car1.brake();        // Toyota stops; Tesla is still moving at 80 km/h

    cout << car2.brand << " is still cruising at " << car2.speed << " km/h.\n";

    return 0;
}