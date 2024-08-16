import React, { useEffect, useState } from 'react';
import API_URL from '../../config';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Using Alpine theme for Ag-Grid

import DeleteButton from '../DeleteButton/DeleteButton';

const deleteButtonRenderer = (params) => {
    return (
      <DeleteButton
        data={params.data}
        onDelete={() => params.context.onDelete(params.data)}
      />
    );
};

export const ActionList = () => {
    const [actionList, setActionList] = useState([]);
    const [updateTime, setUpdateTime] = useState(new Date());

    useEffect(() => {
        // Fetch data from API
        axios.get(`${API_URL}/api/actionList`)
            .then((response) => {
                if (Array.isArray(response.data.actionList)) {
                    setActionList(response.data.actionList);
                } else {
                    console.error('Expected an array but got:', response.data.actionList);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [updateTime]);

    const handleDelete = (row) => {
        console.log('Delete row:', row);
        axios.post(`${API_URL}/api/completeAction`, {id: row.id}).catch((error) => {
            console.error(error);
        }).then(() => {
            setUpdateTime(new Date());
        });
    };

    // Define column definitions for AG Grid
    const columnDefs = [
        { headerName: "Date", field: "date", autoHeight: true, wrapText: true, flex: 1.2},
        { 
            headerName: "Shift", 
            field: "isdayshift",
            flex: 1,
            valueFormatter: params => params.value ? "Day" : "Night",
            cellRenderer: null,
            autoHeight: true,
            wrapText: true
        },
        { headerName: "Fault", field: "fault_code", autoHeight: true, wrapText: true, flex: 1},
        { headerName: "Machine", field: "machine_number", autoHeight: true, wrapText: true, flex: 1},
        { headerName: "Observation", field: "observation", autoHeight: true, wrapText: true, flex: 5},
        { headerName: "Action", field: "action", autoHeight: true, wrapText: true, flex: 5},
        { headerName: "Completed", field: "delete", flex: 1.3, cellRenderer: deleteButtonRenderer, cellRendererParams: {
            context: {
                onDelete: handleDelete
            }
        } }
    ];

    return (
        <div className="action-list">
            <h2>Action List</h2>
            <div className="ag-theme-alpine" style={{ height: '45vh', width: '100%' }}>
                <AgGridReact
                    rowData={actionList}
                    columnDefs={columnDefs}
                    defaultColDef={{ sortable: true, resizable: true }}
                    suppressRowTransform={true}
                    supressCellSelection={true}
                    onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
                />
            </div>
        </div>
    );
};
