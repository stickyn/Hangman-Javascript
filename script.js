
getWord();
/** 
 * 'getWord()' retrieves the generated word from the API, and get's it ready for gameplay 
 * @async
 * @const winCounter - Retrieves the element containing the total amount of wins the player has (default is 0)
 * 
*/
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
    gameplay(word,displayLetterArray,displayStarArray,attemptAmount,displayUsedLetters, wins);
}

function gameplay(chosenWord,gameLetterArray,gameStarArray,attemptCount,gameUsedLetters,wins)
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
        alert(`You Win! The word was '${chosenWord}'`);
        location.reload();
    }
    else if(attemptCount == 0)
    {
            alert(`You have lost, the word is '${chosenWord}'`);
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
        openingFunction(chosenWord,gameLetterArray,gameStarArray,null,attemptCount, gameUsedLetters,wins);
    };
}
