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
import { FaultReport } from '../FaultReport/FaultReport';

export const MachineSpecifics = () => {
    const { machineNo } = useParams();
    

  return (
    <div>
        <NavBar />

        <div className='fault-report-container'>
          <h1>Fault Report:</h1>
          <FaultReport className='fault-report' machineNo={machineNo}/>
        </div>

        <div className='fault-log-container'>
          <h1>Fault Log:</h1>
          <FaultLog className='fault-log' machineNo={machineNo}/>
        </div>

    </div>
  );
};