/* Imports */
import Navigationbar from "../navbar/Navbar"
import RelationsBar from "../relations/RelationsBar"
import { CompaniesList } from "./CompaniesList"



/* Companies list */
export const CompaniesPage = () => {
    
    
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
            />

            <CompaniesList/>
        </>        
    )
}



