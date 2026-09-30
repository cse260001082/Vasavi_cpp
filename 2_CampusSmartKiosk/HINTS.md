# Hints & Self-Check Guide for Vasavi

---

### A Note From Dinesh
> *"Hey Vasavi! You have learned all the building blocks: loops, conditions, functions, and variables. This problem might look big at first glance, but it is just small, simple pieces connected together.*
> *Take a deep breath, break it down step-by-step, and don't rush. If you try your best and still feel stuck, remember **I am always here to help you**. You are never alone in this learning journey!"*

---

## How to Approach This Problem

Do not try to write the entire program at once! Follow this 5-step roadmap. **Compile and run after every step.**
1. **Step 1:** Implement `printReceiptBorder()` (Easiest, a quick win!). Test it with option 5 in the menu.
2. **Step 2:** Implement `authenticateUser()` (Mastering `while` loops & attempt counters).
3. **Step 3:** Implement `checkBalance()`, `depositMoney()`, and `withdrawMoney()` (Mastering `if-else` & pass-by-reference).
4. **Step 4:** Implement `libraryFineCalculator()` (Mastering `switch` & `for` loops).
5. **Step 5:** Final check of `main()` and run the full **Test Checklist** in `PROBLEM_STORY.md`.

Already done for you (just read and understand them): `showMenu()`, `printMiniStatement()`, and the `main()` menu loop. The exact messages to print are in the **Exact Messages** table in `PROBLEM_STORY.md`.

---

## Function-by-Function Hints & Self-Checks

---

### 1. Function: `printReceiptBorder(int length)`
*Concept: Simple `for` loop*

#### Self-Check Question:
- *Do I know how a basic `for` loop counts from `0` to `length - 1`?*

#### Hint & Logic:
```cpp
for (int i = 0; i < length; i++) {
    cout << "=";
}
cout << endl;
```

---

### 2. Function: `authenticateUser(int correctPin)`
*Concept: `while` loop, counter variable, `bool` return*

#### Self-Check Questions:
- *What happens to `attempts` each time an incorrect PIN is entered?*
- *When should the loop stop? (When the PIN is correct OR when `attempts` reaches 3)*
- *The starter code has `return true;` as a placeholder at the end. What should it become?*

#### Hint & Logic:
```cpp
while (attempts < 3) {
    cout << "Enter 4-Digit Security PIN: ";
    cin >> enteredPin;

    if (enteredPin == correctPin) {
        cout << "Access Granted!\n";
        return true; // Successfully authenticated
    } else {
        attempts++;
        int remaining = 3 - attempts;
        if (remaining > 0) {
            cout << "Incorrect PIN! " << remaining << " attempts remaining.\n";
        }
    }
}

// If the loop finishes, it means 3 failed attempts
cout << "SYSTEM LOCKED: Too many incorrect attempts. Contact Admin.\n";
return false;
```
Remember to **delete the placeholder** `return true;` that is already at the bottom of the function.

---

### 3. Function: `checkBalance(double balance, string name, string studentId)`
*Concept: `if`*

#### Self-Check Question:
- *Why is there NO `&` in this function?*
  **Answer:** We only read the balance here and never change it, so a copy is enough.

#### Hint & Logic:
```cpp
if (balance <= 0) {
    cout << "[Alert] Your wallet balance is empty. Please deposit funds.\n";
}
```

---

### 4. Function: `depositMoney(double &balance)`
*Concept: `if-else`, Pass-by-Reference (`&`)*

#### Self-Check Questions:
- *Why is there an `&` in `double &balance`?*
  **Answer:** Because we want any change made to `balance` inside this function to permanently update the `balance` in `main()`!
- *How do I calculate the 2% bonus?*
  **Answer:** `bonus = amount * 0.02;`
- *What if the amount is less than 5000?*
  **Answer:** The bonus stays `0.0`, so `balance + amount + bonus` still works.

#### Hint & Logic:
```cpp
if (amount <= 0) {
    cout << "Invalid deposit amount!\n";
    return;
}

double bonus = 0.0;
if (amount >= 5000) {
    bonus = amount * 0.02; // 2% bonus
    cout << "Congratulations! You received a 2% bonus of Rs." << bonus << "!\n";
}

balance = balance + amount + bonus;
cout << "Updated Balance: Rs." << balance << "\n";
```

---

