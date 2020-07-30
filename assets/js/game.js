let wordTab = [];

async function getData() {
    const promise = await fetch('https://random-word-api.herokuapp.com/word')
    const word = await promise.json();
    wordTab = word[0].split('');;

    console.log(wordTab);
}

async function startGame() {
    await getData();
    let game = new (Game);
    console.log(game.word);

    game.displayLetters();

}

class Game {
    constructor() {
        this.life = 10;
        this.word = wordTab;
    }

    displayLetters() {
        wordTab.forEach(letter => {

            let target = document.getElementById("word");
            let newSpan = document.createElement("span");
            newSpan.innerHTML = letter
            target.appendChild(newSpan);
        })

    }

    updateKeyboard() {

    }

}

startGame();



