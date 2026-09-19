
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
    //console.log(gameUsedLetters.length)
    const retrieveButton = document.getElementById("submitButton");
    const retrieveBoxVal = document.getElementById("inputBox");
    const getPoints = document.getElementById("attemptValue");
    if(attemptCount == 1)
    {
        getPoints.textContent = `Final Attempt`;
    }
    else 
    {
        getPoints.textContent = `Attempts: ${attemptCount}`;
    }

    if(attemptCount == 0)
    {   
        if(gameStarArray.includes("*") === false)
        {
            
           let convertToInt = parseInt(localStorage.getItem("wins"));
           convertToInt = convertToInt+=1;
           localStorage.setItem("wins",convertToInt);
           console.log(localStorage.getItem("wins"));
            alert("YOU WIN!");
            
            
            
        }
        else 
        {
            alert(`You have lost, the word is '${chosenWord}'`);
        }
        location.reload();
    }

    retrieveButton.onclick = function(){
        let playerAnswer = retrieveBoxVal.value;
        let modifiedAnswer = playerAnswer.toLowerCase();
        let arrayed = [];
        if(gameUsedLetters.includes(modifiedAnswer) == true)
        {
            alert("You have already used this letter!"); 
        }
        else if(gameUsedLetters.includes(modifiedAnswer) == false)
        {
            gameUsedLetters.push(modifiedAnswer);
            if(gameLetterArray.includes(playerAnswer))
            {
                alert("Correct!")
                for(let i = 0; i < gameLetterArray.length; i++)
                {
                    if(gameLetterArray.includes(playerAnswer) === false)
                    {
                    
                        break;
                    }
                    else {
                        arrayed[i] = gameLetterArray.indexOf(playerAnswer);
                        gameLetterArray[gameLetterArray.indexOf(playerAnswer)]= gameLetterArray[gameLetterArray.indexOf(playerAnswer)].toUpperCase();
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