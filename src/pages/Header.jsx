
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Cricket Ground Booking
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
