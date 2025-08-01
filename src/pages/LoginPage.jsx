
import React, { useContext } from 'react'
import {useState} from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext';
import logo_bio from '../assets/logo_icon.svg'

const LoginPage = () => {
  const [currentState,setCurrentState]=useState("Sign up");
  
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [bio,setBio]=useState("");
  const [isDataSubmitted,setDataSubmited]=useState(false)

  const {login}=useContext(AuthContext);

  const onSubmitHandler=(event)=>{
    event.preventDefault();

    if(currentState==="Sign up" && !isDataSubmitted){
      setDataSubmited(true);
      return;
    }
    login(currentState==="Sign up"? 'signup':'login',{fullName,email,password,bio});
  }

  return (
    <div className='min-h-screen bg-cover flex items-center justify-center
     gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* -----------left--------- */}
      <img src={logo_bio} alt="logo" className='w-[min(30vw,250px)]' />

      {/* -----------right-------------- */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/10 text-white border-gray-500 p-6 flex
        flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currentState}
          {isDataSubmitted && 
           <img onClick={()=>{setDataSubmited(false)}} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
          }
        </h2>
        {currentState==="Sign up"  && !isDataSubmitted && (

          <input onChange={(e)=>setFullName(e.target.value)} value={fullName}
           type="text"  className='p-2 border border-gray-500 rounded-md
        focus:outline-none' placeholder='Full Name' required/>
        )}


        {!isDataSubmitted && (
          <>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}
          type="email" placeholder='Email Address' required className='p-2
         border border-gray-500 rounded-md focus:outline-none 
         focus:ring-2 focus:ring-indigo-500'
         />

         <input onChange={(e)=>setPassword(e.target.value)} value={password}
          type="password" placeholder='password' required className='p-2
         border border-gray-500 rounded-md focus:outline-none 
         focus:ring-2 focus:ring-indigo-500'/>



 
          </>

        )}
        {/* ------------------bio--------- */}
        {
          currentState==="Sign up" && isDataSubmitted &&(
            <textarea onChange={(e)=> setBio(e.target.value)} value={bio}
            row={4} className='p-2
         border border-gray-500 rounded-md focus:outline-none 
         focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio....' required></textarea>
          )

        }

        {/* ----------submit----------- */}

        <button type='submit'
         className='py-3 bg-gradient-to-r from-purple-400 to-violet-600
        text-white rounded-md cursor-pointer'>
          {currentState==="Sign up" ? "Create Account":"Login Now"}
        </button>
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p> Agree to term of ude privacy policy.</p>
        </div>


        <div className='flex flex-col gap-2'>
            {currentState==="Sign up" ? (
              <p className='text-sm text-gray-600'>Already have an Account ? <span className='
              font-medium text-violet-500 cursor-pointer' onClick={()=>{setCurrentState("Login"); setDataSubmited(false)}}>Login here</span></p>
            ):(
              <p className='text-sm text-gray-600'> Create an Account <span className='
              font-medium text-violet-500 cursor-pointer' onClick={()=>setCurrentState("Sign up")} >Click here</span></p>
            )}
        </div>


        
      </form>


    </div>
  )
}
export default LoginPage