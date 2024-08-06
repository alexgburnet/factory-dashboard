import API_URL from '../../config';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ControlPanel.css';
import { FaCog, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ControlPanel = () => {
    const [operators, setOperators] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedShift, setSelectedShift] = useState('day');
    const [selectedMachines, setSelectedMachines] = useState([]);

    const [machineData, setMachineData] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/operators`)
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
    
        // Step 1: Check if machines are already assigned
        axios.get(`${API_URL}/api/checkAccountableKnitter?date=${selectedDate}&shift=${selectedShift}&machines=${selectedMachines.join(',')}`)
            .then((response) => {
                const existingAssignments = response.data;
    
                // Step 2: Prepare a message to show if there are existing assignments
                const assignedMachines = Object.keys(existingAssignments).filter(machineId => selectedMachines.includes(machineId));
                
                if (assignedMachines.length > 0) {
                    const assignmentDetails = assignedMachines.map(machineId => 
                        `Machine ${machineId}: ${existingAssignments[machineId]}`
                    ).join('\n');
    
                    const message = `The following machines are already assigned:\n${assignmentDetails}\n\nDo you want to overwrite these assignments?`;
    
                    if (window.confirm(message)) {
                        // Step 3: Proceed with overwriting
                        axios.post(`${API_URL}/api/setAccountableKnitter`, newMachineData)
                            .then((response) => {
                                console.log('Shift data submitted:', response.data);
                                alert('Assignment updated successfully!');
                            })
                            .catch((error) => {
                                console.error('API error:', error);
                            });
                    } else {
                        alert('Assignment not updated.');
                    }
                } else {
                    // No existing assignment, proceed with posting new data
                    axios.post(`${API_URL}/api/setAccountableKnitter`, newMachineData)
                        .then((response) => {
                            console.log('Shift data submitted:', response.data);
                            alert('Assignment added successfully!');
                        })
                        .catch((error) => {
                            console.error('API error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('API error:', error);
            });
    };
    

    const handleMachineChange = (event) => {
        const value = event.target.value;
        setSelectedMachines(prev => 
            prev.includes(value) ? prev.filter(machine => machine !== value) : [...prev, value]
        );
    };

    return (
        <>
            <div className='home-icon-container'>
                <Link to="/" className="navbar-link">
                    <FaHome className="icon" size={35} /> {/* Home icon */}
                </Link>
            </div>
            <div className="control-panel-container">
                <h1>Control Panel</h1>
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
