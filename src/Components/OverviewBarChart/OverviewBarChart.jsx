import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins, scales, Ticks} from 'chart.js';

import {barChartData} from '../../DATA.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const OverviewBarChart = () => {

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