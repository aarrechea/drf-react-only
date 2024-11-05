/* Imports */
import React, {useRef, useState} from "react";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import "./css/createElement.css";
import GeneralButton from "../components/GeneralButton";
import { TextArea } from "../components/TextArea";
import { data } from "autoprefixer";
import { countRows } from "./various";



/* Fixed bar */
const FixedBar = ({submit, children, fcnCleanFields, fcnButtonClick}) => {
    /* Constants */
    const navigate = useNavigate();


    // Style the button
    const style = {height:'3rem', width:'8rem', border:'none'}    
    

    // if edit mode, paint the right button to show the correct element type to be edited
    if(children.mode === "Edit") {
        const target = parseInt(children.type);

        document.querySelectorAll('.elementType').forEach(function(item) {
            if (parseInt(item.value) === target) {
                item.style.background = "radial-gradient(white 70%, var(--green_60))";
                item.disabled = false;
                item.classList.add('generalButtonClass');
    
            } else {
                item.style.background = "white";
                item.disabled = true;
                item.classList.remove('generalButtonClass');
            }
        });
    }
    


    /* Return */
    return (
        <div id="fixed-bar">
            <div id="div-inner-bar">
                <GeneralButton
                    id='btn-create'
                    className={'generalButtonClass'}
                    onClick={submit}
                    children={children.mode}
                />
                
                <div>                        
                    <div id="div-radio">
                        <GeneralButton
                            children={'Competence'}
                            style={style}
                            className={'generalButtonClass elementType'}
                            onClick={(e) => fcnButtonClick(e, 'elementType')}
                            value={1}
                        />

                        <GeneralButton
                            children={'Capability'}
                            style={style}
                            className={'generalButtonClass elementType'}
                            onClick={(e) => fcnButtonClick(e, 'elementType')}
                            value={2}
                        />

                        <GeneralButton
                            children={'Process'}
                            style={style}
                            className={'generalButtonClass elementType'}
                            onClick={(e) => fcnButtonClick(e, 'elementType')}
                            value={3}
                        />                  
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
                    onClick={() => navigate("/element")}
                    children={<p>Previous<br/>page</p>}
                />               
            </div>
        </div>
    )
}


/* Element name */
const ElementName = ({dataToSend, setDataToSend, display, setDisplay}) => {    
    // Input style
    const txtStyle = {width:'85%', height:'6rem', marginTop:'1rem'};

    // Span display and characters    
    const [characters, setCharacters] = useState();
    const originalCharacters = 200;

    // on focus function
    function handleFocus(e) {
        setDisplay(true);
        setCharacters(() => originalCharacters - e.target.value.length);
        setDisplay({            
            name:true,
            comments: false,
            def: false,
            assess:false
        });
    }
    
    // handle input
    function handleInput(e) {
        setDataToSend({...dataToSend, name:e.target.value});
        setCharacters(() => originalCharacters - e.target.value.length);        
    }    


    /* Return */
    return (
        <div id="divElementName">
            <label htmlFor="elementName">Name
                <span                         
                    id="spanName" 
                    style={{visibility: display.name ? 'visible' : 'hidden'}}
                >
                    {characters}
                </span>
            </label>
            

            <TextArea
                className="elementToSend txtToClean"            
                maxLength={255}                
                style={txtStyle}
                onInput={(e) => handleInput(e)}
                onFocus={(e) => handleFocus(e)}                
                placeholder={'Name'}
                value={dataToSend.name}
            />
        </div>                                    
    )
}



