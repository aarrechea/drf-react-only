/* Imports */
import React, {useState} from "react";
import axiosService from "../helpers/axios";
import "./css/relationDeleteModal.css";
import { useNavigate } from "react-router-dom";



/* Delete modal */
const RelationDeleteModal = (props) => {
    /* Props */
    const {showRelationModal, setShowRelationModal, idRelationToDelete, setRelationListUpdate,
        setRelationsNumber} = props

    const [deleted, setDeleted] = useState(false); 

    const navigate = useNavigate();


    /* Handle click to hide modal */
    const HandleClick = () => {        
        setShowRelationModal({visibility:'hidden', opacity:'0'});
        setDeleted(() => false);
    }


    /* Handle delete */
    const HandleDelete = () => {        
        axiosService
            .delete(`/relations/${idRelationToDelete.id}/`)
            .then((res) => {                                                
                setRelationListUpdate(idRelationToDelete.id)
                setDeleted(() => true)
                setRelationsNumber(Object.keys(res.data).length);
            })
            .catch((error) => {
                console.log("Error deleting the relation in RelationDeleteModal: " + error);
                navigate("/");
            });
    };
    
    

    /* Return */
    return (
        <div id="divRelationDelete" className="modal-relation-delete" style={showRelationModal}>
            <div className="modal-relation-content-delete">
                {deleted 
                ?
                    <label>The following relation was succesfully deleted: </label>
                :
                    <label>The following relation will be deleted: </label>
                }
                
                <p className="separatorRelationDeleteModal"/>
                
                <div id="modal-content-title-delete">
                    <label style={{fontSize:'1.8rem'}}>{idRelationToDelete.name}</label>
                    <label style={{fontSize:'1rem'}}>Total elements {idRelationToDelete.total_elements}</label>
                </div>

                <p className="separatorRelationDeleteModal"/>

                {deleted
                ?
                    <div id="div-btn-relation-delete-modal">
                        <button 
                            className="close-relation-delete-modal" 
                            id="btn-close-relation-delete-modal" 
                            onClick={HandleClick}>Close</button>                    
                    </div>
                :

                    <div id="div-btn-relation-delete-modal">
                        <button 
                            className="close-relation-delete-modal" 
                            id="btn-close-relation-delete-modal" 
                            onClick={HandleClick}>Close</button>

                        <button
                            className="btn-relation-delete-modal"
                            id="btn-relation-close-delete-modal"
                            onClick={HandleDelete} style={{color:'red'}}>Delete</button>
                    </div>
                }                                
            </div>            
        </div>
    )
}



/* Exports */
export default RelationDeleteModal;



