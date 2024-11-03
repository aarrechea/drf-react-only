/* Imports */
import axiosService from "../helpers/axios"
import "./css/companiesCard.css"
import { useNavigate } from "react-router-dom"



/* Company card */
export const CompanyCard = ({name, country, id, setShowViewCompany, setCompanyObject}) => {      
    const navigate = useNavigate();
    

    /* Handle the view modal */
    function handleClickView() {
        setShowViewCompany('block')
        
        axiosService
            .get(`/company/${id}`)
            .then(res => res.data)
            .then((data) => {
                setCompanyObject(data);
            })
    }


    /* Edit the company */
    function handleClickEdit() {         
        navigate("/create-company", {state:{mode:'Edit', id:id}});
    }



    /* Return */
    return (
        <div id="companyCard">
            <div id="divCompanyCard">
                <div id="divCompanyCardLabels">
                    <label className="label">Company<br/>name</label>
                    <textarea disabled className="name" value={name}></textarea>

                    <label className="label">Country</label>                    
                    <input disabled className="name" value={country}/>                    
                </div>

                <div id="divCompanyCardButtons">
                    <button onClick={handleClickView}>View</button>
                    <button onClick={handleClickEdit}>Edit</button>
                    <button>Delete</button>
                </div>                
            </div>
        </div>
    )
}



