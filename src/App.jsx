import './App.css';
import { NavBar } from './Components/NavBar/NavBar';
import { OverviewBarChart } from './Components/OverviewBarChart/OverviewBarChart';
import { MachineCard } from './Components/MachineCard/MachineCard';
import { DateProvider } from './DateContext';

function App() {
  return (
    <DateProvider>
      <NavBar />
      <div className="chart-container">
        <OverviewBarChart />
      </div>
      <div className="machine-card-container">
        <MachineCard machine={1}/>
        <MachineCard machine={2}/>
        <MachineCard machine={3}/>
        <MachineCard machine={17}/>
        <MachineCard machine={19}/>
        <MachineCard machine={26}/>
        <MachineCard machine={27}/>
        <MachineCard machine={28}/>
      </div>
    </DateProvider>
  );
}

export default App;
