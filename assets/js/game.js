let wordTab = [];
let foundletters = [];
let usedLetter = [];
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.getElementById("restart").addEventListener("click", () => location.reload());

let getData = async () => {

    const promise = await fetch('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
    const data = await promise.json();

     wordTab = [data[0].word][0].split('');

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

