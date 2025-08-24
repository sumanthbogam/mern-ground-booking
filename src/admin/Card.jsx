import React from 'react'
import Axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Card = ({id,name,location,priceperHour,image,onDelete}) => {


  const navigate=useNavigate();




    const handleEdit=(e)=>{
        e.printDefault;
        navigate(`/admin/editGround/${id}`);


    }
    



  return (
    <div className="flex bg-white shadow-md rounded-2xl p-4 mb-4 w-full max-w-2xl mx-auto">
      

     
      <div className="w-1/3">
        <img
          src={`http://localhost:3000/uploads/${image}`}
          alt={name}
          className="w-full h-40 object-cover rounded-xl"
        />
      </div>

      <div className="w-2/3 pl-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-1">📍 {location}</p>
          <p className="text-gray-700 font-semibold mt-2">
             ₹{priceperHour} / hour
          </p>
        </div>
        <div className="flex justify-end ">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
          onClick={()=>onDelete(id)}
          >
            Delete
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card
