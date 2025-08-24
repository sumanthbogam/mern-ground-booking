import React from 'react'
import {useState,useEffect} from "react";
import Axios from "../api/axios";
import GroundCardUser from '../components/GroundCardUser';
import { useNavigate } from 'react-router-dom';
import UserBookings from './UserBookings';



const Home = () => {
   
    const [search,setSearch]=useState("")
    const [grounds,setgrounds]=useState([]);
    const navigate=useNavigate();
    
      
    
      useEffect(() => {
        
      const fetchGrounds = async () => {
        try {
       
          const result = await Axios.get("/user/getAllafter"); 
          console.log(result.data.grounds);
          setgrounds(result.data.grounds);
        } catch (err) {
          console.error("Error fetching grounds:", err);
        }
      };
    
      fetchGrounds(); 
    }, []);

    const handleLogout=(e)=>{
      e.preventDefault();
      localStorage.removeItem("token");
      navigate("/");

    }

    const handleBooking=async (e)=>{
      e.preventDefault();
      const id=localStorage.getItem("userid")
      const token=localStorage.getItem("token")
      const result=await Axios.get(`/user/myBookings/${id}`,{headers:{
            authorization:`Bearer ${token}`
        }});
      console.log(result.data.bookedGrounds[0].date);

      navigate("/UserBookings", {
  state: { bookings: result.data.bookedGrounds }
});
    }

    const filteredGrounds = grounds.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase())
  );



  return (
   <div className="min-h-screen bg-yellow-100">
  <header className="flex items-center justify-between px-8 py-4 bg-blue-100 shadow-md">
    <h1 className="text-2xl font-bold text-center flex-1">Ground Booking</h1>
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer" 
        onClick={handleBooking}
      >
        My Bookings
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </header>
  <main className="p-8">
    <div className="mb-8 flex justify-center">
      <input
        type="text"
        placeholder="Search by name or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredGrounds.map((ground) => (
        <GroundCardUser
          key={ground._id} 
          id={ground._id}
          name={ground.name}
          img={ground.image}
          location={ground.location}
          price={ground.pricePerHour}
        />
      ))}
    </div>
  </main>
</div>





  )
}

export default Home
