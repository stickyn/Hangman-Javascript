/**
 * If you encounter comments that look like this:
 * 1.
 * 2.
 * 3.
 * This coordinates to the order of each line of code, for example:
 * 
 * '1. 'winCounter' retrieves an 'h1' element that will display the player's total wins'
 * This is in the 'getWord' and the first code line of 'getWord' is: 'const winCounter = document.getElementById("winAmount");'
 * Sometimes, we break away from this, this is to explain a big block of code, and the lines inside of it mostly do basic things like creating an element
 */


/* This entire section is for the sole purpose of customization, these buttons can be pressed at anytime to customize the 'theme' */
const defButton = document.getElementById("def");
const halloButton = document.getElementById("hallo");
const dracButton = document.getElementById("drac");

defButton.addEventListener("click",function(){changeTheme("Default")});
halloButton.addEventListener("click",function(){changeTheme("Halloween")});
dracButton.addEventListener("click",function(){changeTheme("Dracula")});

/**
 * Changes elements of the page to adapt to the selected theme
 * @param {string} theme - What theme was chosen and is used to determine what colors to change what to
 */

function changeTheme(theme)
{
    /* Whatever theme the player chose will be saved */
    localStorage.setItem("theme",theme);
    /**
     * @param {Element} bodyCon - The container holding the core gameplay (the image, submit button, word)
     * @param {Element} textTitle - The title logo
     * @param {Element} dividerObject - The hr divider between the header and gameply
     * @param {Element} wordspawnerColor - The '*' array's color and the letters that will reveal itself
     * @param {Element} textClass - Basic text, like labels
     * @param {Element} summaryObject - The theme drop down menu
     * Note: The text color showing the player's used letters does not seem to work, likely because we are constantly deleting them, and it won't seem to update alongside other text.
     */
    const bodyCon = document.getElementById("bodyContainer");
    const textTitle = document.getElementById("titleText");
    const dividerObject = document.getElementById("headDivider");
    const wordspawnerColor = document.getElementById("wordSpawner");
    const textClass = document.getElementsByClassName("text");
    const summaryObject = document.getElementById("summaryText")
    
    if(localStorage.getItem("theme") == "Default")
    {
        document.body.style.backgroundColor = "white";
        textTitle.style.color = "black";
        bodyCon.style.borderColor = "black";
        bodyCon.style.backgroundColor = "darkgray";
        dividerObject.style.borderColor = "gray";
        summaryObject.style.color = "black";
        summaryObject.style.backgroundColor = "white";
        wordspawnerColor.style.color = "black";

        for(let i = 0; i < textClass.length; i++)
        {
            textClass[i].style.color = "black";
        }
    }
    else if(localStorage.getItem("theme") == "Halloween")
    {
        document.body.style.backgroundColor = "rgb(252, 107, 3)";
        textTitle.style.color = "purple";
        bodyCon.style.borderColor = "green";
        bodyCon.style.backgroundColor = "darkorange";
        dividerObject.style.borderColor = "green";
        summaryObject.style.color = "purple";
        summaryObject.style.backgroundColor = "rgb(252, 107, 3)";
        wordspawnerColor.style.color = "purple";
        
        for(let i = 0; i < textClass.length; i++)
        {
            textClass[i].style.color = "green";
        }
    }
    else if(localStorage.getItem("theme") == "Dracula")
    {
        
        document.body.style.backgroundColor = "rgb(33,34,44)";
        textTitle.style.color = "rgb(139, 233, 253)";
        bodyCon.style.borderColor = "rgb(241, 250, 140)";
        bodyCon.style.backgroundColor = "rgb(40, 42, 54)";
        dividerObject.style.borderColor = "rgb(255, 121, 198)";
        summaryObject.style.color = "white";
        summaryObject.style.backgroundColor = "rgb(33,34,44)";
        wordspawnerColor.style.color = "rgb(139, 233, 253)";
      
        for(let i = 0; i < textClass.length; i++)
        {
            textClass[i].style.color = "rgb(248, 248, 242)";
        }
    }
                         
}

