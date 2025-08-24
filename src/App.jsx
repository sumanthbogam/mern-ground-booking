 import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Regstr from "./pages/Regstr.jsx";
import Login from './pages/Login.jsx';
import AdminRegister from './admin/AdminRegister.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AddGround from './admin/AddGround.jsx';
import Home from "./pages/Home.jsx";
import Booking from './pages/Booking.jsx';
import ProtectedRoute from './api/Protectedroute.jsx';
import AdminGrounds from './admin/AdminGrounds.jsx';
import UserBookings from './pages/UserBookings.jsx';
import EditGround from './admin/EditGround.jsx';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Dashboard />}/>
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/Booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>}/>

        <Route path="/register" element={<Regstr/>}/>
        <Route path="/userBookings" element={<UserBookings/>}/>
        
        <Route path="/admin/register" element={<AdminRegister/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/allGrounds" element={<AdminGrounds/>}/>
        <Route path="/admin/addGround" element={<ProtectedRoute><AddGround/></ProtectedRoute>}/>
        <Route path="/admin/editGround/:id" element={<ProtectedRoute><EditGround/></ProtectedRoute>}/>


      </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
