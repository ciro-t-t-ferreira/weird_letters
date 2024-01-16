/*Bug list:
    -Sometimes I click to change the alphabet and it doesn't work, its kind of random (maybe it's related with the random generator of letters, check creating
    a smaller alphabet)
    -the first textbox shows a random hint
    -aparently i have some issue when the transliteration is empty

  Refat:
    -Put the devanagari array in a external file (exports are mad complicated, need to study first)
    -Lots of functions are receveing the alphabet variable, I would like to transform it on a global variable
    -Tranform the pairs of letter/translit in a object (study the object section in W3Schools)
    -Rethink the variables and functions names
    
  Feats:    
    - Make the number of letters adjustable (maybe from 1-10)
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

let translits = document.querySelectorAll('.translits');
let letters = document.querySelectorAll('.letters');
let textboxes = document.querySelectorAll('.textbox');

let alphabet

function transliterationCheckbox(element){
    
    if(element == 'transliterationBox'){
        let visible = checkboxTranslit.checked;
        translitsOnOff(visible,'transliterationBox');        
    }
    
    if(element == 'letterBox'){
        let visible = checkboxLetter.checked;
        translitsOnOff(visible, 'letterBox');        
    }
}

function translitsOnOff(visible, elementName){
    
    if(elementName == 'transliterationBox'){

        translits.forEach(translit => {
            translit.style.display = visible ? 'initial' : 'none';
        })
        textboxes.forEach(textbox =>{ 
            textbox.style.display = visible? 'none': 'inline';
            })        
    }

    if(elementName == 'letterBox'){
        
        letters.forEach(letter => {
            letter.style.display = visible? 'initial' : 'none';});
        
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

function checkanswer(t){    
    
    const letterIndexMap = {
        "w0":0,
        "w1":1,
        "w2":2,
        "w3":3,
        "w4":4
    }        
        
        if (textboxes[letterIndexMap[t]].value == listaElementos[letterIndexMap[t]][1]){
            
            textboxes[letterIndexMap[t]].style.backgroundColor = "lightgreen"; 
        } 
        else {            
            textboxes[letterIndexMap[t]].style.backgroundColor = "lightcoral";
        }        
        
}


function refresh(){   
        
    listaElementos = fillItems(5, alphabet);

    for (let i = 0; i < 5; i++){

        document.getElementById('l'+ i).innerHTML = listaElementos[i][0];
        document.getElementById('t'+ i).innerHTML = listaElementos[i][1];

    }
    
}

function changeAlphabet(numLetters, alphabetSelected){      
    
    const alphabetMap = {
        "devanagari":devanagari,
        "cyrillic":cyrillic
    }
    alphabet = alphabetMap[alphabetSelected];
    
    refresh();
    
}

const devanagari =[
    ['क', 'ka'], 
    ['ख', 'kha'],
    ['ग', 'ga'],
    ['घ', 'gha'],
    ['ङ', 'ṅa'],

    ['च', 'ca'],
    ['छ', 'cha'],
    ['ज', 'ja'],
    ['झ', 'jha'],
    ['ञ', 'ña'],

    ['ट', 'ṭa'],
    ['ठ', 'ṭha'],
    ['ड', 'ḍa'],
    ['ढ', 'ḍha'],
    ['ण', 'ṇa'],

    ['त', 'ta'],
    ['थ', 'tha'],
    ['द', 'da'],
    ['ध', 'dha'],
    ['न', 'na'],

    ['प', 'pa'],
    ['फ', 'pha'],
    ['ब', 'ba'],
    ['भ', 'bha'],
    ['म', 'ma'],

    ['य', 'ya'],
    ['र', 'ra'],
    ['ल', 'la'],
    ['व', 'va'],
    ['श', 'śa'],

    ['ष', 'ṣa'],
    ['स', 'sa'],
    ['ह', 'ha'],

    ['क्ष', 'kṣa'],
    ['त्र', 'tra'],
    ['ज्ञ', 'jña'],

    ['अ', 'a'],
    ['आ', 'ā'],
    ['इ', 'i'],
    ['ई', 'ī'],
    ['उ', 'u'],
    ['ऊ', 'ū'],
    ['ऋ', 'ṛ'],
    ['ॠ', 'ṝ'],
    ['ल', 'l'],
    ['ए', 'e'],
    ['ऐ', 'ai'],
    ['ओ', 'o'],
    ['औ', 'au'],

    ['अं', 'ṃ'],
    ['अः', 'ḥ']];

const cyrillic = [
    ['а', 'a'],
    ['б', 'b'],
    ['в', 'v'],
    ['г', 'g'],
    ['д', 'd'],
    ['е', 'e'],
    ['ё', 'yo'],
    ['ж', 'zh'],
    ['з', 'z'],
    ['и', 'i'],
    ['й', 'y'],
    ['к', 'k'],
    ['л', 'l'],
    ['м', 'm'],
    ['н', 'n'],
    ['о', 'o'],
    ['п', 'p'],
    ['р', 'r'],
    ['с', 's'],
    ['т', 't'],
    ['у', 'u'],
    ['ф', 'f'],
    ['х', 'kh'],
    ['ц', 'ts'],
    ['ч', 'ch'],
    ['ш', 'sh'],
    ['щ', 'sch'],
    ['ъ', "'"],
    ['ы', 'y'],
    ['ь', ''],
    ['э', 'e'],
    ['ю', 'yu'],
    ['я', 'ya']
];
