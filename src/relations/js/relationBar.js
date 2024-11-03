/* Move up relation bar on scroll */
var prevScrollpos = window.scrollY;

window.onscroll = function() {
    var currentScrollPos = window.scrollY;

    const div = document.getElementById("divRelationBarFixed");

    if (div) {
        if (prevScrollpos > currentScrollPos) {
            div.style.top = '7.5rem'
    
        } else {              
            div.style.top = '3.5rem'
        }

        prevScrollpos = currentScrollPos;
    }        
}


