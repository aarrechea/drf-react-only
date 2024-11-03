/* Imports */
import { useCallback, useEffect, useState } from "react";
import Navigationbar from "../navbar/Navbar";
import { EvaluationList } from "./EvaluationsList";
import axiosService from "../helpers/axios";
import "./css/evaluationsPage.css";
import { loopOverInput } from "./various";
import { getUser } from "../hooks/user.actions";
import DeleteEvaluation from "./EvaluationsDelete";
import ViewEvaluation from "./EvaluationsView";
import { useLocation, useNavigate } from "react-router-dom";
import GeneralButton from "../components/GeneralButton";



/* Title to show the number of evaluations created, and to show if the evaluation was
    finalize 
*/
const Title = ({evaluationsList, checkDeleted, setCheckDeleted, getEvaluations}) => {    
    /* To set the title in the h3 element before and after the evaluation was deleted */
    const [h3Title, setH3Title] = useState('List of evaluations');
    const [h3Style, setH3Style] = useState({'color':'black'});
    const [evaCount, setEvaCount] = useState("(" + Object.keys(evaluationsList).length + ")");        

    // If the evaluation was deleted
    if (checkDeleted) {
        window.scroll(0, 0);
        setCheckDeleted(false);

        getEvaluations();        

        setH3Style({'color':'green'});
        setH3Title('The evaluation was succesfully deleted');

        setTimeout(function() {            
            setH3Style({'color':'black'});
            setH3Title('List of evaluations');
        }, 3000);
    }
    
        
    const {state} = useLocation();

    useEffect(() => {
        // When the evaluation is finalized.
        if (state !== undefined && state !== null) {
            if(state.status === 'finalized') {
                setH3Style({'color':'green'});
                setH3Title("Evaluation successfully finalized");
                setEvaCount('');

                state.status = '';
                                
                setTimeout(() => {
                    setH3Style({'color':'black'});
                    setH3Title("List of evaluations");                    
                }, 3000);
            }            
        } 

        setTimeout(() => {
            setEvaCount("(" + Object.keys(evaluationsList).length + ")");    
        }, 3050);                          
    }, [state, evaluationsList])


                
    // Return
    return (
        <div id="divEvaluationListTitle">
            <h3 style={h3Style}>{h3Title} <span> &nbsp; {evaCount}</span></h3>
        </div>
    )
}



