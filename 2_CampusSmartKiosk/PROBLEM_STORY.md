# Problem 2: Campus Smart Kiosk & Digital Wallet System

---

## The Story & Mission

Welcome, Lead Software Engineer **Vasavi**!

The university administration has just installed interactive **Smart Kiosks** across campus. These terminals allow students to:
1. Securely log in using their **Student ID** and a **4-digit PIN**.
2. Manage their **Campus Digital Wallet** (Deposit cash with cashback bonuses, or withdraw pocket money).
3. Visit the **Library Desk** to calculate and pay overdue book fines.
4. View their **Account Profile & Mini-Statement**.

The university hardware is installed, but the software controller is missing. **Your mission is to write the complete C++ software that powers the Smart Kiosk!**

---

## Recommended Time & Mindset
- **Target Time:** 45 to 60 minutes.
- **Mindset:** Read through the instructions patiently. Take it one function at a time. Do not panic if something doesn't compile right away. Debugging is how real engineers learn!

---

## The #1 Golden Rule: Always Use Pen & Paper First!

> ### An Important Lesson Every Great Coder Learns:
> When faced with a larger coding problem, **the biggest mistake is trying to hold and trace everything in your head**. Trying to remember all variable values, conditions, and loop counters mentally will quickly cause confusion and frustration.
>
> **Before typing a single line of code in C++:**
> 1. **Grab a notebook and a pen.**
> 2. **Write down your variables** (e.g. `balance = 1500`, `attempts = 0`, `bonus = 0`).
> 3. **Trace what happens step-by-step** on paper for a sample input (e.g. *"What happens to `balance` when I deposit 6000? What is the 2% bonus? New balance = 7620"*).
> 4. **Sketch the flow:** (e.g., draw a small box for the `while` loop, arrows for `if` and `else`).
>
> Once you map out the logic on paper, converting it into C++ code will feel **easy, clear, and effortless!**

---

## Important Rules for Typing Input
- Type **numbers only** when the kiosk asks for a number (PIN, amount, menu choice, days). If you type a letter, the program can hang. Press `Ctrl+C` and run it again.
- Type the **Name** and **Student ID** as **one word, without spaces** (e.g. `Vasavi`, `CS2026`).
- Your output **wording does not have to match the sample character by character**, but the **logic and the numbers must be correct**. The exact messages are listed in the "Exact Messages" table below, so use those.
- Money is always printed with 2 decimals (e.g. `7620.00`). This is already set once at the top of `main()`, so you don't need to do it again.
- The currency symbol is written as `Rs.` (instead of the rupee sign) so it displays properly in every terminal.

---

## System Specifications & Rules

### 1. Initial State & Configuration
- **Default PIN:** `2468`
- **Initial Balance:** `Rs.1500.00`
- **Daily Withdrawal Limit:** `Rs.10,000.00`

---

### 2. Login & Authentication Flow (`while` loop)
- When the student arrives, greet them with a welcome banner.
- Prompt for their **Name** and **Student ID**.
- Prompt for their **4-digit PIN**.
- **Security Rule:**
  - The student has a **maximum of 3 attempts** to enter the correct PIN (`2468`).
  - If they enter the correct PIN within 3 attempts, unlock the system and proceed to the **Main Dashboard**.
  - If they fail all 3 attempts, print the lock message and terminate the program immediately.

---

### 3. Main Dashboard Menu (`while` loop + `switch-case`)
Once logged in, the kiosk continuously displays the main menu until the student chooses option `6` (Exit). The menu is already written for you in `showMenu()`:

```text
========================================
     CAMPUS SMART KIOSK DASHBOARD
========================================
1. Check Balance & Account Profile
2. Deposit Money (with Bonus!)
3. Withdraw Cash
4. Library Desk (Overdue Fine Payment)
5. Print Mini-Statement
6. Exit & Logout
========================================
Enter your choice (1-6):
```

---

### 4. Detailed Feature Specifications

#### Option 1: Check Balance & Account Profile
- Display Student Name, Student ID, and Current Wallet Balance formatted as currency (`Rs.`).
- If balance is `0` or below, display a gentle warning (see message table).

