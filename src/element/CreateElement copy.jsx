/* Imports */
import React, {useRef} from "react";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import "./css/createElement.css";
import GeneralButton from "../components/GeneralButton";



// To clean the elements related to the information about an element
function fcnCleanFields() {
    document.querySelectorAll('.elementToSend').forEach(function(item) {
        if (item.type === "select-one") {
            item.value = 1;

        } else {
            item.value = "";
        }        
    });    
};


/* Fixed bar */
const FixedBar = ({click, submit, children}) => {
    /* Constants */
    const navigate = useNavigate();


    /* Handle click */
    function HandleClick(e) {
        let value;

        if (e.target.type === 'radio') {
            value = e.target.value;

        } else {
            value = e.target.getAttribute('data-value')
        }                

        if (parseInt(value) === 3) {                          
            document.getElementById("div-definitions").style.display = "grid";
            document.getElementById("div-assess").style.display = "grid";

        } else {
            document.getElementById("div-definitions").style.display = "none";
            document.getElementById("div-assess").style.display = "none";
        }

        fcnCleanFields();
    }
    

    /* Return */
    return (
        <div id="fixed-bar">
            <div id="div-inner-bar">
                <GeneralButton
                    id='btn-create'
                    className={'generalButtonClass'}
                    onClick={submit}
                    children={children}
                />
                {/* <button id="btn-create" className="btn-fixed-bar" onClick={submit}>{children}</button> */}

                <div>                        
                    <div id="div-radio">

                        <label 
                            htmlFor="competence"
                            data-value='1'
                            onClick={HandleClick}
                            className="label-fixed-bar"
                        >
                            Competence <br/>
                            <input value="1" type="radio" name="type" id="competence"/>
                        </label>

                        <label 
                            htmlFor="capability"
                            data-value='2'
                            onClick={HandleClick}
                            className="label-fixed-bar"
                        >
                            Capability <br/>
                            <input value="2" type="radio" name="type" id="capability" />
                        </label>

                        <label 
                            htmlFor="process"
                            data-value='3'
                            onClick={HandleClick}
                            className="label-fixed-bar"
                        >
                            Process <br/>
                            <input value="3" type="radio" name="type" id="process" />
                        </label>                        
                    </div>                        
                </div>

                <GeneralButton                    
                    className={'generalButtonClass'}                    
                    children={<p>Clean<br/>fields</p>}
                    onClick={fcnCleanFields}
                />

                <GeneralButton                    
                    className={'generalButtonClass'}                    
                    children={<p>Reset<br/>fields</p>}
                />

                <GeneralButton                    
                    className={'generalButtonClass'}
                    onClick={() => navigate(-1)}
                    children={<p>Previous<br/>page</p>}
                />

                {/* <button className="btn-fixed-bar">Clean<br/>fields</button> */}
                {/* <button className="btn-fixed-bar">Reset<br/>fields</button> */}
                {/* <button className="btn-fixed-bar" onClick={() => navigate(-1)}>Previous<br/>page</button> */}
            </div>
        </div>
    )
}


/* Element name */
const ElementName = ({focus, blur, input, name}) => {
    /* Return */
    return (
        <input             
            type="text" 
            name="elementName" 
            id="elementName"
            className="elementToSend txtToClean" // to create an element
            maxLength={39}
            onFocus={focus}
            onBlur={blur}            
            onInput={input}
            data-name='name'
            value={name}
        />
    )
}


/* Element comment */
const ElementComment = ({focus, blur, input, comments}) => {
    return (
        <textarea 
            className="elementToSend txtToClean" 
            id="txt-create-comments-element"
            maxLength={255}
            onFocus={focus}
            onBlur={blur}            
            onInput={input}
            data-name='comments'
            value={comments}
        ></textarea>
    )
}


/* Select letter */
const SelectLetter = ({letter}) => {
    /* Fetching letter and element type choices */
    const {data, error, isLoading} = useSWR("/element/get_choices/", fetcher);
            

    /* Early returns */
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    

    /* Return */
    return (                       
        <select 
            className="elementToSend" 
            id="select-letter-create-element"
            /* value={letter} */
        >
            {Object.entries(data.letters).map(([key, value], index) => (
                <option 
                    key={index} 
                    value={key}
                >
                    {value}
                </option>
            ))}
        </select>
    )
}    


