/* Imports */
import { useState } from "react"
import Navigationbar from "../navbar/Navbar"
import RelationsBar from "../relations/RelationsBar"
import { CompaniesList } from "./CompaniesList"



/* Companies list */
export const CompaniesPage = () => {
    const [message, setMessage] = useState("");
    const [styleRelationBarMessage, setStyleRelationBarMessage] = useState();
    
    /* Return */
    return (
        <>
            <Navigationbar/>
            
            {/* Relation bar actually is a component used to adapt to different types of actions */}
            <RelationsBar                           
                navigateTo='/create-company'
                mode='create'
                create='company'
                title='Companies'
                message={message}
                styleRelationBarMessage={styleRelationBarMessage}
            />

            <CompaniesList
                setMessage={setMessage}
                setStyleRelationBarMessage={setStyleRelationBarMessage}
                message={message}
            />
        </>        
    )
}