#### Option 2: Deposit Money (with Cashback Bonus!)
- Prompt for the deposit amount.
- Input validation: Amount must be greater than 0. If not, show the error message.
- **Special Promotion (`if-else`):**
  - If deposit amount is **5000 or more**, the student receives a **2% Cashback Bonus** added directly to the deposit!
  - Otherwise, no bonus is added.
- Add the total (deposit + bonus) to the wallet balance and show the updated balance.

#### Option 3: Withdraw Cash (Strict Validation)
- Prompt for withdrawal amount.
- **Validation Rules (`if - else if - else`), checked in exactly this order:**
  1. Amount must be greater than 0.
  2. If current balance is `Rs.0.00`, deny the transaction.
  3. If withdrawal amount is greater than current balance, show "Insufficient Funds".
  4. If withdrawal amount is greater than the Daily Limit (`Rs.10000`), show the limit message.
  5. If all checks pass, deduct the amount from balance and print the success message.

#### Option 4: Library Desk (Late Fee Calculator)
- Students select the genre of their overdue book:
  - `[1]` **Standard Textbook**: Rate `Rs.5` per day
  - `[2]` **Reference / Rare Book**: Rate `Rs.15` per day
  - `[3]` **Digital Media / Laptop**: Rate `Rs.25` per day
- Prompt for the number of overdue days (N).
- Use a **`for` loop** to display the day-by-day fee accumulation breakdown.
  - The cumulative fine on day `d` is simply `d * rate`. No separate running total is needed.
- Total Fine = N x Rate.
- Ask the student if they want to pay from the wallet (1 for YES, 0 for NO).
  - If YES: check if wallet balance is at least the Total Fine. If yes, deduct it. If not, print the "not enough balance" message.
  - If NO: print that the fine is left unpaid.

#### Option 5: Print Mini-Statement
- Already written for you. It uses **your** `printReceiptBorder()` function, which must print a `for`-loop border of `=` characters.

#### Option 6: Exit & Logout
- Print the farewell message and terminate the menu loop.

---

## Exact Messages (use these strings)

`<...>` means "print the value of that variable here".

| Where | Message |
|---|---|
| PIN prompt | `Enter 4-Digit Security PIN: ` |
| Wrong PIN (only if attempts are still left) | `Incorrect PIN! <remaining> attempts remaining.` |
| Correct PIN | `Access Granted!` |
| 3 wrong PINs | `SYSTEM LOCKED: Too many incorrect attempts. Contact Admin.` |
| Empty wallet (Option 1) | `[Alert] Your wallet balance is empty. Please deposit funds.` |
| Deposit <= 0 | `Invalid deposit amount!` |
| Bonus earned | `Congratulations! You received a 2% bonus of Rs.<bonus>!` |
| After deposit | `Updated Balance: Rs.<balance>` |
| Withdraw <= 0 | `Invalid withdrawal amount!` |
| Balance is zero | `Transaction Denied: Your balance is zero.` |
| Amount > balance | `Insufficient Funds! You only have Rs.<balance>.` |
| Amount > 10000 | `Exceeds daily withdrawal limit of Rs.10,000.` |
| Withdraw success | `Please collect your cash. Remaining balance: Rs.<balance>` |
| Bad book category | `Invalid Category!` |
| Days <= 0 | `No overdue days! Fine is Rs.0.00.` |
| Each day line | `Day <day>: Cumulative Fine = Rs.<day * rate>` |
| Total | `Total Fine: Rs.<totalFine>` |
| Pay question | `Do you want to pay this fine from your wallet? (1 for YES, 0 for NO): ` |
| Fine paid | `Fine of Rs.<totalFine> paid successfully! New Balance: Rs.<balance>` |
| Balance too low for fine | `Not enough balance to pay library fine.` |
| Chose NO | `Fine left unpaid.` |
| Invalid menu choice | `Invalid choice! Please select a valid option (1-6).` |
| Exit | `Thank you for using Campus Smart Kiosk. Have a wonderful day, <name>!` |

