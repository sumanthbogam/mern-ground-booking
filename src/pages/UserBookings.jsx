import React from 'react'
import { useLocation } from 'react-router-dom';

const UserBookings = () => {
  const location = useLocation();
  const { bookings } = location.state || {};  

  if (!bookings) {
    return <p className="text-center mt-10">No bookings found</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="flex bg-white shadow-md rounded-2xl p-4 mb-4 w-full max-w-2xl mx-auto"
        >
          <div className="w-1/3">
            <img
              src={`http://localhost:3000/uploads/${booking.image}`}
              alt={booking.name}
              className="w-full h-40 object-cover rounded-xl"
            />
          </div>

          <div className="w-2/3 pl-4 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{booking.name}</h2>
              <p className="text-gray-700 font-semibold mt-2">{booking.date}</p>
              <p className="text-gray-700 font-semibold mt-2">{booking.timeslot}</p>
            </div>
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBookings;