/* Get and set the main theme */
changeTheme(localStorage.getItem("theme"));

/* Offical program starts here! */
getWord();
/**
 * Fetches a random word, converts it into a array of it's letters and a corresponding count blank array, and checks for the player's wins.
 */
async function getWord()
{
    /**
     * 1. 'winCounter' retrieves an 'h1' element that will display the player's total wins
     * 2. Get 'winCounter's value, which is when on the site for the first time, is 0, and turn it into a int, (it's automatically a string)
     * 3. If the value is equal to 0, which means the player is visiting for the first time, we will store it into localStorage for later
     * 4. If the value is equal to 'null' set it to 0, this is for bug fixing.
     * 5. Set 'winCounter' to display the wins, even if it's 0
     * 6,7,8. Create the arrays used during gameplay
     */
    const winCounter = document.getElementById("winAmount");
    let winValues = parseInt(winCounter.textContent);
    if(winValues == 0)
    {
        localStorage.setItem("wins",winValues);
    }
    else if(localStorage.getItem("wins") == null || localStorage.getItem("wins") == "NaN")
    {
        localStorage.setItem("wins",0);
    }
    winCounter.textContent = `Your Wins: ${localStorage.getItem("wins")}`;
    let setupLetterArray = [];
    let setupStarArray = [];
    let usedLetters = [];
   
    /* We are using a random word API, it retrieves a word that is at least 5 letters, (API Creator: https://github.com/RazorSh4rk/random-word-api/)*/
    const getWordData = await fetch(`https://random-word-api.herokuapp.com/word?diff=1&length=5`);
    const loadData = await getWordData.json()

    /* 'loadData[0]' is the word fetched */
    openingFunction(loadData[0],setupLetterArray,setupStarArray,"start",6,usedLetters);
}

/**
 * Converts a fetched word into arrays, and displays that to the screen alongside displaying the player's score, wins, and incorrect words
 * @constructor
 * @param {string} word - Contains the word fetched from the api
 * @param {Array} displayLetterArray  - Letters from 'word' stored seperately in a array, that is displayed if the player is correct corresponding to 'displayStarArray'
 * @param {Array} displayStarArray  - An array for "*" that act as placeholders during gameplay for undiscovered words, and is replaced with the corresponding letter from displayLetterArray for a correct answer
 * @param {string} gamemode - Used for when the function is recalled, at the start of game, it simply displays the star array, after the first turn, the game checks for correct answers afterwards
 * @param {int} attemptAmount - How many attempts the player has, (or body parts until the man is created)
 * @param {Array} displayUsedLetters - All the unsuccessful letters the player has chosen in an array
 * @param {int} wins - Number of wins the user has in the entire app's history (until like a cleared search history data)
 */
