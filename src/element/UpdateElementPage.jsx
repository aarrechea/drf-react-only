/* Imports */
import React, {useEffect, useRef, useState} from "react";
import { SelectLetter, FixedBar, ElementComment, ElementName, 
    Definitions, Assess } from "./CreateElement";
import { getUser } from "../hooks/user.actions";
import { countRows, messageTimeout, resetAfterCreate } from "./various";
import axiosService from "../helpers/axios";
import "./css/createElementPage.css"
import { useLocation, useNavigate } from "react-router-dom";
import { checkedInputRadio } from "./various";



/* Create element page */
const UpdateElementPage = () => {
    /* Ref */
    const divCreate3 = useRef();
    const divCreate4 = useRef();
    const lblDef = useRef();
    const lblAssess = useRef();        
    const txtAssess = useRef();

        
    /* Constants */
    const user = getUser();
    const location = useLocation(); // to get data that comes with navigate from ElementCard.jsx 
    const navigate = useNavigate();   

    //console.log("location: " + JSON.stringify(location.state));

    /* Variables */
    let elementsValues = [];


    /* States */    
    const [elementType, setElementType] = useState(1);    
    const [characters, setCharacters] = useState();
    const [display, setDisplay] = useState({
        name: false,
        comments: false,
        def: false,
        assess:false
    });
    const [defSymQue, setDefSymQue] = useState({
        definitions: '',
        symptoms: '',
        questions: '',
        radioChecked: 'definitions'
    });
    const [assess, setAssess] = useState({
        assessOne: '',
        assessTwo: '',
        assessThree: '',
        assessFour: '',
        assessFive: ''
    })
    const [assessInput, setAssessInput] = useState('assessOne');
    const [blurComponent, setBlurComponent] = useState('');
    const [initialValue, setInitialValue] = useState({
        definitionsInitial:'',
        assessInitial:''
    })    


    /* Load information */
    useEffect(() => {
        checkedInputRadio('type', location.state.element_type);
        checkedInputRadio('definitions', 1);
        checkedInputRadio('assess', 1);
    

        // Show definitions and assess if it is "Process"
        if (parseInt(location.state.element_type) === 3) {
            divCreate3.current.style.display = 'block';
            divCreate4.current.style.display = 'block';
            
            setDefSymQue(prevState => {
                return {
                    ...prevState,
                    definitions:location.state.definitions,
                    symptoms:location.state.symptoms,
                    questions:location.state.questions
                }
            });                
            
            setAssess(() => {
                return {                    
                    assessOne:location.state.assess_one,
                    assessTwo:location.state.assess_two,
                    assessThree:location.state.assess_three,
                    assessFour:location.state.assess_four,
                    assessFive:location.state.assess_five
                }
            })                        
            
            setInitialValue(() => {
                return {
                    definitionsInitial:location.state.definitions,
                    assessInitial:location.state.assess_one
                }
            });            

        } else {
            divCreate3.current.style.display = 'none';
            divCreate4.current.style.display = 'none';

            setDisplay(() => {
                return {
                    def:false,
                    assess:false,
                }
            });            
        }
    }, [location.state.assess_five, location.state.assess_four, location.state.assess_one, 
        location.state.assess_three, location.state.assess_two, location.state.definitions, 
        location.state.element_type, location.state.questions, location.state.symptoms]);


    /* Handle click - If process is clicked, it shows corresponding divs */
    function HandleClick(e, radioValue) {        
        // If element is process, I have to show definitions and assess, and reset the
        // correspondant states values
        if (e.target.title === 'Process') {
            divCreate3.current.style.display = 'block';
            divCreate4.current.style.display = 'block';

        } else {
            divCreate3.current.style.display = 'none';
            divCreate4.current.style.display = 'none';

            setDisplay({def:false});
            setDisplay({assess:false});
        }                

        setDefSymQue({
            definitions: '',
            symptoms: '',
            questions: '',
            radioChecked: 'definitions'
        });

        setAssess({
            assessOne: '',
            assessTwo: '',
            assessThree: '',
            assessFour: '',
            assessFive: ''
        })
        setAssessInput('assessOne');

        document.getElementById('txtDef').value = '';
        document.getElementById('txtAssess').value = '';

        setElementType(radioValue);
    }

    
    /* Handle focus */        
    const HandleFocus = (e) => {        
        const htmlElement = e.target;        
                        
        if (htmlElement.id === 'elementName') {
            setDisplay({name:true});            
        } else if (htmlElement.id === 'txt-create-comments-element') {
            setDisplay({comments:true});            
        } else if (htmlElement.id === 'txtDef') {
            setBlurComponent(htmlElement.getAttribute('data-blur'));
            setDisplay({def:true});
        } else {
            setBlurComponent(htmlElement.getAttribute('data-blur'));
            setDisplay({assess:true});
        }

        setCharacters(htmlElement.getAttribute('maxLength') - htmlElement.value.length);
    }


    /* Handle blur */
    const HandleBlur = (e) => {
        const htmlElement = e.target;        

        if (htmlElement.id === 'elementName') {
            setDisplay({name:false});
        } else if (htmlElement.id === 'txt-create-comments-element') {
            setDisplay({comments:false});
        } else if (htmlElement.getAttribute('data-blur') !== 'def' && blurComponent === 'def') {
            setBlurComponent('');
            setDisplay({def:false});
        } else if (htmlElement.id !== 'txtAssess' && blurComponent === 'assess') {
            setBlurComponent('');
            setDisplay({assess:false});            
        }
    }


    /* Handle input */
    const HandleInput = (e) => {
        const htmlElement = e.target;
        
        if (htmlElement.id !== "elementName") {
            const charPerRowsVector = [70, 80, 70];
            const rowsVector = [5, 30, 20];

            let rows = rowsVector[0];
            let characters = charPerRowsVector[0];
            let lines = 0;
            
            if(htmlElement.id === 'txtDef') {
                characters = charPerRowsVector[1];
                rows = rowsVector[1];
            } else if (htmlElement.id === 'txtAssess') {
                characters = charPerRowsVector[2];
                rows = rowsVector[2];
            }

            lines = countRows(htmlElement, characters);

            if (lines > rows) {
                htmlElement.value = htmlElement.value.substring(0, htmlElement.value.length - 1);
            }                        
        } 
            
        setCharacters(htmlElement.getAttribute('maxLength') - htmlElement.value.length);
        
    }

            
    /* Handle submit */
    const handleSubmit = (event) => {
        event.preventDefault();
        const createElementForm = event.currentTarget;                


        if(createElementForm.checkValidity() === false) {
            event.stopPropagation();
        }        


        /* Filling the list with the values to be sent in axios post */
        elementsValues = [];
        elementsValues.push(elementType);
        document.querySelectorAll('.elementToSend').forEach(function(element) {
            if(element.value === '') {
                element.value = 'None';
            }

            elementsValues.push(element.value);
        });
        

        /* Loop over dictionaries to fill the blanks with "None" */
        Object.entries(defSymQue).forEach(([key, value]) => {
            if(value === '') {                
                defSymQue[key] = "None";
            }
        });

        Object.entries(assess).forEach(([key, value]) => {
            if(value === '') {                
                assess[key] = "None";
            }
        });


        /* Save values in a json format to be sent with axios */
        const data = {
            user_creator: user.id,
            element_type: elementsValues[0].toString(),
            letter: elementsValues[1],
            name: elementsValues[2],
            comments: elementsValues[3],
            definitions: defSymQue['definitions'],
            symptoms: defSymQue['symptoms'],
            questions: defSymQue['questions'],
            assessOne: assess['assessOne'],
            assessTwo: assess['assessTwo'],
            assessThree: assess['assessThree'],
            assessFour: assess['assessFour'],
            assessFive: assess['assessFive'],
        };        
        //console.log("data: " + JSON.stringify(data));


        /* Axios */
        axiosService
            .post("/element/", data)
            .then((res) => {                
                messageTimeout('Element succesfully created');
                resetAfterCreate();

                //console.log("response: " + JSON.stringify(res));                
            })

            .catch((error) => {
                console.log("Error: " + error);
                navigate("/");
            });
    }


        
    /* Return */
    return (
        <>
            <FixedBar click={HandleClick} submit={handleSubmit} children='Edit' disabled={true}/>

            <div id="div-create-message">
                <label id="lbl-create-message">Element created</label>
            </div>
            
            

            {/* Letter and element name */}
            <div id="div-create-1">
                <label htmlFor="select-letter-create-element">Letter</label>
                <label htmlFor="elementName">Name
                    <label                         
                        id="lblName" 
                        style={{display: display.name ? 'inline' : 'none'}}
                    >
                        {characters}
                    </label>
                </label>

                <SelectLetter/>

                <ElementName 
                    focus={HandleFocus} 
                    blur={HandleBlur} 
                    input={HandleInput}
                />
            </div>


            {/* Element comments */}
            <div id="div-create-2">
                <label htmlFor="txt-create-comments-element">Comments
                    <span                         
                        id="spnCharComments" 
                        style={{display: display.comments ? 'inline' : 'none'}}
                    >
                        {characters}
                    </span>
                </label>

                <ElementComment
                    focus={HandleFocus}
                    blur={HandleBlur}
                    input={HandleInput}
                />
            </div>
            

            {/* Definitions, symptoms, and questions */}
            <div id="div-create-3" ref={divCreate3}>
                <div>
                    <label 
                        ref={lblDef}
                        style={{display: display.def ? 'inline' : 'none', textAlign:'center'}}
                        id="lbl-characters"
                    >
                        {characters}
                    </label>
                </div>

                <Definitions
                    initialValue={initialValue}
                    blur={HandleBlur}
                    input={HandleInput}
                    focus={HandleFocus}
                    defSymQue={defSymQue}
                    setDefSymQue={setDefSymQue}
                    lblDefinitions={HandleFocus}                    
                />
            </div>


            {/* Assess */}
            <div id="div-create-4" ref={divCreate4}>
                <div>
                    <label 
                        ref={lblAssess}
                        style={{display: display.assess ? 'inline' : 'none', textAlign:'center'}}
                        id="lbl-characters-assess"
                    >
                        {characters}
                    </label>
                </div>

                <Assess
                    initialValue={initialValue}
                    ref={txtAssess}
                    assess={assess}
                    setAssess={setAssess}
                    assessInput={assessInput}
                    setAssessInput={setAssessInput}
                    blur={HandleBlur}
                    input={HandleInput}
                    focus={HandleFocus}                    
                />
            </div>
        </>        
    )    
}



/* Exports */
export default UpdateElementPage;






