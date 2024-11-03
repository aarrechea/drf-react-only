/* Imports */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/relationCard.css";
import axiosService from "../helpers/axios";



/* Relation card */
export const RelationCard = (props) => {
    /* Props */
    const {name, total_elements, competences, capabilities, processes, id, in_progress, made,
        setShowRelationModal, setIdRelationToDelete, status, setShowViewModal, fcnSetRelationView} = props;
    

    // to navigate to the create or edit page
    const navigate = useNavigate();


    /* Handle delete click */
    function handleDeleteClick() {
        setShowRelationModal('block')
        setIdRelationToDelete({
            id:id,
            name:name,
            total_elements:total_elements
        })        
    }


    /* Handle edit click */
    function handleEditClick() {        
        navigate("/create-relation", {state:{mode:'edit', id:id}});
    }


    /* Handle view click */
    function handleViewClick() {
        setShowViewModal('block');

        const idRel = id;

        axiosService            
            .get(`/relations/${idRel}/get_object_tree/`)
            .then(res => res.data)
            .then((data) => {                                        
                fcnSetRelationView(data);
            })
            .catch((error) => {
                console.log("Error: " + error);
                navigate("/");
            })
    }
        
        
    
    /* Return */
    return (
        <div id="divRelationCard">
            <div id="divRelationCardMain">
                <div id="divRelationCardName">
                    <label className="labels" htmlFor="txtRelationCardName">Name</label>
                    <textarea disabled name="" id="txtRelationCardName" value={name}></textarea>
                </div>

                <div id="divRelationCardMainSecond">
                    <label style={{fontSize:'1rem'}} className="labels">
                        Evaluations<br/>In progress
                    </label>
                    <label style={{fontSize:'1rem'}} className="labels">
                        Evaluations<br/>Made
                    </label>
                    <label className="labels" htmlFor="">Status</label>
                    <label>{in_progress}</label>
                    <label>{made}</label>
                    <label>{status ? 'Close' : 'Open'}</label>
                </div>

                <div id="divRelationCardMainButtons">
                    <button onClick={handleViewClick}>View</button>
                    <button onClick={handleEditClick}>Edit</button>
                    {in_progress > 0 || made > 0 
                        ?
                            <button disabled>Delete</button>
                        :
                            <button onClick={handleDeleteClick}>Delete</button>
                    }
                    
                </div>
            </div>

            <div id="divRelationCardSecond">
                <label className="labels" htmlFor="">Total elements</label>
                <label htmlFor="">{total_elements}</label>

                <label className="labels" htmlFor="">Competences</label>
                <label htmlFor="">{competences}</label>

                <label className="labels" htmlFor="">Capabilities</label>
                <label htmlFor="">{capabilities}</label>

                <label className="labels" htmlFor="">Processes</label>
                <label htmlFor="">{processes}</label>
            </div>            
        </div>
    )
}



