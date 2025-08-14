import React from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "../api/axios";

const GroundCardUser = ({ name, img, id, location, price }) => {
  const navigate = useNavigate();

  

  const handleClick = () => {
    navigate(`/booking/${id}`, {
      state: {
        name,
        img,
        location,
        price,
      },
    });
  };

  

  return (
    <>
    
      <div className="bg-white shadow-lg m-4 rounded-lg overflow-hidden hover:shadow-2xl transition">
        <img
          src={`http://localhost:3000/uploads/${img}`}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{name}</h2>

          <div className="flex flex-col gap-2">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer"
              onClick={handleClick}
            >
              Book
            </button>

            
          </div>
        </div>
      </div>

      
          
      
    </>
  );
};

export default GroundCardUser;
