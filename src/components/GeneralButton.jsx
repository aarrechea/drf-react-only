/* Imports */
import "./css/generalButton.css"



/* General button component */
const GeneralButton = ({children, onClick, className, style, value, dataPage, disabled}) => {
    return (
        <button
            id="generalButton"
            onClick={onClick} 
            className={className} 
            style={style}
            value={value}
            data-page={dataPage}
            disabled={disabled}
        >
            {children}
        </button>
    )
}



/* Export */
export default GeneralButton;

