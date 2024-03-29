/*
  FULL SITE:
-Header should have the language selector, that will affect the whole site.
-Sub-menus:
    -Alphabet practice: the current module. Should also have a button to show a static screen with all 
        words/transliterations organized.
    -Word pratice: connects with API to be able to generate random words in the language so you can transliterate
    -About section: text about site/autor/tecnical aspects. Should be bilingual, with translations of the 
        selected language

  Bug list:
    -aparently i have some issue when the transliteration is empty
    -the current answers disappear every time I turn translits ond and off again
    -the placement of the suggestion box bugs when I turn translits on/off
    -clicking refresh with letters/transliterations toggled off make them be visible again 
    -suggestion box don't close when changing to other answerBox

  Refat:
    -Put the devanagari array in a external file (exports are mad complicated, need to study first)    
    -Rethink the variables and functions names
    -Clean the code
    
  Feats:    
    - Allow user to change number of letter by typing a number
         
  Usability:
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
        AnswerBox.addEventListener('input', function(event){createSuggestionBox(event, AnswerBox, transliterationDiv);})
        AnswerBox.addEventListener('keydown', function(event){selectSuggestion(event, AnswerBox)}) 
        AnswerBox.addEventListener('blur', function(){eraseAllSuggestionBoxes()})       

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
    
    counter = 0;
    selectedSuggestion = null;
    
    if (currentSuggestionBox != null){        
        currentSuggestionBox.remove();
    }

    let id = event.target.id[0];
    let input = event.target.value;    
    let suggestionBox = document.createElement('ul'); 
    
    let suggestionBoxID = id + 'suggestionBox';
    let allSuggestionBoxes = document.getElementsByClassName('suggestionBox');    
    let boxesWithSameId = allSuggestionBoxes.length;

    let suggestionList = getSuggestions(input);
    if (suggestionList.length !== 0){
        if (boxesWithSameId == 0){
            suggestionBox.setAttribute('id', suggestionBoxID);      
            suggestionBox.classList.add('suggestionBox');
            
            let suggestionID = 1;
            suggestionList.forEach(s => {
                let suggestionItem = document.createElement('li');
                suggestionItem.innerHTML = s;
                suggestionItem.classList.add('suggestionItem');
                suggestionItem.setAttribute('id', suggestionID + 'suggestion');
                suggestionID += 1;                    
                suggestionBox.appendChild(suggestionItem);
            })
            
            //suggestionBox.innerHTML = suggestionList;
            
            transliterationDiv.appendChild(suggestionBox);        
        }
        currentSuggestionBox = suggestionBox;
    }

}

function eraseAllSuggestionBoxes(){
    let suggestionBoxes = document.getElementsByClassName('suggestionBox');
    suggestionBoxes = Array.from(suggestionBoxes);
    suggestionBoxes.forEach(function(element) {element.remove()})
}

function eraseAnsewerBox(){
    for (let i = 0; i < allBlocks.length; i++){
        let transliterationDiv = document.getElementById(i + 'transliterationDiv');
        let AnswerBox = document.getElementById(i + 'AnswerBox');
        
        transliterationDiv.removeChild(AnswerBox);
    }
}

function getSuggestions(input){    
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

    return suggestionList;
}

let counter = 0;
let selectedSuggestion;
function selectSuggestion(event, AnswerBox){
    
    let suggestions = [null];
    suggestions = suggestions.concat(getSuggestions(event.target.value));
    
    eraseItemSelection();
    
    if ((counter >= 0) && (counter <= suggestions.length)){
        if (event.key == 'ArrowDown'){
            
            counter = refreshCounter(event.key, counter, suggestions.length); //can be refactored
            selectedSuggestion = suggestions[counter];

            let selectedItem = document.getElementById(counter + 'suggestion');
            selectedItem.classList.add('suggestionItemSelected');            
            
        }
        
        else if (event.key == 'ArrowUp') {
            
            counter = refreshCounter(event.key, counter, suggestions.length);
            selectedSuggestion = suggestions[counter];

            let selectedItem = document.getElementById(counter + 'suggestion');
            
            if (counter != 0){
                selectedItem.classList.add('suggestionItemSelected');
            }

        }
    }

    if ((event.key == 'Enter') && (counter != 0)){
        AnswerBox.value = selectedSuggestion;
        checkAnswer(event, AnswerBox);
    }
}

function eraseItemSelection(){
    let allSelections = document.getElementsByClassName('suggestionItemSelected');
    allSelections = Array.from(allSelections);
    allSelections.forEach(selection => 
        {selection.classList.remove('suggestionItemSelected');})
}

function refreshCounter(key, oldValue, size){
    newValue = oldValue;
    if ((key == 'ArrowDown') && (oldValue < size - 1)){
        newValue = oldValue + 1;
    }

    else if ((key == 'ArrowUp') && (oldValue > 0)){
        newValue = oldValue -1;

    }
    return newValue

};

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

function changeAlphabet(alphabetSelected){  
    
    const alphabetMap = {
        "devanagari":devanagariDictionary,
        "cyrillic":cyrillicDictionary,
        "greek":greekDictionary,
        "hebrew":hebrewDictionary
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

const greekDictionary = {
    'α': 'a',  'β': 'v',  'γ': 'g',  'δ': 'd',  'ε': 'e',
    'ζ': 'z',  'η': 'i',  'θ': 'th', 'ι': 'i',  'κ': 'k',
    'λ': 'l',  'μ': 'm',  'ν': 'n',  'ξ': 'x',  'ο': 'o',
    'π': 'p',  'ρ': 'r',  'σ': 's',  'τ': 't',  'υ': 'y',
    'φ': 'ph', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',  'ά': 'a',
    'έ': 'e',  'ί': 'i',  'ό': 'o',  'ύ': 'y',  'ή': 'i',
    'ώ': 'o',  'ς': 's',  'ϊ': 'i',  'ΐ': 'i',  'ϋ': 'y',
    'ΰ': 'y',  'Α': 'A',  'Β': 'V',  'Γ': 'G',  'Δ': 'D',
    'Ε': 'E',  'Ζ': 'Z',  'Η': 'I',  'Θ': 'TH', 'Ι': 'I',
    'Κ': 'K',  'Λ': 'L',  'Μ': 'M',  'Ν': 'N',  'Ξ': 'X',
    'Ο': 'O',  'Π': 'P',  'Ρ': 'R',  'Σ': 'S',  'Τ': 'T',
    'Υ': 'Y',  'Φ': 'PH', 'Χ': 'CH', 'Ψ': 'PS', 'Ω': 'O',
    'Ά': 'A',  'Έ': 'E',  'Ί': 'I',  'Ό': 'O',  'Ύ': 'Y',
    'Ή': 'I',  'Ώ': 'O'
};

const hebrewDictionary = {
    'א': 'a', 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h',
    'ו': 'v', 'ז': 'z', 'ח': 'kh', 'ט': 't', 'י': 'y',
    'כ': 'k', 'ל': 'l', 'מ': 'm', 'נ': 'n', 'ס': 's',
    'ע': '',  'פ': 'p', 'צ': 'ts', 'ק': 'q', 'ר': 'r',
    'ש': 'sh', 'ת': 't', 'ם': 'm', 'ן': 'n', 'ף': 'f',
    'ץ': 'tz', 'ך': 'kh', 'װ': 'v', 'ױ': 'v', 'ײ': 'y',
    'יִ': 'i', 'ﬡ': 'a', 'ﬢ': 'a', 'ﬣ': 'a', 'ﬤ': 'a',
    'ﬥ': 'a', 'ﬦ': 'a', 'ﬧ': 'o', 'ﬨ': 'e', '﬩': 'e',
    'שׁ': 'sh', 'שׂ': 's', 'שּׁ': 's', 'שּׂ': 't', 'אַ': 'a',
    'אָ': 'a', 'אּ': 'a', 'בּ': 'b', 'גּ': 'g', 'דּ': 'd',
    'הּ': 'h', 'וּ': 'v', 'זּ': 'z', 'טּ': 't', 'יּ': 'y',
    'ךּ': 'k', 'כּ': 'k', 'לּ': 'l', 'מּ': 'm', '﬿': 'm',
    'נּ': 'n', 'סּ': 's', 'ףּ': 'p', 'פּ': 'p', 'צּ': 'ts',
    'שּ': 'k', 'תּ': 't', 'וֹ': 'o', 'בֿ': 'v', 'כֿ': 'sh',
    'פֿ': 'f'
};

// Inicializations
changeAlphabet('devanagari');

for (let i = 0; i < 5; i++) {
    createBlock(); 
}