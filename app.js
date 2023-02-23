import { randomRange, setInnerHTML, getRandomColor } from "./scripts/helper.js";


const btn = document.querySelector("#play");
const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");


const scoreBoard = document.querySelector(".score-board");
const scoreBoareWrapper = document.querySelector(".score-wrapper")

let level = localStorage.getItem('level') || 0;;
let target = randomRange(25, 50);
let maxAttempts = randomRange(0, 25);
let yourAttempts = 0;
let score = 0;
let curScore = 0;


let randomColor;

const levelEl = document.querySelector("span.level")
const targetEl = document.querySelector("span.target ")
const maxAttemptsEl = document.querySelector("span.max-attempts")

function setTarget(target, maxAttempts) {
    setInnerHTML(targetEl, target);
    setInnerHTML(maxAttemptsEl, maxAttempts);
    setInnerHTML(levelEl, level);
}
setTarget(target, maxAttempts)
const scoreEl = document.querySelector("span.score ")
const scoreElH2 = document.querySelector(".score-h2")
function setScore(score) {
    if ((target - score) < 6) {
        scoreElH2.style.color = "#1aff00"
    }
    else {
        scoreElH2.style.color = "black"

    }
    setInnerHTML(scoreEl, score);

}
const yourAttemptsEl = document.querySelector("span.your-attempts")
const yourAttemptsElH2 = document.querySelector(".your-attempts-h2")
function setAttempts(yourAttempts) {
    if ((maxAttempts - yourAttempts) < 6) {
        yourAttemptsElH2.style.color = "red"
    }
    else {
        yourAttemptsElH2.style.color = "black"

    }
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
    // scoreBoareWrapper.style.display = "none"

}

function checkScore(score, target) {
    if (score === target) {
        btn.disabled = true;

        localStorage.setItem('level', ++level);

        setTimeout(() => {
            btn.disabled = false;

            inner.innerHTML = "You WON!!!";
            inner.style.backgroundColor = "rgba(0, 255, 85, 0.85)";
            outer.style.display = "grid";

            reset();
        }, 1000);
    }
}
function checkAttempts(yourAttempts, maxAttempts) {
    // console.log({ yourAttempts, maxAttempts })

    if (!(yourAttempts < maxAttempts)) {
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;

            inner.innerHTML = "You LOSE!!!";
            inner.style.backgroundColor = "rgba(255, 0, 0, 0.85)";

            outer.style.display = "grid";
            reset();
        }, 1000);
    }
}


function clickFn() {
    // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    // scoreBoareWrapper.style.display = "block";

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
            btn.style.boxShadow = `6px 0px 0px ${getRandomColor()}, 0px 6px 0px ${getRandomColor()}`;
            const ball = document.createElement("div");
            ball.classList.add("ball");
            ball.innerHTML = curScore;
            ball.style.backgroundColor = "${randomColor}"
            ball.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), ${randomColor} 70%)`;
            ball.style.animationDelay = `${(i) * 0.2}s`;



            scoreBoard.append(ball)



        }
        // checkScore(score, target);


    }
    else {

    }



}


btn.addEventListener("click", clickFn);

outer.addEventListener("click", () => {
    outer.style.display = "none"
})

console.dir(btn)