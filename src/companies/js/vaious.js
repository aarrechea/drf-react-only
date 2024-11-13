/* Loop over the element of class name to create the new company */
function getNames() {
    let data = {};
    let titles = ['name', 'city', 'postal_code', 'address', 'country', 'continent', 'region', 
        'industry', 'supersector', 'sector', 'subsector', 'year_establishment', 'year_first_exports', 'year_first_expo', 
        'business_description']
    let counter = 0;

    document.querySelectorAll('.name').forEach(function(item) {
        if (item.nodeName === 'LABEL') {            
            data[titles[counter]] = item.textContent;

        } else if (item.type === 'checkbox') {            
            data[titles[counter]] = item.checked;

        } else {            
            data[titles[counter]] = item.value;
        }        

        counter += 1;
    });

    return data;
}


/* Create a message when a user try to create a company. The messages can be for 
    succesfully created the company, or if it were an error.
*/
function companyMessageTimeout(message) {
    document.getElementById("labelCreateEdit").innerHTML = message;    
    document.getElementById("labelCreateEdit").style.color = 'green';
    document.getElementById("labelCreateEdit").style.fontSize = '2rem';
    
    setTimeout(function() {
        if (document.getElementById("labelCreateEdit")) {
            document.getElementById("labelCreateEdit").style.fontSize = '0rem';
        }
    }, 3000);
}


/* Reset the fields after succesfully created a company */
function companyResetAfterCreate() {
    document.querySelectorAll('.name').forEach(function(item) {
        if (item.type === 'checkbox') {            
            item.checked = false;

        } else if (item.nodeName === 'INPUT' || item.nodeName === 'TEXTAREA') {
            item.value = '';
        }        
    });
}



/* Exports */
export {
    getNames,
    companyMessageTimeout,
    companyResetAfterCreate
}





