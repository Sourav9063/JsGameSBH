import { randomRange, setInnerHTML, resetHtml, getRandomColor } from "./scripts/helper.js";
import { setAttempts, setScore, setTarget, createBall } from "./scripts/uiHelper.js";


const btn = document.querySelector("#play");
const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");
const scoreBoard = document.querySelector(".score-board");

const GameLogic = {
    level: localStorage.getItem('level') || 0,
    target: randomRange(25, 50),
    maxAttempts: randomRange(0, 25),
    yourAttempts: 0,
    score: 0,
    curScore: 0
}


setTarget(GameLogic)
setScore(GameLogic)
setAttempts(GameLogic)

function reset(GameLogic) {
    GameLogic.target = randomRange(25, 50);
    GameLogic.maxAttempts = randomRange(0, 25);
    GameLogic.score = 0;
    GameLogic.curScore = 0;
    GameLogic.yourAttempts = 0;
    setInnerHTML(btn, "Play");
    btn.style.backgroundColor = "rgb(255,0, 0)";
    resetHtml(scoreBoard)
    setTarget(GameLogic);
    setScore(GameLogic);
    setAttempts(GameLogic)
    // scoreBoareWrapper.style.display = "none"

}

function checkScore(GameLogic) {
    if (GameLogic.score === GameLogic.target) {
        btn.disabled = true;

        localStorage.setItem('level', String(++GameLogic.level));

        setTimeout(() => {
            btn.disabled = false;

            inner.innerHTML = "You WON!!!";
            inner.style.backgroundColor = "rgba(0, 255, 85, 0.85)";
            outer.style.display = "grid";

            reset(GameLogic);
        }, 1300);
    }
}
function checkAttempts(GameLogic) {
    // console.log({ yourAttempts, maxAttempts })

    if ((!(GameLogic.yourAttempts < GameLogic.maxAttempts)) && GameLogic.score !== GameLogic.target) {
        btn.disabled = true;
        GameLogic.level = 0;
        // level--;
        localStorage.setItem('level', GameLogic.level);

        setTimeout(() => {
            btn.disabled = false;

            inner.innerHTML = "You LOSE!!!";
            inner.style.backgroundColor = "rgba(255, 0, 0, 0.85)";

            outer.style.display = "grid";
            reset(GameLogic);
        }, 1300);
    }
}


function clickFn(GameLogic) {
    // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    // scoreBoareWrapper.style.display = "block";
    console.log("Clicked")
    GameLogic.yourAttempts = GameLogic.yourAttempts + 1;
    GameLogic.curScore = randomRange(1, 5);
    setInnerHTML(btn, GameLogic.curScore);
    setAttempts(GameLogic);
    checkAttempts(GameLogic)

    if (((GameLogic.score + GameLogic.curScore) <= GameLogic.target) && GameLogic.yourAttempts <= GameLogic.maxAttempts) {
        let tmpScore = GameLogic.score;
        GameLogic.score += GameLogic.curScore;
        setScore(GameLogic)
        checkScore(GameLogic);
        let randomColor = getRandomColor();

        for (let i = 0; i < GameLogic.curScore; i++) {
            btn.style.backgroundColor = randomColor;
            // btn.style.boxShadow = `6px 0px 0px ${getRandomColor()}, 0px 7px 0px ${getRandomColor()}`;
            btn.style.boxShadow = `6px 7px 0px rgba(0,0,0,.3), 6px 7px 0px ${randomColor}`;


            scoreBoard.append(createBall(tmpScore, i, randomColor))



        }
        // checkScore(score, target);


    }

}


btn.addEventListener("click", (e) => {
    console.log("btn")
    clickFn(GameLogic)
});

outer.addEventListener("click", () => {
    outer.style.display = "none"
})

console.dir(btn)






































// 6px 0px 0px rgba(255,255,255,.5), 6px 0px 0px ${randomColor},



// let level = localStorage.getItem('level') || 0;
// let target = randomRange(25, 50);
// let maxAttempts = randomRange(0, 25);
// let yourAttempts = 0;
// let score = 0;
// let curScore = 0;