openingFunction("Laestrygonians");
function openingFunction(word)
{
    const wordSpawner = document.getElementById("wordSpawner"); 
    // Create an array
    let letterArray = [];
    let blankArray = [];
    // Put all the letters of word into the array, and print it out
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
    gameplay(word,letterArray);
}

function gameplay(chosenWord,lettersArray)
{
    const retrieveButton = document.getElementById("submitButton");
    const retrieveBoxVal = document.getElementById("inputBox");
    retrieveButton.addEventListener('click',function(){
        let playerAnswer = retrieveBoxVal.value;
        let arrayed = [];
        for(let i = 0; i < lettersArray.length; i++)
        {
            if(lettersArray.includes(playerAnswer))
            {
                arrayed[i] = lettersArray.indexOf(playerAnswer);
                lettersArray[lettersArray.indexOf(playerAnswer)]= lettersArray[lettersArray.indexOf(playerAnswer)].toUpperCase();
                console.log(arrayed[i])
            }
            
        }
    });
}