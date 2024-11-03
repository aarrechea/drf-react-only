/* imports */
/* import "./GeneralBar"
import "../element/Element" */



/* Hide general bar on scroll */
var prevScrollpos = window.scrollY;

window.onscroll = function() {
    var currentScrollPos = window.scrollY;

    if (prevScrollpos > currentScrollPos) {        
        if (document.getElementById("background_menu")) {
            document.getElementById("background_menu").style.top = '0';    
        }
        
        if (document.getElementById("div-main")) {
            document.getElementById("div-main").style.top = '4rem'    
        }        

        if (document.getElementById("div-element-bar")) {
            document.getElementById("div-element-bar").style.top = '7.5rem'    
        }        

    } else {      
        if (document.getElementById("background_menu")) {
            document.getElementById("background_menu").style.top = '-4rem';
        }

        if (document.getElementById("div-main")) {
            document.getElementById("div-main").style.top = '0rem'
        }
                
        if (document.getElementById("div-element-bar")) {
            document.getElementById("div-element-bar").style.top = '3.5rem'    
        }        
    }

    prevScrollpos = currentScrollPos;
}



/* Change font weight and color of the button font on click */
function onClickBtnMainMenu(pathName) {
    let buttonClicked;

    document.querySelectorAll('.btnMainMenu').forEach(function(button) {        
        button.style.fontWeight = 'normal';
        button.style.color = 'black';

        if (pathName === button.getAttribute('data-page')) {
            buttonClicked = button;
        }
    })

    if (buttonClicked) {
        buttonClicked.style.fontWeight = 'bold';
        buttonClicked.style.color = 'blue';    
    }    
}



/* Exports */
export {
    onClickBtnMainMenu
}

