import './App.css';
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Login from './Components/Login';
import Display from './Components/AdminDisplay';
import Registration from './Components/Registration';
import DisplayPost from './Components/UserDisplay';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
        <Route path="/display" element={<Display />} />
        <Route path="/display-data" element={<DisplayPost />} />
      </Routes>
    </div>
  );
}

export default App;
