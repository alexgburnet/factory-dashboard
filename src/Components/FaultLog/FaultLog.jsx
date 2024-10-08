import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { DateContext } from '../../DateContext';
import { ShiftContext } from '../../ShiftContext';
import { FaultDataContext } from '../../FaultDataContext';
import API_URL from '../../config';
import { formatDateToYYYYMMDD } from '../../utilities/dateUtils';

import DeleteButton from '../DeleteButton/DeleteButton';
import './FaultLog.css';


// Define a factory function for cellRenderer
const deleteButtonRenderer = (params) => {
  return (
    <DeleteButton
      data={params.data}
      onDelete={() => params.context.onDelete(params.data)}
    />
  );
};

export const FaultLog = (props) => {
  const machineNo = props.machineNo;
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  const { isDayShift } = useContext(ShiftContext);

  // Used to trigger a re-fetch of the fault report data after a deletion
  const { updateTime, setUpdateTime } = useContext(FaultDataContext);

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [error, setError] = useState(null);

  const date = formatDateToYYYYMMDD(selectedDate);

  useEffect(() => {
    fetchdata();
  }, [date, isDayShift, machineNo]);

  const fetchdata = () => {
    setUpdateTime(new Date());
    // Fetch fault log data from the API
    axios.get(`${API_URL}/api/faultLog?machineNumber=${machineNo}&date=${date}&shift=${isDayShift ? 'day' : 'night'}`)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setRowData(response.data.faultLog);

          const columns = response.data.headers.map((header) => ({
            field: header,
            flex: 1
          }));

          // Add a delete button column to the grid
          columns.push({
            headerName: 'Delete',
            field: 'delete',
            flex: 0.25,
            cellRenderer: deleteButtonRenderer, // Use cellRenderer instead of cellRendererFramework
            cellRendererParams: {
              context: {
                onDelete: handleDelete
              }
            }
          });

          setColumnDefs(columns);
          setError(null);
        }
      })
      .catch((error) => {
        console.error('API Error:', error);
        setError('Failed to fetch data');
      });
  }

  const handleDelete = (row) => {

    // Send a POST request to the API to delete the fault record
    axios.post(`${API_URL}/api/removeFault`, {
        ID: row.ID
    }).then(fetchdata).catch((error) => {
        alert('Failed to delete record');
    });
  };

  if (error) {
    return <div><p>Machine data not available: {error}</p></div>;
  }

  return (
    <div className="ag-theme-alpine" style={{ width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout='autoHeight'
      />
    </div>
  );
};
