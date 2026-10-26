const btn = document.getElementById("btn");
const message = document.getElementById("message");
const imgEle = document.getElementById("dice");
const rollBtn = document.getElementById("roll");

let count = 0;

btn.addEventListener("click", function () {
  count = count + 1;
  message.textContent = "Clicked " + count + " times";
});

function getRandom() {
  let temp = Math.ceil(Math.random() * 6);
  return temp;
}

rollBtn.addEventListener("click", function(){
  let diceNumber = getRandom();
  const newSource = "images/dice" + diceNumber + ".svg";
  imgEle.src = newSource;

  message.textContent = "You rolled " + diceNumber;
})