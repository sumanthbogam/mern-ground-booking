import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../api/axios";

const EditGround = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [groundData, setGroundData] = useState({
    name: "",
    location: "",
    pricePerHour: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchGround = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await Axios.get(`/admin/ground/${id}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        setGroundData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch ground details");
      }
    };
    fetchGround();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroundData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setGroundData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    for (let key in groundData) {
      fd.append(key, groundData[key]);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await Axios.put(`/admin/groundedit/${id}`, fd, {
        headers: { authorization: `Bearer ${token}` },
      });

      alert(res.data.msg || "Ground updated successfully");
      navigate("/admin/allGrounds");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-yellow-200">
      <div className="bg-white border rounded-lg shadow-xl w-full max-w-lg p-6">
        <h1 className="text-center text-xl font-bold mb-6">Edit Ground</h1>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block mb-1 font-medium">Ground Name</label>
            <input
              type="text"
              name="name"
              value={groundData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={groundData.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price Per Hour</label>
            <input
              type="number"
              name="pricePerHour"
              value={groundData.pricePerHour}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={groundData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGround;
