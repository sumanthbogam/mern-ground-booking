import React,{useState,useEffect} from 'react'
import Axios from "../api/axios";
import Card from './Card';
import { useNavigate } from 'react-router-dom';


const AdminGrounds = () => {
    const [grounds,setGrounds]=useState([]);
    const navigate=useNavigate()


    const handleAdd=(e)=>{
        e.printDefault;
        navigate("/admin/addGround")


    }
    
    


    useEffect(()=>{
        const fetchGrounds=async ()=>{
      try { const id=localStorage.getItem("adminId");
        console.log(id);
        // const token=localStorage.getItem("token");
        const result=await Axios.get("/admin/getGrounds",{headers:{adminid:id}});
        setGrounds(result.data.grounds);
        
        console.log(result.data.grounds);
        }

catch(err){
    console.log(err)
}}
        fetchGrounds();


    },[])


    const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(
        `/admin/delete/${id}`
      );
      console.log(res.data);

      if (res.data.success) {
        setGrounds((prev) => prev.filter((ground) => ground._id !== id));
      }
    } catch (err) {
      console.error("Error deleting ground:", err);
    }
  };
    





  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-5 ">
        <h1 className="text-2xl font-bold text-gray-800 justify-center" >My Grounds</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
        onClick={handleAdd}
        >
          + Add Ground
        </button>
      </div>

      <div className="space-y-4">
        {grounds.length > 0 &&(
          grounds.map((ground) => (
            <Card
              key={ground._id}
              id={ground._id}
              name={ground.name}
              location={ground.location}
              priceperHour={ground.pricePerHour}
              image={ground.image}
              onDelete={handleDelete}
            />
          ))
        ) }
      </div>
    </div>
  )
}

export default AdminGrounds
