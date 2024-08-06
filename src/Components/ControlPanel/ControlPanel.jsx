import API_URL from '../../config';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ControlPanel = () => {
    const [operators, setOperators] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedShift, setSelectedShift] = useState('day');
    const [selectedMachines, setSelectedMachines] = useState([]);

    const [machineData, setMachineData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/operators')
            .then((response) => {
                const transformedOperators = Object.keys(response.data).map(key => ({
                    id: key,
                    name: response.data[key]
                }));
                setOperators(transformedOperators);
            })
            .catch((error) => {
                console.error('API error:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${API_URL}/api/machineNumbers`)
            .then((response) => {
                setMachines(response.data);
            })
            .catch((error) => {
                console.error(error);
                setMachines([]);
            });
    }, []);

    const handleShiftSubmit = () => {
        if (!selectedOperator || !selectedDate || !selectedShift || selectedMachines.length === 0) {
            alert('Please fill in all fields');
            return;
        }

        const newMachineData = {
            operator: operators.find(op => op.id === selectedOperator).id,
            date: selectedDate,
            shift: selectedShift,
            machines: selectedMachines
        };

        setMachineData(newMachineData);

        try {
            axios.post(`${API_URL}/api/setAccountableKnitter`, newMachineData)
                .then((response) => {
                    console.log('Shift data submitted:', response.data);
                })
                .catch((error) => {
                    console.error('API error:', error);
                });
        } catch (error) {
            console.error('API error:', error);
        }
    };

    const handleMachineChange = (event) => {
        const value = event.target.value;
        setSelectedMachines(prev => 
            prev.includes(value) ? prev.filter(machine => machine !== value) : [...prev, value]
        );
    };

    return (
        <>
            <h1>Control Panel</h1>
            <div>
                <h2>Input Knitter for Shift</h2>
                <select onChange={(e) => setSelectedOperator(e.target.value)}>
                    <option value="">Select Operator</option>
                    {operators.map((operator) => (
                        <option key={operator.id} value={operator.id}>
                            {operator.name}
                        </option>
                    ))}
                </select>

                <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
                
                <select onChange={(e) => setSelectedShift(e.target.value)}>
                    <option value="">Select Shift</option>
                    <option value="day">Day Shift</option>
                    <option value="night">Night Shift</option>
                </select>

                <h3>Machines responsible for:</h3>
                <form>
                    {machines.map((machine) => (
                        <div key={machine}>
                            <input 
                                type="checkbox" 
                                value={machine} 
                                onChange={handleMachineChange}
                            />
                            <label>{machine}</label>
                        </div>
                    ))}
                </form>

                <button onClick={handleShiftSubmit}>Submit</button>
            </div>
        </>
    );
};
