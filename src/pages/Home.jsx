import React from 'react'
import {useState,useEffect} from "react";
import Axios from "../api/axios";
import GroundCardUser from '../components/GroundCardUser';


const Home = () => {


    const [grounds,setgrounds]=useState([]);
    
      
    
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
  return (
   <div className='min-h-screen bg-yellow-100'>
        <header className="flex items-center justify-between p-4 bg-blue-100 shadow relative">
  <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
    Ground Booking
  </h1>
 
</header>
<main className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>

        {grounds.map((ground)=>
          (
            <GroundCardUser key={ground._id} id={ground._id} name={ground.name} img={ground.image} location={ground.location} pricer={ground.pricePerHour}/>
          )
        )}


       </main>
      
    </div>




  )
}

export default Home
