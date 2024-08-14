import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import axios from 'axios';
import {DateContext} from '../../DateContext';
import { ShiftContext } from '../../ShiftContext';
import { FaultDataContext } from '../../FaultDataContext';
import API_URL from '../../config';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Using Alpine theme for Ag-Grid

import {formatDateToYYYYMMDD} from '../../utilities/dateUtils';

export const FaultReport = (props) => {
    const machineNo = props.machineNo;

    const { selectedDate } = useContext(DateContext);
    const {isDayShift} = useContext(ShiftContext);

    const [machineData, setMachineData] = useState(null);
    const [error, setError] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    const { updateTime, setUpdateTime } = useContext(FaultDataContext);

    const date = formatDateToYYYYMMDD(selectedDate);

    useEffect(() => {
        axios.get(`${API_URL}/api/faultReport?machineNumber=${machineNo}&date=${date}&shift=${isDayShift ? 'day' : 'night'}`)
            .then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                } else if (response === null || response === undefined) {
                    setError('No data available');
                } else {
                    setError(null);
                    setMachineData(response.data);
                    setRowData(response.data.faultReport);

                    if (response.data.faultReport.length > 0) {
                        setColumnDefs(Object.keys(response.data.faultReport[0]).map((header) => {
                            return {field: header, flex: 1};
                        }));
                    } else {
                        setColumnDefs([]);
                    }
                    
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
    }, [date, isDayShift, machineNo, updateTime]);

    if (error) {
        return (
            <div>
                <p>Machine data not available: {error}</p>
            </div>
        );
    } else if (machineData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ag-theme-alpine" style={{width: '100%' }}>
            <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout='autoHeight'
            />
      </div>
    );
}