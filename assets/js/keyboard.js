class Keyboard {
    constructor(game) {
        document.addEventListener("keydown", event => { // Keyboard input support.

            let letterAttribute = event.key;
            checkLetter(game, letterAttribute);

        });

        let visualLetters = document.querySelectorAll('.key--letter');

        visualLetters.forEach(element => { // Mouse click on letter support.

            element.addEventListener('click', event => {
                let letterAttribute = element.getAttribute("data-char").toLocaleLowerCase();
                checkLetter(game, letterAttribute);
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

function checkLetter(game, letterAttribute) {

    if (wordTab.includes(letterAttribute) && game.life > 0) { // La lettre deviné est dans le mot.
        
        document.querySelector(`.${letterAttribute}`).style.backgroundColor = "green";
        let lettersIndex = getAllIndexOfLetter(wordTab, letterAttribute);
        for (let i = 0; i < lettersIndex.length; i++) {
            foundletters.splice(lettersIndex[i], 1, letterAttribute);
        }

        game.updateLetters();

    }

    if (!wordTab.includes(letterAttribute) && game.life > 0 && usedLetter.includes(letterAttribute) === false) {

        usedLetter.push(letterAttribute);

        console.log(usedLetter.includes(letterAttribute));
        document.querySelector(`.${letterAttribute}`).style.backgroundColor = "#600000";
        game.life--;
        console.log(game.life);

    } else {
        // GAMEOVER
    }
}