/* Imports */
import { useLocation, useNavigate } from "react-router-dom";
import InProgressFirstBar from "./InProgressFirstBar";
import "./css/inProgressFirst.css";
import React, { useEffect, useState } from "react";
import axiosService from "../helpers/axios";
import CeoInformation from "./CeoInformation";



/* In progress page component */
const InProgressFirst = () => {
    const navigate = useNavigate();

    
    /* State to hold the data in the data model and products related to the evaluation */
    const [dataModel, setDataModel] = useState({});

    /* State to change the disabled attribute to the save button in the inProgressFirstBar */
    const [saveDisabled, setSaveDisabled] = useState(true);

    /* To show or hide the security question to save changes when the user tries to navigate
    to another page. and to hold the action to be carry on */
    const [displaySecurityQuestion, setDisplaySecurityQuestion] = useState();
    const [action, setAction] = useState();


    /* To get the relation to evaluate */
    const location = useLocation();    

            
    /* Getting the data model of the evaluation */
    useEffect(() => {
        axiosService
            .get(`/data-model/${location.state.relation.id}`)
            .then(res => res.data)
            .then((data) => {                            
                setDataModel(data);
            })
    }, [location.state.relation.id]);


    /* Modal that opens when the save button is enabled, therefore changes were made are unsaved */
    const SecurityQuestionModal = () => {
        const navigate = useNavigate();  
        

        /* To save the data modified in the first page of the evaluation, and navigate to the page
        selected for the user */
        function handleSaveContinue() {
            fcnSaveEvaluation();
            
            if (action === 'previous page') {
                navigate(-1);
            } else {
                navigate("/first-process");
            }
        }



        return (
            <div style={displaySecurityQuestion} id="divSecurityQuestionModal">
                <div id="divSecurityQuestionModalMain">
                    <div>
                        <h3>You have unsaved changes.</h3>
                    </div>

                    <div id="divSecurityQuestionModalMainButtons">
                        <button
                            onClick={() => navigate(-1)}
                        >
                            Continue to<br/>{action}
                        </button>

                        <button
                            onClick={handleSaveContinue}
                        >
                            Save and continue to<br/>{action}
                        </button>

                        <button                         
                            onClick={() => setDisplaySecurityQuestion({visibility:'hidden', opacity:'0'})}
                        >
                            Cancel
                        </button>
                    </div>                    
                </div>                
            </div>
        )
    }
        
    
    /* Component to check inputs about exports and foreign investments */
    const InputRadio = ({title, name, labelClass, dataname}) => {                
        /* In each click on the label or on the input, will write the option selected 
        (second could be true or false) in dataModel on its respective field (dataname) */
        function handleClick(second) {
            setDataModel(prev => {return {...prev, [dataname]:second}});
            setSaveDisabled(false);
        }



        
        /* Return */
        return (
            <div id="divExportsDivRadio">
                <label>{title}</label>

                <div id="divExportsDivRadioRadio">
                    <label onClick={() => handleClick(true)}>
                        Yes &nbsp; &nbsp;
                        <input 
                            className={labelClass} 
                            type="radio" 
                            name={name} 
                            value='true' 
                            checked={dataModel[dataname] ? true : false}
                            dataname={dataname}
                            readOnly
                        />
                    </label>
                    
                    <label onClick={() => handleClick(false)}>
                        No  &nbsp; &nbsp;
                        <input 
                            className={labelClass} 
                            type="radio" 
                            name={name} 
                            value='no'
                            checked={!dataModel[dataname] ? true : false}
                            dataname={dataname}
                            readOnly
                        />
                    </label>
                </div>
            </div>
        )        
    }


    /* To save the modified data of the evaluation */
    function fcnSaveEvaluation() {
        // Variables and constants
        let dict = {};
        let x = 0;
        const titles = ['ceo_title', 'given_name', 'family_name', 'gender', 'telephone', 'email', 
            'business_position', 'comments']        
        

        // Loop over inputs and selects to bring the values and fill the dict with the help of the
        //  list "titles". "None" is the default word for an empty item
        document.querySelectorAll(".toSend").forEach(function(item) {
            if (item.value.length === 0) {
                dict[titles[x]] = 'None';
            } else {
                dict[titles[x]] = item.value;
            }
            
            x += 1;
        });

        // Adding the rest of the information to the dict to be send to the API
        dict['years_exporting'] = dataModel.years_exporting;
        dict['export_variation'] = dataModel.export_variation;
        dict['foreign_investment'] = dataModel.foreign_investment;
        dict['plans_to_export'] = dataModel.plans_to_export;
        dict['average_years'] = dataModel.average_years;
        dict['top_or_middle'] = dataModel.top_or_middle;
        dict['women_employed'] = dataModel.women_employed;
        dict['women_top_or_middle'] = dataModel.women_top_or_middle;    
        dict['years_in_the_post'] = dataModel.years_in_the_post;
        dict['evaluation'] = dataModel.evaluation;        

        axiosService
            .put(`/data-model/${dataModel.id}/`, dict)
            .then(res => {
                setSaveDisabled(true);
            })
            .catch(() => {
                navigate("/");
            })
    }


        
    // Return InProgressFirst component
    return (
        <>
            <SecurityQuestionModal/>

            <InProgressFirstBar
                relation={location.state.relation}
                saveDisabled={saveDisabled}
                setDisplaySecurityQuestion={setDisplaySecurityQuestion}
                save={fcnSaveEvaluation}
                setAction={setAction}
            />

            <h3 id="evaDataH3">Evaluation variable data</h3>

            <p className="ruleInProgressFirst"/>

            {/* Exports and investments */}
            <div id="divEvaDataExportsTitle">
                <h4>Exports and investments</h4>
            </div>

            <div id="divEvaDataExports">
                <GeneralDiv 
                    name={'Years exporting'}
                    state={dataModel.years_exporting}                    
                    field={'years_exporting'}
                    array={[0, 100]}
                    setDataModel={setDataModel}
                    setSaveDisabled={setSaveDisabled}
                />

                <GeneralDiv 
                    name={'Export variation in %'}
                    state={dataModel.export_variation}
                    field={'export_variation'}
                    array={[0, 100]}
                    setDataModel={setDataModel}
                    setSaveDisabled={setSaveDisabled}
                />   

                <div id="divEvaDataExportsRadios">
                    <InputRadio
                        title='Foreign investment'
                        name='foreignInvestment'
                        labelClass='foreignInvestment'
                        dataname='foreign_investment' /* to get the dataModel field */
                    />

                    <InputRadio
                        title='Plans to export'
                        name='plansToExport'
                        labelClass='foreignInvestment'
                        dataname='plans_to_export' /* to get the dataModel field */
                    />
                </div>         
            </div>         

            <p className="ruleInProgressFirst"/>   


            {/* Employee information */}
            <div id="divEvaDataEmployeeInformationTitle">
                <h4>Employee information</h4>
            </div>

            <div id="divEvaDataEmployeeInformationMain">
                <GeneralDiv 
                    name={'Average years in the post'}
                    state={dataModel.average_years}
                    field={'average_years'}
                    array={[0, 70]}
                    setDataModel={setDataModel}
                    setSaveDisabled={setSaveDisabled}
                />

                <GeneralDiv 
                    name={'Employees in top or middle'}
                    state={dataModel.top_or_middle}
                    field={'top_or_middle'}
                    array={[0, 500]}
                    setDataModel={setDataModel}
                    setSaveDisabled={setSaveDisabled}
                />   

                <GeneralDiv 
                    name={'Women employed'}
                    state={dataModel.women_employed}
                    field={'women_employed'}
                    array={[0, 1000]}
                    setDataModel={setDataModel}
                    setSaveDisabled={setSaveDisabled}
                />

                <GeneralDiv 
                    name={'Women in top or middle'}
                    state={dataModel.women_top_or_middle}
                    field={'women_top_or_middle'}
                    array={[0, 500]}
                    setDataModel={setDataModel}
                    setSaveDisabled={setSaveDisabled}
                />   
            </div>

            <p className="ruleInProgressFirst"/>   

            {/* Ceo information */}
            <div id="divEvaDataEmployeeInformationTitle">
                <h4>CEO information</h4>
            </div>

            <CeoInformation
                setSaveDisabled={setSaveDisabled}
                dataModel={dataModel}
                setDataModel={setDataModel}
            />

            <p className="ruleInProgressFirst"/>   

            <div id="divEvaCommentsTitle">
                <h4>Comments</h4>
            </div>

            <div id="divEvaComments">
                <label htmlFor="ceoComments">Evaluation comments</label>
                <textarea  
                    onChange={() => setSaveDisabled(false)} 
                    placeholder="Comments" 
                    maxLength={200} 
                    id="ceoComments"
                    className="toSend"
                    defaultValue={dataModel.comments}
                />
            </div>

            <p className="ruleInProgressFirst"/>
        </>        
    )
}