---

## Sample Execution Flow (To Test Your Code)

### Test Run: Complete Scenario
```text
==================================================
        WELCOME TO CAMPUS SMART KIOSK
==================================================
Enter Your Name: Vasavi
Enter Student ID: CS2026

Enter 4-Digit Security PIN: 1111
Incorrect PIN! 2 attempts remaining.
Enter 4-Digit Security PIN: 2468
Access Granted!
Welcome Vasavi!

(menu) Enter your choice (1-6): 1
--- Account Profile ---
Student Name  : Vasavi
Student ID    : CS2026
Wallet Balance: Rs.1500.00

(menu) Enter your choice (1-6): 2
Enter Deposit Amount: Rs.6000
Congratulations! You received a 2% bonus of Rs.120.00!
Updated Balance: Rs.7620.00

(menu) Enter your choice (1-6): 3
Enter Withdrawal Amount: Rs.2000
Please collect your cash. Remaining balance: Rs.5620.00

(menu) Enter your choice (1-6): 4
Select Book Category (1-3): 1
Enter number of overdue days: 3
--- Fine Accumulation Breakdown ---
Day 1: Cumulative Fine = Rs.5.00
Day 2: Cumulative Fine = Rs.10.00
Day 3: Cumulative Fine = Rs.15.00
Total Fine: Rs.15.00
Do you want to pay this fine from your wallet? (1 for YES, 0 for NO): 1
Fine of Rs.15.00 paid successfully! New Balance: Rs.5605.00

(menu) Enter your choice (1-6): 6
Thank you for using Campus Smart Kiosk. Have a wonderful day, Vasavi!
```

---

## Test Checklist (tick each one after you test it!)

Run the program fresh for each group. Balance starts at `1500.00`.

### A. Login
- [ ] Enter 3 wrong PINs (e.g. `1`, `2`, `3`): "SYSTEM LOCKED" is printed and the program ends.
- [ ] Enter wrong, wrong, then `2468`: access is granted on the 3rd attempt.
- [ ] Enter `2468` first: no "Incorrect PIN" message at all.

### B. Deposit
- [ ] Deposit `0` or `-50`: "Invalid deposit amount!", balance unchanged.
- [ ] Deposit `4999`: no bonus, balance becomes `6499.00`.
- [ ] Then deposit `5000`: bonus is `100.00`, balance becomes `11599.00`.

### C. Withdraw (continue from balance `11599.00`)
- [ ] Withdraw `0`: "Invalid withdrawal amount!".
- [ ] Withdraw `20000`: "Insufficient Funds! You only have Rs.11599.00."
- [ ] Withdraw `10500`: passes the balance check but fails the limit: "Exceeds daily withdrawal limit of Rs.10,000." Balance stays `11599.00`.
- [ ] Withdraw `2000`: success, balance becomes `9599.00`.
- [ ] Withdraw `9599`: success, balance becomes `0.00`.
- [ ] Choose Option 1: the `[Alert]` empty-wallet warning appears.
- [ ] Withdraw `100`: "Transaction Denied: Your balance is zero."

### D. Library (start fresh, balance `1500.00`)
- [ ] Category `4`: "Invalid Category!" and you return to the menu.
- [ ] Category `1`, days `0`: "No overdue days! Fine is Rs.0.00."
- [ ] Category `2`, days `3`: breakdown `15.00`, `30.00`, `45.00`, total `45.00`.
- [ ] Pay = `1`: new balance `1455.00`.
- [ ] Pay = `0`: "Fine left unpaid.", balance unchanged.
- [ ] Category `3`, days `100` (fine `2500.00`), pay = `1` with balance `1500.00`: "Not enough balance to pay library fine."

### E. Menu & Exit
- [ ] Choose `9`: "Invalid choice!" and the menu appears again.
- [ ] Choose `5`: the receipt is printed with `=` borders, name, ID and balance.
- [ ] Choose `6`: the farewell message appears and the program ends.

---

## Need Help?
Check out [**`HINTS.md`**](HINTS.md) for step-by-step guidance and self-check questions before you code!
