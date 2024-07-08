import './MachineCard.css'

import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import { pieChartData } from '../../DATA.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const MachineCard = (props) => {

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