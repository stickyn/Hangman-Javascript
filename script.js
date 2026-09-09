/**
 * What we will do:
 * Have a word - loop it and put it in a array
 */
openingFunction("Death","NEW",null)

function openingFunction(selectedWord,check,array)
{   
    if(check == "NEW")
    {
        let letterArray = []
        for(let i = 0; i < selectedWord.length; i++)
        {
            letterArray[i] = selectedWord[i];
        }
        openingFunction(selectedWord,"OLD",letterArray)
    }
    /**
     * Main Gameplay
     */
    else {
        for(let i = 0; i < array.length; i++)
        {
            console.log(array[i]);
        }
    }
    
    
}