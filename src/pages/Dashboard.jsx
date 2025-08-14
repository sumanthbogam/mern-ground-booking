import React from 'react'
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import GroundCard from '../components/GroundCard';
import AdminRegister from '../admin/AdminRegister';
import Axios from "../api/axios";


const Dashboard = () => {
  console.log("Dashboard component rendered");
  


  const [grounds,setgrounds]=useState([]);

  

  useEffect(() => {
    
  const fetchGrounds = async () => {
    try {
      console.log("called");
      const result = await Axios.get("/user/getAll"); 
      console.log(result.data.grounds);
      setgrounds(result.data.grounds);
    } catch (err) {
      console.error("Error fetching grounds:", err);
    }
  };

  fetchGrounds(); 
}, []);


  
    const navigate=useNavigate();
  return (
    <div className='min-h-screen bg-yellow-100'>
        <header className="flex items-center justify-between p-4 bg-blue-100 shadow relative">
  {/* Center title */}
  <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
    Ground Booking
  </h1>

  {/* Right-side buttons */}
  <div className="ml-auto space-x-2">
    <button
      className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer"
      onClick={() => navigate("/admin/register")}
    >
      Admin
    </button>

    <button
      className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
    <button
      className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
      onClick={() => navigate("/register")}
    >
      Register
    </button>
  </div>
</header>

       <main className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>

        {grounds.map((ground)=>
          (
            <GroundCard key={ground._id} id={ground._id} name={ground.name} img={ground.image}/>
          )
        )}


       </main>
      
    </div>
  )
}

export default Dashboard
