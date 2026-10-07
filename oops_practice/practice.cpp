#include <iostream>
using namespace std;

// Base class
class Animal {
public:
    string name;

    Animal(string name){
        this->name = name;
    }

    void Eat() {
        cout << name << " is eating." << endl;
    }
    void sleep() {
        cout << name << " is sleeping." << endl;
    }
};

// Derived class (observe the syntax)
class Dog : public Animal {
public:
    // calling constructor of Animal with name as parameter
    Dog(string name) : Animal(name) {}

    void Bark() {
        cout << "Woof! Woof!" << endl;
    }
};

int main() {
    // Create an instance of the Dog class
    Dog myDog("Buddy");

    // Call methods from the base class
    myDog.Eat();
    
    // Call methods from the base class
    myDog.sleep();

    // Call method from the derived class
    myDog.Bark();

    return 0;
}
