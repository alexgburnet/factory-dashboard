import React, { useEffect, useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import axios from 'axios';

import { DateContext } from '../../DateContext';
import { ShiftContext } from '../../ShiftContext';
import API_URL from '../../config';
import { formatDateToYYYYMMDD } from '../../utilities/dateUtils';

import './OverviewBarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const OverviewBarChart = () => {

    const [overviewData, setOverviewData] = useState(null);
    const [error, setError] = useState(null);
    const {isDayShift} = useContext(ShiftContext);

    const { selectedDate } = useContext(DateContext);
    const date = formatDateToYYYYMMDD(selectedDate);

    useEffect(() => {
        // Fetch overview data from the API
        axios.get(`${API_URL}/api/overview?date=${date}&shift=${isDayShift ? 'day' : 'night'}`)
            .then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setOverviewData(response.data);
                    setError(null);
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, [selectedDate, isDayShift]);

    if (error) {
        return (
            <div>
                <p>Machine Data not available for the selected date</p>
            </div>
        );
    } else if (overviewData === null) {
        return <div>Loading...</div>;
    }

    // Colour of bar chart changes based on the value
    const getColor = (value) => {
        if (value >= 80) {
            return 'green';
        } else if (value >= 70) {
            return 'orange';
        } else {
            return 'red';
        }
    };


    const barChartData = {
        labels: overviewData.machines.numbers,
        datasets: [
            {
                data: overviewData.machines.percentRun,
                backgroundColor: overviewData.machines.percentRun.map(getColor),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Percentage Running Time by Machine",
                font: {
                    size: 20, 
                },
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 15, 
                    },
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 17, 
                    },
                },
            },
        },
    };
    


    return (
        <Bar options={options} data={barChartData} className='bar-chart'/>
    );
}

