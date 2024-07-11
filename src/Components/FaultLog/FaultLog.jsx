import React, { useEffect, useState, useContext } from 'react';
import { NavBar } from '../NavBar/NavBar';
import axios from 'axios';
import {DateContext} from '../../DateContext';
import API_URL from '../../config';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Using Alpine theme for Ag-Grid


export const FaultLog = (props) => {
    const machineNo = props.machineNo;

    const { selectedDate } = useContext(DateContext);

    const [machineData, setMachineData] = useState(null);
    const [error, setError] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    const date = formatDateToDDMMYYYY(selectedDate);

    useEffect(() => {
        axios.get(`${API_URL}/api/faultLog?machineNumber=${machineNo}&date=${date}`)
            .then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setError(null);
                    setMachineData(response.data);
                    setRowData(response.data.faultLog);
                    setColumnDefs(response.data.header.map((header) => {
                        return {field: header };
                    }));
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
    }, [date]);

    if (error) {
        return (
            <div>
                <NavBar />
                <h1>Machine {machineNo}</h1>
                <p>Machine data not available: {error}</p>
            </div>
        );
    } else if (machineData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ag-theme-alpine" style={{width: '100vw' }}>
            <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout='autoHeight'
            />
      </div>
    );
}

const formatDateToDDMMYYYY = (date) => {
    const day = parseInt(date.getDate());
    const month = parseInt(date.getMonth() + 1);
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
};