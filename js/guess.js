const input = document.querySelector("#userAnswer"),
    checkBtn = document.querySelector("#button"),
    repeatBtn = document.querySelector("#repeatBtn"),
    MAX_TRY_COUNT = 5;

let tryCount = 0,
    guessNumber = parseInt(Math.random() * 101),
    isGuessed = false;


hide(repeatBtn);
/* parseInt() извлекает число из строки, например
parseInt('1.5')// => 1
Math.round() округляет число до ближайшего целого числа:
Math.round('1.5')// => 2
parseInt() может получить свой номер, удалив лишний текст, например:
parseInt('12foo')// => 12
Однако Math.round не будет:
Math.round('12foo')// => NaN */


function changeMessage(message) {
    document.querySelector("#message").innerHTML = message;
}

function hide(element) {
    element.style.display = "none"
}

function show(element) {
    element.style.display = "block"
}

function gameState(message) {
    hide(checkBtn)
    hide(input);
    show(repeatBtn);
    changeMessage(message);
}

function gameOver(isGuessed = false) {
    if (isGuessed) {
        gameState(`You win!!!`);
    } else if (tryCount == MAX_TRY_COUNT) {
        gameState(`You lost( <br> correct answer ${guessNumber}`);
    } else {
        gameState(`We'll play another time`);
    }

}

checkBtn.onclick = function(){
    const userAnswer = input.value;//прочитала ответ
    console.log(typeof userAnswer)
    console.log(guessNumber);
    
    if (userAnswer === "q") {
        return gameOver(isGuessed);
    }

    if (userAnswer === "" || isNaN(userAnswer)) {
        changeMessage(`It looks like you entered not a number, <br> try again. You have ${MAX_TRY_COUNT - tryCount} more attempts`);
        input.value = "";
        return;
    }

    tryCount++;
    if (userAnswer == guessNumber) {
        isGuessed = true;
        return gameOver(isGuessed);
    }
    else if (tryCount == MAX_TRY_COUNT) {
        return gameOver();
    } else {
        changeMessage(`The number is to ${userAnswer > guessNumber ? "big" : "small"}, <br> try again. You have ${MAX_TRY_COUNT - tryCount} more attempts`);
        input.value = "";
    }
}

repeatBtn.onclick = function () {
    guessNumber = parseInt(Math.random() * 101);
    console.log(guessNumber)
    tryCount = 0;
    isGuessed = false;
    input.value = "";
    hide(repeatBtn);
    show(input);
    show(checkBtn);
    changeMessage(`Guessed number is grater than 0, but less than 100 <br> To exit enter "q"`)
}