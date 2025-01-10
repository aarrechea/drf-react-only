/* Imports */
import { useCallback, useEffect, useState } from "react";
import axiosService from "../helpers/axios";
import "./css/evaluationView.css";



/* View evaluation */
const ViewEvaluation = ({showEvaView, setShowEvaView, evaToShow}) => {
    /* Define style to hide the modal */
    const style = {visibility:'hidden', opacity:'0'}
    
    /* state to hold the eva relation with its respective score */
    const [evaRelation, setEvaRelation] = useState();

    /* Get processes to be evaluated with its respective score to show in the modal */
    const getProcesses = useCallback(() => {
        axiosService
            .get(`/evaluations/${evaToShow.id}/getRelation/`)
            .then(res => {                
                setEvaRelation(res.data);
            })
            .catch(e => {
                console.log("Error getting the eva relation: ", e);
            })
    }, [evaToShow.id]);
        
    useEffect(() => {
        if (Object.keys(evaToShow).length) {
            getProcesses();
        }
    }, [evaToShow, getProcesses])
    
    
    
    

    /* View company card */
    const CompanyViewCard = ({process, score}) => {
        let newScore = score;
        let style = {textAlign:'center'};

        if (parseInt(score) === 0) {
            newScore = 'Not assessed yet'
            style['fontSize'] = '0.9rem'
        }        

        return (
            <div id="divCompanyViewCard">
                <label className="labelCompanyCardView">{process}</label>
                <label className="labelCompanyCardView" style={style}>{newScore}</label>
            </div>
        )
    }
    


    /* Return */
    return (
        Object.keys(evaToShow).length 
            ?
                <div key={evaToShow.id} style={showEvaView} id="divEvaView">
                    <div id="divEvaViewMain">
                        {/* General title */}
                        <div id="divEvaViewMainTitle">
                            <h3>Evaluation</h3>
                        </div>

                        <p className="viewParagraph"/>

                        {/* Company and relation names */}
                        <div id="divEvaViewMainNames">
                            <label><span>Company name &nbsp; &nbsp;</span>{evaToShow.company_display}</label>
                            <label><span>Relation name &nbsp; &nbsp;</span>{evaToShow.relation_display}</label>                    
                        </div>

                        <p className="viewParagraph"/>

                        {/* User */}
                        <div id="divEvaViewMainUser">
                            <label><span>User creator &nbsp; &nbsp;</span>{evaToShow.user_display.email}</label>
                            <label>
                                <span>User name &nbsp; &nbsp;</span>
                                {evaToShow.user_display.first_name}  {evaToShow.user_display.last_name}
                            </label>
                        </div>

                        <p className="viewParagraph"/>

                        {/* Each process with its respective score */}
                        <div id="divEvaViewMainScores">
                            <div>
                                <label style={{fontSize:'1.2rem', fontWeight:'bold'}} htmlFor="">Processes</label>
                                <label style={{fontSize:'1.2rem', fontWeight:'bold'}} htmlFor="">Score</label>
                            </div>

                            {evaRelation?.map(item => (
                                parseInt(item.element_type) === 3 
                                    ?                                        
                                        <CompanyViewCard
                                            process={item.element_name_display}
                                            score={item.first_score}
                                        />
                                    :
                                        null
                            ))}
                        </div>

                        <p className="viewParagraph"/>

                        {/* Button */}
                        <div id="divEvaViewMainButton">
                            <button onClick={() => setShowEvaView(style)}>Close</button>
                        </div>
                    </div>
                </div>
            :
                null
    )
};



/* Exports */
export default ViewEvaluation




