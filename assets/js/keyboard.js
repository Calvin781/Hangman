class Keyboard {
    constructor(game) {
        document.addEventListener("keydown", event => {

            let letterAttribute = event.key;
            checkLetters(game, letterAttribute);

        });

        let visualLetters = document.querySelectorAll('.key--letter');

        visualLetters.forEach(element => {

            element.addEventListener('click', event => {
                let letterAttribute = element.getAttribute("data-char").toLocaleLowerCase();
                checkLetters(game, letterAttribute);
            })

        });
    }
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

function checkLetters(game, letterAttribute) {

    if (wordTab.includes(letterAttribute) && game.life > 0) { // La lettre deviné est dans le mot.
        document.querySelector(`.${letterAttribute}`).style.backgroundColor = "green";
        let lettersIndex = getAllIndexOfLetter(wordTab, letterAttribute);
        for (let i = 0; i < lettersIndex.length; i++) {
            foundletters.splice(lettersIndex[i], 1, letterAttribute);
        }

        game.updateLetters();

    }

    if (!wordTab.includes(letterAttribute) && game.life > 0) {

        document.querySelector(`.${letterAttribute}`).style.backgroundColor = "#600000";
        game.life--;
        console.log(game.life);

    } else {
        // GAMEOVER
    }
}