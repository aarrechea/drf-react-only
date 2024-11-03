/* Imports */
import React, { useRef, useContext, useState } from "react";
import "./css/createRelation.css";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import {DataContext} from "./store/DataContext";
import axiosService from "../helpers/axios";
import { getUser } from "../hooks/user.actions";



/* Fixed bar */
const FixedBar = ({relationName, mode, setMode, id, setId}) => {
    /* Hooks */
    const navigate = useNavigate();

    /* Message to show when a relation is created or edited, and style state to control the opacity
        and the color of the label
    */
    const [relationMessage, setRelationMessage] = useState();
    const [messageStyle, setMessageStyle] = useState();

    /* Data in context */
    const {newTable} = useContext(DataContext);    

    /* Check if the relation in the new table state, each competences has at least one capability,
        and each capability has at least one process. If so, the relation is close and is ready to
        be used to evaluate a company, if not, the relation is open and can not be used for evaluations.
    */
    function checkOpenOrClose(data) {        
        let previous = 0

        if (Object.keys(data).length < 3 ) {            
            return false;
        }

        data.forEach((item, index) => {
            if(index === 0 && parseInt(item.element_type) !== 1) {                
                return false;

            } else if (parseInt(item.element_type) === 2 && previous !== 1) {                
                return false;

            } else if (parseInt(item.element_type) === 3 && (previous !== 2 && previous !== 3)) {                
                return false;

            } 

            previous = parseInt(item.element_type);
        })
        
        return true;
    }

    function fcnSetMessageTimeout(style, message) {
        setMessageStyle(style);
        setRelationMessage(message);

        setTimeout(() => {            
            setMessageStyle(prev => {return {...prev, opacity:'0'}});
        }, 3000);
    };

        
    /* Handle click */
    function handleClick() {
        if(relationName.length < 4) {
            fcnSetMessageTimeout({opacity:'1', color:'red', fontSize:'2rem'}, 
                'The name has to have more than three characters')
            return

        } else if (parseInt(Object.keys(newTable).length) === 0) {
            fcnSetMessageTimeout({opacity:'1', color:'red', fontSize:'2rem'}, 
                'The table does not have elements')
            return

        } else {
            const open = {open:checkOpenOrClose(newTable)};
            const name = {name:relationName};
            const table ={table:newTable}
            const user = {userId:getUser().id};

            const newObject = [table, name, open, user];
            
            if (mode === 'Create') {
                axiosService
                    .post("/relations/", newObject)
                    .then((res) => {

                        console.log("Res: ", res);
                        console.log("Res data: ", res.data);


                        if (res.data.error) {
                            fcnSetMessageTimeout({opacity:'1', color:'red', fontSize:'1.8rem'}, 
                                res.data.error);

                        } else {
                            fcnSetMessageTimeout({opacity:'1', color:'green', fontSize:'2rem'}, 
                                'Relation succesfully created - Ready to edit');

                            setId(res.data.id);
                            setMode("Edit");
                        }
                    })
                    .catch((error) => {
                        fcnSetMessageTimeout({opacity:'1', color:'red', fontSize:'1.6rem'}, 
                            error);
                        console.log("Error creating the relation: " + error);
                    });
            
            // if mode is edit
            } else {
                axiosService                
                    .put(`/relations/${id}/`, newObject)
                    .then((res) => {  
                        if (res.data.error) {
                            fcnSetMessageTimeout({opacity:'1', color:'red', fontSize:'1.8rem'}, 
                                res.data.error);

                        } else {
                            if (res.data.status === 'ok') {
                                fcnSetMessageTimeout({opacity:'1', color:'green', fontSize:'2rem'}, 
                                    'Relation succesfully edited')
                            } 
                        }
                    })
                    .catch((error) => {
                        fcnSetMessageTimeout({opacity:'1', color:'red', fontSize:'1.6rem'}, 
                            error);
                        console.log("Error: " + error);
                    });
            }            
        }
        
    }


    /* Return */
    return (
        <div id="createRelationFixedBar">
            <div id="createRelationInnerBar">
                <button onClick={handleClick} value={mode}>{mode}</button>
                <label style={messageStyle}>{relationMessage}</label>
                <button onClick={() => navigate('/relation-page')}>Previous<br/>Page</button>
            </div>            
        </div>
    )
}


/* Option bar */
const OptionBar = ({valueSelected, setValueSelected, setActualValue}) => {
    // Data context
    const {newTable} = useContext(DataContext);    
     

    /* Variables */        
    let arr = [0]; // array that contain the number of rows of the new table to select where the
                    // new row will be placed
    let tableLength = 0;

    
    /* Constants */
    if(newTable) {
        tableLength = Object.keys(newTable);
    }
    
    
    /* Refs */
    const selectRef = useRef();


    /* Fetching the data */    
    const {data: choices} = useSWR("/element/get_choices/", fetcher, {
        refreshInterval: 10000,
    });    

            
    // loop over the number of elements of the table to define the options
    // in the select index plus the zero value.        
    for (let i = 1; i <= tableLength.length; i++) {            
        arr.push(i);
    }        
    
    
    function HandleSelectChange() {        
        setValueSelected(selectRef.current.value);
        setActualValue(selectRef.current.value);
    }

    
    /* Early returns */
    //if (error) return <h1>Something went wrong!</h1>
    if (!choices) return <h1>Loading...</h1>


    /* Return */
    return (
        <div id="optionBarFixed">
            <div id="optionBarFixedInner">
                <select name="" id="select-type">
                    <option value="0">All elements</option>

                    {Object.entries(choices.type).map(([key, value], index) => (
                        <option key={index} value={key}>{value}</option>
                    ))}
                </select>

                <select name="" id="select-letter">
                    <option value="0">All</option>

                    {Object.entries(choices.letters).map(([key, value], index) => (
                        <option key={index} value={key}>{value}</option>
                    ))}
                </select>
                
                <div id="divSelectIndex">
                    <p>Insert after row</p>
                    <select onChange={HandleSelectChange} ref={selectRef} value={valueSelected}>
                        {Object.entries(arr).map(([key, value], index) => (
                            <option
                                key={index} value={key}>{value}
                            </option>
                        ))}
                    </select>
                </div>
                
                <p id="paraText" style={{textAlign:"center"}}>(Click on the row to insert)</p>                
            </div>
        </div>
    )
}



/* Exports */
export {
    FixedBar,
    OptionBar,
}

