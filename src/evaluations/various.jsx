/* Loop over companies card */
function loopOverInput(name) {
    let newDict = {};

    document.querySelectorAll(`.${name}`).forEach(function(item) {        
        if (item.checked) {            
            newDict['id'] = item.getAttribute('data-id');
        }
    });

    return newDict;
};



// Prepare the relation tree dataset, to be ready to move forward or backward.
// In each position the new list of objects will have the three elements, and the
// only elements that won't be repeatead are the processess.
function fcnNewRelationTreeList(data) {
    let newData = [];
    let competenceRow;
    let capabilityRow;
    let competenceNumber = 0, capabilityNumber, processNumber;
    let elementType;
    let newRow = {}; // new row with the competence, capability and the process added
    let row = 0; // to follow the actual data position


    data.forEach(function(item) {
        elementType = parseInt(item.element_type);     
        newRow = {};

        if (elementType === 1) {
            competenceRow = row; // just saving the row where the competence is.
            competenceNumber += 1;
            capabilityNumber = 0;            

        } else if (elementType === 2) {
            capabilityRow = row;
            capabilityNumber += 1;
            processNumber = 1;

        // if it is process, I add the row to the list.
        } else {            
            newRow['competence'] = data[competenceRow];
            newRow['competence']['new_order'] = competenceNumber

            newRow['capability'] = data[capabilityRow];
            newRow['capability']['new_order'] = capabilityNumber;

            newRow['process'] = data[row];
            newRow['process']['new_order'] = processNumber;
            processNumber += 1;

            newData.push(newRow);
        }
        
        row += 1;
    });

    return newData;
}



/* Function to count each of the elements  */
function fcnCountInsideElements(data) {
    data.forEach(function(item) {
        item['competence']['count'] = Math.round(100 / parseInt(item.competence.percentage));
        item['capability']['count'] = Math.round(100 / parseInt(item.capability.percentage));
        item['process']['count'] = Math.round(100 / parseInt(item.process.percentage));        
    });
    
    return data;
}



// To checked the input radio selected
function fcnCheckedRadioSelected(index) {    
    document.querySelectorAll(".scoreRadio").forEach(function(item){        
        if (parseInt(index) === parseInt(item.value)) {            
            item.checked = true;            
        }
    });
}



// To show the correspondant maturity scale, and to mark the correspondant button
function fcnShowMaturityScale(score, maturityScale) {
    if (parseInt(score) === 0) score = 1;


    document.querySelectorAll('.generalButtonClass').forEach(function(item) {
        if(parseInt(item.value) === parseInt(score)) {
            item.style.backgroundColor = 'rgba(220,220,220, 0.5)';

        } else {
            item.style.backgroundColor = 'white';
        }
    });

    score = parseInt(score) - 1;
    maturityScale.current?.forEach(function([key, value], index) {
        if(index === parseInt(score)) {
            document.getElementById('txtMaturityScale').value = value;
        }
    });
};



// Exports
export {
    loopOverInput,
    fcnNewRelationTreeList,
    fcnCountInsideElements,
    fcnCheckedRadioSelected,
    fcnShowMaturityScale
}




