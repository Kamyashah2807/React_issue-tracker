import './App.css';
import { Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Login from './Components/Login';
import Display from './Components/Admin/AdminDisplay';
import Registration from './Components/Registration';
import DisplayPost from './Components/User/UserDisplay';
import EditPost from './Components/User/EditPost';
import EditUser from './Components/Admin/EditUser';
import AddUser from './Components/Admin/AddUser';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
        <Route path="/display" element={<Display />} />
        <Route path="/display-data" element={<DisplayPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/adduser" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
