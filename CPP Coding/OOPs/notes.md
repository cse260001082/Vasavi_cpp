# Object-Oriented Programming in C++: First Steps

Prepared for Vasavi, with Dinesh as her learning guide.

**Goal:** understand classes and objects well enough to write a small program independently. Learn one section, predict what its code will do, and then run it.

You only need basic variables, `if` statements, and functions to begin. You do not need pointers or advanced C++ yet.

## Index

1. [What is OOP?](#1-what-is-oop)
2. [Why put data and functions together?](#2-why-put-data-and-functions-together)
3. [Class and object](#3-class-and-object)
4. [Write your first class](#4-write-your-first-class)
5. [Create and use objects](#5-create-and-use-objects)
6. [Member functions](#6-member-functions)
7. [Public and private](#7-public-and-private)
8. [Constructors and starting values](#8-constructors-and-starting-values)
9. [A complete small example](#9-a-complete-small-example)
10. [Trace two objects by hand](#10-trace-two-objects-by-hand)
11. [How to design a small class](#11-how-to-design-a-small-class)
12. [The four common OOP ideas](#12-the-four-common-oop-ideas)
13. [Common beginner mistakes](#13-common-beginner-mistakes)
14. [Practice without solutions](#14-practice-without-solutions)
15. [Quick revision](#15-quick-revision)
16. [Teaching plan for Dinesh](#16-teaching-plan-for-dinesh)

## 1. What is OOP?

**OOP** stands for **Object-Oriented Programming**. You may also hear people call it “OOPS.”

It is a way to organise a program around **objects**. An object groups related data with the functions that work with that data.

For example, a student record can have:

| Data: what it remembers | Actions: what it can do |
| --- | --- |
| Name | Display its details |
| Marks | Update its marks |

An object need not represent a physical thing. A bank account, a game score, or a timer can also be an object.

C++ supports OOP, and you can still use ordinary functions, loops, and conditions. Those tools remain useful inside an object-oriented program.

## 2. Why put data and functions together?

For one student, separate variables may be enough:

```cpp
std::string studentName = "Vasavi";
int studentMarks = 80;
```

For many students, we need to keep each name connected to the correct marks. We might also want a rule: marks must stay between 0 and 100.

A class lets us describe the related data and the operations that belong with it in one place. We can then create multiple student objects from that description.

**Pause and discuss:** for a library book, name two pieces of data and one useful action. No code needed yet.

## 3. Class and object

A **class** defines a type: what data its objects contain and what operations they provide.

An **object** is a particular instance of that type. “Instance” simply means one object created from a class.

| Class | Possible objects |
| --- | --- |
| `Student` | `vasavi`, `arun` |
| `Book` | `mathBook`, `cppBook` |
| `Rectangle` | `smallRectangle`, `largeRectangle` |

A useful analogy is a blank student-record format and two filled-in records. The format describes the fields; each filled-in record has its own values.

Defining `Student` does not itself create a student object. We create objects separately.

## 4. Write your first class

```cpp
class Student {
public:
    std::string name;
    int marks = 0;
};
```

Read this slowly:

- `class` begins a class definition.
- `Student` is the new type's name. Capitalising class names is a convention, not a C++ requirement.
- The braces enclose the class contents.
- `name` and `marks` are **data members**: variables belonging to an object.
- `public:` allows code outside the class to access the following members.
- `marks = 0` supplies a starting value for each object's marks.
- The semicolon after the closing brace is required.

To use `std::string`, include `<string>` at the top of the program. `std::` identifies names from the C++ standard library.

These early sections contain small fragments. Section 9 provides a complete program. When a later section changes `Student`, use that new definition instead of putting two `Student` definitions in the same file.

## 5. Create and use objects

After defining the class, we can write this inside `main()`:

```cpp
Student vasavi;
vasavi.name = "Vasavi";
vasavi.marks = 80;
```

Compare `int count;` with `Student vasavi;`: both declare a variable of a type. Here, that variable is an object of our own class type.

The **dot operator**, `.`, selects a member of an object. `vasavi.marks` means “the marks belonging to the object named `vasavi`.”

Now create a second object:

```cpp
Student arun;
arun.name = "Arun";
arun.marks = 65;
```

These objects have separate data. Changing `vasavi.marks` does not change `arun.marks`.

**Try it:** print both marks, change only Vasavi's marks, and print both again. Predict the output before running it.

## 6. Member functions

A function declared inside a class is called a **member function**, or **method**.

For example, we can add this inside the public part of our `Student` class:

```cpp
void display() {
    std::cout << name << ": " << marks << '\n';
}
```

To use it, write:

```cpp
vasavi.display();
arun.display();
```

When `vasavi.display()` runs, `name` and `marks` refer to Vasavi's data. When `arun.display()` runs, they refer to Arun's data.

Inside a member function, you can refer directly to that object's members. You do not have to write `vasavi.name` inside `display()`.

**Pause and discuss:** the function is the same, so why can the two calls print different values?

## 7. Public and private

Public data makes our first example easy to explore. But it also allows this:

```cpp
vasavi.marks = -20;
```

C++ accepts that assignment when `marks` is public. It does not know our rule about valid marks.

We can make the data **private** and provide a public function that checks proposed changes:

```cpp
class Student {
private:
    int marks = 0;

public:
    void setMarks(int newMarks) {
        if (newMarks >= 0 && newMarks <= 100) {
            marks = newMarks;
        }
    }

    int getMarks() {
        return marks;
    }
};
```

This is a new, smaller `Student` definition focused only on marks.

| Expression in `main()` | Result |
| --- | --- |
| `vasavi.setMarks(90);` | Updates marks to 90 |
| `vasavi.setMarks(-20);` | Leaves the previous marks unchanged |
| `vasavi.getMarks()` | Returns the current marks |
| `vasavi.marks = 90;` | Compilation error: `marks` is private |

**Private** members can be used by the class's own member functions, but ordinary code in `main()` cannot access them directly. Members of a C++ `class` are private by default unless we specify another access level.

`private` is a language access rule, not encryption or password protection.

Grouping data with its operations and controlling access is called **encapsulation**. The practical benefit here is that callers use a controlled operation to update marks.

We do not need a getter and setter for every variable. Provide operations that make sense for the object. A score object might offer `addPoints()` instead of allowing any score to be assigned.

**Try it:** set marks to 90, then attempt to set them to -20. Predict the value returned by `getMarks()` after each call.

## 8. Constructors and starting values

A **constructor** is a special member function that runs automatically when an object is created. It helps put the object into a usable starting state.

Suppose we want every student object to receive a name when it is created. Inside the class, we can write:

```cpp
Student(std::string studentName) {
    name = studentName;
}
```

This assumes the class also contains a data member named `name`.

Notice three rules:

1. The constructor has exactly the same name as the class.
2. It has no return type, not even `void`.
3. Its arguments are supplied when creating the object.

```cpp
Student vasavi("Vasavi");
Student arun("Arun");
```

Here, `studentName` is a **parameter**: a temporary local variable that receives the supplied name. `name` is the data member that keeps the value for the object.

We deliberately use different names so this distinction is easy to see. There is no need to learn `this->` yet.

A constructor that needs no arguments is called a **default constructor**. If we declare only the one-argument constructor above, `Student vasavi;` will no longer work: the class has no constructor that can be called without an argument.

Also distinguish **creation** from **updating**:

- `Student vasavi("Vasavi");` creates and initialises an object.
- `vasavi.setMarks(85);` calls a regular function on an existing object.

Initialising means giving something its starting state. Always give numeric data members deliberate starting values; a plain `int marks;` is not guaranteed to begin at zero for a local object.

## 9. A complete small example

This combines the ideas above. It demonstrates the concepts; the practice tasks later have no supplied solutions.

```cpp
#include <iostream>
#include <string>

class Student {
private:
    std::string name;
    int marks = 0;

public:
    Student(std::string studentName) {
        name = studentName;
    }

    void setMarks(int newMarks) {
        if (newMarks >= 0 && newMarks <= 100) {
            marks = newMarks;
        }
    }

    void display() {
        std::cout << name << ": " << marks << '\n';
    }
};

int main() {
    Student vasavi("Vasavi");
    Student arun("Arun");

    vasavi.setMarks(85);
    arun.setMarks(70);

    vasavi.display();
    arun.display();
    return 0;
}
```

Expected output:

```text
Vasavi: 85
Arun: 70
```

Save a copy as a `.cpp` file and run it using your usual C++ setup. With `g++` available in a Windows terminal, one option is:

```powershell
g++ -std=c++11 student_demo.cpp -o student_demo.exe
.\student_demo.exe
```

The program's setter silently ignores invalid marks. That is a simple teaching choice. Later, it could report whether the update succeeded.

## 10. Trace two objects by hand

Using the class from Section 9, trace these statements one at a time:

```cpp
Student first("Asha");
Student second("Ravi");
first.setMarks(40);
second.setMarks(90);
first.setMarks(120);
first.display();
second.display();
```

Fill in the table before running the code:

| After this statement | `first` marks | `second` marks |
| --- | --- | --- |
| Both objects have been created | ? | ? |
| `first.setMarks(40);` | ? | ? |
| `second.setMarks(90);` | ? | ? |
| `first.setMarks(120);` | ? | ? |

Then predict the two output lines. Explain your prediction in terms of the two objects' separate data and the condition in `setMarks()`.

## 11. How to design a small class

Before writing syntax, describe the object in ordinary language.

1. **Choose one responsibility.** What does this object represent or manage?
2. **Choose its data.** What must it remember between function calls?
3. **Choose its actions.** What should other code be able to ask it to do?
4. **Choose starting values.** What should be true immediately after creation?
5. **Choose its rules.** Which changes should it accept or reject?

For a simple game score, we might want to remember the current points, start at zero, add positive points, and display the result.

A member stores information that belongs with the object. A function parameter supplies information for one call. A local variable helps perform work inside a function. Not every variable needs to become a member.

Use ordinary loops and conditions inside member functions as needed. OOP changes how we organise related responsibilities; it does not replace those basic tools.

## 12. The four common OOP ideas

These names often appear in courses. For now, focus on the first two and recognise the others.

| Idea | Beginner meaning | Example |
| --- | --- | --- |
| Encapsulation | Keep related data and operations together and control access | Private marks with a public update function |
| Abstraction | Give callers a useful operation without requiring them to know its internal steps | Call `setMarks(85)` without repeating its validation in `main()` |
| Inheritance | Define a new class based on an existing class | A `Dog` can be a specialised kind of `Animal` |
| Polymorphism | Allow a common operation to have different behaviour for different types | Different kinds of shapes can provide their own way to calculate area |

Abstraction and encapsulation are related, but they describe different concerns: what callers need to use, and how data and operations are organised and accessed.

Inheritance and polymorphism can wait until classes, objects, member functions, and constructors feel comfortable. Their C++ syntax and runtime mechanisms are outside these first notes.

## 13. Common beginner mistakes

| Mistake | What to check |
| --- | --- |
| Missing `;` after the class definition | The ending should be `};` |
| Writing `void Student(...)` | A constructor must have no return type |
| Calling `Student.display()` | `Student` is the type; use an object such as `vasavi.display()` |
| Accessing a private member from `main()` | Use a suitable public member function |
| Forgetting parentheses in a function call | Write `vasavi.display()` |
| Expecting one object's update to change another | Each object has its own ordinary data members |
| Assuming an uninitialised `int` starts at zero | Supply a starting value explicitly |
| Using `Student vasavi;` when a name is required | Check which constructors the class provides |
| Writing `Student vasavi();` to create a default object | This declares a function; use `Student vasavi;` when a default constructor exists |
| Copying every example into one file | The sections show alternative versions of the same class |

When a compiler reports many errors, start with the first one. One missing semicolon can cause several later messages.

## 14. Practice without solutions

Work on one task at a time. First explain the data and actions to Dinesh, then write a small part and run it. Ask for a hint when stuck.

### Practice A: Book records

Create a `Book` class with a title and a page count. Begin with public data so you can focus on class and object syntax.

- Create two books with different values.
- Add a member function that displays a book's details.
- Change only one book's page count and display both again.

**Check:** the unchanged book must keep its original data.

### Practice B: A simple counter

Create a `Counter` whose private count begins at zero. Give it public operations to increase the count by one and display its value.

- Create two counters.
- Increase the first three times and the second once.
- Predict their values before displaying them.

**Check:** the displayed values should be 3 and 1.

### Practice C: Rectangle

Create a `Rectangle` with private integer length and width. A constructor receives both dimensions. Provide a member function that returns its area.

For this first version, assume the constructor receives positive dimensions.

| Length | Width | Expected area |
| --- | --- | --- |
| 4 | 3 | 12 |
| 1 | 7 | 7 |
| 5 | 5 | 25 |

**Next step, after the basic version works:** decide what the class should do if a dimension is zero or negative. Explain the rule before changing the code.

### Practice D: Explain a rule

Use the student example and try marks of 0, 100, -1, and 101. Display the result after each update.

**Check:** 0 and 100 are accepted. -1 and 101 leave the previous value unchanged. Explain which condition causes this.

## 15. Quick revision

| Word | Meaning |
| --- | --- |
| Class | A type we define with members |
| Object / instance | A particular object of a class type |
| Data member | A variable belonging to an object in our examples |
| Member function / method | A function belonging to a class |
| Constructor | A special member function used to initialise a new object |
| `public` | Accessible to code outside the class |
| `private` | Direct access is restricted; the class's member functions can use it |
| `.` | Selects a member of an object |

You are ready to move on when you can explain a class and an object in your own words, create two independent objects, call their member functions, and explain why a constructor is useful.

## 16. Teaching plan for Dinesh

Spread this over several short sessions if needed. Let Vasavi explain or try each step before introducing the next one.

| Session | Read together | Let Vasavi do |
| --- | --- | --- |
| 1: Class and object | Sections 1–5 | Describe a book's data, then create two objects |
| 2: Actions and access | Sections 6–7 | Call a method, then predict an invalid marks update |
| 3: Starting state | Sections 8–10 | Explain the constructor and complete the trace table |
| 4: Independent practice | Sections 11–15 | Complete one practice task at a time |

Ask at most one or two questions at a time and wait for her answer. Useful prompts are “What does this object remember?” and “Which object's data changes on this line?”

If her code fails, acknowledge the part that works and choose one small input to trace. Let her find the correction before supplying it. Introduce the next concept once she can explain the current one without copying a definition.
