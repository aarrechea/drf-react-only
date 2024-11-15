/* Imports */
import React, { useCallback } from "react";
import { useContext, useMemo } from "react";
import { DataContext } from "./store/DataContext";
import { fcnPercentageCapPro, fcnPercentageCompetences, fcnPutLetters } from "./js/various";
import { useTable } from "react-table";
import './css/newTable.css'



/* New table */
const NewTable = (props) => {
    // Data context
    const { newTable, setTableUpdate, setOrderUpdate } = useContext(DataContext);    
    
    
    // Props
    const {ordered, setOrdered, choices, row, setActualValue, valueSelected, 
            setHideRowsUpdate, setRelationName, relationName} = props;
    

    // Variables
    let data = [];    
    

    // Ordering the table if state 'ordered' is false.    
    if(!ordered && newTable.length > 0) {
        newTable.sort((a, b) => a.order - b.order);
        setOrdered(true);           
    }    
    
    
    /* Adding letters and element percentages to the new row */
    if(Object.keys(row).length > 0){        
        fcnPutLetters(newTable, choices?.letters);
        fcnPercentageCompetences(newTable);
        fcnPercentageCapPro(newTable, 2); // Put capability and process numbers too
        fcnPercentageCapPro(newTable, 3); // Put capability and process numbers too
        
        setActualValue(valueSelected);
    }
    

    //Constructing the table
    if(Object.keys(newTable).length > 0){
        data = [...newTable];    
    }

                    
    /* Constructing the columns of the table */
    const CapabilityNumber = () => {
        return (
            <p>Capability<br/>number</p>
        )
    }

    const ProcessNumber = () => {
        return (
            <p>Process<br/>number</p>
        )
    }


    /* Actions take it when a row is removed */    
    const handleRowClicked = useCallback((row) => {
        setHideRowsUpdate(row.original.id); // id is element id
        setTableUpdate(row.id);
        
        setOrderUpdate();        

    }, [setHideRowsUpdate, setTableUpdate, setOrderUpdate]) 
    

    const columns = useMemo(() => [
        { Header: 'Order', accessor: 'order' }, // This is a column object
        { Header: 'Letter', accessor: 'relation_letter_display' },
        { Header: CapabilityNumber, accessor: 'capability_number' },
        { Header: ProcessNumber, accessor: 'process_number' },
        { Header: 'Name', accessor: 'name'},
        { Header: '%', accessor: 'percentage' },
        { Header: 'Action', accessor: 'action',
            Cell: ({row}) => (                                
                <button  onClick={() => handleRowClicked(row)}>
                    Remove
                </button>
            )                
         }        
    ], [handleRowClicked]);
        

    const tableInstance = useTable({ columns, data });
    const { headerGroups, rows, prepareRow } = tableInstance;
    
    
    // Return 
    return (
        <>
            <div id="divNewTableTitle">
                <h3>New relationship</h3>

                <div id="divNewTableName">
                    <label htmlFor="">Relationship Name</label>
                    <textarea                         
                        name="txtRelationName" 
                        rows={2} 
                        maxLength={100} 
                        id="txtRelationName"
                        value={relationName}
                        onChange={e => setRelationName(e.target.value)}
                    ></textarea>
                </div>

                <button>Remove all<br/>elements</button>
            </div>

            <div id="divNewTable">
                <table>                    
                    <thead id="newTableHeader">
                        {headerGroups.map(headerGroup => {
                            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                            return (
                                <tr key={key} {...restHeaderGroupProps}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            )                            
                        })}
                    </thead>

                    <tbody id="newTableBody">
                        {rows.map(row => {
                            prepareRow(row);
                            const { key, ...restRowProps } = row.getRowProps();
                            return (
                                <tr key={key}
                                    {...restRowProps}>
                                    {row.cells.map(cell => {
                                        const { key, ...restCellProps } = cell.getCellProps();
                                        return (
                                            <td key={key} {...restCellProps}                                        
                                                style={parseInt(cell.row.original.element_type) === 1 && 
                                                    cell.column.id === 'name' ? {paddingLeft:'0.2rem'} : 

                                                    parseInt(cell.row.original.element_type) === 2 &&
                                                    cell.column.id === 'name' ? {paddingLeft:'1rem'} :
    
                                                    parseInt(cell.row.original.element_type) === 3 && 
                                                    cell.column.id === 'name' ? {paddingLeft:'1.8rem'} : 

                                                    parseInt(cell.row.original.element_type) === 1 && 
                                                    cell.column.id === 'percentage' ? {paddingLeft:'0.2rem'} :

                                                    parseInt(cell.row.original.element_type) === 2 && 
                                                    cell.column.id === 'percentage' ? {paddingLeft:'0.8rem'} :

                                                    parseInt(cell.row.original.element_type) === 3 && 
                                                    cell.column.id === 'percentage' ? {paddingLeft:'1.4rem'} : null
                                                }
                                            >                                             
                                                {cell.render('Cell')}                                            
                                            </td>
                                        )
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )   
}


/* Export */
export default NewTable;