/* Element comment */
const ElementComment = ({dataToSend, setDataToSend, display, setDisplay}) => {
    // Textarea style
    const txtStyle = {width:'85%', height:'10rem', marginTop:'1rem'};

    // Span display and characters    
    const [characters, setCharacters] = useState();
    const originalCharacters = 255;


    // Text area ref
    const textareaRef = useRef();

    // Click in the label to focus the textarea
    function textAreaFocus() {
        textareaRef.current.focus();
    }

    // on focus function
    function handleFocus(e) {
        setDisplay(true);
        setCharacters(() => originalCharacters - e.target.value.length);
        setDisplay({            
            name:false,
            comments: true,
            def: false,
            assess:false
        });
    }

    
    // handle input
    function handleChange(e) {
        const htmlElement = e.target;

        setDataToSend({...dataToSend, comments:e.target.value})
        setCharacters(() => originalCharacters - e.target.value.length);

        if (countRows(htmlElement, 90) > 3)  {
            e.target.value = e.target.value.substring(0, e.target.value.length - 1);
            setDataToSend((prev) => {
                const newValue = dataToSend.comments.substring(0, dataToSend.comments.length - 1);
                
                return {
                    comments:newValue
                }
            })
        }        
    }    
    

    // Return
    return (
        <div id="divElementComments">
            <label onClick={textAreaFocus}>
                Comments
                
                <span                         
                    id="spanComments" 
                    style={{visibility: display.comments ? 'visible' : 'hidden'}}
                >
                    {characters}
                </span>
            </label>

            <TextArea
                className="elementToSend txtToClean"            
                maxLength={255}                
                style={txtStyle}
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleFocus(e)}                
                ref={textareaRef}
                placeholder={'Comments'}
                value={dataToSend.comments}
            />
        </div>        
    )
}


