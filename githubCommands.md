# Simple Git & GitHub Commands

Only the basic commands you need for now. 🙂

---

## 1. Create a Repository on GitHub

On GitHub:

1. Click **New Repository**
2. Give your repository a name
3. Click **Create Repository**

---

## 2. Copy the Repository to Your Computer

Copy the repository URL from GitHub, then run:

```bash
git clone REPOSITORY_URL
```

Example:

```bash
git clone https://github.com/username/my-project.git
```

Then open the project folder:

```bash
cd my-project
```

---

## 3. Check Your Changes

```bash
git status
```

This shows which files you changed.

---

## 4. Add Your Changes

To add all changed files:

```bash
git add .
```

---

## 5. Commit Your Changes

```bash
git commit -m "your message"
```

Example:

```bash
git commit -m "Added calculator program"
```

A commit is basically a saved checkpoint of your code.

---

## 6. Push Your Code to GitHub

```bash
git push
```

This uploads your committed changes to GitHub.

---

## 7. Get the Latest Code from GitHub

Before starting work, run:

```bash
git pull
```

This downloads the latest changes from GitHub.

---

# Commands You Will Use Most

```bash
git pull
git status
git add .
git commit -m "what you changed"
git push
```

That's enough Git for now. 🚀
