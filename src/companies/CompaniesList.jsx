/* Imports */
import { CompanyCard } from "./CompaniesCard"
import axiosService from "../helpers/axios"
import "./css/companiesList.css"
import { useEffect, useState } from "react"
import ViewCompany from "./ViewCompany"



/* Companies list */
export const CompaniesList = ({setMessage, message, setStyleRelationBarMessage}) => {
    /* States */
    const [companiesList, setCompaniesList] = useState([]);    
    const [showViewCompany, setShowViewCompany] = useState('none');
    const [companyObject, setCompanyObject] = useState();


    /* Style of the div to apply transitions  */
    const [styleViewCompany, setStyleViewCompany] = useState({visibility:'hidden', opacity:'0'});  

    /* List of companies */
    useEffect(() => {
        axiosService
            .get(`/company`)
            .then(res => res.data)
            .then((data) => {
                setCompaniesList(() => [...data]);
            })
    }, []);
    
    

    /* Return */
    return (
        <>
            <ViewCompany
                showViewCompany={showViewCompany}
                setShowViewCompany={setShowViewCompany}
                companyObject={companyObject}
                styleViewCompany={styleViewCompany}
                setStyleViewCompany={setStyleViewCompany}
            />

            <div id="companiesListTitle">
                <label htmlFor="">Companies list</label>
            </div>

            <div id="companiesListCard">
                {companiesList.length === 0 
                    ?
                        <label id="lblCompaniesListCard">The list is empty</label> 
                    :
            
                        companiesList?.map((element, index) => (
                            <CompanyCard 
                                key={index} 
                                name={element.name}
                                country={element.country_display}
                                id={element.id}
                                showViewCompany={showViewCompany}
                                setShowViewCompany={setShowViewCompany}
                                setCompanyObject={setCompanyObject}
                                setMessage={setMessage}
                                message={message}
                                setStyleRelationBarMessage={setStyleRelationBarMessage}
                                setCompaniesList={setCompaniesList}
                                setStyleViewCompany={setStyleViewCompany}
                                inProgress={element.eva_progress}
                                made={element.eva_made}
                            />
                        ))
                }
            </div>
        </>
    )
}



