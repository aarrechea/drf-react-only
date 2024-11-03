/* Imports */
import React from "react";
import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import {DataContext} from "./store/DataContext";
import returnData from "../data";
import axiosService from "../helpers/axios";
import {useTable} from "react-table";
import { fcnChangePercentage, fcnElementCount, fcnPercentage } from "./js/various";
import "./css/tableOne.css"



/* Elements table to create a relation */
const FirstTable = (props) => {
    // Data context
    const { newTable, setTable } = useContext(DataContext);    
    

    // Props
    const {setValueSelected, setRow, actualValue, setActualValue, setOrdered, hideRows, setHideRows} = props;        


    /* States */
    const [data, setData] = useState([]);    


    // Extended row takes the original row, and adds some additional data
    function createExtendedRow(originalRow) {
        /* Variables */
        let percentageRow = 0;
        let order = 1
        let capability_number = 1;
        let process_number = 1;
        let tableLength = 0;
        let elementCount = 0;            
    
    
        // Constants
        const type = parseInt(originalRow.element_type);
    
    
        if(Object.keys(newTable).length > 0) {
            tableLength = Object.keys(newTable).length;
        }

        
        // Count competences in the new table
        elementCount = fcnElementCount(newTable, type);
    
        // Assign percentages to each competence depending on the counting
        percentageRow = fcnPercentage(elementCount);
        fcnChangePercentage(newTable, 1, percentageRow);
    
        // if the row needs to be inserted in the middle, I move the next elements
        // one position. If not (else), just assign valueSelected to order field.
        if (tableLength > 0 && actualValue < tableLength) {            
            for (let x = actualValue; x < tableLength; x++) {
                newTable[x].order = newTable[x].order + 1;
            }
    
            order = parseInt(actualValue) + 1;

            // Setting the state ordered to false, a signal to be ordered is sent. The table will
            // be ordered in the NewTable.jsx file
            setOrdered(false); 
    
        } else {
            order = tableLength + 1;
        }
    
        // if competence o capability
        if (type === 1) {
            capability_number = "-";
            process_number = "-";

        } else if (type === 2) {
            process_number = "-"
        }        

        return({
            percentage:percentageRow,
            order:order,
            capability_number:capability_number,
            process_number:process_number,            
        })
    }
        

    // Fetching the data and filtering the data with hide rows array in case user want to
    // edit the relation. Hide rows array will fill in the createRelationPage and send it
    // to this component (TableOne.jsx)
    const fetchData = useCallback (() => {
        try {
            axiosService
                .get(`/element`)                
                .then((res) => {
                    const filteredData = res.data.filter(item => {                                
                        return !hideRows.includes(item['public_id'])}
                    )                    
                    
                    setData(filteredData);
                    setValueSelected(hideRows.length);
                    setActualValue(hideRows.length);
                })
        } catch (error) {
            console.error("Error fetching data: ", error);
        }        
    }, [hideRows, setValueSelected, setActualValue])

    
    /* Get the data with the component fetchData */
    useEffect(() => {
        fetchData();

    }, [fetchData])
        

    /* Construct the table */
    const columns = useMemo(() => [
        { Header: 'Letter', accessor: 'letter_display' }, // This is a column object
        { Header: 'Type', accessor: 'element_type_display' },
        { Header: 'Name', accessor: 'name' },
    ], []);

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
        
    
    const HandleRowClicked = (rowClicked) => {
        const rowClickedId = {rowClicked:rowClicked.id};
        const extendedRow = createExtendedRow(rowClicked.original);     
        
        // I add element key-value pair because I need a unique field to call where the relation
        // is edited. If not, when I create the relation the field is called element, but
        // when I tried to add an element, that element would be associated with the id.
        rowClicked.original['element'] = rowClicked.original.id;

        const originalRow = rowClicked.original;
        const newRow = {...originalRow, ...extendedRow, ...rowClickedId}        

        setRow(newRow)        
        setHideRows([...hideRows, rowClicked.original.id]) // element id
        setTable(newRow); // add the new row to the existing data table
        setValueSelected(Object.keys(newTable).length + 1);
    }



    /* Return */
    return (
        <>
            <div id="divTableElements">
                <table {...getTableProps()}>
                    <thead id="tableElementsHeader">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody id="tableElementsBody" {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr style={{display: hideRows.includes(row.original.id) ? "none" : "table-row"}}
                                    onClick={() => HandleRowClicked(row)} 
                                    {...row.getRowProps()}>
                                        {row.cells.map(cell => (                                        
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>                                        
                                        ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>                
            </div>
        </>        
    )
}


export default FirstTable;