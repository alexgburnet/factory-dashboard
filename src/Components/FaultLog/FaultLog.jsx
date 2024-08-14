import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DateContext } from '../../DateContext';
import { ShiftContext } from '../../ShiftContext';
import API_URL from '../../config';
import './FaultLog.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { formatDateToYYYYMMDD } from '../../utilities/dateUtils';

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
  const { selectedDate } = useContext(DateContext);
  const { isDayShift } = useContext(ShiftContext);

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [error, setError] = useState(null);

  const date = formatDateToYYYYMMDD(selectedDate);

  useEffect(() => {
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
  }, [date, isDayShift, machineNo]);

  const handleDelete = (row) => {
    console.log('Delete button clicked for row:', row);
    // Placeholder for API call and table refresh logic
    // You will need to contact your API and then refresh the table
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
