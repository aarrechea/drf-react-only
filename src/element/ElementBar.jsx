/* Imports */
import React, {useRef} from "react";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Link } from "react-router-dom";
import "./css/elementBar.css"
import "../navbar/navBar"



/* Element bar function */
function ElementBar({count, onSelectChange}) {    
    /* Fetching the data */
    const {data: choices, error} = useSWR("/element/get_choices/", fetcher, {
        refreshInterval: 10000,
    });


    /* Constants */
    const selectType = useRef();
    const selectLetter = useRef();
    

    /* Handle change */
    function handleChange(e) {
        onSelectChange(e, selectType, selectLetter)
    }

                

    /* Early returns */
    if (error) return <h1>Something went wrong!</h1>
    if (!choices) return <h1>Loading...</h1>
        

    /* Return */
    return (        
        <div id="div-element-bar">
            <div id="div-element-bar-interior">
                <Link id="btn-create-element" state={{ mode: "create" }} to="/create-element/">Create<br/>element</Link>
                
                <label htmlFor="">Element type</label>
                <label htmlFor="">Letter</label>
                <label htmlFor="">Elements count</label>

                <select name="" id="select-type" onChange={handleChange} ref={selectType}>
                    <option value="0">All elements</option>

                    {Object.entries(choices.type).map(([key, value], index) => (
                        <option key={index} value={key}>{value}</option>
                    ))}
                </select>
                
                <select name="" id="select-letter" onChange={handleChange} ref={selectLetter}>
                    <option value="0">All</option>

                    {Object.entries(choices.letters).map(([key, value], index) => (
                        <option key={index} value={key}>{value}</option>
                    ))}
                </select>

                <label htmlFor="">{count}</label>                
            </div>            
        </div>
    );
}



/* Exports */
export default ElementBar;




