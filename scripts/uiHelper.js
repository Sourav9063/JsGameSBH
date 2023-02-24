import { setInnerHTML } from "./helper.js"

const levelEl = document.querySelector("span.level")
const targetEl = document.querySelector("span.target ")
const maxAttemptsEl = document.querySelector("span.max-attempts")
const scoreElH2 = document.querySelector(".score-h2")
const scoreEl = document.querySelector("span.score ")
const yourAttemptsEl = document.querySelector("span.your-attempts")
const yourAttemptsElH2 = document.querySelector(".your-attempts-h2")

export function setTarget(GameLogic) {
    setInnerHTML(targetEl, GameLogic.target);
    setInnerHTML(maxAttemptsEl, GameLogic.maxAttempts);
    setInnerHTML(levelEl, GameLogic.level);
}
export function setScore(GameLogic) {
    if ((GameLogic.target - GameLogic.score) < 6) {
        scoreElH2.style.color = "#1aff00"
    }
    else {
        scoreElH2.style.color = "black"

    }
    setInnerHTML(scoreEl, GameLogic.score);

}
export function setAttempts(GameLogic) {
    console.dir(GameLogic)
    if (((GameLogic.maxAttempts - GameLogic.yourAttempts) < 6) && ((GameLogic.maxAttempts - GameLogic.yourAttempts) >= 3)) {
        yourAttemptsElH2.style.color = "#ffb700"
    }
    else if ((GameLogic.maxAttempts - GameLogic.yourAttempts) < 3) {
        yourAttemptsElH2.style.color = "red"
    }
    else {
        yourAttemptsElH2.style.color = "black"

    }
    setInnerHTML(yourAttemptsEl, GameLogic.yourAttempts);
}

export function createBall(tmpScore, i, randomColor) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.innerHTML = tmpScore + i + 1;
    ball.style.backgroundColor = "${randomColor}"
    ball.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,1), ${randomColor} 45%)`;
    ball.style.animationDelay = `${(i) * 0.2}s`;
    return ball;
}


function setScoreBoard() {

}