const words = [
    "vixen", "bacon", "plane", "water", "stone", "candy", "tears", "flame", "paint", "white",
    "brown", "clamp", "brush", "liver", "mouse", "table", "wound", "night", "flute", "piano",
    "lemon", "smirk", "pearl", "index", "leap", "light", "quilt", "sharp", "march", "jumpy",
    "quick", "viper", "heart", "break", "stare", "spike", "block", "spark", "chair", "rhyme",
    "tiger", "plant", "truck", "trace", "flush", "singh", "grape", "track", "frown", "sweep",
];

let currentWord = "";
let health = 5;
let score = 0;
let guessedLetters = [];

function initGame() {
    health = 5;
    score = 0;
    guessedLetters = [];
    currentWord = getRandomWord();
    setBlanks(0);
    updateHangman(health);
    document.getElementById("lives").textContent = health;
}

function isHeterogram(word, i = 0, j = 1) {
    if (i >= word.length) return true;
    if (j >= word.length) return isHeterogram(word, i + 1, i + 2);
    if (word[i] === word[j]) return false;
    return isHeterogram(word, i, j + 1);
}

function getValidWords(i = 0, valid = []) {
    if (i >= words.length) return valid;
    const w = words[i];
    if (w.length === 5 && isHeterogram(w)) valid.push(w);
    return getValidWords(i + 1, valid);
}

function getRandomWord() {
    const validWords = getValidWords();
    if (validWords.length === 0) {
        throw new Error("No valid 5-letter heterogram words available.");
    }
    const randomIndex = Math.floor(Math.random() * validWords.length);
    return validWords[randomIndex];
}

function updateHangman(currentHealth) {
    document.getElementById("head").style.display = currentHealth < 5 ? "block" : "none";
    document.getElementById("arm-1").style.display = currentHealth < 4 ? "block" : "none";
    document.getElementById("torso").style.display = currentHealth < 4 ? "block" : "none";
    document.getElementById("arm-2").style.display = currentHealth < 3 ? "block" : "none";
    document.getElementById("foot-1").style.display = currentHealth < 2 ? "block" : "none";
    document.getElementById("foot-2").style.display = currentHealth < 1 ? "block" : "none";
}

function setBlanks(index) {
    if (index >= currentWord.length) return;
    const letterElement = document.getElementById(`s-${index}`);
    if (letterElement) {
        letterElement.textContent = "_";
    }
    setBlanks(index + 1);
}

function revealLetters(index, letter) {
    if (index >= currentWord.length) return;
    if (currentWord[index] === letter) {
        const letterElement = document.getElementById(`s-${index}`);
        if (letterElement && letterElement.textContent === "_") {
            letterElement.textContent = letter;
            score++;
        }
    }
    revealLetters(index + 1, letter);
}

function isInArray(array, value, i = 0) {
    if (i >= array.length) return false;
    if (array[i] === value) return true;
    return isInArray(array, value, i + 1);
}

function isInWord(word, letter, i = 0) {
    if (i >= word.length) return false;
    if (word[i] === letter) return true;
    return isInWord(word, letter, i + 1);
}

function guessLetter() {
    const userGuess = prompt("Enter a letter:").toLocaleLowerCase();
    if (!userGuess || userGuess.length !== 1 || !userGuess.match(/[a-z]/)) {
        alert("Please enter a single letter (a-z).");
        return;
    }
    if (isInArray(guessedLetters, userGuess)) {
        alert("You already guessed that letter!");
        return;
    }
    guessedLetters.push(userGuess);
    if (isInWord(currentWord, userGuess)) {
        revealLetters(0, userGuess);
        if (score === currentWord.length) {
            setTimeout(() => {
                alert("Congratulations, you won!");
                initGame();
            }, 100);
        }
    } else {
        health--;
        updateHangman(health);
        document.getElementById("lives").textContent = health;
        if (health === 0) {
            setTimeout(() => {
                alert(`Game Over! The word was: ${currentWord}`);
                initGame();
            }, 100);
        }
    }
}

window.onload = initGame;