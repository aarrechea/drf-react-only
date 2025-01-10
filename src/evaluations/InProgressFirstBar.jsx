/* Imports */
import { useNavigate } from "react-router-dom";
import GeneralButton from "../components/GeneralButton";
import "./css/inProgressFirstBar.css"



/* In progress bar component - relation is actually the evaluation */
const InProgressFirstBar = ({relation, saveDisabled, setDisplaySecurityQuestion, save, setAction}) => {
    /* To navigate to the previous page */
    const navigate = useNavigate();    
    
    /* Constant to set the buttons style */
    const style = {height:'4rem', backgroundColor:'rgba(255, 255, 255, 0.6', borderColor:'black'}

    
    /* To go back to the previous page, the software checks if the button save is enabled or disabled first */
    function handleClick(e, value) {
        if (!saveDisabled) {            
            setDisplaySecurityQuestion({visibility:'visible', opacity:'1'});            
            setAction(value);

        } else {
            if (value === 'previous page') {
                navigate(-1)

            } else {
                navigate("/in-progress-eva/", {state:{eva:relation}});
            }            
        }        
    }


    /* Return */
    return (
        <div id="divInProgressFirst">
            <div id="divInProgressFirstMain">
                <div>
                    <GeneralButton
                        children='Return'
                        onClick={(e) => handleClick(e, 'previous page')}
                        style={style}
                        className='generalButtonClass'
                    />
                </div>
                
                <div id="divInProgressFirstMainLabels">
                    <label style={{fontSize:'1.3rem', color:'black'}}>
                        <span style={{fontSize:'1rem', color:'gray'}}>Company &nbsp; &nbsp;</span>
                        {relation.company_display}
                    </label>

                    <label style={{fontSize:'1.3rem', color:'black'}}>
                        <span style={{fontSize:'1rem', color:'gray'}}>Relation &nbsp; &nbsp;</span>
                        {relation.relation_display}
                    </label>
                </div>

                <div>
                    <GeneralButton
                        children='Save'
                        onClick={save}
                        disabled={saveDisabled}
                        style={style}
                        className={!saveDisabled ? 'generalButtonClass' : ''}
                    />
                </div>                
                
                <div>
                    <GeneralButton
                        children={<p>First<br/>process</p>}
                        onClick={(e) => handleClick(e, 'first process')}
                        style={style}
                        className='generalButtonClass'
                    />
                </div>                
            </div>
        </div>        
    )
};



export default InProgressFirstBar;


