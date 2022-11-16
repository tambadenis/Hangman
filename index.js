let words = ['Moldoveanu', 'Negoiu', 'Vistea Mare', 'Parangu Mare', 'Lespezi', 'Omu', 
    'Peleaga', 'Papusa', 'Vanatarea lui Buteanu', 'Hartopul Darei', 
    'Cornul Caltunului','Bucura Peak', 'Dara', 'Retezat', 'Iezeru Mare', 
    'Pietrosul Rodnei', 'Gugu', 'Suru', 'Ineu', 'Cindrel', 'Steflesti', 'La Om', 
    'Godeanu', 'Caleanu', 'Tarcu', 'Leoata', 'Varfu lui Patru', 'Ursu', 'Pietrosu', 
    'Oculasu Mare',];
let wordDisplay = []; // Array to populate the word with "-" instead of chars
let guessedLetters = []; // Array to store the guessed letters
let wrongGuessesNr = 0; // Variable to store the number of wrong guesses
let showLives = document.getElementById("mylives"); // Variabile to show remaining lives
let correctGuessesNr = 0; // Variable to show the correct guesses number

let wordGenerator = function generateWord() {
    return words[Math.floor(Math.random() * words.length)]; // Picks a random word from array
}

let word = wordGenerator(words);

let wordToUpper = word.toUpperCase(); // Variable to uppercase all the words

function hideWord(word) { // Function to hide the random word with "_" instead of letters
    wordDisplay = []; // Resets the wordDisplay variable;
    for (let i = 0; i < word.length; ++i) { // Going through the characters of the word
        if (guessedLetters.indexOf(word[i]) === -1 && word[i] !== " ") {
            wordDisplay.push("_"); // Adding the "_" instead of letters
        } else {
            wordDisplay.push(word[i]); // Adding the letters one by one if the player guesses
            ++correctGuessesNr; // Incrementing the correct guesses number
            //console.log(correctGuessesNr); // Printing the correct guesses number to check
        }
    }
    return wordDisplay.join(" "); // Adding spaces between "_";
}

function messages() { // Show messages if the player wins/looses and the remaining lives
    //console.log("S-a apelat messages cu mesajul 'You have...'");
    showLives.innerHTML = "You have " + wrongGuessesNr + " wrong guessses";
    if (wrongGuessesNr >= 6) {
        //console.log("S-a apelat messages() cu mesajul 'Game Over'");
        showLives.innerHTML = "Game Over";
        hideButtons();
        document.getElementById("wordGenerator").innerHTML = wordToUpper; 
    }
    for (let i = 0; i < guessedLetters.length; ++i) {
        if (wordToUpper.length === guessedLetters.length) {
            //console.log("S-a apelat messages() cu mesajul 'You Win'");
            showLives.innerHTML = "You Win!";
            hideButtons();
        }
    }
}

function hideButtons() {
    //console.log("S-a apelat functia de hidebutton");
    let buttons = document.getElementById("buttonsHolder");
    buttons.style.display = "none";
}

function resetGame() {

    wordDisplay = [];
    guessedLetters = []; 
    wrongGuessesNr = 0; 
    showLives.innerHTML = "";
    correctGuessesNr = 0; 
}

document.getElementById("wordGenerator").innerHTML = hideWord(word); // Shows the hidden word

window.addEventListener( "load", function() { // Creating the alphabet buttons, their actions
    var p, letter, button, holder;
    holder = document.getElementById( "buttonsHolder" );
    for ( var i = 65; i <= 90; i++ ) {
        if ( i == 65 || i == 75 || i == 84 ) {
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
        if ( i == 74 || i == 83 || i == 90 ) {
            holder.appendChild( p );
        }
    }
} );

function setLetter( letter ) { // Function to change the "_" with the guessed letter
    if (wordToUpper.indexOf(letter) > -1) { // If the user guesses the letter 
        guessedLetters.push(letter); // we add it
        ++correctGuessesNr; // we increment the correct guesses nr
        document.getElementById("wordGenerator").innerHTML = hideWord(wordToUpper); 
    } else {
        ++wrongGuessesNr; // we increment the wrong guesses nr
    }
    messages();
}