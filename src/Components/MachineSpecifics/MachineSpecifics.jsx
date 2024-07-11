import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import axios from 'axios';
import {DateContext} from '../../DateContext';
import API_URL from '../../config';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Using Alpine theme for Ag-Grid
import { FaultLog } from '../FaultLog/FaultLog';

export const MachineSpecifics = () => {
    const { machineNo } = useParams();
    

  return (
    <div>
      <NavBar />
      <h1>Machine {machineNo} Fault Log:</h1>

      <FaultLog machineNo={machineNo}/>
      
    </div>
  );
}

const formatDateToDDMMYYYY = (date) => {
    const day = parseInt(date.getDate());
    const month = parseInt(date.getMonth() + 1);
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
};