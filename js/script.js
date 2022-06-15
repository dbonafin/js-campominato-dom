// Create the play button that starts the game
const playButton = document.getElementById("play-btn");
playButton.addEventListener ("click", gameStart);

// Game engine starts after the click of the play button
function gameStart() {

    // Connect the DOM with the js elements
    const mainGrid = document.getElementById("main-grid");

    // Message in case of game over
    const userTextGameOver = document.getElementById("game-over");

    // Reset of the gri at every click of the play button
    mainGrid.innerHTML = " ";
    mainGrid.className = " ";
    userTextGameOver.innerHTML = " ";
    mainGrid.style.pointerEvents = "auto";

    // Ask the user the difficulty level of the game
    const userLevel = document.getElementById("level-choice").value;

    // Calc the different level ranges
    // For each level assign a different class to the mainGrid container
    let classMainGrid;
    let maxRangeLevel; 
    const minRangeLevel = 1;

    switch(userLevel) {
        case "1":
            maxRangeLevel = 100;
            classMainGrid = "easy";
            break;
        case "2":
            maxRangeLevel = 81;
            classMainGrid = "hard";
            break;
        default:
            maxRangeLevel = 49;
            classMainGrid = "crazy";
            break;
    }

    // Bomb-numbers 
    const bombNumbers = 16;
    const bombs = generateBombNumbers(bombNumbers, minRangeLevel, maxRangeLevel);

    // Max attempts
    const maxAttempts = maxRangeLevel - bombNumbers;

    // Safe numbers - where to put the correct numbers clicked by the user
    const safeNumbersArray = [];


    // FUNCTIONS //

 
    //Function that generates the main grid container
    generateMainGrid();
    function generateMainGrid() {
        // Add the class that gives the styles to the squares
        mainGrid.classList.add(classMainGrid);

        for (let i = 1; i <= maxRangeLevel; i++) {
            // Create the square from the template + add the class for square style
            const newSquare = document.createElement("div");
            newSquare.innerHTML = `<span>${i}</span>`;
            newSquare.classList.add("square");

            // Create the event listener for the click of the number-cell
            newSquare.addEventListener("click", checkSafeOrBomb);
            
            // Append the cells to the grid in the DOM
            mainGrid.append(newSquare);
        }
    }
    

    // Function that checks if the number is a safeNumber or a bombNumber
    function checkSafeOrBomb() {
        const thisNumber = parseInt(this.querySelector("span").innerHTML);

        // If the userNumber is a bombNumber - game over - reset of the grid
        if (bombs.includes(thisNumber)) {
            this.classList.add("bomb-number");
            userGameOver();
        } else {
            // Push the userNumber in the safeNumbersArray - if not already present
            if (!safeNumbersArray.includes(thisNumber)) {
                this.classList.add("safe-number");
                safeNumbersArray.push(thisNumber);
            }

            // If the user reaches the number of maxAttempts - win alert
            if (safeNumbersArray.length === maxAttempts) {
                alert("Hai vinto! Hai raggiunto il numero massimo di tentativi corretti");
            }
        }
        // Do not let the user to click on the same number more times
        this.style.pointerEvents = "none";
    }
    

    // Function that appears when the user clicks a bombNumber ---> game over
    function userGameOver() {
        const textGameOver = document.createElement("p");
        textGameOver.innerHTML = 
        `<div>
        Hai perso! Hai indovinato i seguenti numeri: ${safeNumbersArray}<br> Ritenta e sarai più fortunato
        </div>`;

        // Create the game-over text in the DOM
        userTextGameOver.append(textGameOver);
        bombs.classList.add("safe-number");

        // After the game-over text do not let the user to click on other numbers
        mainGrid.style.pointerEvents = "none";
    }
    
}


// Function that generates the 16 bomb-numbers
function genRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


// Function that push the bombNumbers in the bombsArray
function generateBombNumbers(bombNumbers, minRangeLevel, maxRangeLevel) {
    const bombsArray = [];
    while (bombsArray.length < bombNumbers) {
        const randomBomb = genRandomNumber(minRangeLevel, maxRangeLevel);

        // Push the random bombNumber in the bombsArray - if not already present
        if (!bombsArray.includes(randomBomb)) {
            bombsArray.push(randomBomb);
        }
    }

    return bombsArray;
}





