/*
========================================================================================
             CAMPUS SMART KIOSK & DIGITAL WALLET CONTROLLER SYSTEM
========================================================================================
Developer: Vasavi
Target Time: 45 - 60 mins

Instructions:
1. Read the complete story and requirements in PROBLEM_STORY.md.
2. Grab a PEN & PAPER to trace variable values and conditions before writing code!
3. If you need step-by-step guidance, refer to HINTS.md.
4. Complete the // TODO sections inside each function below.
5. Test all options using the checklist at the end of PROBLEM_STORY.md.

NOTE: Type NUMBERS ONLY when the kiosk asks for a number. If you type a letter,
      cin fails and the program can hang. If that happens, press Ctrl+C and rerun.
========================================================================================
*/

#include <iostream>
#include <string>
#include <iomanip> // For formatting currency with fixed decimal places

using namespace std;

// System Constants
const int CORRECT_PIN = 2468;
const double DAILY_WITHDRAW_LIMIT = 10000.0;

// -------------------------------------------------------------------------------------
// 1. RECEIPT BORDER HELPER
// -------------------------------------------------------------------------------------
// Description: Prints a line of '=' characters of the given length.
// Concepts: 'for' loop
void printReceiptBorder(int length)
{
    // TODO: Write a for loop to print '=' character 'length' times, followed by endl.

}

// -------------------------------------------------------------------------------------
// 2. PIN AUTHENTICATION SYSTEM
// -------------------------------------------------------------------------------------
// Description: Allows the user up to 3 attempts to enter the correct PIN (2468).
// Returns: true if authenticated successfully, false if locked out after 3 attempts.
// Concepts: 'while' loop, counter variable, 'if-else', return statements
bool authenticateUser(int correctPin)
{
    int attempts = 0;
    int enteredPin;

    // TODO: Write a while loop (while attempts < 3)
    // 1. Prompt user to enter PIN: "Enter 4-Digit Security PIN: "
    // 2. Check if enteredPin == correctPin -> print "Access Granted!" and return true
    // 3. Else, increment attempts, calculate remaining attempts (3 - attempts)
    //    and print "Incorrect PIN! <remaining> attempts remaining."
    //    (print this only if remaining > 0)
    // 4. After the loop (3 failed attempts), print
    //    "SYSTEM LOCKED: Too many incorrect attempts. Contact Admin." and return false.

    return true; // PLACEHOLDER: replace this with your logic (otherwise the lockout never happens!)
}

// -------------------------------------------------------------------------------------
// 3. DISPLAY DASHBOARD MENU  (already done for you)
// -------------------------------------------------------------------------------------
// Description: Just prints the menu text. It does not read any input and does not
//              change any variable.
void showMenu()
{
    cout << "\n========================================\n";
    cout << "     CAMPUS SMART KIOSK DASHBOARD\n";
    cout << "========================================\n";
    cout << "1. Check Balance & Account Profile\n";
    cout << "2. Deposit Money (with Bonus!)\n";
    cout << "3. Withdraw Cash\n";
    cout << "4. Library Desk (Overdue Fine Payment)\n";
    cout << "5. Print Mini-Statement\n";
    cout << "6. Exit & Logout\n";
    cout << "========================================\n";
    cout << "Enter your choice (1-6): ";
}

// -------------------------------------------------------------------------------------
// 4. CHECK BALANCE & PROFILE
// -------------------------------------------------------------------------------------
// Description: Shows the student's name, ID and balance. Balance is passed by value
//              because we only READ it here (no change needed).
// Concepts: 'if-else' condition
void checkBalance(double balance, string name, string studentId)
{
    cout << "\n--- Account Profile ---\n";
    cout << "Student Name  : " << name << "\n";
    cout << "Student ID    : " << studentId << "\n";
    cout << "Wallet Balance: Rs." << balance << "\n";

    // TODO: If balance is 0.0 or less, print
    // "[Alert] Your wallet balance is empty. Please deposit funds."
}

// -------------------------------------------------------------------------------------
// 5. DEPOSIT FUNDS
// -------------------------------------------------------------------------------------
// Description: Adds deposit amount to wallet. If amount >= 5000, adds a 2% bonus!
// Concepts: Pass-by-reference (&balance), 'if-else'
void depositMoney(double &balance)
{
    double amount;
    cout << "\nEnter Deposit Amount: Rs.";
    cin >> amount;

    // TODO:
    // 1. Validate: If amount <= 0, print "Invalid deposit amount!" and return.
    // 2. Bonus check: If amount >= 5000, calculate bonus = amount * 0.02 and print
    //    "Congratulations! You received a 2% bonus of Rs.<bonus>!"
    // 3. Update balance: balance = balance + amount + bonus;
    // 4. Print "Updated Balance: Rs.<balance>"
}

// -------------------------------------------------------------------------------------
// 6. WITHDRAW FUNDS
// -------------------------------------------------------------------------------------
// Description: Validates and deducts withdrawal amount from the wallet.
// Concepts: Pass-by-reference (&balance), multiple 'if-else if-else' checks
void withdrawMoney(double &balance)
{
    double amount;
    cout << "\nEnter Withdrawal Amount: Rs.";
    cin >> amount;

    // TODO: Check the following conditions IN THIS ORDER (if / else if / else):
    // 1. amount <= 0                  -> "Invalid withdrawal amount!"
    // 2. balance == 0                 -> "Transaction Denied: Your balance is zero."
    // 3. amount > balance             -> "Insufficient Funds! You only have Rs.<balance>."
    // 4. amount > DAILY_WITHDRAW_LIMIT-> "Exceeds daily withdrawal limit of Rs.10,000."
    // 5. else                         -> balance = balance - amount; then print
    //                                    "Please collect your cash. Remaining balance: Rs.<balance>"
}