function openingFunction(word,displayLetterArray,displayStarArray,gamemode,attemptAmount,displayUsedLetters,wins)
{
    
    /** 
     * 1. 'wSpawner' will contain/show 'displayStarArray' and after the player's first turn, will update with values from 'displayLetterArray' for correct answers
     * 2. 'uslSpawner' contains/shows all values that the player has used from 'displayUsedLetters'
     * 3.. Give the 'uslSpawner' a id, that will be used for accessing later
     * 4.. 'uslSpawner' is added to the document body, and is centered based on it's CSS styling
     * 5.. 'gamemode' checks wether to only show 'displayStarArray' or update it if the player has correct answers (not including 'gamemode' auto wins the game) 
     */ 
    const hangDiv = document.getElementById("hangmanContainer");
    const wSpawner = document.getElementById("wordSpawner");
    const uslSpawner = document.createElement("div");
    uslSpawner.setAttribute('id','wordUsedDisplay');
    hangDiv.append(uslSpawner);
    if(gamemode == "start")
    {
        /**
         * 1. Put every letter from 'word' into 'displayLetterArray' 
         * 2. Because the loop is based on 'word' length, add a '*' to 'displayStarArray' based on how many letters are in 'word' (For example, 
         *  Word: freddy, displayLetterArray: ['f','r','e','d','d','y'], displayStarArray: ['*','*','*','*','*','*',]
         * 3. Every 'loop' creates an 'h1' element that displays a '*' from 'displayStarArray' and give each letter a id that will be used later.
         */
    
        for(let i = 0; i < word.length; i++)
        {
            displayLetterArray[i] = word[i];
            displayStarArray[i] = "*";
            let a = document.createElement("h1");
            a.setAttribute("id",i);
            a.textContent = displayStarArray[i];
            wSpawner.append(a);
        
        }
    }

    /**
     * After the player's clicks the submit button, this function is called and 'gamemode' is switched to null to let the game know to start including letters guessed by the player, (for organization)
     */
    else 
    {
        /* Repeat the same action as the previous loop, 
        albeit just display 'displayStarArray' Which is what the player will see
        We create the h1s again because if we didn't and the player guessed a word it would either duplicate or not show up */
        for(let i = 0; i < word.length; i++)
        {
            
            let a = document.createElement("h1");
            a.setAttribute("id",i);
            a.textContent = displayStarArray[i];
            wSpawner.append(a);
        }
        
        
    }

    /* Display all the letters attempted by the player, 
    creating 'h1's to display them, 
    this is re-created so new letters can be displayed afterwards 
    (doing otherwise would not allow new letters) And this only happens when 'gamemode' is set to null*/
    for(let i = 0; i < displayUsedLetters.length; i++)
    {
     
            let a = document.createElement("h1");
            a.setAttribute("id","usedLetter");
            a.textContent = displayUsedLetters[i];
            uslSpawner.append(a);
            
    }
    gameplay(word,displayLetterArray,displayStarArray,attemptAmount,displayUsedLetters,wins);
}
/**
 * Primary gameplay, wait for the user to enter a letter, and check if it's correct or incorrect, and call openingFunction to update arrays to the screen
 * @constructor
 * @param {string} gameWord - (From 'openingFunction') this is the word that was fetched from the API 
 * @param {Array} gameLetterArray - (From 'openingFunction') this array contains all the letters from 'gameWord'
 * @param {Array} gameStarArray - (From 'openingFunction') the array that is filled with stars that coordinates with 
 * @param {int} attemptCount - (From 'openingFunction') The number of attempts, either starting at 6 or at how ever the player was at before
 * @param {Array} gameUsedLetters - (From 'openingFunction') array containing all the player's failed attempts
 * @param {int} gameWins - (From 'openingFunction') all the player's stored wins
 */
