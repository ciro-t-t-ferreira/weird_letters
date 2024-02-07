/*
  FULL SITE:
-Header should have the language selector, that will affect the whole site.
-Submenus:
    -Alphabet practice: the current module. Should also have a button to show a static screen with all 
        words/transliterations organized.
    -Word pratice: connects with API to be able to generate random words in the language so you can transliterate
    -About section: text about site/autor/tecnical aspects. Should be bilingual, with translations of the 
        selected language

  Bug list:
    -the first textbox shows a random hint
    -aparently i have some issue when the transliteration is empty
    -the current answers disappear every time I turn translits ond and off again
    -clicking refresh with letters/transliterations toggled off make them be visible again 

  Refat:
    -Put the devanagari array in a external file (exports are mad complicated, need to study first)    
    -Rethink the variables and functions names
    
  Feats:    
    - Allow user to change number of letter typing a number
    - WRITTABLE TRANSLIT BOX
        - Allow to write in the translit box when it is turned off
        - Creat a "autocomplet". Example: if the user writes 'ta' automatically show the options 'ta' and 'ṭa' below so he can confirm (allow him to navigate
        using up and down arrows)
        - When he press enter or exits the textbox change the color to green/red to show if he got the answer right or wrong 
  Usability:
    - Make just the letters disappear, not the whole box
    - Keep the relative position of all buttons even when some disappear
    - Make it responsive for smartphone
    - Make it pretty*/

let checkboxTranslit = document.getElementById('transliterationBox');
let checkboxLetter = document.getElementById('letterBox');

let allBlocks = [];
let alphabet;

let currentId = null;
class block{
    constructor(letter){
        this.id = currentId === null ? 0 : currentId;
        this.letter = letter;
        this.transliteraion = alphabet[letter];
        currentId += 1;
        allBlocks.push(this);                
    }
}

function eraseLastBlock(){
    
    if (allBlocks.length !== 0){
        
        let erasedBlock = allBlocks.find(block => block.id == currentId -1);
        allBlocks = allBlocks.filter(block => block.id !== currentId -1);
        currentLetters.pop();        
                
        eraseLastBlockHTML(erasedBlock);

        currentId -= 1;                 
    }
    else {
        window.alert('There are no blocks to be erased');
    }
}

let blockContainer = document.getElementById('blockContainer');

function eraseLastBlockHTML(erasedBlock){    
    let blockToErase = document.getElementById(erasedBlock.id + 'block');    
    blockContainer.removeChild(blockToErase);
}

let currentLetters = [];

function createBlock(){
    let newLetter = selectRandomLetter();    
    let newBlock = new block(newLetter);    
    currentLetters.push(newLetter);
    
    createHTMLBlock(newBlock);       
}

function createHTMLBlock(newBlock){

    let blockHTML = document.createElement('span');
    blockHTML.classList.add('block');
    blockHTML.setAttribute('id', (newBlock.id).toString() + 'block');
    blockContainer.appendChild(blockHTML);

    let letterDiv = document.createElement('div');
    letterDiv.setAttribute('id', (newBlock.id).toString() + 'letterDiv');
    blockHTML.appendChild(letterDiv);    

    
    let letterHTML = document.createElement('span');
    letterHTML.classList.add('letters');
    letterHTML.setAttribute('id', (newBlock.id).toString() + 'letter');
    letterHTML.innerHTML = newBlock.letter;
    letterDiv.appendChild(letterHTML);    

    let transliterationDiv = document.createElement('div');
    transliterationDiv.setAttribute('id', (newBlock.id).toString() + 'transliterationDiv');
    blockHTML.appendChild(transliterationDiv);
    
    let transliteraionHTML = document.createElement('span');
    transliteraionHTML.classList.add('translits');
    transliteraionHTML.setAttribute('id', (newBlock.id).toString() + 'transliteration')
    transliteraionHTML.innerHTML = newBlock.transliteraion;
    transliterationDiv.appendChild(transliteraionHTML);
}

function eraseAllBlocks(){
    let numberOfBlocks = currentId;
    for (let i=0; i < numberOfBlocks; i ++){
        eraseLastBlock();
    }
}

function createAnswerBox(){

    for (let i = 0; i < allBlocks.length; i++){
        let transliterationDiv = document.getElementById(i + 'transliterationDiv');
        let AnswerBox = document.createElement('input');
        AnswerBox.setAttribute('type', 'text');
        AnswerBox.setAttribute('id', i + 'AnswerBox');
        AnswerBox.classList.add('answerBox');

        
        AnswerBox.addEventListener('change', function(event){checkAnswer(event, AnswerBox)}); //FIND MORE SUSCINT WAY               
        AnswerBox.addEventListener('input', function(event){createSuggestionBox(event, AnswerBox, 
            transliterationDiv)})

        transliterationDiv.appendChild(AnswerBox);
    }
}

function checkAnswer(event, AnswerBox){
    let id = event.target.id[0];
            let answer = allBlocks.find(block => block.id == id).transliteraion;
            
            if (event.target.value == answer){
                AnswerBox.style.backgroundColor = "lightgreen";
            }
            else{
                AnswerBox.style.backgroundColor = "lightcoral";
            }
}

