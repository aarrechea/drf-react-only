/* Count rows and characters
    x: html element    
    origin: name of the event that triggers the function
*/
function countRows(htmlElement, charPerRows)
{       
    /* Constants */        
    const text = htmlElement.value;
    const vector = text.split("\n"); 
        

    /* Variables */
    let lines = vector.length; // Number of lines per press the Enter key
    let i;


    // If a line has more than the charPerRows value, it adds one additional line to lines variable.
    for (i = 0; i < vector.length; i++) {            
        if(vector[i].length > charPerRows) {                                
            lines = lines + Math.floor(vector[i].length / charPerRows);                
        }
    }

    return lines;
};



/* Div create message timeout */
function messageTimeout(message, color) {
    document.getElementById("div-create-message").style.margin = '8rem auto 0 auto';
    document.getElementById("lbl-create-message").innerHTML = message;
    document.getElementById("lbl-create-message").style.color = color;
    
    setTimeout(function() {
        document.getElementById("div-create-message").style.margin = '4rem auto 0 auto';        
    }, 3500);
}



/* Clean textareas */
function resetAfterCreate() {
    document.querySelectorAll('.txtToClean').forEach(function(txt) {        
        txt.value = '';
    });

    document.getElementById('select-letter-create-element').value = 1;
}



/* Checked input radio */
function checkedInputRadio(name, inputChecked) {
    document.querySelectorAll('input[name=' + name + ']').forEach(function(radio) {
        if (parseInt(radio.value) === parseInt(inputChecked)) {
            radio.checked = true;
        }
    });
}



/* Enabled or disabled element radio buttons in fixed bar */
function enabledDisabledRadioButton(children) {    
    document.querySelectorAll('[name="type"]').forEach(function(radio) {
        if (children === "Create") {            
            radio.disabled = false

        } else {
            radio.disabled = true
        }
    });

    document.querySelectorAll('.btn-type').forEach(function(button) {
        if (children === "Create") {            
            button.disabled = false;            

        } else {
            button.disabled = true;            
        }
    });
}



/* Change btn additional color */
function changeAdditionalColor() {
    document.querySelectorAll(".btnAdditional").forEach(function(button) {
        button.style.color = 'black';
        button.style.fontWeight = 'normal';
    });
}



/* Exports */
export {
    countRows,
    messageTimeout,
    resetAfterCreate,
    checkedInputRadio,
    enabledDisabledRadioButton,
    changeAdditionalColor
}


