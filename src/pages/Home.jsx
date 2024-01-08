import React, { useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../config/firebase-config';
import { StateContext } from '../context/StateContext';
import Header from '../components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';
import { CiCircleRemove } from "react-icons/ci";
import { LuMailWarning } from "react-icons/lu";



const Home = () => {
  const navigate = useNavigate()

  const {isSidebarVisible,dialogRef,closeDialog} = useContext(StateContext)

  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(()=>{
    auth.currentUser?.uid?setIsLoggedIn(true):setIsLoggedIn(false);
  },[])
  return (
    <div>
      <dialog id="d" ref={dialogRef} className='bg-white right-0 rounded-md my-auto mx-auto -translate-y-6 p-3 shadow-md w-[530px] max-sm:5/6'>
        <div className='mx-auto w-fit bg-red-500 rounded-full p-2 text-white text-6xl'>
          <LuMailWarning/>
        </div>
        <h1 className='mx-auto w-fit mt-3 text-2xl font-banger text-red-600 tracking-widest'>Oooops!</h1>
        <p className='w-fit mx-auto text-sm font-poopins '>You haven't logged in yet.</p>
        <h3 className='w-fit mx-auto font-poopins mt-3 text-lg max-sm:text-sm'>You must log in first to be able to use 'Add to Favorites' and 'Read Later' features.</h3>
        <div className='flex gap-5 mx-auto w-fit font-poopins my-2 mt-5'>
          <button onClick={closeDialog} className='border px-4 py-[3px] hover:scale-95 transition rounded text-blue-500 border-blue-400'>Not Now</button>
          <button onClick={()=>{
            navigate('/signIn')
          }} className='border px-4 py-[3px] hover:scale-95 transition rounded border-none text-white bg-blue-400'>Login Now</button>
        </div>

      </dialog>
        <Header/>
        <Outlet/>
        <Footer/>
        <SideBar/>
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-600 opacity-30 z-40 ${!isSidebarVisible?'hidden':''}`}></div>
    </div>
  )
}

export default Home