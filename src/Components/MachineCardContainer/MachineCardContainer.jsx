import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MachineCard } from '../MachineCard/MachineCard';

export const MachineCardContainer = () => {

    const [machines, setMachines] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/machineNumbers')
            .then((response) => {
                console.log(response.data);
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