/* Component to hold the common structure of the years exporting and percentage exports */
const GeneralDiv = ({name, state, field, array, setSaveDisabled, setDataModel}) => {
    /* Functions to add or substract to for the chosen fields */        
    function fcnSetDataModel(value, array) {
        setDataModel( prev => {
            let newValue = prev[field];
            const [minLimit, maxLimit] = array;

            if (value > 0) {
                if (prev[field] + value <= maxLimit) {
                    newValue = prev[field] + value;
                    setSaveDisabled(false);
                }

            } else {
                if (prev[field] + value >= minLimit) {
                    newValue = prev[field] + value;
                    setSaveDisabled(false);
                }
            }
                                    
            return {...prev, [field]: newValue}
        })
    }
    
    /* Functions To substract and add five and one units */
    function handleAddOrSubstract(value) {
        fcnSetDataModel(value, array);
    }
    
    /* Return */
    return (
        <div id="divEvaDataExportsGeneral">
            <label>{name}</label>
            <input type="text" disabled value={state} />

            <div id="divEvaExportsGeneralButtons">
                <button onClick={() => handleAddOrSubstract(-5)}>&#8656;</button>

                <button onClick={() => handleAddOrSubstract(-1)}>&#8592;</button>                    
                
                <button onClick={() => handleAddOrSubstract(1)}>&#8594;</button>                    
                
                <button onClick={() => handleAddOrSubstract(5)}>&#8658;</button>
            </div>                    
        </div>
    )
} // End general div



/* Export */
export default InProgressFirst;

export {
    GeneralDiv,
}

