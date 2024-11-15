/* Imports */
import './css/relationViewModal.css'
import { useTable } from 'react-table';
import { useMemo } from 'react';



/* Relation view modal */
export const RelationViewModal = ({showViewModal, setShowViewModal, relationView}) => {    
    /* Handle close modal */
    function handleClickClose() {
        setShowViewModal({visibility:'hidden', opacity:'0'});
    }
    

    /* Table creation */
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


    const columns = useMemo(() => [
        { Header: 'Name', accessor: 'name', 
            Cell: ({row}) => (
                parseInt(row.original.element_type) === 1 ?
                    <p style={{paddingLeft:'0.2rem'}}>                        
                        {row.values.name}
                    </p>
                : parseInt(row.original.element_type) === 2 ?
                    <p style={{paddingLeft:'1rem'}}>                        
                        {row.values.name}
                    </p>
                : parseInt(row.original.element_type) === 3 ?
                    <p style={{paddingLeft:'1.8rem'}}>                        
                        {row.values.name}
                    </p>
                : null
            )            
        },
        { Header: 'Letter', accessor: 'relation_letter_display',
            Cell: ({row}) => (
                parseInt(row.original.element_type) === 1 ?
                    <p>                        
                        {row.values.relation_letter_display}
                    </p>                
                : null
            )            
        },
        { Header: CapabilityNumber, accessor: 'capability_number', 
            Cell: ({row}) => (
                parseInt(row.original.element_type) === 2 ?
                    <p>                        
                        {row.values.capability_number}
                    </p>                
                : null
            )
        },
        { Header: ProcessNumber, accessor: 'process_number',
            Cell: ({row}) => (
                parseInt(row.original.element_type) === 3 ?
                    <p>                        
                        {row.values.process_number}
                    </p>                
                : null
            )
        },
        { Header: 'Percentage', accessor: 'percentage', 
            Cell: ({row}) => (
                parseInt(row.original.element_type) === 1 ?
                    <p style={{paddingLeft:'2rem'}}>                        
                        {row.values.percentage}
                    </p>
                : parseInt(row.original.element_type) === 2 ?
                    <p style={{paddingLeft:'3rem'}}>                        
                        {row.values.percentage}
                    </p>
                : parseInt(row.original.element_type) === 3 ?
                    <p style={{paddingLeft:'4rem'}}>                        
                        {row.values.percentage}
                    </p>
                : null
            )          
        },
    ], []);
    
    const data = [...relationView.relation];    

    const tableInstance = useTable({ columns, data });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;



    /* Return */
    return (        
        <div id="divRelationView" className="modal-relation-view" style={showViewModal}>
            <div className="modal-relation-content-view">
                <div id='modal-relation-title-view'>
                    <label htmlFor="">Relation<br/>name</label>
                    <textarea disabled value={relationView.name}></textarea>
                </div>

                <p className='separatorRelationViewModal'/>

                                
                <div id='divRelationViewTable'>
                    <table id='relationViewTable'>
                        <thead style={{width:'100%'}} id="newTableHeader">
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
                                    <tr key={key} {...restRowProps}>
                                        {row.cells.map(cell => {
                                            const { key, ...restCellProps } = cell.getCellProps();
                                            return (
                                                <td key={key} {...restCellProps}>
                                                    {cell.render('Cell')}                                            
                                                </td>
                                            );                                            
                                        })}
                                    </tr>                                    
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                <p className='separatorRelationViewModal'/>

                <div id='divRelationViewButton'>
                    <button onClick={handleClickClose}>Close</button>
                </div>
                
            </div>            
        </div>        
    )
}



