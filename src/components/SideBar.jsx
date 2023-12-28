import React, { useContext, useEffect, useState } from 'react'
import {SiMarvelapp} from 'react-icons/si'
import {MdStars} from 'react-icons/md'
import {GiClockwork} from 'react-icons/gi'
import {FaUserAstronaut,FaUserNinja} from 'react-icons/fa'
import { CiLogout ,CiLogin ,CiCircleRemove } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

import { auth } from '../config/firebase-config';
import { StateContext } from '../context/StateContext'

const SideBar = () => {
    const {isSidebarVisible,toggleSidebar} = useContext(StateContext)
    const [userName,setUserName] = useState()
    const [userImg,setUserImage] = useState()
    useEffect(()=>{
        console.log(auth?.currentUser);
        if (auth?.currentUser?.displayName) {
            let fullName =auth?.currentUser?.displayName;
            let firstName = fullName.split(' ')[0];
            setUserName(firstName)
            setUserImage(auth.currentUser.photoURL)
            console.log(firstName);
        }
    },[])
  return (
    <div className={`bg-gray-400 z-50  ${!isSidebarVisible?'sideBar':'sideBarShow'}  fixed top-0 bottom-0 right-0`}>
        <CiCircleRemove className='absolute top-3 right-3 text-white text-3xl cursor-pointer' onClick={toggleSidebar}/>
        <div className=' flex flex-col items-center my-24 gap-5  justify-center'>
            <div className='flex w-fit h-fit items-center justify-center justify-self-stretch gap-1  px-5'>
                <div className='bg-white p-1 rounded-xl'>
                    <SiMarvelapp className='' />
                </div>
                <div className='text-white uppercase font-banger tracking-widest'>
                    {userName?<div>{userName}</div>:<div>unknown</div>}
                </div>
            </div>
            <div className='w-fit gap-5 h-fit flex justify-around items-center'>
                <div title='Favorite' className=' w-fit  shield-first flex justify-center items-center p-[2px] pr-[2px] rounded-full'>
                    <div className='text-2xl bg-white rounded-full'>
                        <MdStars className=' shield-sec'/>
                    </div>
                </div>
                <div className='text-2xl mr-3 relative'>
                    <GiClockwork className='text-3xl text-green-400' title='Read later'/>
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

            {userName?<div className='w-fit'>
                <div className='flex bg-white items-center gap-2 px-1 py-1 mx-2 rounded-full'>
                    <div>
                        <CiLogout className='text-gray-500 text-xl '/>
                    </div>
                    <div className='font-poopins text-sm text-gray-400'>Logout</div>
                    <img src={userImg} alt="" className='w-7 h-7 rounded-full' />
                </div>
            </div>:<div className='w-fit mx-auto'>
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