var easy = document.getElementById("easy");
var hard = document.getElementById("hard");
var hex = document.getElementById("hex");
var rgb = document.getElementById("rgb");

var panels = document.getElementById("panels");
var panelsHard = document.getElementById("panels-hard");
var correctGuess = document.getElementById("guess");

var isRGB = true;
var isEasy = true;

let colorChoice;
let randNum;

// Correct and incorrect count
highscoreCount = document.getElementById("highscore");
scoreCount = document.getElementById("score");

let score = 0;

// Stops new question during timout.
let inTimeout = false;

// Stops highscore reading "null"
if (localStorage.getItem("highScore") == null) localStorage.setItem("highScore", 0);

// Switches mode to easy.
easy.addEventListener("click", () => {
    if (!isEasy) {
        scoreReset();
        color();
        on(easy, hard);
        panelsHard.style.display = "none";
        isEasy = true;
    };
});

// Switches mode to hard.
hard.addEventListener("click", () => {
    if (isEasy) {
        scoreReset();
        color();
        on(hard, easy);
        panelsHard.style.display = "flex";     
        isEasy = false;
    };
    
});

// Switches mode to RGB.
hex.addEventListener("click", () => {
    if (isRGB) {
        isRGB = false;
        scoreReset();
        on(hex, rgb);
        color();
    }
});

// Switches mode to hexadecimal.
rgb.addEventListener("click", () => {
    if (!isRGB) {
        isRGB = true;
        scoreReset();
        on(rgb, hex); 
        color();  
    }
});

// Resets score and sets highscore, used when mode or difficulty is switched.
function scoreReset() {
    if (score > localStorage.getItem('highScore')) localStorage.setItem('highScore', score);
    score = 0;
}

// Generates a random integer.
function randInt(max) {
    return Math.floor(Math.random() * max) + 1;
}   

// Shows the selected option.
function on(on, off) {
    on.style.backgroundColor = "#0C3B40";
    off.style.backgroundColor = "#112226";
}

// Is called when a panel is clicked, checks is answered correctly.
function guess(panel) {
    if (panel == randNum) {
        timeout("correct", panel);
    } else {
        timeout("incorrect", panel)
    }
}

// Generates a random color.
function randomColor() {
    if (isRGB) {
        // Random RGB color.
        colorChoice = `RGB(${randInt(255)}, ${randInt(255)}, ${randInt(255)})`;
        return colorChoice;
    } else {
        // Random hexadecimal color. (code from https://www.w3resource.com/)
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        colorChoice = '#' + n.slice(0, 6);
        return colorChoice;
    }
}

// Sets the color of each panel.
function color() {
    highscoreCount.innerText = `Highscore ${localStorage.getItem('highScore')}`;
    scoreCount.innerText = `Score ${score}`;

    // Assigns a random color to each panel.
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

    // Assigns a correct color to a panel.
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

// Handels correct and incorrect notifications.
function timeout(questionStatus, panelChosen) {
    let correctBorder = randNum;

    // Stops code if in a timeout.
    if (inTimeout) return;

    // Shows the border of the chosen and correct panel.
    if (panelChosen < 3) {
        panels.children[panelChosen].style.borderWidth = "7px";
    } else {
        panelsHard.children[panelChosen - 3].style.borderWidth = "7px";
    }

    if (randNum < 3) {
        panels.children[randNum].style.borderWidth = "7px"; 
    } else {
        panelsHard.children[randNum - 3].style.borderWidth = "7px"; 
    }
    
    // Sets a timeout inbetween question to notify correct and incorrect options.
    setTimeout(() => {
        inTimeout = false;
        color();

        // Resets banner color.
        correctGuess.style.backgroundColor = document.documentElement.style.getPropertyValue("--dark-red");
        correctGuess.children[0].style.color = document.documentElement.style.getPropertyValue("--red");

        // Hides the border after the timeout.
        if (panelChosen < 3) {
            panels.children[panelChosen].style.borderWidth = "0px";
        } else {
            panelsHard.children[panelChosen - 3].style.borderWidth = "0px";
        }

        if (correctBorder < 3) {
            panels.children[correctBorder].style.borderWidth = "0px";
        } else {
            panelsHard.children[correctBorder - 3].style.borderWidth = "0px";
        }
            
    }, 1500);
    inTimeout = true;
    correctGuess.children[0].innerText = questionStatus.toUpperCase();

    // Changes banner based on whether the question was correct.
    switch (questionStatus) {
        case "incorrect":
            scoreReset();

            // Changes banner color and text to incorrect.
            correctGuess.children[0].innerText = "INCORRECT";
            correctGuess.style.backgroundColor = "rgba(115, 54, 59, 0.5)";
            correctGuess.children[0].style.color = "rgba(242, 94, 107, 0.7)";

            // Shows chosen option.
            if (panelChosen < 3) {
                panels.children[panelChosen].style.borderColor = "#F25E6B";
            } else {
                panelsHard.children[panelChosen - 3].style.borderColor = "#F25E6B";
            }

            // Shows correct option.
            if (randNum < 3) {
                panels.children[randNum].style.borderColor = "#A9BF5A";
            } else {
                panelsHard.children[randNum - 3].style.borderColor = "#A9BF5A";
            }
            break;

        case "correct":
            score++;

            // Changes banner color and text to correct.
            correctGuess.children[0].innerText = "CORRECT";
            correctGuess.style.backgroundColor = "rgba(109, 122, 61, 0.5)";
            correctGuess.children[0].style.color = "rgba(169, 191, 90, 0.7)";

            // Shows correct option.
            if (panelChosen < 3) {
                panels.children[panelChosen].style.borderColor = "#A9BF5A";
            } else {
                panelsHard.children[panelChosen - 3].style.borderColor = "#A9BF5A";
            }
            break;
    }
}

// Starts program.
color();