let checkboxTranslit = document.getElementById('transliterationBox');
let checkboxLetter = document.getElementById('letterBox');

checkboxTranslit.addEventListener('change', transliterationCheckbox);
checkboxLetter.addEventListener('change', transliterationCheckbox);

let translits = document.querySelectorAll('.translits');
let letters = document.querySelectorAll('.letters');

function transliterationCheckbox(element){
    
    if(element == 'transliterationBox'){
        let visible;
        
        if (checkboxTranslit.checked){            
            visible = true;
            translitsOnOff(visible, 'transliterationBox');              
        }
        
        else{            
            visible = false;
            translitsOnOff(visible, 'transliterationBox');
        }
    }
    
    if(element == 'letterBox'){
        let visible;
        
        if (checkboxLetter.checked){                    
            visible = true;
            translitsOnOff(visible, 'letterBox');              
        }
    
        else{                        
            visible = false;
            translitsOnOff(visible, 'letterBox');    
        }
    }
}

function translitsOnOff(visible, elementName){
    
    if(elementName == 'transliterationBox'){
        for (let i=0; i < translits.length; i++){
            if (visible == true){
                translits[i].style.display = 'initial';
            }
            else if (visible == false){
                translits[i].style.display = 'none';
            }        
        }
    }

    if(elementName == 'letterBox'){
        for (let i=0; i < letters.length; i++){
            if (visible == true){                
                letters[i].style.display = 'inline';
            }
            else if (visible == false){                
                letters[i].style.display = 'none';
            }        
        }
    }
}

function refresh(){   

    document.getElementById('l1').innerHTML = devanagari[0][0];
    document.getElementById('l2').innerHTML = devanagari[1][0];
    document.getElementById('l3').innerHTML = devanagari[2][0];
    document.getElementById('l4').innerHTML = devanagari[3][0];

    document.getElementById('t1').innerHTML = devanagari[0][1];
    document.getElementById('t2').innerHTML = devanagari[1][1];
    document.getElementById('t3').innerHTML = devanagari[2][1];
    document.getElementById('t4').innerHTML = devanagari[3][1];
    
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
