import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins, scales, Ticks} from 'chart.js';
import axios from 'axios';
import {useEffect, useState, useContext} from 'react';
import {DateContext} from '../../DateContext';
import API_URL from '../../config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const OverviewBarChart = () => {

    const [overviewData, setOverviewData] = useState(null);
    const [error, setError] = useState(null);

    const { selectedDate } = useContext(DateContext);
    const date = formatDateToDDMMYYYY(selectedDate);

    useEffect(() => {
        axios.get(`${API_URL}/api/overview?date=${date}`)
            .then((response) => {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setOverviewData(response.data);
                    setError(null);
                    console.log(response.data.machines.numbers);
                    console.log(response.data.machines.percentRun);
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, [selectedDate]);

    if (error) {
        return (
            <div>
                <p>Machine Data not available for the selected date</p>
            </div>
        );
    } else if (overviewData === null) {
        return <div>Loading...</div>;
    }

    const getColor = (value) => {
        if (value >= 80) {
            return 'green';
        } else if (value >= 50) {
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

const formatDateToDDMMYYYY = (date) => {
    const day = parseInt(date.getDate());
    const month = parseInt(date.getMonth() + 1);
    const year = date.getFullYear().toString();

    return `${day}.${month}.${year}`;
};
