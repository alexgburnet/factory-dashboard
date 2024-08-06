import './Home.css';

import { NavBar } from '../NavBar/NavBar';
import { OverviewBarChart } from '../OverviewBarChart/OverviewBarChart';
import { MachineCardContainer } from '../MachineCardContainer/MachineCardContainer';

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="chart-container">
        <OverviewBarChart />
      </div>
      <MachineCardContainer className="machine-card-container"/>
    </>
  );
}