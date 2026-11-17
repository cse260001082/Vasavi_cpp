
/*
*   Mundu ga, question samanga ekkali, so read this below AI slop
    TEST CASES (the last three output lines should match the right column)

    Input                   Expected words, in order
    mango banana apple      apple banana mango
    apple banana mango      apple banana mango
    banana apple mango      apple banana mango
    apple apple banana      apple apple banana
    apple app application   app apple application
    z a m                   a m z
    cat cat cat             cat cat cat

    TRY AFTER READING
    1. Trace "banana apple mango" by hand. Which comparisons cause swaps?
    2. Temporarily skip step 3 and run "apple mango banana".
       Explain why putting a smallest word first is not enough.
    3. Close this file and rewrite the program in a separate scratch file.
       Explain why temp is needed and why the condition uses strcmp > 0.
*/

#include <iostream> // cin reads input; cout displays output.
#include <cstring>  // strcmp compares strings; strcpy copies strings.

using namespace std;

int main()
{
    // read the three words, but not like ordinary "String" data type like cpp
    char first[101], second[101], third[101];
    char temp[101]; // Spare storage used while swapping two words. (You will get to know about it in a moment)

    cout << "Enter three words (at most 100 characters per word):\n";

    cin >> first >> second >> third;

    /*
     * Here is the main logic, you are not storing this in any array to use inbuilt sort function
     * So, manam manual ga 3 elements ni order cheyali and here is the logic, you will understand it if you relate how you will be using if-else to find max between 2 elements
     */
    // Step 1: Put the smaller of the first two words in first.
    if (strcmp(first, second) > 0)
    {
        strcpy(temp, first);   // Save first before overwriting it.
        strcpy(first, second); // Move second into first.
        strcpy(second, temp);  // Move the saved word into second.
    }

    // Step 2: Compare that smaller word with third.
    // Afterwards, first is no greater than either remaining word.
    if (strcmp(first, third) > 0)
    {
        strcpy(temp, first);
        strcpy(first, third);
        strcpy(third, temp);
    }

    // Step 3: first is settled. Put the remaining two words in order.
    // Equal words need no swap, and both copies remain in the output.
    if (strcmp(second, third) > 0)
    {
        strcpy(temp, second);
        strcpy(second, third);
        strcpy(third, temp);
    }

    cout << "Words in lexicographical order:\n";
    cout << first << '\n'
         << second << '\n'
         << third << '\n';

    return 0; // Samaptham, ika selavu
}


/*  No need to read, but kavalante detailed AI draft idi, you can read at your own interest!!

    PRACTICE 06: Three words in lexicographical order

    QUESTION
    Write a program in C++ in which the user enters three words,
    stores these as C-type strings, and displays these words in
    lexicographical order (the order followed in the dictionary).

    This file contains a complete reference solution. Read the explanation,
    trace the example, then try writing it again without looking below.

    1. WHAT IS A C-TYPE STRING?
    A C-type (or C-style) string is an array of characters ending with '\0'.
    '\0' is the null character: it marks where the text ends.
    For example, "cat" needs FOUR spaces: 'c', 'a', 't', '\0'.
    char word[101] has room for at most 100 letters and this ending marker.
    We use char arrays here because the question asks for C-type strings.

    2. WHAT DOES LEXICOGRAPHICAL ORDER MEAN?
    Compare the words from left to right. The first different character
    decides the order. For example, "bat" comes before "bed" because
    'a' comes before 'e'. If one word is a prefix of another, the shorter
    word comes first: "app" comes before "apple".
    Use lowercase English words for ordinary dictionary-style examples.
    strcmp is case-sensitive and compares character values; it does not
    ignore capitals or apply language-specific dictionary rules.

    3. HOW DO WE COMPARE AND COPY THESE STRINGS?
    <cstring> provides these functions:

        strcmp(a, b) < 0   means a comes BEFORE b.
        strcmp(a, b) == 0  means both words are the SAME.
        strcmp(a, b) > 0   means a comes AFTER b.

    Remember the SIGN, not an exact value such as 1 or -1.
    Do not use a > b to compare the text in char arrays: that would
    compare their memory addresses instead of their letters.

        strcpy(destination, source) copies the text, including '\0'.

    An array cannot be assigned another array using first = second.
    strcpy needs a destination large enough to hold the source string.
    All four arrays below have the same capacity, so each copy fits.

    4. THE PLAN (for exactly THREE words)
    - Compare first and second; swap if they are in the wrong order.
    - Compare first and third; swap if they are in the wrong order.
      Now first holds a smallest word.
    - Compare second and third; swap if they are in the wrong order.
      Now all three words are in order.

    A swap needs a temporary array so we do not lose the original first
    word when we overwrite it. Think of moving a drink between two cups:
    you need a spare cup to keep one drink while moving the other.

    HAND TRACE
                              first     second    third
    Input:                    mango     banana    apple
    Compare first, second:    banana    mango     apple
    Compare first, third:     apple     mango     banana
    Compare second, third:    apple     banana    mango
*/
