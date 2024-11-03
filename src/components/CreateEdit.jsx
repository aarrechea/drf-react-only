/* Import */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/createEdit.css"



/* Create edit component 
    mode: edit or create
    handleClick: function to determine the future action
    name: name of the element to be edited or created to check its length.
*/
const CreateEditBar = ({mode, handleClick}) => {
    /* To navigate to the previous page */
    const navigate = useNavigate();



    /* Return */
    return (
        <div id="divCreateEditBar">
            <div id="divCreateEditBarInner">
                <div>
                    <button onClick={handleClick} value={mode}>{mode}</button>
                </div>
                
                <label id="labelCreateEdit"></label>

                <div>
                    <button onClick={() => navigate(-1)}>Previous<br/>Page</button>
                </div>                
            </div>            
        </div>
    )
}



/* Export */
export default CreateEditBar;


