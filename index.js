const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
let words = ['Moldoveanu', 'Negoiu', 'Vistea Mare', 'Parangu Mare', 'Lespezi', 'Omu', 
    'Peleaga', 'Papusa', 'Vanatarea lui Buteanu', 'Hartopul Darei', 
    'Cornul Caltunului','Bucura Peak', 'Dara', 'Retezat', 'Iezeru Mare', 
    'Pietrosul Rodnei', 'Gugu', 'Suru', 'Ineu', 'Cindrel', 'Steflesti', 'La Om', 
    'Godeanu', 'Caleanu', 'Tarcu', 'Leoata', 'letfu lui Patru', 'Ursu', 'Pietrosu', 
    'Oculasu Mare',];
let wordDisplay = []; 
let guessedLetters = [];
let wrongGuessesNr = 0; 
let showLives = document.getElementById("mylives"); 
let correctGuessesNr = 0; 
let word = words[Math.floor(Math.random() * words.length)];
let wordToUpper = word.toUpperCase(); 

function hideWord(word) { 
    wordDisplay = [];
    for (let i = 0; i < word.length; ++i) { 
        if (guessedLetters.indexOf(word[i]) === -1 && word[i] !== " ") {
            wordDisplay.push("_"); 
        } else {
            wordDisplay.push(word[i]); 
            ++correctGuessesNr; 
        }
    }
    return wordDisplay.join(" "); 
}

function gameStatus() {
    showLives.innerHTML = "You have " + wrongGuessesNr + " wrong guessses";
    if (wrongGuessesNr >= 6) {
        showLives.innerHTML = "Game Over";
        hideButtons();
        document.getElementById("wordGenerator").innerHTML = wordToUpper; 
    }
    for (let i = 0; i < guessedLetters.length; ++i) {
        if (wordToUpper.length === guessedLetters.length) {
            showLives.innerHTML = "You Win!";
            hideButtons();
        }
    }
}

function hideButtons() {
    let buttons = document.getElementById("buttonsHolder");
    buttons.style.display = "none";
}

function resetGame() {
    window.location.reload();
}

document.getElementById("wordGenerator").innerHTML = hideWord(word); 

window.addEventListener( "load", function() {
    let p, letter, button, holder;
    holder = document.getElementById( "buttonsHolder" );
    for (let i = 65; i <= 90; i++) {
        if (i == 65 || i == 75 || i == 84) {
            p = document.createElement( "p" );
        }
        letter = String.fromCharCode( i );
        button = document.createElement( "button" );
        button.innerHTML = letter;
        button.setAttribute( "data-letter", letter );
        button.onclick = function() { 
            setLetter( this.getAttribute( "data-letter" ) ); 
            this.disabled = true;
        };
        p.appendChild( button );
        if (i == 74 || i == 83 || i == 90) {
            holder.appendChild( p );
        }
    }
} );

function setLetter( letter ) { 
    if (wordToUpper.indexOf(letter) > -1) { 
        guessedLetters.push(letter);
        ++correctGuessesNr; 
        document.getElementById("wordGenerator").innerHTML = hideWord(wordToUpper); 
    } else {
        ++wrongGuessesNr; 
    }
    gameStatus();
}
