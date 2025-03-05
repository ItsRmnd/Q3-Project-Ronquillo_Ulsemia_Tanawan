let currentWord;
let guessedLetters;
let lives;
const maxLives = 6;
const words = ["APPLE", "BEACH", "CLOUD", "DRINK", "EARTH", "FRUIT", "GHOST", "HONEY"];

function setupGame() {
    // Initialize game state
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    lives = maxLives;
    
    // Reset hangman drawing
    document.querySelectorAll('.head, .arm, .torso, .foot').forEach(part => {
        part.style.display = 'none';
    });
    
    // Initialize word display
    displayWord();
    document.getElementById('lives').textContent = lives;
}

function displayWord() {
    // Show correctly guessed letters or underscores
    for (let i = 0; i < currentWord.length; i++) {
        const letterElement = document.getElementById(`s-${i}`);
        letterElement.textContent = guessedLetters.includes(currentWord[i]) ? currentWord[i] : "_";
    }
}

function checkLetter() {
    let letter;
    while (true) {
        letter = prompt("Enter a letter (A-Z):").toUpperCase();
        if (!letter || letter.length !== 1 || !letter.match(/[A-Z]/i)) {
            alert("Please enter a single letter!");
        } else if (guessedLetters.includes(letter)) {
            alert("You already guessed that letter!");
        } else {
            break;
        }
    }

    guessedLetters.push(letter);
    
    if (currentWord.includes(letter)) {
        // Correct guess
        displayWord();
        if (currentWord.split('').every(l => guessedLetters.includes(l))) {
            setTimeout(() => alert("Congratulations! You won!"), 100);
        }
    } else {
        // Wrong guess
        lives--;
        document.getElementById('lives').textContent = lives;
        revealHangmanPart(maxLives - lives);
        
        if (lives === 0) {
            setTimeout(() => alert(`Game Over! The word was: ${currentWord}`), 100);
        }
    }
}

function revealHangmanPart(step) {
    // Show different body parts based on wrong guesses
    switch(step) {
        case 1:
            document.getElementById('head').style.display = 'block';
            break;
        case 2:
            document.getElementById('arm-1').style.display = 'block';
            break;
        case 3:
            document.getElementById('arm-2').style.display = 'block';
            break;
        case 4:
            document.getElementById('torso').style.display = 'block';
            break;
        case 5:
            document.getElementById('foot-1').style.display = 'block';
            break;
        case 6:
            document.getElementById('foot-2').style.display = 'block';
            break;
    }
}