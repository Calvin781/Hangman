let wordTab = [];
let foundletters = [];
let usedLetter = [];
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.getElementById("restart").addEventListener("click", () => {
    location.reload();
})

async function getData() {

    const promise = await fetch('https://random-word-api.herokuapp.com/word')
    const word = await promise.json();
    wordTab = word[0].split('');

}

async function startGame() {

    await getData();
    let game = new (Game);
    let keyboard = new Keyboard(game);
    game.updateLetters();
    game.draw();

}

function getAllIndexOfLetter(array, letter) {

    let letterIndex = [];

    for (i = 0; i < array.length; i++) {
        if (array[i] == letter) {
            letterIndex.push(i);
        }
    }
    return letterIndex;
}

function checkLetter(game, letterAttribute) {

    if (wordTab.includes(letterAttribute) && game.life > 0 && !isWordFound()) { // La lettre deviné est dans le mot.

        document.querySelector(`.${letterAttribute}`).style.backgroundColor = "green";
        let lettersIndex = getAllIndexOfLetter(wordTab, letterAttribute);
        for (let i = 0; i < lettersIndex.length; i++) {
            foundletters.splice(lettersIndex[i], 1, letterAttribute);
        }

        game.updateLetters();

        if (isWordFound()) {
            document.getElementById("restart").style.display = "block";
            document.getElementById("hangedman").style.background = "rgb(71, 71, 71) url('https://thumbs.gfycat.com/AlarmingSereneGerenuk.webp') no-repeat center";
            console.log('test');
        }

    }

    if (!wordTab.includes(letterAttribute) && game.life > 0 && usedLetter.includes(letterAttribute) === false && !isWordFound()) {

        usedLetter.push(letterAttribute);

        document.querySelector(`.${letterAttribute}`).style.backgroundColor = "#600000";
        game.life--;
        game.draw();


    }
}

function isWordFound() {
    if (wordTab.join('') == foundletters.join('')) {
        return true
    } else { return false }
}

class Game {

    constructor() {
        this.life = 6;
        this.word = wordTab;
    }

    updateLetters() {
        $(".word").empty();

        if (foundletters.length != wordTab.length) {
            wordTab.forEach(letter => {

                foundletters.push("");
                let target = document.getElementById("word");
                let newSpan = document.createElement("span");
                target.appendChild(newSpan);

            })
        } else {

            foundletters.forEach(letter => {
                let target = document.getElementById("word");
                let newSpan = document.createElement("span");
                newSpan.innerHTML = letter;

                target.appendChild(newSpan);
            })

        }
    }

    draw(ctx) {
        drawHangedman(this.life);
    }
}

startGame();







