
getWord();


async function getWord()
{
    const winCounter = document.getElementById("winCount");
    let winValues = parseInt(winCounter.textContent);
    if(winValues === 0)
    {
        console.log("yes")
        localStorage.setItem("wins",winValues);
    }
    
    winCounter.textContent = localStorage.getItem("wins");
    let setupLetterArray = [];
    let setupStarArray = [];
    let usedLetters = [];
    const getWordData = await fetch(`https://random-words-api.kushcreates.com/api?length=5&words=1`);
    const loadData = await getWordData.json()
    console.log(loadData[0].word)
    openingFunction(loadData[0].word,setupLetterArray,setupStarArray,"start",6,usedLetters);
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
    
    const wSpawner = document.getElementById("wordSpawner");
    const uslSpawner = document.createElement("div");
    uslSpawner.setAttribute('id','wordUsedDisplay');
    document.body.appendChild(uslSpawner);
    if(gamemode === "start")
    {
        for(let i = 0; i < word.length; i++)
        {
            displayLetterArray[i] = word[i];
            displayStarArray[i] = "*";
            let a = document.createElement("h1");
            a.setAttribute("class",'number');
            a.setAttribute("id",i);
            a.textContent = displayStarArray[i];
            wSpawner.append(a);
        
        }
    }

    else 
    {
        for(let i = 0; i < word.length; i++)
        {
            let a = document.createElement("h1");
            a.setAttribute("class",'number');
            a.setAttribute("id",i);
            a.textContent = displayStarArray[i];
            wSpawner.append(a);
        }
    }
    for(let i = 0; i < displayUsedLetters.length; i++)
    {
            let a = document.createElement("h1");
            a.setAttribute("id",`${i}used`);
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
    const retrieveButton = document.getElementById("submitButton");
    const clearScore = document.getElementById("clearButton");
    const retrieveBoxVal = document.getElementById("inputBox");
    const getPoints = document.getElementById("attemptValue");
    switch(attemptCount) 
    {
        case 1:
            getPoints.textContent = `Final Attempt`;
            break;
        default:
            getPoints.textContent = `Attempts: ${attemptCount}`;
            break;
    }
    if(gameStarArray.includes("*") == false)
    {
        let convertToInt = parseInt(localStorage.getItem("wins"));
        convertToInt = convertToInt+=1;
        localStorage.setItem("wins",convertToInt);
        console.log(localStorage.getItem("wins"));
        alert(`You Win! The word was '${gameWord}'`);
        location.reload();
    }
    else if(attemptCount == 0)
    {
            alert(`You have lost, the word is '${gameWord}'`);
            location.reload();
    }
        
    clearScore.onclick = function(){
        confirm("Would you like to clear your wins?");
        console.log("Yes")
        localStorage.setItem("wins",0);
        location.reload();
    }
    retrieveButton.onclick = function(){
        const possibleLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let playerAnswer = retrieveBoxVal.value;
        let modifiedAnswer = playerAnswer.toLowerCase();
        let arrayed = [];
        if(possibleLetters.includes(modifiedAnswer) == false)
        {
            alert("Invalid character");
        }
        else 
        {
            if(gameUsedLetters.includes(modifiedAnswer) == true)
            {
                alert("You have already used this letter!"); 
            }
            else if(gameUsedLetters.includes(modifiedAnswer) == false)
            {
                gameUsedLetters.push(modifiedAnswer);
                if(gameLetterArray.includes(modifiedAnswer))
                {
                    alert("Correct!")
                    for(let i = 0; i < gameLetterArray.length; i++)
                    {
                        if(gameLetterArray.includes(modifiedAnswer) === false)
                        {
                        
                            break;
                        }
                        else {
                            arrayed[i] = gameLetterArray.indexOf(modifiedAnswer);
                            gameLetterArray[gameLetterArray.indexOf(modifiedAnswer)]= gameLetterArray[gameLetterArray.indexOf(modifiedAnswer)].toUpperCase();
                            gameStarArray[arrayed[i]] = gameLetterArray[arrayed[i]].toLowerCase();
                        }
                        
                
                    }
                    for(let k = 0; k < gameLetterArray.length; k++)
                    {
                        gameLetterArray[k] = gameLetterArray[k].toLowerCase();
                    }
                            
                }
                else 
                {
                    alert("Incorrect!");
                }
                attemptCount--;
            }   
        }
        console.log(gameUsedLetters);
        const wordSpawner = document.getElementById("wordSpawner");
        const uslSpawner = document.getElementById("wordUsedDisplay");
        for(let c = 0; c < gameLetterArray.length; c++)
        {
            let b = document.getElementById(c)
            wordSpawner.removeChild(b);
            
        }
        document.body.removeChild(uslSpawner);
        retrieveBoxVal.value = null;
        openingFunction(gameWord,gameLetterArray,gameStarArray,null,attemptCount, gameUsedLetters,gameWins);
    };
}
