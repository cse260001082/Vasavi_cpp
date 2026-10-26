const btn = document.getElementById("btn");
const message = document.getElementById("message");
let count = 0;

btn.addEventListener("click", function () {
  count = count + 1;
  message.textContent = "Clicked " + count + " times";
});

const dice = document.getElementById("dice");
const rollBtn = document.getElementById("roll");

function getRandom() {
  return Math.floor(Math.random() * 6) + 1;
}

rollBtn.addEventListener("click", function () {
  const n = getRandom();
  message.textContent = "You rolled " + n;
  dice.src = "images/dice" + n + ".svg";
});
