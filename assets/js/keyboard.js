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
