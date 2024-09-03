import './App.css';

import { Home } from './Components/Home/Home';
import { ControlPanel } from './Components/ControlPanel/ControlPanel';
import { MachineSpecifics } from './Components/MachineSpecifics/MachineSpecifics';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

import { DateProvider } from './DateContext';
import { ShiftProvider } from './ShiftContext';
import { AuthProvider } from './AuthContext';
import { FaultDataProvider } from './FaultDataContext';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <FaultDataProvider>
      <DateProvider>
        <ShiftProvider>
          <AuthProvider>
            <Router>
              <Routes>

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/machine/:machineNo"
                  element={
                    <PrivateRoute
                      element={<MachineSpecifics />}
                    />
                  }
                />

                <Route
                  path="/controlpanel"
                  element={
                    <PrivateRoute
                      element={<ControlPanel />}
                    />
                  }
                />

              </Routes>
            </Router>
          </AuthProvider>
        </ShiftProvider>
      </DateProvider>
    </FaultDataProvider>
  );
}

export default App;
