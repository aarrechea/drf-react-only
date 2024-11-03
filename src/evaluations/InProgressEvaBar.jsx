// Imports
import React, { useEffect, useState } from "react";
import "./css/inProgressEvaBar.css";
import GeneralButton from "../components/GeneralButton";
import { useNavigate } from "react-router-dom";



// In progress eva bar component
export const InProgressEvaBar = (props) => {
    // Props spreading
    const {evaToGo, evaInfo, relationTree, relationTreePosition, setRelationTreePosition,
        setShowFinalizeModal
    } = props;

    // To define the title the button finalize will have
    const [childrenFinalize, setChildrenFinalize] = useState();
            
    // To navigate
    const navigate = useNavigate();


    // Style for the general button
    const style = 
        {width:'8rem', height:'4.5rem', backgroundColor:'rgba(255, 255, 255, 0.6)', borderColor:'black'}
    const styleFormButtons = 
        {width:'14rem', height:'2.5rem', backgroundColor:'rgba(255, 255, 255, 0.6)', borderColor:'black'}


    /*  Handle click.  
        When changing relationTreePosition the inProgressBar component refreshes and updates the score
        of the process reflected in the input radio selected.
    */    
    function handleClick(e, value, index) {        
        if (value === 'return') {
            navigate('/evaluations-page');

        } else if (value === 'process') {
            if(index > 0 && relationTreePosition < Object.keys(relationTree).length - 1) {
                setRelationTreePosition((prev) => prev + index);                

            } else if (index < 0 && relationTreePosition > 0) {
                setRelationTreePosition((prev) => prev + index);                
            }
        
        } else if (value === 'capability') {

        }


    }; // --- end handle click ---


    // Use effect
    useEffect(() => {
        if(evaToGo === 1) {
            setChildrenFinalize(evaToGo + " process left")
        } else if(evaToGo > 1) {
            setChildrenFinalize(evaToGo + " processes left")
        } else {
            setChildrenFinalize("Finalize")
        }

    }, [evaToGo]);


    // Return in progress bar
    return (
        <div id="divInProgressEvaBar">
            <div id="divInProgressEvaMain">
                <GeneralButton
                    children={<p>Return to<br/>evaluations</p>}
                    onClick={(e) => handleClick(e, 'return')}
                    style={style}
                    className='generalButtonClass'
                />

                <div id="divFormInformation">
                    <label>
                        Competence &nbsp; &nbsp;
                        {relationTree[relationTreePosition]?.competence.new_order} 
                        &nbsp; &nbsp; of &nbsp; &nbsp;
                        {relationTree[relationTreePosition]?.competence.count}
                    </label>

                    <label>
                        Capability &nbsp; &nbsp;
                        {relationTree[relationTreePosition]?.capability.new_order} 
                        &nbsp; &nbsp; of &nbsp; &nbsp;
                        {relationTree[relationTreePosition]?.capability.count}
                    </label>

                    <label>
                        Process &nbsp; &nbsp;
                        {relationTree[relationTreePosition]?.process.new_order} 
                        &nbsp; &nbsp; of &nbsp; &nbsp;
                        {relationTree[relationTreePosition]?.process.count}
                    </label>
                </div>

                <div id="divEvaInformation">
                    <label><span>Company:&nbsp; &nbsp;</span>{evaInfo.company_display}</label>
                    <label><span>Relation:&nbsp; &nbsp;</span>{evaInfo.relation_display}</label>
                </div>

                <GeneralButton
                    children={childrenFinalize}
                    onClick={() => setShowFinalizeModal({visibility:'visible', opacity:'1'})}                    
                    style={style}
                    className={evaToGo === 0 ? 'generalButtonClass' : ''}
                />            
            </div>            


            {/* Buttons to navigate between processess. Backward or forward */}
            <div id="divEvaFormButtons"> 
                <GeneralButton
                    children={<p>&lt; &nbsp; Previous process</p>}
                    onClick={(e) => handleClick(e, 'process', -1)}
                    style={styleFormButtons}
                    className='generalButtonClass'
                />    

                <GeneralButton
                    children={<p>&lt; &nbsp; Previous capability</p>}
                    onClick={(e) => handleClick(e, 'capability', - 1)}
                    style={styleFormButtons}
                    className='generalButtonClass'
                />    

                <GeneralButton
                    children={<p>Next capability &nbsp; &gt;</p>}
                    onClick={(e) => handleClick(e, 'capability', 1)}
                    style={styleFormButtons}
                    className='generalButtonClass'
                />            

                <GeneralButton
                    children={<p>Next process &nbsp; &gt;</p>}
                    onClick={(e) => handleClick(e, 'process', 1)}
                    style={styleFormButtons}
                    className='generalButtonClass'
                />            
            </div>
        </div>
    )
};


