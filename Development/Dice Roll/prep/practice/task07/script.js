let count =  0;

// DOM - Document Object Manipulation

const btnEle = document.getElementById('btn');
const clickCntEle = document.getElementById('message');


btnEle.addEventListener('click', function () {
    count = count +  1;
    let newMsg = "Clicked " + count +" times";

    clickCntEle.innerHTML = newMsg;
})