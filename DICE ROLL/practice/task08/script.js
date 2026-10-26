const btn = document.getElementById("btn");
const message = document.getElementById("message");
let count = 0;

btn.addEventListener("click", function () {
  count = count + 1;
  message.textContent = "Clicked " + count + " times";
});
