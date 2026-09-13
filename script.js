let letterArray = [];
let blankArray = [];
getWord();
async function getWord()
{
    /**Credit API */
    const getWordData = await fetch('https://random-word-api.herokuapp.com/word?number=1&diff=2');
    const loadData = await getWordData.json()
    console.log(loadData);
    openingFunction(loadData[0],letterArray,blankArray,"start");
}


function openingFunction(word,wordedArray,blankLetterArray,gamemode)
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
     
    gameplay(word,letterArray,blankArray);
}

function gameplay(chosenWord,lettersArray,starArray,spawner)
{
    console.log(starArray);
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
                    console.log(arrayed[i]);
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
        for(let c = 0; c < lettersArray.length; c++)
        {
            let b = document.getElementById(c)
            wordSpawner.removeChild(b);
        }
        
        openingFunction(chosenWord,lettersArray,starArray,"Froder");
    });
}