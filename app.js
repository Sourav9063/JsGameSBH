import { randomRange, setInnerHTML, getRandomColor } from "./scripts/helper.js";


const btn = document.querySelector("#play");
const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");


const scoreBoard = document.querySelector(".score-board");

let level = localStorage.getItem('level') || 0;;
let target = randomRange(25, 50);
let maxAttempts = randomRange(0, 25);
let yourAttempts = 0;
let score = 0;
let curScore = 0;


let randomColor;

function setTarget(target, maxAttempts) {
    const levelEl = document.querySelector("span.level")
    const targetEl = document.querySelector("span.target ")
    const maxAttemptsEl = document.querySelector("span.max-attempts")
    setInnerHTML(targetEl, target);
    setInnerHTML(maxAttemptsEl, maxAttempts);
    setInnerHTML(levelEl, level);
}
setTarget(target, maxAttempts)
function setScore(score) {
    const scoreEl = document.querySelector("span.score ")
    setInnerHTML(scoreEl, score);

}
function setAttempts(yourAttempts) {
    const yourAttemptsEl = document.querySelector("span.your-attempts")
    setInnerHTML(yourAttemptsEl, yourAttempts);
}
setScore(score)
setAttempts(yourAttempts)

function reset() {
    target = randomRange(25, 50);
    maxAttempts = randomRange(0, 25);
    score = 0;
    curScore = 0;
    yourAttempts = 0;
    setInnerHTML(btn, "Play");
    btn.style.backgroundColor = "rgb(255,0, 0)";
    scoreBoard.innerHTML = "";
    setTarget(target, maxAttempts);
    setScore(score);
    setAttempts(yourAttempts)
    scoreBoard.style.display = "none"

}

function checkScore(score, target) {
    if (score === target) {
        localStorage.setItem('level', ++level);
        inner.innerHTML = "You WON!!!";
        inner.style.backgroundColor = "rgba(0, 255, 85, 0.452)";
        outer.style.display = "grid";

        reset();
    }
}
function checkAttempts(yourAttempts, maxAttempts) {
    if (yourAttempts === maxAttempts) {
        inner.innerHTML = "You LOSE!!!";
        outer.style.display = "grid";
        reset();
    }
}


function clickFn() {
    scoreBoard.style.display = "grid";

    yourAttempts++;
    curScore = randomRange(1, 5);
    setInnerHTML(btn, curScore);
    setAttempts(yourAttempts);
    checkAttempts(yourAttempts, maxAttempts)

    if ((score + curScore) <= target) {
        score += curScore;
        setScore(score)
        checkScore(score, target);
        randomColor = getRandomColor();

        for (let i = 0; i < curScore; i++) {
            btn.style.backgroundColor = randomColor;
            const ball = document.createElement("div");
            ball.classList.add("ball");
            ball.innerHTML = curScore;
            ball.style.backgroundColor = randomColor;
            ball.style.transitionDelay = `${(i) * 0.2}s`;


            scoreBoard.prepend(ball)


            setTimeout(() => {
                ball.style.width = "80%";
                // ball.style.height = "calc(100% / 10)";
            }, 10);
        }
        checkScore(score, target);


    }
    else {

    }



}


btn.addEventListener("click", clickFn);

outer.addEventListener("click", () => {
    outer.style.display = "none"
})

console.dir(btn)