/*
========================================================================================
             CAMPUS SMART KIOSK & DIGITAL WALLET CONTROLLER SYSTEM
========================================================================================
Developer: Vasavi
Target Time: 45 - 60 mins

Instructions:
1. Read the complete story and requirements in PROBLEM_STORY.md.
2. ✍️ Grab a PEN & PAPER to trace variable values and conditions before writing code!
3. If you need step-by-step guidance, refer to HINTS.md.
4. Complete the // TODO sections inside each function below.
5. Test all options in the dashboard menu!
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
    // 1. Prompt user to enter PIN
    // 2. Check if enteredPin == correctPin -> print success message and return true
    // 3. Else, increment attempts, calculate remaining attempts (3 - attempts)
    //    and display a warning.
    // 4. If all 3 attempts fail, print the lock out message and return false.

    return true; // Replace with your logic
}

// -------------------------------------------------------------------------------------
// 3. DISPLAY DASHBOARD MENU
// -------------------------------------------------------------------------------------
void showMenu()
{
    cout << "\n========================================\n";
    cout << "     🏫 CAMPUS SMART KIOSK DASHBOARD\n";
    cout << "========================================\n";
    cout << "1. 👤 Check Balance & Account Profile\n";
    cout << "2. 💵 Deposit Money (with Bonus!)\n";
    cout << "3. 💸 Withdraw Cash\n";
    cout << "4. 📚 Library Desk (Overdue Fine)\n";
    cout << "5. 🧾 Print Mini-Statement\n";
    cout << "6. 🚪 Exit & Logout\n";
    cout << "========================================\n";
    cout << "Enter your choice (1-6): ";
}

// -------------------------------------------------------------------------------------
// 4. CHECK BALANCE & PROFILE
// -------------------------------------------------------------------------------------
// Concepts: 'if-else' condition
void checkBalance(double balance, string name, string studentId)
{
    cout << "\n--- 👤 Account Profile ---\n";
    cout << "Student Name : " << name << "\n";
    cout << "Student ID   : " << studentId << "\n";
    cout << "Wallet Balance: ₹" << fixed << setprecision(2) << balance << "\n";

    // TODO: Check if balance is 0.0 or less, print an alert to deposit funds.
}

// -------------------------------------------------------------------------------------
// 5. DEPOSIT FUNDS
// -------------------------------------------------------------------------------------
// Description: Adds deposit amount to wallet. If amount >= 5000, adds a 2% bonus!
// Concepts: Pass-by-reference (&balance), 'if-else'
void depositMoney(double &balance)
{
    double amount;
    cout << "\nEnter amount to deposit: ₹";
    cin >> amount;

    // TODO:
    // 1. Validate: If amount <= 0, print error and return.
    // 2. Bonus check: If amount >= 5000, calculate bonus = amount * 0.02 and announce it.
    // 3. Update balance: balance = balance + amount + bonus;
    // 4. Display the updated balance.
}

// -------------------------------------------------------------------------------------
// 6. WITHDRAW FUNDS
// -------------------------------------------------------------------------------------
// Description: Validates and deducts withdrawal amount from the wallet.
// Concepts: Pass-by-reference (&balance), multiple 'if-else if-else' checks
void withdrawMoney(double &balance)
{
    double amount;
    cout << "\nEnter amount to withdraw: ₹";
    cin >> amount;

    // TODO:
    // Check the following conditions in order:
    // 1. If amount <= 0 -> "❌ Invalid amount!"
    // 2. If balance == 0 -> "❌ Transaction Denied: Your balance is zero."
    // 3. If amount > balance -> "❌ Insufficient funds! Available: ₹..."
    // 4. If amount > DAILY_WITHDRAW_LIMIT -> "❌ Exceeds daily withdrawal limit of ₹10,000."
    // 5. Else -> deduct amount from balance and print success message with new balance.
}

// -------------------------------------------------------------------------------------
// 7. LIBRARY FINE CALCULATOR & PAYMENT
// -------------------------------------------------------------------------------------
// Description: Calculates overdue fine based on book genre and days, with payment option.
// Concepts: 'switch-case', 'for' loop, 'if-else', pass-by-reference
void libraryFineCalculator(double &balance)
{
    cout << "\n--- 📚 Library Overdue Desk ---\n";
    cout << "1. Standard Textbook      (₹5 / day)\n";
    cout << "2. Reference / Rare Book  (₹15 / day)\n";
    cout << "3. Digital Media / Laptop (₹25 / day)\n";
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
        cout << "No overdue days! Fine is ₹0.00.\n";
        return;
    }

    // TODO: Use a for loop (day = 1 to days) to print cumulative fine per day
    cout << "\n--- Fine Accumulation Breakdown ---\n";
    // Write your for loop here:

    double totalFine = days * ratePerDay;
    cout << "Total Fine to Pay: ₹" << totalFine << "\n";

    // TODO: Ask student if they want to pay now:
    // int payChoice; (1 for YES, 0 for NO)
    // If YES:
    //    - Check if balance >= totalFine
    //    - If yes: balance -= totalFine, print success message
    //    - Else: print "❌ Insufficient balance to pay fine."
}

// -------------------------------------------------------------------------------------
// 8. PRINT MINI STATEMENT
// -------------------------------------------------------------------------------------
void printMiniStatement(double balance, string name, string studentId)
{
    cout << "\n";
    printReceiptBorder(45);
    cout << "         🏫 CAMPUS DIGITAL WALLET RECEIPT\n";
    printReceiptBorder(45);
    cout << " Student Name   : " << name << "\n";
    cout << " Student ID     : " << studentId << "\n";
    cout << " Final Balance  : ₹" << fixed << setprecision(2) << balance << "\n";
    cout << " Account Status : ACTIVE\n";
    printReceiptBorder(45);
}

// -------------------------------------------------------------------------------------
// MAIN CONTROLLER
// -------------------------------------------------------------------------------------
int main()
{
    printReceiptBorder(50);
    cout << "      🌟 WELCOME TO CAMPUS SMART KIOSK 🌟\n";
    printReceiptBorder(50);

    string studentName, studentId;
    cout << "Enter Your Name: ";
    getline(cin, studentName);
    cout << "Enter Student ID: ";
    cin >> studentId;

    // Authenticate user with PIN
    if (!authenticateUser(CORRECT_PIN))
    {
        // Program terminates if authentication fails 3 times
        return 0;
    }

    double walletBalance = 1500.00; // Starting wallet balance
    int choice = 0;

    // Main Dashboard Loop
    // TODO: Write a while loop that keeps showing menu until choice == 6
    while (choice != 6)
    {
        showMenu();
        cin >> choice;

        // TODO: Use a switch(choice) statement to call corresponding functions:
        // case 1: checkBalance(...)
        // case 2: depositMoney(...)
        // case 3: withdrawMoney(...)
        // case 4: libraryFineCalculator(...)
        // case 5: printMiniStatement(...)
        // case 6: print farewell message
        // default: print "Invalid choice! Please enter a number between 1 and 6."
        
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
                cout << "\nThank you for using Campus Smart Kiosk, " << studentName << "! Have a wonderful day! 👋\n";
                break;
            default:
                cout << "\n❌ Invalid choice! Please select a valid option (1-6).\n";
                break;
        }
    }

    return 0;
}
