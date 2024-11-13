/* Imports */
import React, { useState } from "react";
import axiosService from "../helpers/axios";
import "./css/DeleteModal.css";
import { useNavigate } from "react-router-dom";



/* Delete modal */
const DeleteModal = ({showModal, setShowModal, elementToDelete, setElementDeleted}) => {
    /* States */
    const [deleted, setDeleted] = useState(false);

    const navigate = useNavigate();


    /* Handle click to hide modal */
    const HandleClick = () => {        
        setShowModal({visibility:'hidden', opacity:'0'});
        setDeleted(() => false);
    }


    /* Handle delete */
    const HandleDelete = () => {
        /* Axios */
        axiosService
            .delete(`/element/${elementToDelete.public_id}/`)
            .then((res) => {                
                setElementDeleted(() => {
                    return {
                        edited:true,
                        name:res.data.name
                    }
                })

                setDeleted(() => true);                
            })
            .catch((error) => {                
                console.log("Error deleting the element: " + error);
                navigate("/");
            });
    };
    
    

    /* Return */
    return (
        <div id="myModalDelete" className="modal-element-delete" style={showModal}>
            <div className="modal-content-delete">
                {deleted 
                ?
                    <label>The following element was succesfully deleted: </label>
                :
                    <label>The following element will be deleted: </label>
                }
                
                <p className="separatorElementDeleteModal"/>

                <div id="modal-content-title-delete">
                    <label>
                        {elementToDelete.element_type} - {elementToDelete.letter} - {elementToDelete.name}
                    </label>
                </div>

                <p className="separatorElementDeleteModal"/>

                {deleted
                ?
                    <div id="div-btn-delete-modal">
                        <button 
                            className="close-delete-modal" 
                            id="btn-close-delete-modal" 
                            onClick={HandleClick}>Close</button>                    
                    </div>
                :

                    <div id="div-btn-delete-modal">
                        <button 
                            className="close-delete-modal" 
                            id="btn-close-delete-modal" 
                            onClick={HandleClick}>Close</button>

                        <button
                            className="btn-delete-modal"
                            id="btn-close-delete-modal"
                            onClick={HandleDelete} style={{color:'red'}}>Delete</button>
                    </div>
                }                                
            </div>            
        </div>
    )
}



/* Exports */
export default DeleteModal;



