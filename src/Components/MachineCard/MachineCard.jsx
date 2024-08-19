import React, { useEffect, useState, useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

import API_URL from '../../config';
import { DateContext } from '../../DateContext';
import { ShiftContext } from '../../ShiftContext';
import { formatDateToYYYYMMDD } from '../../utilities/dateUtils';

import './MachineCard.css';

ChartJS.register(ArcElement, Tooltip, Legend);


export const MachineCard = (props) => {

    const [machineData, setMachineData] = useState(null);
    const [error, setError] = useState(null);
    const [accountableKnitter, setAccountableKnitter] = useState(null);

    const { selectedDate } = useContext(DateContext);
    const { isDayShift } = useContext(ShiftContext);

    const date = formatDateToYYYYMMDD(selectedDate);

    useEffect(() => {
        // Fetch machine data from the API
        axios.get(`${API_URL}/api/machineCard?machineNumber=${props.machine}&date=${date}&shift=${isDayShift ? 'day' : 'night'}`)
            .then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setError(null);
                    setMachineData(response.data);
                }

                setMachineData(response.data);
            })
            .catch((error) => {
                console.error(error);
                return (
                    <div>
                        <h2>Machine {props.machine}</h2>
                        <p>Machine data not available</p>
                    </div>
                );
            });
    }, [selectedDate, isDayShift]);

    useEffect(() => {
        // Fetch accountable knitter data from the API
        axios.get(`${API_URL}/api/checkAccountableKnitter?date=${date}&shift=${isDayShift ? 'day' : 'night'}&machines=${props.machine}`)
            .then((response) => {
                const data = response.data;
                if (data["-1"]) {
                    setAccountableKnitter(data["-1"]); // No knitter found
                } else {
                    // Get the knitter assigned to the machine number, if none is assigned, set to "Not Assigned"
                    const knitter = Object.keys(data).length ? `${data[props.machine]}` : "Not Assigned";
                    setAccountableKnitter(knitter);
                }
            })
            .catch((error) => {
                setAccountableKnitter("Not Assigned");
            });
    }, [selectedDate, isDayShift]);

    if (error) {
        return (
            <div>
                <h2>Machine {props.machine}</h2>
                <p>Machine data not available</p>
            </div>
        );
    } else if (machineData === null) {
        return <div>Loading...</div>;
    }

    const pieChartData = {
        labels: Object.keys(machineData.downTime),
        datasets: [
            {
                label: "Time Spent",
                data: Object.values(machineData.downTime),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#F4E352",
                    "#7DDF64",
                    "#66CCCC",
                    "#CC99FF",
                    "#FF6666",
                    "#3399FF",
                    "#FFCC66",
                    "#B2FF66",
                    "#FF99CC",
                    "#8C66FF",
                    "#FFCC99",
                    "#66FF99",
                    "#FF99FF",
                    "#66FFFF"
                  ],
                hoverOffset: 4,
            }
        ]
    };

    const options = {
        repsonsive: true,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 10,
                },
            }
        }
    };

    return (
        <div className="machine-card">
            <div className="data-container">
                <div className="data">
                    <h2>Machine {props.machine}: {accountableKnitter}</h2>
                    <p>{(machineData.shiftHours - machineData.totalDownTime).toFixed(1)} hours run</p>
                    <p>{machineData.totalDownTime.toFixed(1)} hours down</p>
                    <p>{((machineData.shiftHours - machineData.totalDownTime) / machineData.shiftHours * 100).toFixed(1)}% run-time</p>
                </div>
                <div className="pie-chart">
                    <Pie options={options} data={pieChartData}/>
                </div>
            </div>
        </div>
    );
}