function gameplay(gameWord,gameLetterArray,gameStarArray,attemptCount,gameUsedLetters,gameWins)
{
    /**
     * @type {Element} retrieveButton - The button the player uses to 'check' their answer
     * @type {Element} clearScore - The button used for clearing the player's score if they so wish
     * @type {Element} retrieveBoxVal - The input box where the user enters their guess
     * @type {Element} getPoints - The display on screen that shows how many attempts the player has
     * @type {Array} hangmanImages - Array featuring all the images for the 'Hangman' graphic
     * @type {Element} hangmanImContainer - Displays the images
     * @type {Element} labelText - The label above the textbox, we will just delete it later on
     */
    
    const retrieveButton = document.getElementById("submitButton");
    const clearScore = document.getElementById("clearButton");
    const retrieveBoxVal = document.getElementById("inputBox");
    const hangmanImages = ['Hangman Images/hm7.png','Hangman Images/hm6.png','Hangman Images/hm5.png','Hangman Images/hm4.png','Hangman Images/hm3.png','Hangman Images/hm2.png'];
    const hangImg = document.getElementById("hangImage");
    const hangDiv = document.getElementById("hangmanContainer");
    const labelText = document.getElementById("label");

    /** Here we check if 'gameStarArray' does not have '*' which means that it contains only the letters, meaning the player has won guessed it 
     * 1. Get the wins in localStorage and convert to a int, and then add 1 to it.
     * 2. Set the localStorage to now have added 1
     * 3. Remove the submit button, input box and label text.
     * 4. Announce to the player they won and reload the page and add a win.
     * Otherwise, if 'attemptCount' is equal to 0, and 'gameStarArray' does have '*' then that means the player has lost, so display it and reload.
    */
    if(gameStarArray.includes("*") === false)
    {
        let convertToInt = parseInt(localStorage.getItem("wins"));
        convertToInt = convertToInt+=1;
        localStorage.setItem("wins",convertToInt);
        retrieveButton.remove();
        retrieveBoxVal.remove();
        labelText.remove();
        const winTimeTill = setTimeout(function(){
                alert(`You Win! The word was '${gameWord}'`);
                location.reload();
            },1000)
     
    }
    else if(attemptCount === 0)
    {
        /* When the player loses, do the same thing, but change the hangman image to the shown the fully drawn image */
            hangImg.setAttribute("src",hangmanImages[attemptCount]);
            retrieveButton.remove();
            retrieveBoxVal.remove();
            labelText.remove();
            const loseTimeTill = setTimeout(function(){
                alert(`You have lost, the word is '${gameWord}'`);
                location.reload();
            },1000);
            
    }
    
    /* Below events occur if the first if statement values are not met. Regular gameplay. */

    /* When the player clicks the button to clear their total wins, they are first asked and then the localstorage item is set to 0 and reload page */
    clearScore.onclick = function()
    {
        if(confirm("Would you like to clear your wins?"))
        {
            
            localStorage.setItem("wins",0);
        }
        else
        {
            console.log("Nope");
        }
        const winCounter = document.getElementById("winAmount");
        winCounter.textContent = `Your Wins: ${localStorage.getItem("wins")}`;   
    }
    /**
     * What happens when the player hits the 'submit' button
     * @type {Array} possibleLetters - If the player's answer is not equal to anything in the array, then the turn is skipped (this is also used so random things are not inputed into the used letters display)
     * @type {Element} playerAnswer - Retrieves the player's answer from the input box
     * @type {string} modifedAnswer - Converts the player answer to lowercase (kinda a fail safe)
     * @type {Array} arrayed - (scroll down to the loop for more information)
     */
    retrieveButton.onclick = function(){
        const possibleLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let playerAnswer = retrieveBoxVal.value;
        let modifiedAnswer = playerAnswer.toLowerCase();
        let arrayed = [];
        /* First, check if the player's answer is valid, if it's in 'possibleLetters' */
        if(possibleLetters.includes(modifiedAnswer) == false)
        {
            alert("Invalid character");
        }
        /* If it is valid, first check if it has already been used, if it's in 'gameUsedLetters' if it is, also skip turn */
        else 
        {
            if(gameUsedLetters.includes(modifiedAnswer) == true)
            {
                alert("You have already used this letter!"); 
            }

            /* If the player has not used this letter before, include it in 'gameUsedLetters' */
            else if(gameUsedLetters.includes(modifiedAnswer) == false)
            {
                gameUsedLetters.push(modifiedAnswer);
                /**
                 * If the chosen letter is correct, (inside 'gameLetterArray')
                 * 1. Announce 'correct'
                 */
                if(gameLetterArray.includes(modifiedAnswer))
                {
                    alert("Correct!")
                    /**
                     * We are using a for loop here, because Javascript's '.includes' only finds the first instance, a letter appearing more than once will only have it's first instance found
                     * 1. (Starting from the else statement) put the index (location) of first instance of the chosen letter into 'arrayed' 
                     * 2. The location of the first instance of a letter, in 'gameLetterArray' turn that into a uppercase letter (this is because incase 'gameLetterArray' has a letter more than once, we will read through it again, and we will not be reading the same letter index twice.)
                     * 3. Now in 'gameStarArray' change the stars to letters with the indexes in 'arrayed' lowercased
                     */
                    for(let i = 0; i < gameLetterArray.length; i++)
                    {
                        /**
                         * Now that the chosen letter's first instance is uppercased, it is not considered the player's answer, so Javascript will have to continue searching to see if the letter exists
                         * If it doesn't, or the letter appears only once, then break out of the loop
                         */
                        /* This is to stop the loop if the letter no longer exists */
                        if(gameLetterArray.includes(modifiedAnswer) == false)
                        {
                            break;
                        }
                        else {
                            /**
                             * Explanation of this process here:
                             * Word Chosen from API: freddy
                             * Chosen letter: 'd'
                             * 1. 'd' first index in 'freddy' is 3, store the character '3' into 'arrayed'
                             * 2. In 'gameLetterArray' the letter 'd' is turned to uppercase
                             * 3. Finally, in the 'gameStarArray' (which is shown to the player), the '*' at index '3' (from 'arrayed')
                             *  into the letter from 'gameLetterArray' that is located at the index of '3' and turned to lowercase,
                             *  '* * * d * *'
                             * 4. And repeat if needed, and for 'freddy' this is what will be shown to the player: '* * * d d *'
                             * 
                             */
                            arrayed[i] = gameLetterArray.indexOf(modifiedAnswer);
                            gameLetterArray[gameLetterArray.indexOf(modifiedAnswer)]= gameLetterArray[gameLetterArray.indexOf(modifiedAnswer)].toUpperCase();
                            gameStarArray[arrayed[i]] = gameLetterArray[arrayed[i]].toLowerCase();
                        }
                        /**
                         * Visual example of loop:
                         * Word Chosen from API: freddy
                         * Player chose the letter: 'd'
                         * Loop 1: 
                         * 1. I found 'd' in 'freddy'
                         * 2. (d was found at index/position 3) 'freddy' is changed to 'freDdy'
                         * Loop 2:
                         * 1. I found 'd' in 'freDdy'
                         * 2. (d was found at index/position 4) 'freDdy' is changed to 'freDDy' 
                         * Loop 3:
                         * 1. 'freDDy' no longer contains 'd'
                         */
                        
                
                    }
                    /* Reset 'gameLetterArray' back to lowercase */
                    for(let k = 0; k < gameLetterArray.length; k++)
                    {
                        gameLetterArray[k] = gameLetterArray[k].toLowerCase();
                    }
                            
                }
                /** If user is incorrect simply display */
                else 
                {
                    alert("Incorrect!");
                    /* Subtract one from count only if the player is incorrect and not if the letter was used or not valid*/
                    attemptCount--;
                    /* Display the corresponding image */
                    hangImg.setAttribute("src",hangmanImages[attemptCount]);

                }
                
            }   
        }
        /**
         * These are the same 'wordSpawner' and 'uslSpawner' from the start of the program.
         */
        const endWordSpawner = document.getElementById("wordSpawner");
        const endUslSpawner = document.getElementById("wordUsedDisplay");
    
        /** Delete the displayed word (stars) using their number id's */
        for(let c = 0; c < gameLetterArray.length; c++)
        {
            let b = document.getElementById(c)
            endWordSpawner.removeChild(b);
            
        }

        /* Remove the div displaying the player's used letters, not doing this would not allow us to update them */
        hangDiv.removeChild(endUslSpawner);
        
        /* Clear the input box */
        retrieveBoxVal.value = null;
        openingFunction(gameWord,gameLetterArray,gameStarArray,null,attemptCount, gameUsedLetters,gameWins);
        
    };
}