/* Evaluation page */
const EvaluationPage = () => {
    /* To navigate home if the response is invalid */
    const navigate = useNavigate();


    /* To show or hide the modals */
    const [showDeleteEva, setShowDeleteEva] = useState('none');
    const [showEvaView, setShowEvaView] = useState({opacity:'0'});

    /* to check if the evaluation was deleted or not */
    const [checkDeleted, setCheckDeleted] = useState(false);
    
    /* State to hold the evaluation object to delete or show */
    const [evaToDelete, setEvaToDelete] = useState({});
    const [evaToShow, setEvaToShow] = useState({});

        
    /* States to save companies and relations lists */
    const [companiesList, setCompaniesList] = useState([]);
    const [relationsList, setRelationsList] = useState([]);
    const [evaluationsList, setEvaluationsList] = useState([]);    


    /* Set the h3 text */
    const [h3Text, setH3Text] = useState('Select the company and the relation to create the evaluation')


    const generalButtonStyle = {border:'2px solid var(--contrast_100)'};


    /* Axios component to get the evaluations, relations, and the companies */
    const getEvaluations = useCallback(() => {
        axiosService
            .get('/evaluations/')
            .then(res => res.data)
            .then((data) => {
                setEvaluationsList(data);
            })
            .catch(error => {
                console.log("Error: ", error);
                navigate('/');
            });

    }, [navigate]);

    const getRelation = useCallback(() => {
        axiosService
            .get('/relations/')
            .then(res => res.data)
            .then((data) => {
                const newArray = data.filter(item => item.status === true);
                setRelationsList(newArray);
            })
            .catch(error => {
                console.log("Error: ", error);
                navigate('/');
            });

    }, [navigate]);

    const getCompany = useCallback(() => {
        axiosService
            .get('/company/')
            .then(res => res.data)
            .then((data) => {                                
                setCompaniesList(data);
            })
            .catch(error => {
                console.log("Error: ", error);
                navigate('/');
            });
    }, [navigate]);
    

    /* To fetch companies and relations with axios */
    useEffect(() => {
        getEvaluations();
        getRelation();        
        getCompany();        
    }, [getEvaluations, getCompany, getRelation]);


    /* Card design to hold companies and relations */
    const CompanyCard = ({name, id, index}) => {
        function onClickElement(i) {
            document.querySelectorAll('.inputCompany').forEach(function(input, x) {
                if (parseInt(x) === parseInt(i)) {
                    input.checked = true;                    
                }
            });
        }

        return (
            <div 
                onClick={() => onClickElement(index)} 
                id="divCompanyCardEva"
                style={{marginBottom:'0.5rem'}}
            >
                <label >{name}</label>
                <input 
                    className="inputCompany" 
                    readOnly 
                    name="inputCompany"                     
                    type="radio"
                    data-id={id}
                />
            </div>
        )
    };

    const RelationCard = ({name, id, index}) => {
        function onClickElement(i) {
            document.querySelectorAll('.inputRelation').forEach(function(input, x) {
                if (parseInt(x) === parseInt(i)) {
                    input.checked = true;                    
                }
            });
        }

        return (
            <div 
                onClick={() => onClickElement(index)} 
                id="divCompanyCardEva"
                style={{marginBottom:'0.5rem'}}
            >
                <label>{name}</label>
                <input 
                    readOnly 
                    className="inputRelation"
                    name="inputRelation"                     
                    type="radio"
                    data-id={id}
                />
            </div>
        )
    };


    /* Map function over companies and relations */
    const CompaniesList = () => {
        return (
            companiesList?.map((element, index) => (
                <CompanyCard key={index}
                    name={element.name}
                    id={element.id}
                    index={index}
                />
            ))
        )
    };

    const RelationList = () => {
        return (
            relationsList?.map((element, index) => (
                <RelationCard key={index}
                    name={element.name}
                    id={element.id}
                    index={index}
                />
            ))
        )
    };


    /* Button click to create the evaluation */
    function handleButtonClick() {
        const idCompany = loopOverInput('inputCompany')
        const idRelation = loopOverInput('inputRelation')
        const user = getUser();
        
        if (Object.keys(idCompany).length === 0 || Object.keys(idRelation).length === 0) {
            setH3Text("You should choose both, a company and a relation to create the evaluation")

            setTimeout(() => {
                setH3Text("Select the company and the relation to create the evaluation")
            }, 3000);

            return 0
        }
                
        const evaData = {
            'company':idCompany['id'],
            'relation':idRelation['id'],
            'end_user':'',
            'creator_user':user.id
        };

        axiosService
            .post('/evaluations/', evaData)
            .then((res) => {
                getEvaluations();
                getRelation();
                getCompany();
                document.documentElement.scrollTop = 0;
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    }


            
    /* Return evaluation page component */
    return (
        <>
            {/* Modal form that appear before to delete the evaluation */}
            <DeleteEvaluation
                showDeleteEva={showDeleteEva}
                setShowDeleteEva={setShowDeleteEva}
                evaToDelete={evaToDelete}
                setCheckDeleted={setCheckDeleted}
            />


            {/* Modal form to view the additional evaluation data */}
            <ViewEvaluation
                showEvaView={showEvaView}
                setShowEvaView={setShowEvaView}
                evaToShow={evaToShow}
            />

            <Navigationbar/>

            <Title                
                evaluationsList={evaluationsList}                
                checkDeleted={checkDeleted}
                setCheckDeleted={setCheckDeleted}
                getEvaluations={getEvaluations}                
            />            
            

            {/* List of evaluations already created and ready to be evalauted, it means
                with the status=Close */}
            <div id="divEvaluationList">
                <EvaluationList
                    data={evaluationsList}
                    setShowDeleteEva={setShowDeleteEva}
                    setEvaToDelete={setEvaToDelete}
                    setShowEvaView={setShowEvaView}
                    setEvaToShow={setEvaToShow}
                />
            </div>


            {/* Use it to separation */}
            <p className="evaPageParagraph"/>


            {/* List of Companies and relations ready to be chosen to create the
             new evaluation */}
            <div id="divSelectForEvaluate">
                <h3>{h3Text}</h3>

                <GeneralButton
                    onClick={handleButtonClick}
                    children={<p>Create<br/>evaluation</p>}
                    className={'generalButtonClass'}
                    style={generalButtonStyle}
                />

                {/* <button
                    onClick={handleButtonClick}
                >
                    Create<br/>evaluation
                </button> */}
                
                <div id="divSelectForEvaluateLabels">
                    <label htmlFor="">Companies</label>
                    <label htmlFor="">Relations</label>
                </div>

                <div id="divSelectForEvaluateSelection">
                    <div>
                        <CompaniesList/>
                    </div>
                    
                    <div>
                        <RelationList/>
                    </div>                    
                </div>
            </div>            
        </>        
    )
}



/* Exports */
export default EvaluationPage;