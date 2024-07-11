import './App.css';
import { NavBar } from './Components/NavBar/NavBar';
import { OverviewBarChart } from './Components/OverviewBarChart/OverviewBarChart';
import { MachineCard } from './Components/MachineCard/MachineCard';
import { DateProvider } from './DateContext';
import { MachineCardContainer } from './Components/MachineCardContainer/MachineCardContainer';

function App() {
  return (
    <DateProvider>
      <NavBar />
      <div className="chart-container">
        <OverviewBarChart />
      </div>
      <MachineCardContainer className="machine-card-container"/>
    </DateProvider>
  );
}

export default App;