### 5. Function: `withdrawMoney(double &balance)`
*Concept: Multiple `if - else if - else` checks*

#### Self-Check Questions:
- *What are all the reasons a withdrawal could fail? (Check them in THIS order)*
  1. Amount is 0 or less
  2. Current balance is already 0
  3. Amount is greater than available balance
  4. Amount is greater than the daily limit (10000)
- *Which check triggers if the balance is 15000 and I try to withdraw 12000?*
  **Answer:** Check 3 passes (12000 is not more than 15000), so check 4 (daily limit) triggers.
- *Which check triggers if the balance is 500 and I try to withdraw 12000?*
  **Answer:** Check 3 (insufficient funds) triggers first, because it comes before the limit check.

#### Hint & Logic:
Use one chain of `if / else if / else`, so only ONE message is ever printed:
```cpp
if (amount <= 0) {
    // "Invalid withdrawal amount!"
} else if (balance == 0) {
    // "Transaction Denied: Your balance is zero."
} else if (amount > balance) {
    // "Insufficient Funds! You only have Rs." << balance << "."
} else if (amount > DAILY_WITHDRAW_LIMIT) {
    // "Exceeds daily withdrawal limit of Rs.10,000."
} else {
    balance = balance - amount;
    // "Please collect your cash. Remaining balance: Rs." << balance
}
```

---

### 6. Function: `libraryFineCalculator(double &balance)`
*Concept: `switch-case`, `for` loop, `do-while` loop, `if-else`*

#### Self-Check Questions:
- *How does the rate per day get decided?*
  Using `switch(category)`:
    - Case 1: `ratePerDay = 5.0;`
    - Case 2: `ratePerDay = 15.0;`
    - Case 3: `ratePerDay = 25.0;`
    - Default: print `Invalid Category!` and `return;`
- *Do I need a running total variable inside the `for` loop?*
  **Answer:** No! The cumulative fine on day `day` is simply `day * ratePerDay`.
- *Why a `do-while` and not a `while` for the payment question?*
  **Answer:** We must ask the question at least once before we can check the answer. A `do-while` checks its condition AFTER the first run.
- *Do I need `&` here?*
  **Answer:** Yes, because paying the fine changes the balance in `main()`.

#### Hint & Logic:
```cpp
for (int day = 1; day <= days; day++) {
    cout << "Day " << day << ": Cumulative Fine = Rs." << (day * ratePerDay) << "\n";
}
```

Payment part (a `do-while` asks at least once and repeats until the answer is 0 or 1):
```cpp
int payChoice;
do {
    cout << "Do you want to pay this fine from your wallet? (1 for YES, 0 for NO): ";
    cin >> payChoice;

    if (payChoice != 0 && payChoice != 1) {
        cout << "Invalid choice! Please enter 1 for YES or 0 for NO.\n";
    }
} while (payChoice != 0 && payChoice != 1);

if (payChoice == 1) {
    if (balance >= totalFine) {
        balance = balance - totalFine;
        // "Fine of Rs.<totalFine> paid successfully! New Balance: Rs.<balance>"
    } else {
        // "Not enough balance to pay library fine."
    }
} else {
    // "Fine left unpaid."
}
```

---

### 7. `main()`: Already Connected for You
The menu `while (choice != 6)` loop and the `switch` are already written. Read through them and answer:
- *Why does every `case` end with `break;`?*
- *What makes the loop stop?*
- *Why is `walletBalance` passed without `&` to `checkBalance`, but the same variable is used in `depositMoney`?* (Hint: read the function signatures.)

---

## Common Pitfalls to Avoid!
1. **Forgetting `break;` in `switch`:** If you forget `break;`, C++ will execute the next case automatically (called *fall-through*). This matters in your `switch(category)` too.
2. **Infinite `while` loop:** Always ensure your counter (like `attempts++`) or input changes inside the loop so it can terminate.
3. **Using `=` instead of `==` in `if` statements:** `if (pin == 2468)` checks equality, while `pin = 2468` assigns the value!
4. **Typing letters instead of numbers:** The program can hang. Press `Ctrl+C` and run again.
5. **Forgetting to delete the placeholder `return true;`** in `authenticateUser`.

---

## Still Need Help?
Take a short 2-minute break, grab a pen & paper to trace what numbers your variables hold, and then call or message **Dinesh**!
