import './App.css';
import { Home } from './Components/Home/Home';
import { MachineSpecifics } from './Components/MachineSpecifics/MachineSpecifics';
import { DateProvider } from './DateContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  

  return (
    <DateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/machine/:machineNo" element={<MachineSpecifics/>}/>
        </Routes>
      </Router>
    </DateProvider>
  );
}

export default App;
