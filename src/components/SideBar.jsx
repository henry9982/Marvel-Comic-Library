import React, { useContext, useEffect, useState } from 'react'
import {SiMarvelapp} from 'react-icons/si'
import {MdStars} from 'react-icons/md'
import {GiClockwork} from 'react-icons/gi'
import {FaUserAstronaut,FaUserNinja} from 'react-icons/fa'
import { CiLogout ,CiLogin ,CiCircleRemove } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDropup  } from "react-icons/io";


import { auth } from '../config/firebase-config';
import { StateContext } from '../context/StateContext'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { GoPerson } from "react-icons/go";

const SideBar = () => {
    const {isSidebarVisible,toggleSidebar,openDialog,closeDialog} = useContext(StateContext)
    const [userName,setUserName] = useState()
    const [userImg,setUserImage] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        if (auth?.currentUser?.displayName) {
            let fullName =auth?.currentUser?.displayName;
            let firstName = fullName.split(' ')[0];
            setUserName(firstName)
            setUserImage(auth.currentUser.photoURL)
        }
    },[])
    const signUserOut = async()=>{
        try {
            await signOut(auth)
            toggleSidebar()
            navigate('/signIn')
        } catch (error) {
            console.error(error);
        }
    }
    const clickToFavCh = ()=>{
        toggleSidebar()
        if (!userName) {
            openDialog()
            return
        }
        navigate('/home/favCharacters')
    }
    const clickToReadLaterCm = ()=>{
        toggleSidebar()
        if (!userName) {
            openDialog()
            return
        }
        navigate('/home/readLaterComics')
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' ,
        });
      };
  return (
    <div className={`bg-gray-400 z-50 rounded-lg rounded-tl-none rounded-bl-none ${!isSidebarVisible?'sideBar':'sideBarShow'}  fixed top-0 bottom-0 left-0`}>
        <div title='close side bar' className='absolute top-3 -right-10 cursor-pointer bg-gray-500 rounded-full'>
            <CiCircleRemove className=' text-white text-3xl cursor-pointer' onClick={toggleSidebar}/>
        </div>
        <div title='scroll to top' className='absolute bottom-3 -right-10 cursor-pointer bg-gray-500 rounded-full'>
            <IoIosArrowDropup  className=' text-white text-3xl cursor-pointer' onClick={scrollToTop}/>
        </div>

        <div className=' flex flex-col items-center my-24 gap-5  justify-center'>
            <div className='-mt-7 '>
                {userName&&<div className='border-2 border-white rounded-full'>
                    <img src={userImg} className='w-[60px] h-[60px] rounded-full' alt="" />                
                </div>}
                {!userName&&<div className='border-2 bg-gray-500 rounded-full w-[60px] h-[60px] flex justify-center items-center'>
                    <GoPerson className='text-4xl text-white'/>
                </div>}
            </div>
            <div className='flex  w-fit h-fit items-center justify-center justify-self-stretch gap-1  px-5'>
                <div className='bg-white p-1 rounded-xl'>
                    <SiMarvelapp className='' />
                </div>
                <div className='text-white uppercase font-banger tracking-widest'>
                    {userName?<div>{userName}</div>:<div>unknown</div>}
                </div>
            </div>
            <div className='w-fit text-white gap-5 h-fit flex flex-col justify-start items-center'>
                <div className='flex gap-1 items-center cursor-pointer hover:text-gray-200 transition'onClick={clickToFavCh}>
                    <div   title='Favorite' className=' w-fit cursor-pointer shield-first flex justify-center items-center p-[2px] pr-[2px] rounded-full'>
                        <div className='text-2xl bg-white rounded-full'>
                            <MdStars className=' shield-sec'/>
                        </div>
                    </div>
                    <div className='font-poopins text-sm'>Favorite Characters</div>
                </div>
                <div className='flex gap-1 items-center -ml-2 cursor-pointer hover:text-gray-200 transition'onClick={clickToReadLaterCm}>
                    <div   className='text-2xl cursor-pointer relative'>
                        <GiClockwork className='text-3xl text-green-400' title='Read later'/>
                    </div>
                    <div className='font-poopins text-sm'>Read Later Comics</div>
                </div>
            </div>
            <div>
                <div className='flex flex-col justify-center items-center h-full font-poopins  px-2 text-white uppercase '>
                    {
                        userName?(<>                        <FaUserAstronaut className='text-xl'/>
                        <div className='text-xs'>have signed in</div></>):(<>                        <FaUserNinja className='text-xl'/>
                    <div className='text-xs'>haven't signed in</div></>)
                    }

                </div>
            </div>

            {userName?<div className='w-fit cursor-pointer hover:scale-95 transition' onClick={signUserOut}>
                <div className='flex bg-white items-center gap-2 px-1 py-1 mx-2 rounded-full'>
                    <div>
                        <CiLogout className='text-gray-500 text-xl '/>
                    </div>
                    <div className='font-poopins text-sm text-gray-400'>Logout</div>
                    <img src={userImg} alt="" className='w-7 h-7 rounded-full' />
                </div>
            </div>:<div onClick={()=>{
                navigate('/signIn')
                toggleSidebar()
            }} className='w-fit cursor-pointer mx-auto hover:scale-95 transition'>
                <div className='flex bg-white items-center gap-2 px-1 py-1  rounded-full'>
                    <div>
                        <CiLogin className='text-gray-500 text-xl '/>
                    </div>
                    <div className='font-poopins text-sm text-blue-500'>Login</div>
                    <div className='p-[5px] flex justify-center items-center bg-blue-400 text-white rounded-full'>
                        <IoPersonOutline/>
                    </div>
                </div>
            </div>}
        </div>

    </div>
  )
}

export default SideBar