let wordTab = [];
let foundletters = [];

async function getData() {
    const promise = await fetch('https://random-word-api.herokuapp.com/word')
    const word = await promise.json();
    wordTab = word[0].split('');;
}

async function startGame() {
    await getData();
    let game = new (Game);
    let keyboard = new Keyboard(game);

    console.log(game.word);

    game.updateLetters();

}

class Game {
    constructor() {
        this.life = 10;
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
}

startGame();






