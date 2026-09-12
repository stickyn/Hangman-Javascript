openingFunction("halloween");
function openingFunction(word)
{
    // Create an array
    let letterArray = [];
    // Put all the letters of word into the array, and print it out
    for(let i = 0; i < word.length; i++)
    {
        letterArray[i] = word[i];
        
    }
    gameplay(word,letterArray);
}

function gameplay(chosenWord,lettersArray)
{
    const retrieveButton = document.getElementById("submitButton");
    const retrieveBoxVal = document.getElementById("inputBox");
    retrieveButton.addEventListener('click',function(){
        let playerAnswer = retrieveBoxVal.value;
        for(let i = 0; i < lettersArray.length; i++)
        {
            if(lettersArray[i] === playerAnswer)
            {
                console.log(lettersArray.indexOf(lettersArray[i]));
            }
        }






    });
}