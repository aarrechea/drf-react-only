// Imports
import React, { useCallback, useEffect, useState } from "react";
import "./css/inProgressEva.css";
import { InProgressEvaBar } from "./InProgressEvaBar";
import { useLocation, useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import { fcnCountInsideElements, fcnNewRelationTreeList} from "./various";
import GeneralButton from "../components/GeneralButton";
import { FinalizeModal } from "./FinallizeModal";



// Information about which process is being evaluated, with the information about its respective
//  competence and capability
const EvaMainInformation = ({relationTree, relationTreePosition}) => {    
    return (
        <div id="divEvaMainInformation">
            <label className="labelEvaMainInformation">
                <span>{relationTree[relationTreePosition]?.competence.new_order} &nbsp; - &nbsp;</span>
                <span>&nbsp; {relationTree[relationTreePosition]?.competence.name} </span>
                <span>&nbsp; {relationTree[relationTreePosition]?.competence.percentage}%</span>
            </label>

            <label className="labelEvaMainInformation">
                <span>{relationTree[relationTreePosition]?.capability.new_order} &nbsp; - &nbsp;</span>
                <span>&nbsp; {relationTree[relationTreePosition]?.capability.name} </span>
                <span>&nbsp; {relationTree[relationTreePosition]?.capability.percentage}%</span>
            </label>

            <label className="labelEvaMainInformation">
                <span>{relationTree[relationTreePosition]?.process.new_order} &nbsp; - &nbsp;</span>
                <span>&nbsp; {relationTree[relationTreePosition]?.process.name} </span>
                <span>&nbsp; {relationTree[relationTreePosition]?.process.percentage}%</span>
            </label>
        </div>
    )
}; // --- End eva main information --- Child component ---


// Assessment component
const Assessment = (props) => {
    // Props
    const {relationTree, relationTreePosition, evaScores, setEvaScores, 
        fcnCountProcessesEvaluated, setEvaToGo} = props;

    const navigate = useNavigate();

    // To hold the value of the textarea
    const [maturityValue, setMaturityValue] = useState('');

    // Style and title of the score title to change every time a new score is chosen
    const [scoreStyle, setScoreStyle] = useState();
    const [scoreTitle, setScoreTitle] = useState("Score");

    // Button style
    const style = {width:'4rem', height:'3rem', border:'1px solid var(--brown_100)'};

    // To mark the correspondant button
    function fcnShowMaturityScale(score) {
        // To show the first maturity scale assessment if the process is not evaluated yet.
        if (parseInt(score) === 0) score = 1;

        document.querySelectorAll('.assessmentButton').forEach(function(item) {
            if(parseInt(item.innerText) === parseInt(score)) {
                item.style.backgroundColor = 'rgba(220,220,220, 0.5)';

            } else {
                item.style.backgroundColor = 'white';
            }
        });
    };
    
    
    const fcnCheckedRadioSelected = useCallback(index => {
        let newIndex;
        
        // Index is the process id, so, with this id, I loop over evaScores to find
        // the score of the process, once found, I assign it the value to newIndex.
        Object.entries(evaScores).forEach(function (item) {            
            if(parseInt(item[1]['element_id']) === index) {                
                newIndex = item[1]['first_score']
            }            
        });

        // With newIndex value, I check the correspondant input.
        document.querySelectorAll(".scoreRadio").forEach(function(item){
            if (newIndex === parseInt(item.value)) {
                item.checked = true;
            }
        });

    }, [evaScores]);

    
    // Show the correspondant maturity scale in the textarea, and change the style of the button pressed
    function handleScoreClick(e) {
        fcnShowMaturityScale(e.target.innerText);
        setMaturityValue(relationTree[relationTreePosition]['process']['element_object'][e.target.value]);
    }

   
    // Handle change input
    function handleChangeRadio(e) {
        const id_eva = evaScores[relationTreePosition]['evaluation_id']
        const id_element = relationTree[relationTreePosition]['process']['element']

        axiosService
            .put(`evaluations/${id_eva}/updateScore/`, {
                id_element:id_element,
                newScore:e.target.value
            })
            .then(res => {
                setEvaScores(res.data);
                setEvaToGo(fcnCountProcessesEvaluated(res.data));

                setScoreStyle({color:'green', fontWeight:'bold'})
                setScoreTitle("Saved")

                setTimeout(() => {
                    setScoreStyle({color:'black', fontWeight:'normal'})
                    setScoreTitle("Score")
                }, 3000);
            })
            .catch(e => {
                console.log("Error updating the score: ", e);
                navigate("/");
            })
    };
    
   
     // To fill the textarea when the component is loaded    
     useEffect(() => {
        if(Object.keys(relationTree).length > 0 && Object.keys(evaScores).length > 0) {
            setMaturityValue(relationTree[relationTreePosition]['process']['element_object']['assess_one']);
            fcnShowMaturityScale(evaScores[0]['first_score']);
            fcnCheckedRadioSelected(relationTree[relationTreePosition]['process']['element']);            
        }        
    }, [evaScores, relationTree, relationTreePosition, fcnCheckedRadioSelected]);
    


    // Return assessment component
    return (
        <div id="divAssessment">
            {/* Score */}
            <div id="divAssessmentTitle">
                <h3>Assessment</h3>
            </div>

            <div id="divAssessmentScoreTitle">
                <h4 style={scoreStyle}>{scoreTitle}</h4>
            </div>


            {/* Input radios to choose the score */}
            <div id="divAssessmentScore">
                <label htmlFor="scoreNone">None</label>
                <label htmlFor="scoreOne">1</label>
                <label htmlFor="scoreTwo">2</label>
                <label htmlFor="scoreThree">3</label>
                <label htmlFor="scoreFour">4</label>
                <label htmlFor="scoreFive">5</label>

                <input 
                    type="radio" 
                    name="scoreRadio" 
                    className="scoreRadio" 
                    id="scoreNone" 
                    value={0}
                    onClick={handleChangeRadio}
                />
                <input 
                    type="radio" 
                    name="scoreRadio" 
                    className="scoreRadio" 
                    id="scoreOne" 
                    value={1}
                    onClick={handleChangeRadio}
                />
                <input 
                    type="radio" 
                    name="scoreRadio" 
                    className="scoreRadio" 
                    id="scoreTwo" 
                    value={2}
                    onClick={handleChangeRadio}
                />
                <input 
                    type="radio" 
                    name="scoreRadio" 
                    className="scoreRadio" 
                    id="scoreThree" 
                    value={3}
                    onClick={handleChangeRadio}
                />
                <input 
                    type="radio" 
                    name="scoreRadio" 
                    className="scoreRadio" 
                    id="scoreFour" 
                    value={4}
                    onClick={handleChangeRadio}
                />
                <input 
                    type="radio" 
                    name="scoreRadio" 
                    className="scoreRadio" 
                    id="scoreFive" 
                    value={5}
                    onClick={handleChangeRadio}
                />
            </div>


            {/* Maturity scale */}
            <div id="divAssessmentMaturityTitle">
                <h4>Maturity Scale</h4>
            </div>


            {/* Buttons to choose the maturity scale */}
            <div id="divAssessmentMaturityButtons">
                <GeneralButton
                    value={'assess_one'}
                    children={1}
                    style={style}
                    className={'generalButtonClass assessmentButton'}
                    onClick={(e) => handleScoreClick(e)}
                />

                <GeneralButton
                    value={'assess_two'}
                    children={2}
                    style={style}
                    className={'generalButtonClass assessmentButton'}
                    onClick={(e) => handleScoreClick(e)}
                />

                <GeneralButton
                    value={'assess_three'}
                    children={3}
                    style={style}
                    className={'generalButtonClass assessmentButton'}
                    onClick={(e) => handleScoreClick(e)}
                />

                <GeneralButton
                    value={'assess_four'}
                    children={4}
                    style={style}
                    className={'generalButtonClass assessmentButton'}
                    onClick={(e) => handleScoreClick(e)}
                />

                <GeneralButton
                    value={'assess_five'}
                    children={5}
                    style={style}
                    className={'generalButtonClass assessmentButton'}
                    onClick={(e) => handleScoreClick(e)}
                />
            </div>


            {/* Textarea to show the maturity scale selected */}
            <div id="divAssessmentMaturityTextarea">
                <textarea 
                    id="txtMaturityScale"
                    value={maturityValue}
                    disabled
                />
            </div>
        </div>
    )
}; // --- End of assessment component --- Child component



// Symptoms and sample questions
const Symptoms = ({relationTree, relationTreePosition}) => {
    // New variable to hold the value of the textarea
    const [newData, setNewData] = useState('');

    // Style of the button wether they were selected or not.
    const [symptomsStyle, setSymptomsStyle] = useState({backgroundColor:'rgba(220,220,220, 0.5)'});
    const [questionsStyle, setQuestionsStyle] = useState({backgroundColor:"white"});

    useEffect(() => {
        if(Object.keys(relationTree).length > 0) {
            setNewData(relationTree[relationTreePosition]['process']['element_object']['symptoms'])
        } 
    }, [relationTree, relationTreePosition])
    


    // To change the value of selection useState variable.
    function onClick(e, value) {
        if (value === 'symptoms') {            
            setSymptomsStyle({backgroundColor:'rgba(220,220,220, 0.5)'});
            setQuestionsStyle({backgroundColor:'white'});
            setNewData(relationTree[0]['process']['element_object'][value])

        } else {            
            setSymptomsStyle({backgroundColor:"white"});
            setQuestionsStyle({backgroundColor:'rgba(220,220,220, 0.5)'});
            setNewData(relationTree[0]['process']['element_object'][value])
        }
    };    
    

    return (
        <>
            <div id="divSymptomsQuestionsButtons">
                <GeneralButton
                    children={'Symptoms'}
                    className={'generalButtonClass'}
                    style={symptomsStyle}
                    onClick={(e) => onClick(e, 'symptoms')}
                />

                <GeneralButton
                    children={'Questions'}
                    className={'generalButtonClass'}
                    style={questionsStyle}
                    onClick={(e) => onClick(e, 'questions')}
                />
            </div>

            <div id="divSymptomsQuestionsTextarea">
                <textarea id="txtSymptoms" 
                    disabled
                    value={newData}
                />
            </div>
        </>        
    )
} // --- End symptoms and questions -- Child component



// Parent component --- In progress eva component
export const InProgressEva = () => {   
    // To enable or disabled the finalize button wether the evaluation is ready or not.
    const [evaToGo, setEvaToGo] = useState(1);


    // Style of the div in the finalize modal component
    const [showFinalizeModal, setShowFinalizeModal] = useState({visibility:'hidden', opacity:'0'});    


    // States related with relation tree
    const [relationTree, setRelationTree] = useState([]);
    const [relationTreePosition, setRelationTreePosition] = useState(0);


    // To hold the table evaluation score related to the evaluation in progress
    const [evaScores, setEvaScores] = useState([]);

    
    // To get the evaluation that comes from the previous page
    const {state} = useLocation();


    // Function to count the number of processess evaluated, that is when the first score 
    // is greater than zero.
    function fcnCountProcessesEvaluated(data) {
        let counter = 0;

        Object.entries(data).forEach(function(item) {            
            if(parseInt(item[1].element_type) === 3 && parseInt(item[1].first_score) === 0) {
                counter += 1;
            }            
        });

        return counter;
    };


    // Getting the relation tree data
    useEffect(() => {
        // Relation tree data
        axiosService
            //.get(`relations/${state.eva.relation}/get_object_tree`)
            .get(`/relations_tree/get_queryset_filtered`, {params:{'id':state.eva.relation}})
            .then(res => {
                setEvaToGo(fcnCountProcessesEvaluated(res.data.eva_scores));

                const newData = fcnNewRelationTreeList(res.data.data);
                const newDataCount = fcnCountInsideElements(newData); 
                            
                setRelationTree(() => newDataCount);
                setEvaScores(() => res.data.eva_scores);
            })
            .catch(e => {
                console.log("Error getting the relation tree: ", e);
            })

    }, [state.eva.id, state.eva.relation]);
        

    // Return in progress eva
    return (
        <div>
            <InProgressEvaBar                
                evaToGo={evaToGo}
                evaInfo={state.eva}
                relationTree={relationTree}
                relationTreePosition={relationTreePosition}
                setRelationTreePosition={setRelationTreePosition}
                setShowFinalizeModal={setShowFinalizeModal}
            />

            <FinalizeModal
                showFinalizeModal={showFinalizeModal}
                setShowFinalizeModal={setShowFinalizeModal}
                idEva={state.eva.id}
            />



            {/* Information about in which competence, capability, and process we are step on */}
            <div id="divEvaMainInformationTitle">
                <h2>Evaluation</h2>
            </div>

            <EvaMainInformation
                relationTreePosition={relationTreePosition}
                relationTree={relationTree}                
            />

            <p className="inProgressEvaSeparator"/>


            {/* Definitions */}
            <div id="divDefinitions">
                <label htmlFor="txtDefinitions">Definition</label>
                <textarea 
                    id="txtDefinitions"
                    value={relationTree[relationTreePosition]?.process.element_object.definitions}
                />                 
            </div>


            <p className="inProgressEvaSeparator"/>


            {/* Assessment */}
            <Assessment
                relationTree={relationTree}
                relationTreePosition={relationTreePosition}
                evaScores={evaScores}
                setEvaScores={setEvaScores}
                fcnCountProcessesEvaluated={fcnCountProcessesEvaluated}
                setEvaToGo={setEvaToGo}
            />

            <p className="inProgressEvaSeparator"/>


            {/* Symptoms and questions */}
            <Symptoms
                relationTree={relationTree}
                relationTreePosition={relationTreePosition}
            />

            <p className="inProgressEvaSeparator"/>
        </div>
    )
};








