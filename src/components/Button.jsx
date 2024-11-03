/* Imports */
import "./css/button.css"



/* Button */
const ButtonCss = ({children, style, onClick, value, dataPage}) => {
    return (
        <button 
            onClick={onClick} 
            className="buttonCss btnMainMenu" 
            style={style}
            value={value}
            data-page={dataPage}
        >
            {children}
        </button>
    );
}


/* Exports */
export default ButtonCss;



