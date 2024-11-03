/* Imports */
import React from "react";
import Navigationbar from "../navbar/Navbar";
import RelationsBar from "./RelationsBar";
import RelationList from "./RelationsList";



/* Relations page */
const RelationsPage = () => {



    /* Return */
    return (
        <div>
            <Navigationbar/>
            <RelationsBar                           
                navigateTo='/create-relation'
                mode='create'
                create='relation'
                title='Relation tree'
            />
            <RelationList/>
        </div>
    )
}



/* Exports */
export default RelationsPage;








