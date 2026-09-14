let letterArray = [];
let blankArray = [];
getWord();
async function getWord()
{
    /**Credit API */
    const getWordData = await fetch(`https://random-word-api.herokuapp.com/word?number=${Math.floor(Math.random()*7) + 4}`);
    const loadData = await getWordData.json()
    console.log(loadData[0])
    openingFunction(loadData[0],letterArray,blankArray,"start",6);
}


function openingFunction(word,wordedArray,blankLetterArray,gamemode,attemptAmount)
{
    
    const wordSpawner = document.getElementById("wordSpawner");
    if(gamemode === "start")
    {
        for(let i = 0; i < word.length; i++)
        {
            letterArray[i] = word[i];
            blankArray[i] = "*";
            let a = document.createElement("h1");
            a.setAttribute("class",'number');
            a.setAttribute("id",i);
            a.textContent = blankArray[i];
            wordSpawner.append(a);
        
        }
    }
    else 
    {
        for(let i = 0; i < word.length; i++)
        {
            let a = document.createElement("h1");
            a.setAttribute("class",'number');
            a.setAttribute("id",i);
            a.textContent = blankArray[i];
            wordSpawner.append(a);
        }
    }
     
    gameplay(word,letterArray,blankArray,attemptAmount);
}

function gameplay(chosenWord,lettersArray,starArray,attemptCount)
{
    const getPoints = document.getElementById("attempts");
    getPoints.textContent = attemptCount;
    const retrieveButton = document.getElementById("submitButton");
    const retrieveBoxVal = document.getElementById("inputBox");
    retrieveButton.addEventListener('click',function(){
        let playerAnswer = retrieveBoxVal.value;
        let arrayed = [];
        if(lettersArray.includes(playerAnswer))
        {
            for(let i = 0; i < lettersArray.length; i++)
            {
                if(lettersArray.includes(playerAnswer) === false)
                {
                   
                    break;
                }
                else {
                    arrayed[i] = lettersArray.indexOf(playerAnswer);
                    lettersArray[lettersArray.indexOf(playerAnswer)]= lettersArray[lettersArray.indexOf(playerAnswer)].toUpperCase();
                    starArray[arrayed[i]] = lettersArray[arrayed[i]].toLowerCase();
                }
                
           
            }
            for(let k = 0; k < lettersArray.length; k++)
            {
                lettersArray[k] = lettersArray[k].toLowerCase();
            }
                      
        }
        else {
            console.log("NOPE!");
        }
        
        
        const wordSpawner = document.getElementById("wordSpawner");
        attemptCount--;
        for(let c = 0; c < lettersArray.length; c++)
        {
            let b = document.getElementById(c)
            wordSpawner.removeChild(b);
        }
        if(attemptCount == 0)
        {   
            
            if(starArray.includes("*") === false)
            {
                
                alert("YOU WIN!");
            }
            else {
                alert(`You have lost, the word is '${chosenWord}'`);
            }
        }
        openingFunction(chosenWord,lettersArray,starArray,"Froder",attemptCount);
    });
}