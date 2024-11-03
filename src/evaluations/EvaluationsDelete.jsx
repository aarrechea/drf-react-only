/* Imports */
import { useNavigate } from "react-router-dom";
import axiosService from "../helpers/axios";
import "./css/evaluationsDelete.css"



/* Delete component */
const DeleteEvaluation = ({showDeleteEva, setShowDeleteEva, evaToDelete, setCheckDeleted}) => {
    const navigate = useNavigate();

    /* Close the modal by changing the dsplay property */
    function handleClose() {
        setShowDeleteEva('none')        
    }


    /* Delete the evaluation */
    function handleDelete() {
        axiosService
            .delete(`/evaluations/${evaToDelete.id}/`)
            .then(res => {

                console.log("res: ", res);

                setCheckDeleted(true);
                setShowDeleteEva('none');
            })
            .catch(e => {
                console.log("Error deleting the evaluation ", e);
                navigate("/");
            })
    }

    

    /* Return */
    return (
        <div id="divEvaDelete" style={{display:showDeleteEva}}>
            <div id="divEvaDeleteMain">
                <label>Are you sure you want to delete the evaluation?</label>

                <div>
                    <label className="evaLabelSpan">Company name &nbsp; &nbsp;</label>
                    <label className="evaDeleteName">{evaToDelete.company_display}</label>
                </div>

                <div>
                    <label className="evaLabelSpan">Relation name &nbsp; &nbsp;</label>
                    <label className="evaDeleteName">{evaToDelete.relation_display}</label>
                </div>

                <div id="divEvaDeleteButtons">
                    <button onClick={handleClose}>Close</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                
            </div>
        </div>
    )
}



/* Exports */
export default DeleteEvaluation;






