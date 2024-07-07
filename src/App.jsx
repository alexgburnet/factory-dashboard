import './App.css'
import { NavBar } from './Components/NavBar'
import { OverviewBarChart } from './Components/OverviewBarChart'
import { MachineCard } from './Components/MachineCard'

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
