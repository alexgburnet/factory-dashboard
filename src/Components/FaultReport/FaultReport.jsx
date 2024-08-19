import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DateContext } from '../../DateContext';
import { ShiftContext } from '../../ShiftContext';
import { FaultDataContext } from '../../FaultDataContext';
import API_URL from '../../config';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { formatDateToYYYYMMDD } from '../../utilities/dateUtils';

export const FaultReport = (props) => {
    const machineNo = props.machineNo;

    const { selectedDate } = useContext(DateContext);
    const { isDayShift } = useContext(ShiftContext);

    const [machineData, setMachineData] = useState(null);
    const [error, setError] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [linearThread, setLinearThread] = useState(false); // Single checkbox state
    const [existingData, setExistingData] = useState({}); // Store existing data for each fault

    const { updateTime } = useContext(FaultDataContext);

    const date = formatDateToYYYYMMDD(selectedDate);

    useEffect(() => {
        // Fetch fault report data from the API
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
                            return { field: header, flex: 1 };
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

    useEffect(() => {
        // Check for data on linear threading status
        axios.get(`${API_URL}/api/getLinearThread?date=${date}&machineNumber=${machineNo}&isDayShift=${isDayShift}`)
            .then(response => {
                if (response.data) {
                    setLinearThread(response.data);
                }
            })
        .catch(error => {
            console.error('Error fetching linear thread data:', error);
        });
    }, [date, isDayShift, machineNo, updateTime]);

    const onSelectionChanged = (params) => {
        const selected = params.api.getSelectedRows();
        setSelectedRows(selected);

        // Check if there's existing data for each selected row
        selected.forEach(row => {
            if (!existingData[row['Fault']]) { // Only fetch if data doesn't already exist
                axios.get(`${API_URL}/api/getCorrectiveAction?date=${date}&machineNumber=${machineNo}&isDayShift=${isDayShift}&fault=${row['Fault']}`)
                    .then(response => {
                        if (response.data) {
                            // Store existing data
                            setExistingData(prev => ({
                                ...prev,
                                [row['Fault']]: response.data
                            }));
                        }
                    })
                .catch(error => {
                    console.error('Error fetching existing data:', error);
                });
            }
        });
    };

    const handleObservationChange = (index, event) => {
        const updatedRows = [...selectedRows];
        updatedRows[index].observation = event.target.value;
        setSelectedRows(updatedRows);
        // Mark the row as modified by storing the change
        setExistingData(prev => ({
            ...prev,
            [updatedRows[index]['Fault']]: {
                ...prev[updatedRows[index]['Fault']],
                observation: event.target.value
            }
        }));
    };

    const handleActionChange = (index, event) => {
        const updatedRows = [...selectedRows];
        updatedRows[index].action = event.target.value;
        setSelectedRows(updatedRows);
        // Mark the row as modified by storing the change
        setExistingData(prev => ({
            ...prev,
            [updatedRows[index]['Fault']]: {
                ...prev[updatedRows[index]['Fault']],
                action: event.target.value
            }
        }));
    };

    const handleSave = () => {
        if (selectedRows.length === 0) return;
    
        const reportData = {
            date: formatDateToYYYYMMDD(selectedDate),
            machineNumber: machineNo,
            isDayShift,
            linearThread,
            faults: selectedRows.map(row => {
                const faultId = row['Fault'];
    
                return {
                    fault: faultId,
                    // Use the data in the fields if they've been modified, otherwise use the existing data
                    observation: row.observation !== undefined ? row.observation : (existingData[faultId]?.observation || ''),
                    action: row.action !== undefined ? row.action : (existingData[faultId]?.action || ''),
                };
            })
        };
    
        axios.post(`${API_URL}/api/saveFaultReport`, reportData)
            .then(response => {
                alert('Data saved successfully');
            })
            .catch(error => {
                console.error('There was an error saving the data!', error);
                alert('Failed to save data');
            });
    
        // Save linear thread data
        axios.post(`${API_URL}/api/setLinearThread?date=${formatDateToYYYYMMDD(selectedDate)}&machineNumber=${machineNo}&isDayShift=${isDayShift}&linearThread=${linearThread}`)
            .catch(error => {
                console.error('Error saving linear thread data:', error);
            });
    };
    

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
        <div>
            <div className="ag-theme-alpine" style={{ width: '100%' }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    domLayout='autoHeight'
                    rowSelection="multiple"
                    onSelectionChanged={onSelectionChanged}
                />
            </div>

            {selectedRows.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Selected Fault Reports</h3>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '18px', display: 'block', marginBottom: '10px' }}>
                            <input
                                type="checkbox"
                                checked={linearThread}
                                onChange={(e) => setLinearThread(e.target.checked)}
                                style={{ width: '20px', height: '20px', marginRight: '10px' }}
                            />
                            Is the machine threaded correctly according to the linear threading spec sheet?
                        </label>
                    </div>

                    {selectedRows.map((row, index) => (
                        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                            <h4>Fault: {row['Fault']}</h4>
                            <p>Percentage / Time: {row['percentage / time']}</p>
                            <div style={{ marginTop: '10px' }}>
                                <label>
                                    Observations:
                                    <textarea
                                        value={row.observation !== undefined ? row.observation : (existingData[row['Fault']]?.observation || '')}
                                        onChange={(event) => handleObservationChange(index, event)}
                                        style={{ width: '100%', height: '50px', marginTop: '10px' }}
                                    />
                                </label>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <label>
                                    Actions:
                                    <textarea
                                        value={row.action !== undefined ? row.action : (existingData[row['Fault']]?.action || '')}
                                        onChange={(event) => handleActionChange(index, event)}
                                        style={{ width: '100%', height: '50px', marginTop: '10px' }}
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleSave} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                        Save (Will Overwrite Existing Data With Changes)
                    </button>
                </div>
            )}
        </div>
    );
};