// -------------------------------------------------------------------------------------
// 7. LIBRARY FINE CALCULATOR & PAYMENT
// -------------------------------------------------------------------------------------
// Description: Calculates overdue fine based on book genre and days, with payment option.
// Concepts: 'switch-case', 'for' loop, 'if-else', pass-by-reference
void libraryFineCalculator(double &balance)
{
    cout << "\n--- Library Overdue Desk ---\n";
    cout << "1. Standard Textbook      (Rs.5 / day)\n";
    cout << "2. Reference / Rare Book  (Rs.15 / day)\n";
    cout << "3. Digital Media / Laptop (Rs.25 / day)\n";
    cout << "Select Book Category (1-3): ";

    int category;
    cin >> category;

    double ratePerDay = 0.0;

    // TODO: Use a switch(category) statement to set ratePerDay:
    //   - case 1: ratePerDay = 5.0; break;
    //   - case 2: ratePerDay = 15.0; break;
    //   - case 3: ratePerDay = 25.0; break;
    //   - default: Print "Invalid Category!" and return.

    int days;
    cout << "Enter number of overdue days: ";
    cin >> days;

    if (days <= 0)
    {
        cout << "No overdue days! Fine is Rs.0.00.\n";
        return;
    }

    // TODO: Use a for loop (day = 1 to days) to print the cumulative fine for each day:
    //   "Day <day>: Cumulative Fine = Rs.<day * ratePerDay>"
    // (No running total needed! Cumulative fine on day N is simply day * ratePerDay.)
    cout << "\n--- Fine Accumulation Breakdown ---\n";
    // Write your for loop here:

    double totalFine = days * ratePerDay;
    cout << "Total Fine: Rs." << totalFine << "\n";

    // TODO: Ask the student:
    //   "Do you want to pay this fine from your wallet? (1 for YES, 0 for NO): "
    // int payChoice;
    // If YES (1):
    //    - If balance >= totalFine: balance = balance - totalFine and print
    //      "Fine of Rs.<totalFine> paid successfully! New Balance: Rs.<balance>"
    //    - Else print "Not enough balance to pay library fine."
    // If NO (0):
    //    - Print "Fine left unpaid."
}

// -------------------------------------------------------------------------------------
// 8. PRINT MINI STATEMENT  (already done for you)
// -------------------------------------------------------------------------------------
// Description: Prints a decorated receipt with the student's name, ID and balance.
//              It uses YOUR printReceiptBorder() function for the lines.
void printMiniStatement(double balance, string name, string studentId)
{
    cout << "\n";
    printReceiptBorder(45);
    cout << "         CAMPUS DIGITAL WALLET RECEIPT\n";
    printReceiptBorder(45);
    cout << " Student Name   : " << name << "\n";
    cout << " Student ID     : " << studentId << "\n";
    cout << " Final Balance  : Rs." << balance << "\n";
    cout << " Account Status : Account Active\n";
    printReceiptBorder(45);
}

// -------------------------------------------------------------------------------------
// MAIN CONTROLLER
// -------------------------------------------------------------------------------------
int main()
{
    // Print every decimal number with exactly 2 digits (e.g. 7620.00) for the WHOLE program.
    // 'fixed' + 'setprecision(2)' stay active once set, so we only write this once.
    cout << fixed << setprecision(2);

    printReceiptBorder(50);
    cout << "        WELCOME TO CAMPUS SMART KIOSK\n";
    printReceiptBorder(50);

    // Name and ID are read with a simple 'cin >>', so type them WITHOUT spaces
    // (e.g. Vasavi, CS2026).
    string studentName, studentId;
    cout << "Enter Your Name: ";
    cin >> studentName;
    cout << "Enter Student ID: ";
    cin >> studentId;
    cout << "\n";

    // Authenticate user with PIN
    if (!authenticateUser(CORRECT_PIN))
    {
        // Program terminates if authentication fails 3 times
        return 0;
    }
    cout << "Welcome " << studentName << "!\n";

    double walletBalance = 1500.00; // Starting wallet balance
    int choice = 0;

    // Main Dashboard Loop (keeps showing the menu until choice == 6)
    while (choice != 6)
    {
        showMenu();
        cin >> choice;

        switch (choice)
        {
            case 1:
                checkBalance(walletBalance, studentName, studentId);
                break;
            case 2:
                depositMoney(walletBalance);
                break;
            case 3:
                withdrawMoney(walletBalance);
                break;
            case 4:
                libraryFineCalculator(walletBalance);
                break;
            case 5:
                printMiniStatement(walletBalance, studentName, studentId);
                break;
            case 6:
                cout << "\nThank you for using Campus Smart Kiosk. Have a wonderful day, " << studentName << "!\n";
                break;
            default:
                cout << "\nInvalid choice! Please select a valid option (1-6).\n";
                break;
        }
    }

    return 0;
}
