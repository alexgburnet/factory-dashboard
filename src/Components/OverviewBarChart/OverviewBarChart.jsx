import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

import {barChartData} from '../../DATA.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const OverviewBarChart = () => {

    const options = {};


    return (
        <div>
            <Bar options={options} data={barChartData} className='bar-chart'/>
        </div>
    );
}