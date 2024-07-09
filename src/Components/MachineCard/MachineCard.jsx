import './MachineCard.css'

import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { pieChartData } from '../../DATA.js';
import axios from 'axios';

import {useEffect, useState} from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const MachineCard = (props) => {

    const [machineData, setMachineData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/machine?machineNumber=${props.machine}`)
            .then((response) => {
                setMachineData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    if (machineData === null) {
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
        <div className="container">
            <div className="data-container">
                <div className="data">
                    <h2>Machine: {props.machine}</h2>
                    <p>X hours run</p>
                    <p>Y hours down</p>
                    <p>Z % run-time</p>
                </div>
                <div className="pie-chart">
                    <Pie options={options} data={pieChartData}/>
                </div>
            </div>
        </div>
    );
}