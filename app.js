var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var hex = document.getElementById("hex");
var rgb = document.getElementById("rgb");

correctCount = document.getElementById("correct");
incorrectCount = document.getElementById("incorrect");

var panels = document.getElementById("panels");
var panelsHard = document.getElementById("panels-hard");
var correctGuess = document.getElementById("guess");

var isRGB = true;
var isEasy = true;

let colorChoice;
let randNum;

let correct = 0;
let incorrect = 0;

easy.addEventListener("click", () => {
    if (!isEasy) {
        scoreReset();
        on(easy, hard);
        panelsHard.style.display = "none";
        color();
        isEasy = true;
    };
});
hard.addEventListener("click", () => {
    if (isEasy) {
        scoreReset();
        on(hard, easy);
        panelsHard.style.display = "flex";
        color();
        isEasy = false;
    };
    
});
hex.addEventListener("click", () => {
    if (isRGB) {
        isRGB = false;
        scoreReset();
        on(hex, rgb);
        color();
    }
});
rgb.addEventListener("click", () => {
    if (!isRGB) {
        isRGB = true;
        scoreReset();
        on(rgb, hex); 
        color();  
    }
});

function scoreReset() {
    correct = 0;
    incorrect = 0;
}

function randInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function on(on, off) {
    on.style.backgroundColor = "#0C3B40";
    off.style.backgroundColor = "#112226";
}

function randomColor() {
    if (isRGB) {
        colorChoice = `RGB(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`;
        return colorChoice;
    } else {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        colorChoice = '#' + n.slice(0, 6);
        return colorChoice;
    }
}

function color() {
    correctCount.innerText = `correct ${correct}`
    incorrectCount.innerText = `incorrect ${incorrect}`

    for (let i = 0; i < 3; i++) {   
        panels.children[i].style.backgroundColor = randomColor();
        panelsHard.children[i].style.backgroundColor = randomColor();
    }

    var panelsNum;
    if (isEasy) {
        panelsNum = 3;
    } else {
        panelsNum = 6;
    }

    let correctColor = randomColor();
    correctGuess.children[0].innerText = correctColor;

    randNum = randInt(panelsNum) - 1;
    if (randNum < 3){
        panels.children[randNum].style.backgroundColor = colorChoice;
    } else {
        panelsHard.children[randNum - 3].style.backgroundColor = colorChoice;
    }

    console.log(`The correct color is in slot ${randNum + 1}`);
}   

function guess(panel) {
    if (panel == randNum) {
        console.log("Correct!");
        correct++;
        setTimeout(() => {
            color();
            correctGuess.style.backgroundColor = document.documentElement.style.getPropertyValue("--dark-red");
            correctGuess.children[0].style.color = document.documentElement.style.getPropertyValue("--red");
        }, 1500);
        correctGuess.children[0].innerText = "CORRECT";
        correctGuess.style.backgroundColor = "#5eff5e";
        correctGuess.children[0].style.color = "#2ef202";
        co
    } else {
        console.log("Incorrect");
        incorrect++;
        setTimeout(() => {
            color();
            correctGuess.style.backgroundColor = document.documentElement.style.getPropertyValue("--dark-red");
            correctGuess.children[0].style.color = document.documentElement.style.getPropertyValue("--red");
        }, 1500);
        correctGuess.children[0].innerText = "INCORRECT";
        correctGuess.style.backgroundColor = "#f20202";
        correctGuess.children[0].style.color = "#ff5e5e";
    }
}

color();