/* Imports */
import React, { useRef } from "react";
import axiosService from "../helpers/axios";
import { changeAdditionalColor } from "./various";
import "./css/viewModal.css";
import { useNavigate } from "react-router-dom";



/* View modal process */
const ViewModalProcess = (props) => {    
    /* Props */
    const {showViewModal, setShowViewModal} = props;

    const navigate = useNavigate();


    /* Refs */
    const inputName = useRef(null);
    const lblLetter = useRef(null);
    const txtName = useRef(null);
    const txtAdditioanl = useRef(null);
    const btnDefinitions = useRef(null);


    /* Variables */
    let process = {};

    
     /* If the process wants to be viewed */
     if (showViewModal.display === 'grid') {
        axiosService
            .get(`/element/${showViewModal.public_id}`)
            .then(res => res.data)
            .then((data) => {
                changeAdditionalColor();

                inputName.current.value = data.user.first_name;
                lblLetter.current.value = data.letter_display;
                txtName.current.value = data.name;
                txtAdditioanl.current.value = data.definitions;
                btnDefinitions.current.style.color = 'green';
                btnDefinitions.current.style.fontWeight = 'bold';

                process = data;
            })
            .catch(() => {
                navigate("/");
            })
    }


    /* Handle close */
    const HandleClose = () => {
        setShowViewModal(() => 'none');
    }


    /* Handle click */
    const HandleClick = (e) => {        
        changeAdditionalColor();
        e.target.style.color = 'green';
        e.target.style.fontWeight = 'bold';
        
        if (e.target.id === 'btnDefViewModal') {
            txtAdditioanl.current.value = process.definitions;

        } else if (e.target.id === 'btnSymViewModal') {
            txtAdditioanl.current.value = process.symptoms;

        } else if (e.target.id === 'btnQueViewModal') {
            txtAdditioanl.current.value = process.questions;

        } else if (e.target.id === 'btnOneViewModal') {
            txtAdditioanl.current.value = process.assess_one;

        } else if (e.target.id === 'btnTwoViewModal') {
                txtAdditioanl.current.value = process.assess_two;

        } else if (e.target.id === 'btnThreeViewModal') {
            txtAdditioanl.current.value = process.assess_three;

        } else if (e.target.id === 'btnFourViewModal') {
            txtAdditioanl.current.value = process.assess_four;

        } else if (e.target.id === 'btnFiveViewModal') {
            txtAdditioanl.current.value = process.assess_five;
        }
    }
    


    /* Return */
    return(
        <div id="divViewModalProcess" style={{display:showViewModal.display}}>
            <div id="divViewModalProcessMain">
                <div id="divUserCreatorName">
                    <label>User creator</label>
                    <label>Letter</label>
                    <label>Name</label>

                    <textarea ref={inputName} disabled/>
                    <textarea ref={lblLetter} disabled/>
                    <textarea ref={txtName} disabled/>
                </div>

                <div id="divAdditionalTextareaViewModal">
                    <textarea disabled ref={txtAdditioanl} />
                </div>

                <div id="divAdditionalViewModal">
                    <button 
                        className="btnAdditional" 
                        id="btnDefViewModal" 
                        onClick={HandleClick} 
                        ref={btnDefinitions}>Definitions</button>

                    <button className="btnAdditional" id="btnSymViewModal" onClick={HandleClick}>Symptoms</button>
                    <button className="btnAdditional" id="btnQueViewModal" onClick={HandleClick}>Questions</button>
                    <button className="btnAdditional" id="btnOneViewModal" onClick={HandleClick}>Assess one</button>
                    <button className="btnAdditional" id="btnTwoViewModal" onClick={HandleClick}>Assess two</button>
                    <button className="btnAdditional" id="btnThreeViewModal" onClick={HandleClick}>Assess three</button>
                    <button className="btnAdditional" id="btnFourViewModal" onClick={HandleClick}>Assess four</button>
                    <button className="btnAdditional" id="btnFiveViewModal" onClick={HandleClick}>Assess five</button>
                </div>

                <div id="divBtnCloseViewModal">                    
                    <button id="btnCloseViewModal" onClick={HandleClose}>Close</button>
                </div>                
            </div>
        </div>
    )
};



/* Exports */
export default ViewModalProcess;



