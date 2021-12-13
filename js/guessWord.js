const input = document.querySelector("#userAnswer"),
    submitBtn = document.querySelector("#button"),
    checkBtn = document.querySelector("#checkBtn");

let guesWord;
let answerArr;
let numLetter;
let wordState = document.querySelector("#wordState");

hide(checkBtn)

function changeMessage(message) {
    document.querySelector("#message").innerHTML = message;
}

function hide(element) {
    element.style.display = "none"
}

function show(element) {
    element.style.display = "block"
}


submitBtn.onclick = () => {
    guesWord = input.value.toLowerCase();
    if (!guesWord) alert("Enter a word, please!")
    else {
        answerArr = makeSymbolArr(guesWord);
        changeMessage(`Your word is ${guesWord.length} letters, enter letter`);

        hide(submitBtn);
        show(checkBtn);
        wordState.innerHTML=`${answerArr.join(" ")}`
        input.value = "";
        input.focus();
    }
    
}

function makeSymbolArr(str) {
    const arr = [];
    arr.length = str.length;
    for (let i = 0; i < arr.length; i++){
        arr[i] = "-";
    }
    return arr;
}

checkBtn.onclick = () => {
    let inputLetter = input.value;
    if (checkLetter(inputLetter)) {
        changeMessage(`Super!`);
        wordState.innerHTML = `${answerArr.join(" ")}`
        input.value = "";
        input.focus();
        if (!answerArr.includes("-")){
            hide(input);
            hide(checkBtn);
            wordState.innerHTML +=`<br> <p>The end )))</p>`
        }
    } else {
        changeMessage(`No such letter...`);
        input.value = "";
        input.focus();
    }
}

function checkLetter(letter) {
    let letterContain = false;
    for (let i = 0; i < guesWord.length; i++){
        if (letter == guesWord[i] && answerArr[i]=="-") {
            letterContain = true;
            answerArr[i] = letter;
            numLetter--;
        }
    } return letterContain;
}

