/* Count competences in the table */
function fcnElementCount(table, type) {
    let count = 1

    //console.log("new table in element count: ", JSON.stringify(table.newTable));

    if(Object.keys(table).length > 0){
        table.forEach(element => {
            if (parseInt(element['element_type']) === parseInt(type)) {
                count += 1;
            }
        });
    }

    return count;
}

/* Calculate percentages */
function fcnPercentage(count) {
    return Math.round(100 / count, 2)
}

/* Change percentage */
function fcnChangePercentage(table, type, percentage){
    if(Object.keys(table).length > 0){
        table.forEach(element => {
            if (parseInt(element['element_type']) === parseInt(type)) {
                element['percentage'] = percentage;
            }
        })    
    }    
}


/* Puting letters after an insert of a new row */
function fcnPutLetters(newTable, letters) {
    let lettersIndex = 1;

    newTable.forEach((row, i) => {        
        if(parseInt(row.element_type) === 1 && i > 0) {
            lettersIndex += 1;            
        }

        row['relation_letter'] = lettersIndex;
        row['relation_letter_display'] = letters[lettersIndex];        
    })
}

/* Recalculate percentages after row was inserted in the new table */
function fcnPercentageCompetences(newTable) {
    let counter = 0, percentage = 0

    newTable.forEach((row) => {
        if(parseInt(row.element_type) === 1) {
            counter += 1;
        }
    });

    percentage = (100 / counter).toFixed(2);

    newTable.forEach((row) => {
        if(parseInt(row.element_type) === 1) {
            row.percentage = percentage;
        }
    });    
}


/* Calculate the percentage for capabilities and processes - Put numbers too */
function fcnPercentageCapPro(newTable, elementType) {
    let rowNumber = 0 // will be the row to start loop over to put the percentages.
    let counter = 0 // numbers of elements founded
    let rows = 0 // number or rows run
    let percentage = 0
    let flag = false
    let x = 0
    let order_number = 1; // to put the capability and process number
    const parent_element = parseInt(elementType - 1);
    const tableLength = Object.keys(newTable).length;

    while (rowNumber < tableLength) {
        x = rowNumber; // starting in zero

        // loop over the table until I found the element type. Add one unit to the counter
        while(x < tableLength) {            
            if(parseInt(newTable[x].element_type) === elementType) {
                flag = true;
                counter += 1;
        
            } else if (flag === true && parent_element === parseInt(newTable[x].element_type)) {
                break;
            }

            x += 1;
            rows += 1;
        }

        // I use the counter to calculate the percentage, and a reference to advance the for loop
        // until the end of the elements found, because the counter counted the element in the previous
        // while loop.
        // I assign x to rowNumber to not repeat the analisys in the same rows.
        if (flag === true) {
            flag = false;
            percentage = (100 / counter).toFixed(2);
            x = rowNumber;            
            order_number = 1;

            for (let y = 0; y < rows; y++) {
                if (parseInt(newTable[x].element_type) === elementType) {
                    newTable[x].percentage = percentage;

                    if (elementType === 2) {
                        newTable[x].capability_number = order_number;
                        newTable[x].process_number = '-';
                        order_number += 1;

                    } else if (elementType === 3) {
                        newTable[x].process_number = order_number;
                        newTable[x].capability_number = '-';
                        order_number += 1;
                    }
                }
                
                x += 1;

                if (x >= tableLength) break;
            }

            counter = 0;
            percentage = 0;
            rowNumber += rows;
            rows = 0;
        }
        
        rowNumber += 1;
    }
}



/* Exports */
export {
    fcnElementCount,
    fcnPercentage,
    fcnChangePercentage,    
    fcnPercentageCompetences,
    fcnPercentageCapPro,
    fcnPutLetters,
}



