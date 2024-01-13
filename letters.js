let checkbox = document.getElementById('transliterationBox');
let checkboxLetter = document.getElementById('letterBox');

let translits = document.querySelectorAll('.translits');
let letters = document.querySelectorAll('.letters')

checkbox.addEventListener('change', transliterationCheckbox)
checkboxLetter.addEventListener('change', transliterationCheckbox)

function transliterationCheckbox(element){
    
    if(element == 'transliterationBox'){
        let visible;
        
        if (checkbox.checked){
            visible = true
            translitsOnOff(visible, transliterationBox)              
        }
        
        else{
            visible = false
            translitsOnOff(visible, transliterationBox)
        }
    }

    if(element == 'letterBox'){
        let visible;
        
        if (checkbox.checked){
            visible = true
            translitsOnOff(visible, 'letterBox')              
        }

        else{
            visible = false
            translitsOnOff(visible, 'letterBox')    
        }
    }
}

function translitsOnOff(visible, elementName){
    
    if(elementName == 'transliterationBox'){
        for (let i=0; i < translits.length; i++){
            if (visible == true){
                translits[i].style.display = 'initial'
            }
            else if (visible == false){
                translits[i].style.display = 'none'
            }        
        }
    }

    if(elementName == 'letterBox'){
        for (let i=0; i < letters.length; i++){
            if (visible == true){
                letters[i].style.display = 'initial'
            }
            else if (visible == false){
                letters[i].style.display = 'none'
            }        
        }
    }
}

function refresh(){

    document.getElementById('t1').innerHTML = 'ka';
    document.getElementById('t2').innerHTML = 'kha';
    document.getElementById('t3').innerHTML = 'ba';
    document.getElementById('t4').innerHTML = 'bha';

}
