// Q8: Complete the constructor's name and the argument during object creation.
// Create a Notebook object that starts with 80 pages.
// Check: expected output is 80.
// Explain: why does the constructor have no return type?

#include <iostream>

class Notebook {
private:
    int pages = 0;

public:
    ___(int startingPages) {
        pages = startingPages;
    }

    int getPages() {
        return pages;
    }
};

int main() {
    Notebook notebook(___);
    std::cout << notebook.getPages() << '\n';
    return 0;
}
