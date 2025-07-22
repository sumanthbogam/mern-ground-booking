import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import Axios from '../api/axios';

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
   const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const res=await Axios.post("/admin/login",{
      email,password
    });
    alert(res.data.msg);
    localStorage.setItem("token",res.data.token)
    navigate("/home")
  }

  catch(err){
    console.error(err)
       alert(err.response?.data?.msg||"enter correct details");
  }}


 
  return (
    <div className='min-h-screen flex justify-center items-center bg-blue-200'>
        <div className='px-5 py-5 border rounded shadow-xl bg-white w-full max-w-md ' >
        <h1 className='text-center text-2xl px-2 py-2'>Login</h1>
        <form >
            <div>
            <label className='block mb-3'>Email</label>
            <input type="email" placeholder='enter email' value={email} onChange={(e)=>setEmail(e.target.value)}    className='px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200'/>
            </div>
            <div>
            <label className='block mb-3'>Password</label>
            <input type="password" placeholder='password length min 6' value={password} onChange={(e)=>setPassword(e.target.value)} className='px-2 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200'/>
            </div>
            <button onClick={handleSubmit} className='mt-4 w-full px-4 py-2 border rounded cursor-pointer text-white bg-blue-400 hover:bg-blue-600'>Login</button>
            <span className='px-3'>not Registered?<button className='text-blue-600 hover:text-blue-800 cursor-pointer px-3 py-3  ' onClick={()=>navigate("/register")}>Register</button></span>


        </form>
        </div>
      
    </div>
  )
}

export default Login
