import './MachineCard.css'

import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import axios from 'axios';

import {useEffect, useState, useContext} from 'react';

import {DateContext} from '../../DateContext';

ChartJS.register(ArcElement, Tooltip, Legend);

export const MachineCard = (props) => {

    const [machineData, setMachineData] = useState(null);

    const { selectedDate } = useContext(DateContext);

    const date = formatDateToDDMMYYYY(selectedDate);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/machine?machineNumber=${props.machine}&date=${date}`)
            .then((response) => {
                setMachineData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [selectedDate]);

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
                    <h2>Machine {props.machine}</h2>
                    <p>{(24 - machineData.totalDownTime).toFixed(1)} hours run</p>
                    <p>{machineData.totalDownTime.toFixed(1)} hours down</p>
                    <p>{((24 - machineData.totalDownTime) / 24 * 100).toFixed(1)}% run-time</p>
                </div>
                <div className="pie-chart">
                    <Pie options={options} data={pieChartData}/>
                </div>
            </div>
        </div>
    );
}

const formatDateToDDMMYYYY = (date) => {
    const day = parseInt(date.getDate());
    const month = parseInt(date.getMonth() + 1);
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
};