/* Definitions, symptoms and questions */
const Definitions = ({defSymQue, focus, blur, input, lblDefinitions, txtDefinitions, setTxtDefinitions}) => {
    /* Use ref */    
    const radioDef = useRef();    
    const textArea = useRef(null);

    console.log("div definitions inside component: ", document.getElementById("#div-definitions"));
                    
        
    /* Handle focus */    
    const HandleFocus = (e) => {
        const target = e.target.id;
                            
        defSymQue[defSymQue['radioChecked']] = textArea.current.value;
        defSymQue['radioChecked'] = target;
        
        setTxtDefinitions(() => defSymQue[target]);
        textArea.current.focus();
    }        
    
    
    /* Return */
    return (
        <div id="div-definitions">
            <div>
                <label                     
                    //style={{display: display.def ? 'inline' : 'none', textAlign:'center'}}
                    id="lbl-characters"
                >
                    2000
                </label>
            </div>

            <div>
                <label 
                    id="lblDefinitions" 
                    htmlFor="definitions" 
                    data-id='definitions'
                    data-blur='def'
                    onFocus={lblDefinitions}
                >Definitions</label>

                <label 
                    id="lblSymptoms" 
                    htmlFor="symptoms" 
                    data-id='symptoms'
                    data-blur='def'
                    onFocus={lblDefinitions}
                >Symptoms</label>
                
                <label 
                    id="lblQuestions" 
                    htmlFor="questions" 
                    data-id='questions'
                    data-blur='def'
                    onFocus={lblDefinitions}
                >Questions</label>
                
                <input
                    type="radio"
                    name="definitions"
                    id="definitions"
                    data-id='definitions'
                    data-blur='def'
                    className="radio-def processElement"
                    defaultChecked
                    ref={radioDef}
                    value={1}
                    onFocus={HandleFocus}/>

                <input 
                    type="radio" 
                    name="definitions" 
                    id="symptoms" 
                    data-id='symptoms' 
                    data-blur='def'
                    className="radio-def processElement" 
                    onFocus={HandleFocus}/>

                <input 
                    type="radio" 
                    name="definitions" 
                    id="questions" 
                    data-id='questions' 
                    data-blur='def'
                    className="radio-def processElement" 
                    onFocus={HandleFocus}/>
            </div>

            <div>
                <textarea 
                    ref={textArea}
                    className="txtDef txtToClean elementToSend" 
                    id="txtDef"
                    data-id="definitions" 
                    data-blur='def'
                    data-name='definitions'
                    maxLength={2000}
                    onFocus={focus}
                    onBlur={blur}
                    onInput={input}
                    value={txtDefinitions}
                />
            </div>
        </div>
    )    
}


/* Assess */
const Assess = ({assess, setAssess, assessInput, setAssessInput, blur, focus, input, textAssess, setTextAssess}) => {
    /* Refs */
    const radioOne = useRef();    
    const txtAssess = useRef();    

        
    /* Handle focus */
    function HandleFocus(e) {
        const target = e.target.id;        
        
        setAssess({...assess, [assessInput]:txtAssess.current.value});
        setAssessInput(target);

        setTextAssess(() => assess[target])
        txtAssess.current.focus();        
    }


    /* Return */
    return (
        <div id="div-assess">
            <div>
                <label                                         
                    id="lbl-characters-assess"
                >
                    2000
                </label>
            </div>

            <div>
                <label id="lblAssessOne" htmlFor="assessOne">Assess one</label>
                <label id="lblAssessTwo" htmlFor="assessTwo">Assess two</label>
                <label id="lblAssessThree" htmlFor="assessThree">Assess three</label>
                <label id="lblAssessFour" htmlFor="assessFour">Assess four</label>
                <label id="lblAssessFive" htmlFor="assessFive">Assess five</label>

                <input 
                    type="radio" 
                    name="assess" 
                    id="assessOne" 
                    defaultChecked 
                    ref={radioOne} 
                    onFocus={HandleFocus}
                    value={1} 
                />
                <input type="radio" name="assess" id="assessTwo" onFocus={HandleFocus} />
                <input type="radio" name="assess" id="assessThree" onFocus={HandleFocus} />
                <input type="radio" name="assess" id="assessFour" onFocus={HandleFocus} />
                <input type="radio" name="assess" id="assessFive" onFocus={HandleFocus} />
            </div>

            <div>
                <textarea 
                    ref={txtAssess} 
                    id="txtAssess"
                    className="txtAssess txtToClean elementToSend"
                    data-blur='assess'
                    assess={assess}
                    onBlur={blur}
                    onInput={input}
                    onFocus={focus}
                    maxLength={1000}
                    value={textAssess}
                />
            </div>
        </div>
    )    
}



/* Exports */
export {
    SelectLetter,
    FixedBar,
    ElementName,
    ElementComment,
    Definitions,
    Assess
}

