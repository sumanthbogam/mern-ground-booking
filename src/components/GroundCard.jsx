import React from 'react'
import { useNavigate } from 'react-router-dom'

const GroundCard = ({name,img}) => {

    const navigate=useNavigate();
  return (
    <div   className="bg-white shadow-lg m-4 rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition" onClick={()=>navigate("/register")}>
        <img src={`http://localhost:3000/uploads/${img}`} alt={name} />
        <h2>{name}</h2>

      
    </div>
  )
}

export default GroundCard
