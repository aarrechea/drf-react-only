/* Imports */
import React from "react";
import "./css/elementCard.css"
import axiosService from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";



/* Element card */
function ElementCard(props) {
    /* Constants */
    const {letter, name, element_type, eva_progress, eva_made, id, user_creator, setShowModal,
        setElementToDelete, setShowViewModal} = props;
    const navigate = useNavigate();
    const user = getUser();    
    

    /* Handle edit click */
    const HandleEditClick = () => {
        /* Axios */
        axiosService
            .get(`/element/${id}`)
            .then((res) => {                
                navigate("/create-element", {state:res.data});
            })
            .catch((error) => {
                console.log("Error: " + error);
                navigate("/");
            });
    };


    /* Handle show modal */
    const HandleShowModal = () => {
        setShowModal({visibility:'visible', opacity:'1'});
        setElementToDelete(() => {
            return {
                element_type:element_type,
                letter:letter,
                name:name,
                public_id:id                
            }
        });
    };


    /* Handle show modal view */
    const HandleViewModal = () => {
        setShowViewModal(() => {
            return {
                style:{visibility:'visible', opacity:'1'},
                id:id
            }
        });
    };


    
    /* Return */
    return(                
        <div id="div-card">
            <div id="div-card-main">
                <div id="div-card-title">
                    <label htmlFor="">Element type</label>
                    <label htmlFor="">Letter</label>
                    <label htmlFor="">Name</label>

                    <h5>{element_type}</h5>
                    <h5>{letter}</h5>
                    <textarea value={name} disabled></textarea>
                </div>

                <div id="div-card-body">
                    <label htmlFor="">Evaluations in progress</label>
                    <label htmlFor="">{eva_progress}</label>                
                    <label htmlFor="">Evaluations made</label>
                    <label htmlFor="">{eva_made}</label>
                </div>        
            </div>
            
            <div id="div-card-button">
                {element_type === 'Process' 
                    ?
                        <button className="btn-enabled" onClick={HandleViewModal}>View</button> 
                    :
                        <button className="btn-disabled" disabled>View</button>
                }

                {eva_made === 0 && user_creator === user.id
                    ?                        
                        <>                            
                            <button 
                                className="btn-enabled" 
                                onClick={HandleEditClick}
                            >
                                    Edit
                            </button>
                            
                            <button 
                                className="btn-enabled btn-delete" 
                                onClick={HandleShowModal}
                            >
                                Delete
                            </button>
                        </>                    
                    :
                        <>
                            <button className="btn-disabled" disabled>Edit</button>
                            <button className="btn-disabled" disabled>Delete</button>
                        </>                    
                }
            </div>                    
        </div>
    )
}



/* Exports */
export default ElementCard;

