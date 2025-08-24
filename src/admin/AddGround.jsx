import React, { useState } from "react";
import Axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddGround = () => {
  const [groundData, setGroundData] = useState({
    name: "",
    location: "",
    pricePerHour: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleMyGrounds = () => {
    navigate("/admin/allGrounds");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroundData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setGroundData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    for (let key in groundData) {
      fd.append(key, groundData[key]);
    }

    try {
      const token = localStorage.getItem("token");

      const res = await Axios.post("/admin/addGround", fd, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.msg || "Ground added successfully");
      navigate("/admin/allGrounds");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error: ground not added");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-200">
      <header className="flex justify-between items-center bg-white shadow-md px-6 py-4">
        <h1 className="text-xl font-bold text-gray-700">🏏 Add Ground</h1>
        <div className="flex gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
            onClick={handleMyGrounds}
          >
            My Grounds
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex justify-center items-center py-8">
        <div className="bg-white border rounded-lg shadow-xl w-full max-w-lg p-6">
          <h2 className="text-center text-lg font-semibold mb-6">
            Add Ground Details
          </h2>

          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div>
              <label className="block mb-1 font-medium">Ground Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter ground name"
                value={groundData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Location (Google Maps link or name)
              </label>
              <input
                type="text"
                name="location"
                value={groundData.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Paste Google Maps link or type manually
              </p>
            </div>

            <div>
              <label className="block mb-1 font-medium">Price Per Hour</label>
              <input
                type="number"
                name="pricePerHour"
                value={groundData.pricePerHour}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={groundData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGround;
