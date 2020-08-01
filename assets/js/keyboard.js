class Keyboard {
    constructor(game) {
        document.addEventListener("keydown", event => {

            if (wordTab.includes(event.key)) {

                document.querySelector(`.${event.key}`).style.backgroundColor = "green";

                let lettersIndex = getAllIndexOfLetter(wordTab, event.key);
                for (let i = 0; i < lettersIndex.length; i++) {

                    foundletters.splice(lettersIndex[i], 1, event.key);
                }
                game.updateLetters();

            } else {
                document.querySelector(`.${event.key}`).style.backgroundColor = "#600000";
            }
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