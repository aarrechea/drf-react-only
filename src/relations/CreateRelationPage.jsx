/* Imports */
import React, { useCallback, useEffect, useState } from "react";
import { FixedBar, OptionBar } from "./CreateRelation";
import useSWR from "swr";
import axiosService, { fetcher } from "../helpers/axios";
import {DataContext} from "./store/DataContext";
import FirstTable from "./TableOne";
import NewTable from "./NewTable";
import { useLocation, useNavigate } from "react-router-dom";



/* Create relation page */
const CreateRelationPage = () => {
    //Datasets 
    const {data: choices} = useSWR("/element/get_choices/", fetcher, {
        refreshInterval: 10000,
    });

    /* useLocation with the mode = edit and the element id to be edited */
    const location = useLocation();

    const navigate = useNavigate();

    
    /* States */
    const [row, setRow] = useState({});    
    const [contextData, setContextData] = useState({
        newTable:[]
    })
    const [valueSelected, setValueSelected] = useState(0);
    const [actualValue, setActualValue] = useState(0);
    const [ordered, setOrdered] = useState(true);
    const [hideRows, setHideRows] = useState([]);
    const [relationName, setRelationName] = useState('');
    const [mode, setMode] = useState('Create');

    // state to contain the relation id to be edited that comes from the relation card
    const [id, setId] = useState(null);
    
    
    function changeRelationName (name) {
        setRelationName(prev => {
            return name;
        });
    }


    // I take the row clicked in the new table out of the table one filtering by id
    function setHideRowsUpdate(target) {
        setHideRows(prev => {            
            const newArray = prev.filter((item, index) => item !== target);
            return newArray            
        })
    }
    
    
    function setNewTable (data) {
        if (Object.keys(data).length > 0){
            setContextData(prev => {
                const updatedTable = [...prev.newTable, data];

                return {
                    newTable: updatedTable
                }
            })
        }
    }


    // When the user want to edit the table, the newTable state is loaded with the 
    // existing relation tree
    function setNewTableForEdit (data) {
        if (Object.keys(data).length > 0){
            setContextData(prev => {
                const updatedTable = data;                
            
                return {
                    newTable: updatedTable
                }
            })
        }
    }

    function setNewTableUpdate(targetIndex) {
        setContextData(prev => {            
            const newArray = prev.newTable.filter((item, index) => index !== parseInt(targetIndex));

            return {
                newTable: newArray
            }
        })
    }    
    
    function setNewTableOrderUpdate() {
        setContextData(prev => {
            const newArray = prev.newTable

            for (let i = 0; i < newArray.length; i++) {
                newArray[i]['order'] = i+1
            }

            return {
                newTable: newArray
            }
        })
    }

    const ctxData = {
        newTable: contextData.newTable,
        setTable: setNewTable,
        setTableUpdate: setNewTableUpdate,
        setOrderUpdate: setNewTableOrderUpdate
    };


    const fcnSetHideRows = useCallback((data) => {
        const public_id_array = [];

        data.forEach(function(item)  {
            public_id_array.push(item.public_id);
        })        

        return public_id_array;
    }, [])

    
    // If edit I have to hide in the first table, the elements already used in the new table.
    useEffect(() => {        
        if (location.state.mode === 'edit') {
            axiosService            
                .get(`/relations/${location.state.id}/get_object_tree/`)
                .then(res => res.data)
                .then((data) => {
                    const id_array = fcnSetHideRows(data.data);
                    setHideRows([...id_array]);

                    setNewTableForEdit(data.data);
                    setMode('Edit');
                    setId(location.state.id)

                    setRelationName(data.relation_name);
                })
                .catch((error) => {
                    console.log("Error: " + error);
                    navigate("/");
                })            
        }
    }, [location.state.id, location.state.mode, fcnSetHideRows, navigate])


    if (!choices) return <h2>Loading...</h2>

    /* Return */
    return (
        <DataContext.Provider value={ctxData}>
            <FixedBar
                relationName={relationName}
                mode={mode}
                setMode={setMode}
                id={id}
                setId={setId}
            />
            
            <OptionBar                 
                valueSelected={valueSelected} 
                setValueSelected={setValueSelected}
                setActualValue={setActualValue}                
            />

            <FirstTable                
                setValueSelected={setValueSelected}                
                setRow={setRow}                
                actualValue={actualValue}
                setActualValue={setActualValue}
                setOrdered={setOrdered}
                hideRows={hideRows}
                setHideRows={setHideRows}
                mode={mode}
            />
            
            <NewTable                
                valueSelected={valueSelected}
                setValueSelected={setValueSelected}
                setActualValue={setActualValue}
                ordered={ordered}
                setOrdered={setOrdered}                
                row={row}
                choices={choices}
                hideRows={hideRows}
                setHideRowsUpdate={setHideRowsUpdate}
                setRelationName={changeRelationName}
                relationName={relationName}                
            />            
        </DataContext.Provider>
    )
}



/* Exports */
export default CreateRelationPage;