/* Select letter */
const SelectLetter = ({dataToSend, setDataToSend}) => {
    /* Fetching letter and element type choices */
    const {data, error, isLoading} = useSWR("/element/get_choices/", fetcher);
            

    /* Early returns */
    //if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>


    // Handle change
    function handleChange(e) {        
        setDataToSend((prev) => {
            return {
                ...prev,
                letter:e.target.value
            }
        })
    }
    


    /* Return */
    return (                       
        <select 
            className="elementToSend"
            id="select-letter-create-element"            
            onChange={handleChange}
            value={dataToSend.letter}
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
const Definitions = ({dataToSend, setDataToSend, fcnPaintButtonElementType, display, setDisplay}) => {
    // To hold the previous assess button clicked, in order to save the textarea 
    // information in the dataToSend correspondant state
    const [defActual, setDefActual] = useState('definitions');

    // Span display and characters    
    const [characters, setCharacters] = useState(0);
    const originalCharacters = 2000;
    const rows = 14;

    // use ref to get the textarea value
    const textareaDef = useRef();

    // Style for the buttons
    const style = {width:'8rem', height:'2.6rem'}
    const txtStyle = {width:'85%', height:'30rem', marginTop:'1rem'};
    
    // on focus function
    function handleFocus(e) {        
        setCharacters(() => originalCharacters - e.target.value.length);
        setDisplay({            
            name:false,
            comments: false,
            def: true,
            assess:false
        });
    }
    
    // Click on the button
    function handleClick(e) {                
        fcnPaintButtonElementType(e, 'defCreate');
                
        setDefActual(e.target.value);
        textareaDef.current.value = dataToSend[e.target.value];

        textareaDef.current.focus();
    }

    // handle change
    function handleChange(e) {
        const htmlElement = e.target;

        setDataToSend({...dataToSend, [defActual]:e.target.value})
        setCharacters(() => originalCharacters - e.target.value.length);

        if (countRows(htmlElement, 90) > rows)  {
            e.target.value = e.target.value.substring(0, e.target.value.length - 1);
            setDataToSend((prev) => {
                const newValue = dataToSend[defActual].substring(0, dataToSend[defActual].length - 1);
                
                return {
                    [defActual]:newValue
                }
            })
        }        
    }    
    
    
    /* Return */
    return (
        <div id="div-definitions">
            <div>
                <label                     
                    style={{visibility: display.def ? 'visible' : 'hidden', textAlign:'center'}}
                    id="lbl-characters"
                >
                    {characters}
                </label>
            </div>

            <div>
                <GeneralButton
                    children={'Definitions'}
                    value={'definitions'}
                    style={style}
                    className={'generalButtonClass defCreate definitionsFirstChild'}
                    onClick={(e) => handleClick(e)}
                />

                <GeneralButton
                    children={'Symptoms'}
                    value={'symptoms'}
                    style={style}
                    className={'generalButtonClass defCreate'}
                    onClick={(e) => handleClick(e)}
                />

                <GeneralButton
                    children={'Questions'}
                    value={'questions'}
                    style={style}
                    className={'generalButtonClass defCreate'}
                    onClick={(e) => handleClick(e)}
                />
            </div>

                            
            <TextArea
                className={'txtDef elementToSend'}
                maxLength={2000}
                style={txtStyle}
                onFocus={handleFocus}
                onChange={(e) => handleChange(e)}
                ref={textareaDef}
                value={dataToSend[defActual]}
            />            
        </div>
    )    
}


/* Assess */
const Assess = (props) => {
    // Props
    const {dataToSend, setDataToSend, fcnPaintButtonElementType, display, setDisplay} = props;

    // Span display and characters
    const [characters, setCharacters] = useState(0);
    const originalCharacters = 1000;
    const rows = 14;


    // To hold the previous assess button clicked, in order to save the textarea 
    // information in the dataToSend correspondant state
    const [assessActual, setAssessActual] = useState('assess_one');


    // use ref to get the textarea value
    const textareaAssess = useRef();


    // Button and textarea style
    const style = {width:'9rem', height:'2.4rem'};
    const txtStyle = {width:'60rem', height:'20rem', marginTop:'1rem'};


    // on focus function
    function handleFocus(e) {        
        setCharacters(() => originalCharacters - e.target.value.length);
        setDisplay({            
            name:false,
            comments: false,
            def: false,
            assess:true
        });
    }
            
    // Click on the button
    function handleClick(e) {        
        fcnPaintButtonElementType(e, 'assess_create');
                
        setAssessActual(e.target.value);
        textareaAssess.current.value = dataToSend[e.target.value];  
        setCharacters(() => originalCharacters - e.target.value.length);
        textareaAssess.current.focus();      
    }


    // handle change
    function handleChange(e) {
        const htmlElement = e.target;

        setDataToSend({...dataToSend, [assessActual]:e.target.value});
        setCharacters(() => originalCharacters - e.target.value.length);

        if (countRows(htmlElement, 90) > rows)  {
            e.target.value = e.target.value.substring(0, e.target.value.length - 1);
            setDataToSend((prev) => {
                const newValue = dataToSend[assessActual].substring(0, dataToSend[assessActual].length - 1);
                
                return {
                    [assessActual]:newValue
                }
            })
        }        
    }    

    

    /* Return */
    return (
        <div id="div-assess">
            <div>
                <label                     
                    style={{visibility: display.assess ? 'visible' : 'hidden', textAlign:'center'}}
                    id="lbl-characters"
                >
                    {characters}
                </label>
            </div>


            {/* Five assess buttons */}
            <div>
                <GeneralButton
                    children={'Assess one'}
                    value={'assess_one'}                    
                    style={style}
                    className={'generalButtonClass assess_create assessOneFirstChild'}
                    onClick={(e) => handleClick(e)}
                />

                <GeneralButton
                    children={'Assess two'}
                    value={'assess_two'}                    
                    style={style}
                    className={'generalButtonClass assess_create'}
                    onClick={(e) => handleClick(e)}
                />

                <GeneralButton
                    children={'Assess three'}
                    value={'assess_three'}
                    style={style}
                    className={'generalButtonClass assess_create'}
                    onClick={(e) => handleClick(e)}
                />

                <GeneralButton
                    children={'Assess four'}
                    value={'assess_four'}
                    style={style}
                    className={'generalButtonClass assess_create'}
                    onClick={(e) => handleClick(e)}
                />

                <GeneralButton
                    children={'Assess five'}
                    value={'assess_five'}
                    style={style}
                    className={'generalButtonClass assess_create'}
                    onClick={(e) => handleClick(e)}
                />
            </div>

            
            <TextArea
                className={'txtAssess elementToSend textareaAssess'}
                maxLength={1000}
                style={txtStyle}
                onFocus={handleFocus}
                onChange={(e) => handleChange(e)}
                ref={textareaAssess}
                value={dataToSend[assessActual]}
            />
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

