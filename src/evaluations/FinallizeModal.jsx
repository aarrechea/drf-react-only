// Imports
import React from "react";
import "./css/finalizeModal.css";
import GeneralButton from "../components/GeneralButton";
import axiosService from "../helpers/axios";
import { useNavigate } from "react-router-dom";



// Finalize modal component
export const FinalizeModal = ({showFinalizeModal, setShowFinalizeModal, idEva}) => {
    // To navigate to the evaluations page after finalize the evaluation.
    const navigate = useNavigate();


    // Finalize the evaluation
    function handleFinalize() {
        axiosService
            .post(`evaluations/${idEva}/finalizeEvaluation/`)
            .then(res => {
                console.log("res: ", res);
                setShowFinalizeModal({visibility:'hidden', opacity:'0'});
                                
                navigate("/evaluations-page", {state:{'status':'finalized'}});
            })
            .catch(error => {
                console.log("Error to finalize the evaluation: ", error);
                navigate("/");
            })
    };



    // Return
    return (
        <div style={showFinalizeModal} id="divFinalizeModal">
            <div id="divFinalizeModalMain">
                <h3>Do you want to finalize the evaluation?</h3>
                <h3>You will no longer be able to modify the scores.</h3>

                <div id="divFinalizeModalButtons">
                    <GeneralButton
                        className={'generalButtonClass'}
                        children={'Close'}
                        onClick={() => setShowFinalizeModal({visibility:'hidden', opacity:'0'})}
                    />

                    <GeneralButton
                        className={'generalButtonClass'}
                        children={'Finalize'}
                        onClick={handleFinalize}
                    />
                </div>                
            </div>
        </div>
    );
};