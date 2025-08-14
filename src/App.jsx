 import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from './pages/dashboard';
import Regstr from "./pages/Regstr.jsx";
import Login from './pages/Login.jsx';
import AdminRegister from './admin/AdminRegister.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AddGround from './admin/AddGround.jsx';
import Home from "./pages/Home.jsx";
import Booking from './pages/Booking.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Dashboard/>}/>
        <Route path="Home" element={<Home/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/Booking/:id" element={<Booking/>}/>

        <Route path="/register" element={<Regstr/>}/>
        <Route path="/admin/register" element={<AdminRegister/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/addGround" element={<AddGround/>}/>

      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
