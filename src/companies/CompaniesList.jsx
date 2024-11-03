/* Imports */
import { CompanyCard } from "./CompaniesCard"
import axiosService from "../helpers/axios"
import "./css/companiesList.css"
import { useEffect, useState } from "react"
import ViewCompany from "./ViewCompany"



/* Companies list */
export const CompaniesList = () => {
    /* States */
    const [companiesList, setCompaniesList] = useState([]);    
    const [showViewCompany, setShowViewCompany] = useState('none');
    const [companyObject, setCompanyObject] = useState();


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
                            />
                        ))
                }
            </div>
        </>
    )
}



