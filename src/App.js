import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Authpage from "./Components/Authpage";
import Dashboard from "./Components/Dashboard";

function App() {
  
  return (
   
    <Router>
      <Routes>
        <Route exact path="/" element={<Authpage/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
