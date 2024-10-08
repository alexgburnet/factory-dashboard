import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { MachineCard } from '../MachineCard/MachineCard';
import API_URL from '../../config';

import './MachineCardContainer.css';

export const MachineCardContainer = () => {

    const [machines, setMachines] = useState([]);

    useEffect(() => {
        // Fetch machine numbers from the API
        axios.get(`${API_URL}/api/machineNumbers`)
            .then((response) => {
                setMachines(response.data);
            })
            .catch((error) => {
                console.error(error);
                setMachines(null);
            });
    }, []);

    if (machines === null) {
        return <div>Machine data not available</div>;
    }

    return (
        <div className="machine-card-container">
            {machines.map((machine) => (
                <Link to={`/machine/${machine}`} key={machine} className='machine-card-link'>
                    <MachineCard key={machine} machine={machine} />
                </Link>
            ))}
        </div>
    );
};