let currentSuggestionBox = null;
function createSuggestionBox(event, AnswerBox, transliterationDiv){      
       
    if (currentSuggestionBox != null){        
        currentSuggestionBox.remove();
    }

    let id = event.target.id[0];
    let input = event.target.value;    
    let suggestionBox = document.createElement('textarea'); 
    
    let suggestionBoxID = id + 'suggestionBox';
    let allSuggestionBoxes = document.getElementsByClassName('suggestionBox');    
    let boxesWithSameId = allSuggestionBoxes.length;

    let suggestionList = selectSuggestions(input);

    if (suggestionList.length !== 0){
        if (boxesWithSameId == 0){
            suggestionBox.setAttribute('id', suggestionBoxID);      
            suggestionBox.classList.add('suggestionBox');
            suggestionBox.innerHTML = suggestionList;

            transliterationDiv.appendChild(suggestionBox);        
        }
        currentSuggestionBox = suggestionBox;
    }

}

function eraseAnsewerBox(){
    for (let i = 0; i < allBlocks.length; i++){
        let transliterationDiv = document.getElementById(i + 'transliterationDiv');
        let AnswerBox = document.getElementById(i + 'AnswerBox');
        
        transliterationDiv.removeChild(AnswerBox);
    }
}

function selectSuggestions(input){    
    let suggestionList = [];
    let allTransliterations = Object.values(alphabet);   
      

    if(input.length != 0){
        
        let sameSizeTransliterations = [];
        for (i=0; i < allTransliterations.length; i++){
            if(input.length == allTransliterations[i].length){
                sameSizeTransliterations.push(allTransliterations[i]);
            }
        }

        for (let i = 0; i < sameSizeTransliterations.length; i++){
                        
            let currentTransliteration = sameSizeTransliterations[i];
            let willInclude = true;                

                for (let j = 0; j < input.length; j++){
                    
                    let normalizedLetter = removeAccents(currentTransliteration[j])
                    let isEquivalent = input[j] == normalizedLetter; 

                    if(!isEquivalent){
                        willInclude = false;
                        }

                }

            if (willInclude){
                suggestionList.push(currentTransliteration);                             
            }
        }
    }
    console.log('sugestion: ' + suggestionList + '    input:' + input);

    return suggestionList;
}

function removeAccents(letter) {
    return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function refresh(){
    
    let numberOfBlocksToRecreate = currentId;

    eraseAllBlocks();

    for (let i=0; i < numberOfBlocksToRecreate; i ++){
        createBlock();
    }
}

function selectRandomLetter(){

    const alphabetArray = Object.keys(alphabet);
    if (currentLetters.length < alphabetArray.length){
        let n = alphabetArray.length;     
        let i = randomIntFromInterval(0,n-1);
        
        if (currentLetters.includes(alphabetArray[i])){
            return selectRandomLetter();
        }
        else{
            return alphabetArray[i];
        }      
    }

    else{
        let noMoreLetters = 'There is no more Alphabet Letters'
        window.alert(noMoreLetters);
        throw new Error(noMoreLetters);
    }
}

function transliterationCheckbox(element){
    
    if(element == 'letterBox'){
        let visible = checkboxLetter.checked;        
        translitsOnOff(visible, 'letterBox');        
    }

    if(element == 'transliterationBox'){
        let visible = checkboxTranslit.checked;
        translitsOnOff(visible,'transliterationBox');        
    }  
}

function translitsOnOff(visible, elementName){
    
    if(elementName == 'letterBox'){
        let letters = document.querySelectorAll('.letters');
        let i = 0;
        letters.forEach(letter => {        
            letter.innerHTML = visible? allBlocks[i].letter : '-';
            i += 1;            
            });
            
    }

    if(elementName == 'transliterationBox'){

        let translits = document.querySelectorAll('.translits');        
        
        translits.forEach(translit => {
            
            translit.style.display = visible ? 'initial' : 'none';            
            
        })
        
        visible? eraseAnsewerBox() : createAnswerBox(); 
    }
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function fillOneMore (listaElementos, alphabet){    
    
    if(alphabet == null){
        window.alert("select a alphabet!"); //I can transform this in an exception and do something more classy
    }

    let n = alphabet.length;    
    let i = randomIntFromInterval(0,n-1);
    if (listaElementos.includes(alphabet[i])){
        fillOneMore(listaElementos)
    } else {
        let novalistaElementos = listaElementos.concat([alphabet[i]])        
        return novalistaElementos
    }
}

function fillItems (N, alphabet){
    
    let _listaElementos = []
    for (i=0;i<N;i++){
        _listaElementos = fillOneMore(_listaElementos, alphabet);
    }    
    return _listaElementos
}

let listaElementos;

function changeAlphabet(alphabetSelected){  
    
    const alphabetMap = {
        "devanagari":devanagariDictionary,
        "cyrillic":cyrillicDictionary
    }
    alphabet = alphabetMap[alphabetSelected];        
    refresh();
    
}

const devanagariDictionary = {
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'ṅa',
  'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'ña',
  'ट': 'ṭa', 'ठ': 'ṭha', 'ड': 'ḍa', 'ढ': 'ḍha', 'ण': 'ṇa',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'śa',
  'ष': 'ṣa', 'स': 'sa', 'ह': 'ha',

  'क्ष': 'kṣa', 'त्र': 'tra', 'ज्ञ': 'jña',

  'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u',
  'ऊ': 'ū', 'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ल': 'l', 'ए': 'e',
  'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',

  'अं': 'ṃ', 'अः': 'ḥ'
}; 

const cyrillicDictionary = {
    'а': 'a', 'б': 'b', 'в': 'v',  'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l',  'м': 'm',  'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r',  'с': 's', 'т': 't',
    'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts','ч': 'ch',
    'ш': 'sh', 'щ': 'sch', 'ъ': "'",'ы': 'y','ь': '',
    'э': 'e',  'ю': 'yu',  'я': 'ya'
  };

// Inicializations
changeAlphabet('devanagari');

for (let i = 0; i < 5; i++) {
    createBlock(); 
}