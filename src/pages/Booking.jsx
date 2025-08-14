
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
      });
      console.log(res);
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
  
    



return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{name}</h1>
      <img src={`http://localhost:3000/uploads/${img}`} alt={id} className="w-full h-96 object-cover mb-4" />
      <p className="text-gray-600">Location: {location}</p>
      <p className="text-gray-600">Price: ₹{price}</p>
       <div className="mt-4">
        <label>Select Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="block mt-1" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {timeSlots.map((slot) => {
            const isBooked=bookedSlots.includes(slot);
  return (
    <button 
    key={slot}
              disabled={isBooked}
              onClick={() => setSelectedSlot(slot)}
               className={`border p-2 rounded ${
                isBooked ? "bg-gray-300 cursor-not-allowed" :
                selectedSlot === slot ? "bg-green-500 text-white" : "bg-white"
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
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Book Now
        </button>
      )}
      <button
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 cursor-pointer"
              onClick={handleGenerateRequest}
            >
              Generate Request
            </button>

            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
              onClick={handleAllRequest}
            >
              All Requests
            </button>


            {showForm && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Generate Request</h2>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="number"
                placeholder="Number of Players Needed"
                value={playersNeeded}
                onChange={(e) => setPlayersNeeded(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />

              <textarea
                placeholder="Any requirements or notes"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                rows={3}
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700"
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
        <div>
          <h3>Requests for this ground</h3>
          {requests.length === 0 ? (
            <p>No requests found</p>
          ) : (
            requests.map((req) => (
              <div
                key={req._id}
                style={{
                  border: "1px solid gray",
                  padding: "10px",
                  margin: "10px 0"
                }}
              >
                <p><strong>Username:</strong> {req.userId?.name}</p>
                <p><strong>Players Needed:</strong> {req.playersNeeded}</p>
                <p><strong>Description:</strong> {req.requirements}</p>
                <button onClick={handleAccept} className="bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 cursor-pointer">Accept</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;




