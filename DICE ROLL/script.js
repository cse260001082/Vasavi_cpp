const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const result = document.getElementById("result");
const list = document.getElementById("history");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

function getRandom() {
  return Math.floor(Math.random() * 6) + 1;
}

function addHistory(text) {
  const item = document.createElement("li");
  item.textContent = text;
  list.prepend(item);

  if (list.children.length > 10) {
    list.lastElementChild.remove();
  }
}

function roll(count) {
  if (count === 1) {
    dice2.style.display = "none";
  } else {
    dice2.style.display = "inline";
  }

  dice1.classList.add("shake");
  dice2.classList.add("shake");
  result.textContent = "Rolling...";

  setTimeout(function () {
    dice1.classList.remove("shake");
    dice2.classList.remove("shake");

    const a = getRandom();
    dice1.src = "images/dice" + a + ".svg";
    let text = a;

    if (count === 2) {
      const b = getRandom();
      dice2.src = "images/dice" + b + ".svg";
      text = a + " + " + b + " = " + (a + b);
    }

    result.textContent = text;
    addHistory(text);
  }, 500);
}

btn1.addEventListener("click", function () {
  roll(1);
});

btn2.addEventListener("click", function () {
  roll(2);
});
