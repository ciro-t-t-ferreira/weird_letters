let checkboxTranslit = document.getElementById('transliterationBox');
let checkboxLetter = document.getElementById('letterBox');

let translits = document.querySelectorAll('.translits');
let letters = document.querySelectorAll('.letters');


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
    }

    if(elementName == 'letterBox'){
        letters.forEach(letter => {
            letter.style.display = visible? 'initial' : 'none';})        
    }
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function fillOneMore (listaElementos){
    let n = devanagari.length
    let i = randomIntFromInterval(0,n-1)
    if (listaElementos.includes(devanagari[i])){
        fillOneMore(listaElementos)
    } else {
        let novalistaElementos = listaElementos.concat([devanagari[i]])        
        return novalistaElementos
    }
}

function fillItems (N){
    let _listaElementos = []
    for (i=0;i<N;i++){
        _listaElementos = fillOneMore(_listaElementos)
    }    
    return _listaElementos
}

function refresh(){  
    let listaElementos = fillItems(5)

    for (let i = 0; i < 5; i++){

        document.getElementById('l'+ i).innerHTML = listaElementos[i][0];
        document.getElementById('t'+ i).innerHTML = listaElementos[i][1];

    }
    
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
