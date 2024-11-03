/* Imports */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/evaluationsList.css";



/* Evaluation list */
export const EvaluationList = ({data, setShowDeleteEva, setEvaToDelete, setShowEvaView, setEvaToShow}) => {
    /* Style of the div to apply transitions  */
    const style = {visibility:'visible', opacity:'1'}

    /* To navigate to the in progress evaluation */
    const navigate = useNavigate();


    /* To delete the evaluation */
    function handleDeleteEva(item) {
        setShowDeleteEva('block');
        setEvaToDelete(item.item);        
    }


    /* To show the evaluation */
    function handleShowEva (item) {
        setShowEvaView(style)        
        setEvaToShow(item.item);
    }



    /* Company card */
    const EvaluationCard = () => {
        return (
            <>            
                {data?.map(item => (
                    <React.Fragment key={item.id}>                      
                        <div className="divEvaluationCard">



                            <div id="divEvaluationCardNames">
                                <label><span>Company &nbsp;</span> {item.company_display}</label>
                                <label><span>Relation &nbsp;</span> {item.relation_display}</label>
                            </div>

                            <div id="divEvaluationCardInfo">
                                <label>
                                    <span>Processes evaluated &nbsp; &nbsp;</span>
                                    {item.processes_evaluated} / {item.total_processes}
                                </label>

                                <label>
                                    <span>Finalized &nbsp; &nbsp;</span>
                                    {item.finalized ? 'Yes' : 'No'}
                                </label>

                                <label>
                                    <span>Score &nbsp; &nbsp;</span>
                                    {parseFloat(item.score) === 0 ? '--' : item.score}
                                </label>
                            </div>

                            <div id="divEvaluationCardButtons">
                                <button 
                                    onClick={() => handleShowEva({item})} 
                                    className="btnNotDisabled"
                                >
                                    View
                                </button>

                                {item.finalized 
                                    ? 
                                        <>
                                            <button disabled>Continue</button>
                                            <button disabled>Delete</button>
                                        </>                                    
                                    :
                                        <>
                                            <button 
                                                className="btnNotDisabled"
                                                onClick={() => navigate("/in-progress-first", {state:{relation:item}})}
                                            >
                                                Continue
                                            </button>

                                            <button 
                                                className="btnNotDisabled"
                                                onClick={() => handleDeleteEva({item})}
                                            >
                                                Delete
                                            </button>
                                        </>
                                }                                
                            </div>                                                        
                        </div>  
                    </React.Fragment>
                ))}
            </>            
        )
    }


    if (Object.keys(data).length !== 0) {
        return (
            <EvaluationCard/>
        )
    } else {
        return "The list of evaluations is empty";
    }
}





