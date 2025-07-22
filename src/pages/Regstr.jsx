import React,{useState} from 'react';
import {useNavigate} from"react-router-dom"
import Axios from '../api/axios';
// import axios from 'axios';

const Regstr = () => {
   const [name,setName]=useState("");
      const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");

      const navigate=useNavigate();



  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{const res=await Axios.post("/user/register",{
      name,email,password
    });
    alert(res.data.msg);
    navigate("/login");
    }
    catch(err){
      console.error(err);
      alert(err.response?.data?.msg||"enter correct details");


    }
    

  }
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300'   >
        <div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
        <h1 className='text-center mb-6  text-2xl' >Register</h1>
          <form className="space-y-4" >
            <div>
              <label className='block mb-1'>Name </label>
              <input type="text" placeholder='enter your name' value={name} onChange={(e)=>setName(e.target.value)} 
              className='w-full px-2 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200'/>
            </div>
            <div>
              <label className='block mb-1'>Email </label>
              <input type="email" placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)}
              className='w-full px-2 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200' />
            </div>
            <div>
              <label className='block mb-1'>Password </label>
              <input type="password" placeholder='password length min 6' value={password} onChange={(e)=>setPassword(e.target.value)} 
              className='w-full px-2 py-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 '/>
            </div>
              <button onClick={handleSubmit} className='py-2 cursor-pointer text-white w-full bg-blue-400 rounded shadow hover:bg-blue-600'>submit</button>

              <span>already registered?<button className="cursor-pointer text-blue-800 "onClick={()=>navigate("/login")}>Login</button></span>
  
          </form>
        </div>
      </div>
    )
  }
export default Regstr
