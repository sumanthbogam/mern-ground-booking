import React from 'react'
import { useState } from 'react'
import Axios from '../api/axios'

const AddGround = () => {

    const [groundData,setGroundData]=useState({
        name:"",
        location:"",
        pricePerHour:"",
        description:"",
        img:null,
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setGroundData((prev)=>({...prev,[name]:value}))
        

    }
    const handleImageChange=(e)=>{
        setGroundData((prev)=>({...prev,
            image:e.target.files[0]
        }))

    }
    const handleSubmit=(e)=>{
        e.printDefault();

        const fd=new FormData();
     for(let key in groundData){
        fd.append(key,groundData[key]);
     }
     try{const token=localStorage.get(token);

     const res=Axios.post("/admin/addGround",fd,{
        headers:{
            authorization:`Bearer ${token}`
        }
     }
    
    )
    alert(res.data.msg||"ground added successfully")}
    catch(err){
        console.error(err);
        alert(err.response?.data?.msg||"error ground not added")}

    }





    





  return (
    <div className='min-h-screen flex justify-center items-center bg-yellow-200'>
        <div className='bg-white border rounded-lg shadow-xl w-full max-w-lg'>
            <h1 className='text-center text-xl px-3 py-3 mb-6'>Add Ground</h1>

          <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label className='block mb-1 ml-3 font-medium'>Ground Name</label>
                    <input type='text' name='name' placeholder='enter Ground Name' value={groundData.name} onChange={handleChange} className='ml-3 border rounded w-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-200' required/>
                </div>
                 <div>
            <label className="ml-3 block mb-1 font-medium">Location (Google Maps link or name)</label>
            <input
              type="text"
              name="location"
              value={groundData.location}
              onChange={handleChange}
              className="ml-3 border rounded w-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              required
            />
            <p className="ml-3 text-sm text-gray-500 mt-1">Paste Google Maps location link or type manually</p>
          </div>
          <div>
            <label className="ml-3 block mb-1 font-medium">Price Per Hour</label>
            <input
              type="number"
              name="pricePerHour"
              value={groundData.pricePerHour}
              onChange={handleChange}
              className=" ml-3 border rounded w-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              required
            />
          </div>

          <div>
            <label className="ml-3 block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={groundData.description}
              onChange={handleChange}
              className="ml-3 border rounded w-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="ml-3 block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="ml-3 border rounded w-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <button
            type="submit"
            className="ml-3 w-md bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2 cursor-pointer"
          >
            Submit
          </button>


            </form>


        </div>
      
    </div>
  )
}


export default AddGround
