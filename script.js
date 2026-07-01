let number = parseInt(Math.random()*100 + 1);

const finalvalue = document.querySelector('#final');
const userInput = document.querySelector('#guess');
const prevGuess = document.querySelector('#prev');
const remainAttempt = document.querySelector('#remain');
const resultPara = document.querySelector('#status');
const position = document.querySelector("#lowOrHigh");
const themeChanged = document.querySelector("#changeTheme")
const themeRestored = document.querySelector("#restoreTheme")
const body = document.querySelector("body")
const p = document.createElement('p');

let previousGuesses = [];
let guessStatus = 1;
let playGame = true;

themeChanged.addEventListener('click', function() {
    document.body.style.background = 'grey';
})

themeRestored.addEventListener('click', function() {
    document.body.style.background =' #1c2738';
})

if(playGame) {
        finalvalue.addEventListener('click', function(e) {
            e.preventDefault();
            const guess = parseInt(userInput.value);
            console.log(guess);
            validateGuess(guess);
        })
    }

function validateGuess(guess) {
    if(guess == '' || guess < 1 || guess > 100 || isNaN(guess)) {
        alert('Condition not satisfied.');
    }
    else {
        previousGuesses.push(guess)
        if (guessStatus === 10) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${number}. Click the button below to restart the game.`);
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if(guess == number) {
        displayMessage('You guessed the right number.');
        endGame();
    }
    else if (guess < number) {
        displayMessage('The number you have guessed is too low compared to the required one.');
    }
    else {
        displayMessage('The number you have guessed is too high compared to the required one.');
    }
}

function displayGuess(guess) {
    userInput.value='';
    prevGuess.innerHTML += `${guess}, `;
    guessStatus++;
    remainAttempt.innerHTML = `Guesses Remain: ${11 - guessStatus}`;
}

function displayMessage(message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start a new game</h2>`;
    resultPara.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameStart = document.querySelector('#newGame');
    newGameStart.addEventListener('click', function(e) {
        number = parseInt(Math.random()*100 + 1);
        previousGuesses = [];
        guessStatus = 1;
        prevGuess.innerHTML = '';
        remainAttempt.innerHTML = `Guesses Remain: ${11 - guessStatus}`;
        userInput.removeAttribute('disabled')
        position.removeChild(p)
        playGame = true;
    }) 
}