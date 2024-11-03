/* Imports */
import React, {useRef, useState, useEffect, useCallback} from "react";
import { SelectLetter, FixedBar, ElementComment, ElementName, 
    Definitions, Assess } from "./CreateElement";
import { getUser } from "../hooks/user.actions";
import { countRows, messageTimeout, resetAfterCreate, checkedInputRadio,
    enabledDisabledRadioButton } from "./various";
import { useLocation } from "react-router-dom";
import axiosService from "../helpers/axios";
import "./css/createElementPage.css"



/* Create element page */
const CreateElementPage = () => {
    /* Ref */
    const divCreate3 = useRef();
    const divCreate4 = useRef();    


    /* Constants */
    const user = getUser();
    const location = useLocation(); // location.state has the public_id element


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
    const [children, setChildren] = useState('Create');
    const [letter, setLetter] = useState(null);
    const [name, setName] = useState('');
    const [comments, setComments] = useState('');
    const [txtDefinitions, setTxtDefinitions] = useState('');
    const [textAssess, setTextAssess] = useState('');    
    

    /* Put data in states and html elements */
    const PutData = (data) => {
        setChildren(() => 'Edit');
        setLetter(() => data.letter);
        setName(() => data.name);
        setComments(() => data.comments);

        checkedInputRadio('type', data.element_type);        

        if (parseInt(data.element_type) === 3) {

            divCreate3.current.style.display = 'block';
            divCreate4.current.style.display = 'block';

            checkedInputRadio('type', data.element_type);
            checkedInputRadio('definitions', 1);
            checkedInputRadio('assess', 1);

            setTxtDefinitions(() => data.definitions);
            setTextAssess(() => data.assess_one);

            setDefSymQue(prevState => {
                return {
                    ...prevState,
                    definitions:data.definitions,
                    symptoms:data.symptoms,
                    questions:data.questions
                }
            });                
            
            setAssess(() => {
                return {                    
                    assessOne:data.assess_one,
                    assessTwo:data.assess_two,
                    assessThree:data.assess_three,
                    assessFour:data.assess_four,
                    assessFive:data.assess_five
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
    }
    

    /* Get object with public id from location.state */    
    const GetObject = useCallback(() => {             
        axiosService
            .get(`/element/${location.state}`)

            .then(res => res.data)
            .then((data) => {
                PutData(data);
            })

            .catch((error) => {
                console.log("Error: " + error);
            })
    }, [location.state]);
    

    /* First loading. If location.state is null, it is create, if not, is edit */
    useEffect(() => {
        if (location.state === null) {
            checkedInputRadio('type', 1);
            setChildren(() => 'Create');
            setLetter(() => '1');            

        } else {          
            GetObject();          
        }
    }, [GetObject, location.state])


    /* Enabled or disabled element radio button depends on if it's create or edit */
    enabledDisabledRadioButton(children);
        

    /* Handle click - If process is clicked, it shows corresponding divs */
    function HandleClick(e) {        
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

        setElementType(e.target.value);
    }
    
    /* Handle focus */        
    const HandleFocus = (e) => {
        let charCount = 0;
        const htmlElement = e.target;        
                        
        if (htmlElement.id === 'elementName') {
            setName(() => htmlElement.value);
            setDisplay({name:true});   
            charCount = name.length

        } else if (htmlElement.id === 'txt-create-comments-element') {
            setComments(() => htmlElement.value);
            setDisplay({comments:true});
            charCount = comments.length

        } else if (htmlElement.id === 'txtDef') {            
            setBlurComponent(htmlElement.getAttribute('data-blur'));
            setDisplay({def:true});            

            charCount = txtDefinitions.length;

        } else {            
            setBlurComponent(htmlElement.getAttribute('data-blur'));
            setDisplay({assess:true});
            charCount = textAssess.length
        }                

        //setCharacters(htmlElement.getAttribute('maxLength') - htmlElement.value.length);
        setCharacters(htmlElement.getAttribute('maxLength') - charCount);
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
        let numberChars = 0;
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
        
        if(htmlElement.id === 'elementName') {
            setName(() => htmlElement.value);
            numberChars = name.length;

        } else if (htmlElement.id === 'txt-create-comments-element') {
            setComments(() => htmlElement.value);
            numberChars = comments.length;

        } else if (htmlElement.id === 'txtDef') {
            setTxtDefinitions(() => htmlElement.value);
            numberChars = txtDefinitions.length;

        } else if (htmlElement.id === 'txtAssess') {
            setTextAssess(() => htmlElement.value);
            numberChars = textAssess.length;
        }        

        //setCharacters(() => htmlElement.getAttribute('maxLength') - htmlElement.value.length);
        setCharacters(() => htmlElement.getAttribute('maxLength') - numberChars);
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
        if (children === 'Edit') {
            elementsValues.push(document.querySelector('input[name="type"]:checked').value);
        } else {
            elementsValues.push(elementType);
        }
                        
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

        /* Axios */
        if (children === 'Create') {            
            axiosService
                .post("/element/", data)
                .then((res) => {                
                    messageTimeout('Element succesfully created');
                    resetAfterCreate();                    
                })
                .catch((error) => {
                    console.log("Error: " + error);
                });

        // if it is edit
        } else {
            axiosService
                .put(`/element/${location.state}/`, data)
                .then(res => res.data)
                .then((data) => {
                    //GetObject();
                    PutData(data);
                })

                .catch((error) => {
                    console.log("Error: " + error);
                })
        }
    }

        
    /* Return */
    return (
        <>
            <FixedBar click={HandleClick} submit={handleSubmit} children={children}/>


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

                <SelectLetter letter={letter}/>

                <ElementName 
                    focus={HandleFocus} 
                    blur={HandleBlur} 
                    input={HandleInput}
                    name={name}
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
                    comments={comments}
                />
            </div>
            

            {/* Definitions, symptoms, and questions */}            
            <Definitions
                txtDefinitions={txtDefinitions}
                setTxtDefinitions={setTxtDefinitions}
                blur={HandleBlur}
                input={HandleInput}
                focus={HandleFocus}
                defSymQue={defSymQue}
                setDefSymQue={setDefSymQue}
                lblDefinitions={HandleFocus}                    
            />
            

            {/* Assess */}            
            <Assess                     
                textAssess={textAssess}
                setTextAssess={setTextAssess}
                assess={assess}
                setAssess={setAssess}
                assessInput={assessInput}
                setAssessInput={setAssessInput}
                blur={HandleBlur}
                input={HandleInput}
                focus={HandleFocus}                    
            />
            

            <p className="createElementPageSeparator"/>
        </>        
    )    
}



/* Exports */
export default CreateElementPage;

