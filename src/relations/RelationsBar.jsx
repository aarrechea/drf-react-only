/* Imports */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/relationBar.css";
import "./js/relationBar.js";



/* Relations bar */
const RelationsBar = ({navigateTo, mode, create, title}) => {
    /* States */
    const navigate = useNavigate();

    /* Return */
    return (
        <div id="divRelationBarFixed">
            <div id="divRelationBar">                
                <button onClick={() => navigate(`${navigateTo}`, {state:{mode:{mode}}})}>Create<br/>{create}</button>                                       
                <h3>{title}</h3>
            </div>
        </div>
    )
}



/* Exports */
export default RelationsBar;




