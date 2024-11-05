/* Imports */
import React, {useState, useEffect} from "react";
import { SelectLetter, FixedBar, ElementComment, ElementName, 
    Definitions, Assess } from "./CreateElement";
import { getUser } from "../hooks/user.actions";
import { messageTimeout, enabledDisabledRadioButton } from "./various";
import { useLocation, useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import "./css/createElementPage.css"



/* Create element page */
const CreateElementPage = () => {    
    /* Constants */
    const user = getUser();
    const location = useLocation(); // location.state has the element to edit
    const navigate = useNavigate();


    /* States */    
    const [elementType, setElementType] = useState(1);    
    const [display, setDisplay] = useState({
        name: false,
        comments: false,
        def: false,
        assess:false
    });        
    const [children, setChildren] = useState({
        mode:'Create',
        type:1
    });
    const [dataToSend, setDataToSend] = useState({
        letter:1,
        name:'',
        comments:'',
        definitions:'',
        symptoms:'',
        questions:'',
        assess_one:'',
        assess_two:'',
        assess_three:'',
        assess_four:'',
        assess_five:'',
        user_creator:user.id,
        element_type: elementType
    });


    // Clean fields put the state with the data to send empty
    function fcnCleanFields(e) {
        setDataToSend({
            letter:1,
            name:'',
            comments:'',
            definitions:'',
            symptoms:'',
            questions:'',
            assess_one:'',
            assess_two:'',
            assess_three:'',
            assess_four:'',
            assess_five:'',
            user_creator:user.id,
            element_type:e.target.value
        })
    }


    // Function to paint the element type button upon selection
    function fcnPaintButtonElementType(e, class_name) {        
        document.querySelectorAll(`.${class_name}`).forEach(function(item) {
            if (item.value === e.target.value) {
                item.style.background = "radial-gradient(white 70%, var(--green_60))";

            } else {
                item.style.background = "white";
            }
        });
    };


    // To show or hide additional fields wether it is process or not
    function fcnShowProcessFields(e) {
        if (parseInt(e.target.value) === 3) {
            document.getElementById("div-definitions").style.display = "grid";
            document.getElementById("div-assess").style.display = "grid";

        } else {
            document.getElementById("div-definitions").style.display = "none";
            document.getElementById("div-assess").style.display = "none";
        }   
    };


    // Join of all functions that have to be executed when an element type button is pressed
    function fcnButtonClick(e, class_name) {
        fcnCleanFields(e);
        fcnPaintButtonElementType(e, class_name);
        fcnShowProcessFields(e);
        setElementType(() => e.target.value);
    };


    /* Put data in states and html elements when in edit mode */
    const PutData = (data) => {
        setDataToSend(prev => {
            return {
                ...prev,
                letter:data.letter,
                name:data.name,
                comments:data.comments,
                definitions:data.definitions,
                symptoms:data.symptoms,
                questions:data.questions,
                assess_one:data.assess_one,
                assess_two:data.assess_two,
                assess_three:data.assess_three,
                assess_four:data.assess_four,
                assess_five:data.assess_five,
                user_creator:data.user.id,
                element_type:data.element_type
            }
        });
    }
    

    /* First loading. If location.state is null, it is create, if not, is edit */
    useEffect(() => {
        if (location.state.mode === 'create') {            
            setChildren((prev) => {
                return {
                    ...prev,
                    mode:'Create',                    
                }                
            });

            document.getElementById("div-definitions").style.display = "none";
            document.getElementById("div-assess").style.display = "none";

        } else {
            PutData(location.state);
            setChildren((prev) => {
                return {
                    mode:'Edit',
                    type:location.state.element_type
                }
                
            });


            if(parseInt(location.state.element_type) === 3) {
                document.getElementById("div-definitions").style.display = "grid";
                document.getElementById("div-assess").style.display = "grid";
            } else {
                document.getElementById("div-definitions").style.display = "none";
                document.getElementById("div-assess").style.display = "none";
            }

            window.scroll(0, 0);
        }

    }, [location.state])


    /* Enabled or disabled element radio button depends on if it's create or edit */
    enabledDisabledRadioButton(children);


    // Reset the fields after create a new element. Also reset dataToSend state
    function fcnResetAfterCreate(){
        document.querySelectorAll(".elementToSend").forEach(function(item){
            if(item.type === 'select-one'){
                item.value = 1;
            } else {
                item.value = "";
            }
        });

        setDataToSend(prev => {
            return {
                ...prev,
                letter:1,
                name:"",
                comments:"",
                definitions:"",
                symptoms:"",
                questions:"",
                assess_one:"",
                assess_two:"",
                assess_three:"",
                assess_four:"",
                assess_five:"",
                user_creator:user.id,
                element_type:elementType
            }
        });
    };


          
    /* Handle submit */
    const handleSubmit = (event) => {        
        if(dataToSend.name.length < 3) {
            messageTimeout("The name has to have at least three characters", 'red');
            return;
        }

        // newData is the new object to send to the backend. It has the same fields than
        // dataToSend, but with the empty fields filled with the word "None"
        let newData = {};
        Object.entries(dataToSend).forEach(function([key, value]) {            
            if(value === "") {
                newData[key] = "None";
            } else {
                newData[key] = value;
            }
        });                        
        

        // Create or edit the element with the information in dataToSend state
        if (children.mode === 'Create') {            
            axiosService
                .post("/element/", newData)
                .then((res) => {                    
                    window.scroll(0, 0);
                    messageTimeout('Element succesfully created', 'green');
                    fcnResetAfterCreate();                    
                })
                .catch((error) => {
                    console.log("Error: " + error);
                    navigate("/");
                });

        // if it is edit
        } else {            
            axiosService
                .put(`/element/${location.state.id}/`, newData)
                .then(res => res.data)
                .then((data) => {
                    window.scroll(0, 0);             
                    PutData(data);
                    messageTimeout('Element succesfully edited', 'green');
                })

                .catch((error) => {
                    console.log("Error: " + error);
                    navigate("/");
                })
        }
    }

        
    /* Return */
    return (
        <>
            <FixedBar
                submit={handleSubmit}
                children={children}
                fcnCleanFields={fcnCleanFields}
                dataToSend={dataToSend}
                fcnButtonClick={fcnButtonClick}
            />


            <div id="div-create-message">
                <label id="lbl-create-message">Element created</label>
            </div>
                        

            {/* Letter and element name */}
            <div id="div-create-1">
                <div id="div-create-1-select">
                    <label htmlFor="select-letter-create-element">Letter</label>                
                    <SelectLetter
                        dataToSend={dataToSend}
                        setDataToSend={setDataToSend}
                    />
                </div>
                

                <ElementName 
                    dataToSend={dataToSend}
                    setDataToSend={setDataToSend}
                    display={display}
                    setDisplay={setDisplay}
                />
            </div>


            {/* Element comments */}            
            <ElementComment
                dataToSend={dataToSend}
                setDataToSend={setDataToSend}
                display={display}
                setDisplay={setDisplay}
            />
            
            
            {/* Definitions, symptoms, and questions */}            
            <Definitions
                dataToSend={dataToSend}
                setDataToSend={setDataToSend}
                fcnPaintButtonElementType={fcnPaintButtonElementType}
                display={display}
                setDisplay={setDisplay}
            />
            

            {/* Assess */}            
            <Assess                     
                dataToSend={dataToSend}
                setDataToSend={setDataToSend}                
                fcnPaintButtonElementType={fcnPaintButtonElementType}
                display={display}
                setDisplay={setDisplay}
            />
            

            <p className="createElementPageSeparator"/>
        </>        
    )    
}



/* Exports */
export default CreateElementPage;

