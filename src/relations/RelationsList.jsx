/* Imports */
import React, { useEffect, useState } from "react";
import "./css/relationsList.css";
import axiosService from "../helpers/axios";
import { RelationCard } from "./RelationCard";
import RelationDeleteModal from "./RelationDeleteModal";
import { RelationViewModal } from "./RelationViewModal";
import { useNavigate } from "react-router-dom";



/* Relation list */
function RelationList() {
    /* States */    
    const [relationList, setRelationList] = useState([]);
    const [relationsNumber, setRelationsNumber] = useState();    
    const [showRelationModal, setShowRelationModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState('none');
    const [relationView, setRelationView] = useState({
        'name':'',
        'relation':[]
    });
    const [idRelationToDelete, setIdRelationToDelete] = useState({
        id:'',
        name:'',
        total_elements:0
    });    

    const navigate = useNavigate();
    


    // to update the list when a relation is deleted without calling axios again
    function setRelationListUpdate(targetIndex) {
        setRelationList(prev => {
            const newArray = prev.filter((item, index) => item.id !== targetIndex);
            return newArray
        })
    }    


    function fcnSetRelationView(data) {
        setRelationView(prev => {
            return {
                name: data.relation_name,
                relation: data.data
            }
        })
    }

    
    /* Fetching the data */
    useEffect(() => {
        axiosService
            .get(`/relations`)
            .then(res => res.data)
            .then((data) => {
                setRelationList(() => [...data]);
                setRelationsNumber(Object.keys(data).length);                
            })
            .catch((error) => {
                console.log("Error: " + error);
                navigate("/");
            })
    }, [])



    /* Return */
    return (
        <>
            <RelationDeleteModal
                showRelationModal={showRelationModal}
                setShowRelationModal={setShowRelationModal}
                idRelationToDelete={idRelationToDelete}          
                setRelationListUpdate={setRelationListUpdate}
                setRelationsNumber={setRelationsNumber}
            />

            <RelationViewModal
                showViewModal={showViewModal}
                setShowViewModal={setShowViewModal}
                relationView={relationView}
            />

            <div id="divRelationList">
                <h3 style={{marginBottom: '2rem'}}>List of relationship ({relationsNumber})</h3>

                {!relationList || Object.keys(relationList).length === 0
                    ? 
                        <h6 style={{marginTop:'3rem'}}>The list is empty</h6>
                    :       
                        <>
                            {relationList.map(function(relation) {
                                return (                                                                
                                    <React.Fragment key={relation.id}>
                                        <RelationCard                                         
                                            name={relation.name}
                                            total_elements={relation.total_elements}
                                            competences={relation.competences}
                                            capabilities={relation.capabilities}
                                            processes={relation.processes}
                                            id={relation.id}
                                            in_progress={relation.eva_progress}
                                            made={relation.eva_made}
                                            status={relation.status}
                                            setShowRelationModal={setShowRelationModal}
                                            setIdRelationToDelete={setIdRelationToDelete}
                                            setShowViewModal={setShowViewModal}
                                            fcnSetRelationView={fcnSetRelationView}
                                        />
                                    </React.Fragment>                                
                                )
                            })}
                        </>                    
                }
            </div>
        </>        
    )
}



/* Exports */
export default RelationList;



