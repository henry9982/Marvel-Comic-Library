import React, { useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../config/firebase-config';
import { StateContext } from '../context/StateContext';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';

const Home = () => {

  const {isSidebarVisible} = useContext(StateContext)

  const [isLoggedIn,setIsLoggedIn] = useState(false)
  useEffect(()=>{
    auth.currentUser?.uid?setIsLoggedIn(true):setIsLoggedIn(false);
  },[])
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
        <SideBar/>
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-600 opacity-30 z-40 ${!isSidebarVisible?'hidden':''}`}></div>
    </div>
  )
}

export default Home