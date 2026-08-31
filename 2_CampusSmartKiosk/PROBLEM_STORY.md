# 🏢 Problem 2: Campus Smart Kiosk & Digital Wallet System

---

## 📖 The Story & Mission

Welcome, Lead Software Engineer **Vasavi**! 🌟  

The university administration has just installed interactive **Smart Kiosks** across campus. These terminals allow students to:
1. Securely log in using their **Student ID** and a **4-digit PIN**.
2. Manage their **Campus Digital Wallet** (Deposit cash with cashback bonuses, or withdraw pocket money).
3. Visit the **Library Desk** to calculate and pay overdue book fines.
4. View their **Account Profile & Mini-Statement**.

The university hardware is installed, but the software controller is missing. **Your mission is to write the complete C++ software that powers the Smart Kiosk!**

---

## ⏱️ Recommended Time & Mindset
- **Target Time:** 45 to 60 minutes.
- **Mindset:** Read through the instructions patiently. Take it one function at a time. Do not panic if something doesn't compile right away—debugging is how real engineers learn!

---

## 📝 ✍️ The #1 Golden Rule: Always Use Pen & Paper First!

> ### 🧠 An Important Lesson Every Great Coder Learns:
> When faced with a larger coding problem, **the biggest mistake is trying to hold and trace everything in your head**. Trying to remember all variable values, conditions, and loop counters mentally will quickly cause confusion and frustration.
>
> **Before typing a single line of code in C++:**
> 1. **Grab a notebook and a pen.**
> 2. **Write down your variables** (e.g. `balance = 1500`, `attempts = 0`, `bonus = 0`).
> 3. **Trace what happens step-by-step** on paper for a sample input (e.g. *"What happens to `balance` when I deposit 6000? What is the 2% bonus? New balance = 7620"*).
> 4. **Sketch the flow:** (e.g., Draw a small box for the `while` loop, arrows for `if` and `else`).
>
> Once you map out the logic on paper, converting it into C++ code will feel **easy, clear, and effortless!** 🚀

---

## ⚙️ System Specifications & Rules

### 1. Initial State & Configuration
- **Default PIN:** `2468`
- **Initial Balance:** `₹1500.00`
- **Daily Withdrawal Limit:** `₹10,000.00`

---

### 2. Login & Authentication Flow (`while` loop)
- When the student arrives, greet them with a welcome banner.
- Prompt for their **Name** and **Student ID**.
- Prompt for their **4-digit PIN**.
- **Security Rule:**
  - The student has a **maximum of 3 attempts** to enter the correct PIN (`2468`).
  - If they enter the correct PIN within 3 attempts $\to$ Unlock system and proceed to the **Main Dashboard**.
  - If they fail all 3 attempts $\to$ Print `"🚨 SYSTEM LOCKED: Too many incorrect attempts. Contact Admin."` and terminate the program immediately.

---

### 3. Main Dashboard Menu (`while` loop + `switch-case`)
Once logged in, the kiosk continuously displays the main menu until the student chooses option `6` (Exit):

```text
========================================
     🏫 CAMPUS SMART KIOSK DASHBOARD
========================================
1. 👤 Check Balance & Account Profile
2. 💵 Deposit Money (with Bonus!)
3. 💸 Withdraw Cash
4. 📚 Library Desk (Overdue Fine Payment)
5. 🧾 Print Mini-Statement
6. 🚪 Exit & Logout
========================================
Enter your choice (1-6): 
```

---

### 4. Detailed Feature Specifications

#### 🔹 Option 1: Check Balance & Account Profile
- Display Student Name, Student ID, and Current Wallet Balance formatted as currency (`₹`).
- If balance is `0` or below, display a gentle warning: `"[Alert] Your wallet balance is empty. Please deposit funds."`

