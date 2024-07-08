import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins, scales, Ticks} from 'chart.js';
import axios from 'axios';
import {useEffect, useState} from 'react';

import {barChartData} from '../../DATA.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const OverviewBarChart = () => {

    const [overviewData, setOverviewData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/overview')
            .then((response) => {
                setOverviewData(response.data);
                console.log(response.data.machines.numbers);
                console.log(response.data.machines.percentRun);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    if (overviewData === null) {
        return <div>Loading...</div>;
    }

    const barChartData = {
        labels: overviewData.machines.numbers,
        datasets: [
            {
                data: overviewData.machines.percentRun,
                backgroundColor: ["green", "green", "orange", "red", "red", "red", "orange", "red"],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Percentage Running Time by Machine",
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
                },
            }
        }
    };


    return (
        <div>
            <Bar options={options} data={barChartData} className='bar-chart'/>
        </div>
    );
}