let wordTab = [];
let foundletters = [];
let usedLetter = [];
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.getElementById("restart").addEventListener("click", () => location.reload());

let getData = async () => {

    const promise = await fetch("https://random-words2.p.rapidapi.com/words?limit=1&lang=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "9e08c19790mshadfb1a24187b3ccp169803jsn78520b0fdb2f",
            "x-rapidapi-host": "random-words2.p.rapidapi.com"
        }
    })

    const data = await promise.json();

    wordTab = data.words[0].split('');

}
let startGame = async () => {



    await getData();
    let game = new (Game);
    let keyboard = new Keyboard(game);
    game.updateLetters();
    game.draw();

}

let getAllIndexOfLetter = (array, letter) => {

    let letterIndex = [];

    for (i = 0; i < array.length; i++) {
        if (array[i] == letter) {
            letterIndex.push(i);
        }
    }
    return letterIndex;
}

let checkLetter = (game, letterAttribute) => {

    if (wordTab.includes(letterAttribute) && game.life > 0 && !isWordFound()) { // La lettre deviné est dans le mot.

        document.querySelector(`.${letterAttribute}`).style.backgroundColor = "green";
        let lettersIndex = getAllIndexOfLetter(wordTab, letterAttribute);
        for (let i = 0; i < lettersIndex.length; i++) {
            foundletters.splice(lettersIndex[i], 1, letterAttribute);
        }

        game.updateLetters();

        if (isWordFound()) {
            document.getElementById("restart").style.display = "block";
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

let isWordFound = () => {
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

