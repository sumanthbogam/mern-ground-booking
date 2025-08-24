
import React, { useState ,useEffect} from "react";
import { useLocation, useParams } from 'react-router-dom';
import Axios from "../api/axios"


const Booking = ( ) => {

    console.log("world");
  const { id } = useParams();
  const locationState = useLocation();
  const { name, img, location, price } = locationState.state;
    const timeSlots = [
  "06:00 AM - 07:00 AM",
  "07:00 AM - 08:00 AM",
  "08:00 AM - 09:00 AM",
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
];
const [showForm, setShowForm] = useState(false);
  const [playersNeeded, setPlayersNeeded] = useState('');
  const [requirements, setRequirements] = useState('');
  const [date, setDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  const fetchBookedSlots = async () => {
    try {
      const res = await Axios.get("ground/bookings/getBookedSlots", {
       params:{ groundId: id,
        date}
      });
      setBookedSlots(res.data.bookedSlots);
    } catch (err) {
      console.error("Error fetching booked slots:", err);
    }
  };

  useEffect(()=>{
     if(date) fetchBookedSlots();
  },[date]) 




const handleBooking = async () => {
    try {
        const userId=localStorage.getItem("userid")
        console.log("hello");
      const res = await Axios.post("ground/bookings/bookSlot", {
        groundId: id,
        date,
        timeslot: selectedSlot,
        userId: userId,
        image:img||"",
        name:name
      });
      console.log(res.data);
      fetchBookedSlots()
      alert("Booking successful!");
    } catch (err) {
      alert("Booking failed",err);
    }
  };

   const handleGenerateRequest = () => {
      setShowForm(true);
    };
  
    const handleAllRequest=async (e)=>{

       e.preventDefault();
       
      try{const result = await Axios.get("/gen/getAllRequests",{params: {
        id,
       
      }});
      console.log(result);
      console.log(result.data);
      console.log(result.data[0].playersNeeded);
      console.log(result.data[0].requirements);

      setRequests(result.data);
      setShowRequests(true);
      
    }
      catch(err){
        console.log(err)
      }
      
  
    }
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try{const userId=localStorage.getItem("userid")
      const res = await Axios.post("/gen/request", {
        groundId: id,
        playersNeeded,
        requirements,
        userId:userId

      });
  
      console.log(res);
      setPlayersNeeded('');
      setRequirements('');
      setShowForm(false);
    alert("request success");}
      catch(err){
        console.log(err);
        alert(err);
      }
    };

    const handleAccept=()=>{
      


    }
    const today = new Date().toISOString().split("T")[0];
  
    



return (
  <div className="p-6 max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{name}</h1>
    <img
      src={`http://localhost:3000/uploads/${img}`}
      alt={id}
      className="w-full h-96 object-cover rounded-xl shadow-md mb-6"
    />
    <div className="flex justify-between items-center mb-6 text-lg text-gray-700">
      <p><span className="font-semibold">📍 Location:</span> {location}</p>
      <p><span className="font-semibold">💰 Price:</span> ₹{price}</p>
    </div>
    <div className="mb-6">
      <label className="block font-semibold mb-2 text-gray-700">Select Date:</label>
      <input
        type="date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
        className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
      {timeSlots.map((slot) => {
        const isBooked = bookedSlots.includes(slot);
        return (
          <button
            key={slot}
            disabled={isBooked}
            onClick={() => setSelectedSlot(slot)}
            className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm 
              ${isBooked
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : selectedSlot === slot
                ? "bg-green-500 text-white shadow-md"
                : "bg-white border hover:bg-green-100"
              }`}
          >
            {slot}
          </button>
        );
      })}
    </div>
    {selectedSlot && (
      <button
        onClick={handleBooking}
        className="w-full mb-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        ✅ Book Now
      </button>
    )}

    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button
        className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
        onClick={handleGenerateRequest}
      >
        ✨ Generate Request
      </button>
      <button
        className="flex-1 bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
        onClick={handleAllRequest}
      >
        📋 View All Requests
      </button>
    </div>
    {showForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Generate Request</h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              type="number"
              placeholder="Number of Players Needed"
              value={playersNeeded}
              onChange={(e) => setPlayersNeeded(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />

            <textarea
              placeholder="Any requirements or notes"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={3}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
                onClick={handleFormSubmit}
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    {showRequests && (
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">📌 Requests for this Ground</h3>
        {requests.length === 0 ? (
          <p className="text-gray-500">No requests found.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <p><span className="font-semibold">👤 Username:</span> {req.userId?.name}</p>
                <p><span className="font-semibold">👥 Players Needed:</span> {req.playersNeeded}</p>
                <p><span className="font-semibold">📝 Description:</span> {req.requirements}</p>
                <button
                  onClick={handleAccept}
                  className="mt-3 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition"
                >
                  ✅ Accept
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

};

export default Booking;




