import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { NavBar } from '../NavBar/NavBar';
import { FaultLog } from '../FaultLog/FaultLog';
import { FaultReport } from '../FaultReport/FaultReport';

import './MachineSpecifics.css';

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