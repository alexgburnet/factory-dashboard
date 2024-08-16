import './Home.css';

import { NavBar } from '../NavBar/NavBar';
import { OverviewBarChart } from '../OverviewBarChart/OverviewBarChart';
import { MachineCardContainer } from '../MachineCardContainer/MachineCardContainer';
import { ActionList } from '../ActionList/ActionList';

export const Home = () => {
  return (
    <>
      <NavBar />
      <div className="chart-container">
        <OverviewBarChart />
      </div>
      <div className="action-list-container">
        <ActionList />
      </div>
      <MachineCardContainer className="machine-card-container"/>
    </>
  );
}