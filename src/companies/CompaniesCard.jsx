/* Imports */
import { useState } from "react";
import axiosService from "../helpers/axios"
import "./css/companiesCard.css"
import { useNavigate } from "react-router-dom"



/* Company card */
export const CompanyCard = (props) => {

    const {name, country, id, setCompanyObject, setMessage, message, made, in_progress,
        setStyleRelationBarMessage, setCompaniesList, setStyleViewCompany} = props;

    const navigate = useNavigate();

    const [styleDelete, setStyleDelete] = useState();
    

    /* Handle the view modal */
    function handleClickView() {
        //setShowViewCompany('block')
        setStyleViewCompany({visibility:'visible', opacity:'1'});
        
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


    function handleDelete() {
        if (Object.keys(message).length === 0) {
            setStyleDelete({backgroundColor:'red', color:'white'})
            setStyleRelationBarMessage({color:'red'})
            setMessage("Press delete again to delete the company")
            

            setTimeout(() => {
                setStyleDelete({backgroundColor:'white', color:'black'})
                setMessage("")
            }, 4000);

        } else {
            axiosService
                .delete(`/company/${id}`)
                .then(res => res.data)
                .then((data) => {
                    setStyleRelationBarMessage({color:'green'})
                    setMessage("The company has been deleted")
                    setStyleDelete({backgroundColor:'white', color:'black'})
                    
                    // Remove only the company that was deleted from the companies list.
                    setCompaniesList(prev => {
                        const newArray = prev.filter((item) => item.id !== id);
                        return newArray
                    })

                    setTimeout(() => {
                        setMessage("")
                    }, 2500);
                })
        }
    };



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

                    {made > 0 || in_progress > 0 
                        ?
                            <>
                                <button disabled style={{fontStyle:'italic'}}>Edit</button>
                                <button disabled style={{fontStyle:'italic'}}>Delete</button>
                            </>                            
                        :
                            <>
                                <button onClick={handleClickEdit}>Edit</button>
                                <button 
                                    onClick={handleDelete}
                                    style={styleDelete}
                                >
                                    Delete
                                </button>                    
                            </>                            
                    }                    
                </div>                
            </div>
        </div>
    )
}



