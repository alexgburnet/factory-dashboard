import './App.css'
import { NavBar } from './Components/NavBar/NavBar'
import { OverviewBarChart } from './Components/OverviewBarChart/OverviewBarChart'
import { MachineCard } from './Components/MachineCard/MachineCard'

function App() {

  return (
    <>
      <NavBar />
      <OverviewBarChart />
      <div>
        <MachineCard />
        <MachineCard />
        <MachineCard />
        <MachineCard />
      </div>
    </>
  )
}

export default App