#### 🔹 Option 2: Deposit Money (with Cashback Bonus!)
- Prompt for the deposit amount.
- Input validation: Amount must be $> 0$. If not, show error `"Invalid deposit amount!"`.
- **Special Promotion (`if-else`):**
  - If deposit amount $\ge ₹5000$, the student receives a **2% Cashback Bonus** added directly to the deposit!
  - Otherwise, no bonus is added.
- Add the total (deposit + bonus) to the wallet balance and show the updated balance.

#### 🔹 Option 3: Withdraw Cash (Strict Validation)
- Prompt for withdrawal amount.
- **Validation Rules (`if-else`):**
  1. Amount must be $> 0$.
  2. If current balance is `₹0.00` $\to$ Print `"❌ Transaction Denied: Your balance is zero."`
  3. If withdrawal amount $>$ current balance $\to$ Print `"❌ Insufficient Funds! You only have ₹[balance]."`
  4. If withdrawal amount $>$ Daily Limit (`₹10000`) $\to$ Print `"❌ Exceeds daily withdrawal limit of ₹10,000."`
  5. If all checks pass $\to$ Deduct amount from balance and print `"✅ Please collect your cash. Remaining balance: ₹[balance]"`.

#### 🔹 Option 4: Library Desk (Late Fee Calculator)
- Students select the genre of their overdue book:
  - `[1]` **Standard Textbook** $\to$ Rate: `₹5` per day
  - `[2]` **Reference / Rare Book** $\to$ Rate: `₹15` per day
  - `[3]` **Digital Media / Laptop** $\to$ Rate: `₹25` per day
- Prompt for the number of overdue days ($N$).
- Use a **`for` loop** to calculate and display the day-by-day fee accumulation breakdown!
- Calculate Total Fine = $N \times \text{Rate}$.
- Ask the student: `"Do you want to pay this fine from your wallet? (1 for YES, 0 for NO): "`
  - If YES: Check if wallet balance $\ge$ Total Fine. If yes, deduct and clear the fine! If not enough balance, print `"❌ Not enough balance to pay library fine."`

#### 🔹 Option 5: Print Mini-Statement
- Use a **`for` loop** to print a neat decorative receipt border (e.g. `40` stars or dashes).
- Print a summary of the session: Student Name, Final Balance, and System Status (`"Account Active"`).

#### 🔹 Option 6: Exit & Logout
- Print a warm farewell message: `"Thank you for using Campus Smart Kiosk. Have a wonderful day!"`
- Terminate the menu loop.

---

## 🧪 Sample Execution Flow (To Test Your Code)

### Test Run: Complete Scenario
```text
==================================================
        🌟 WELCOME TO CAMPUS SMART KIOSK 🌟
==================================================
Enter Your Name: Vasavi
Enter Student ID: CS2026

Enter 4-Digit Security PIN: 1111
❌ Incorrect PIN! 2 attempts remaining.
Enter 4-Digit Security PIN: 2468
✅ Access Granted! Welcome Vasavi.

--- Main Menu ---
Choose Option: 1
[Profile] Name: Vasavi | ID: CS2026 | Balance: ₹1500.00

Choose Option: 2
Enter Deposit Amount: 6000
🎉 Congratulations! You received a 2% bonus of ₹120.00!
Updated Balance: ₹7620.00

Choose Option: 3
Enter Withdrawal Amount: 2000
✅ Please collect your cash. Remaining balance: ₹5620.00

Choose Option: 4
Select Book Category (1: Standard, 2: Rare, 3: Digital): 1
Enter Overdue Days: 3
--- Fine Accumulation Breakdown ---
Day 1: Fine = ₹5.00
Day 2: Fine = ₹10.00
Day 3: Fine = ₹15.00
Total Fine: ₹15.00
Pay now from wallet? (1: YES, 0: NO): 1
✅ Fine of ₹15.00 paid successfully! New Balance: ₹5605.00

Choose Option: 6
Thank you for using Campus Smart Kiosk. Have a wonderful day, Vasavi!
```

---

## 💡 Need Help?
Check out [**`HINTS.md`**](HINTS.md) for step-by-step guidance and self-check questions before you code!
