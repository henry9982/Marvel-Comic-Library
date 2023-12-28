import React, { useContext, useEffect, useState } from 'react'
import { SiMarvelapp } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdStars } from "react-icons/md";
import { FaUserAstronaut , FaUserNinja  } from "react-icons/fa";
import { GiPlantRoots } from "react-icons/gi";
import { GiClockwork } from "react-icons/gi";
import { TiThMenuOutline } from "react-icons/ti";

import { auth } from '../config/firebase-config';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { StateContext } from '../context/StateContext';

const Header = () => {
    const {isSidebarVisible,toggleSidebar} = useContext(StateContext)
    
    const [userName,setUserName] = useState()
    useEffect(()=>{
        console.log(auth?.currentUser?.displayName);
        if (auth?.currentUser?.displayName) {
            let fullName =auth?.currentUser?.displayName;
            let firstName = fullName.split(' ')[0];
            setUserName(firstName)
            console.log(firstName);
        }
    },[])
  return (
    <header className='bg-[#1f1f1f]'>
        <div className='flex justify-center border-t-0 border border-x-0 border-[#3e3e3e]'>
            <div className='flex flex-1 sm:justify-between justify-center items-center  px-10'>
                <div className='sm:flex hidden items-center justify-center justify-self-stretch gap-1 border border-b-0 h-full px-5 border-t-0 border-[#3e3e3e]'>
                    <div className='bg-white p-1 rounded-xl'>
                        <SiMarvelapp className='' />
                    </div>
                    <div className='text-white uppercase font-banger tracking-widest'>
                        {userName?<div>{userName}</div>:<div>unknown</div>}
                    </div>
                </div>
                <div className='sm:h-16 h-14 w-28 overflow-hidden bg-white flex justify-center items-center sm:-mr-20'>
                    <img className='w-32 h-32 max-w-none' src="/src/pics/image/MR-oladinocom-svg170723t001-1772023133411-1-removebg-preview.png" alt="" />
                </div>
                <div className='sm:flex gap-2 border hidden  h-full justify-center items-center pl-5 border-y-0 border-[#3e3e3e]'>
                    <div title='Favorite' className='  shield-first flex justify-center items-center p-[2px] pr-[2px] rounded-full'>
                        <div className='text-2xl bg-white rounded-full'>
                            <MdStars className=' shield-sec'/>
                        </div>
                    </div>
                    <div className='text-2xl mr-3 relative'>
                        <GiClockwork className='text-3xl text-green-400' title='Read later'/>
                    </div>
                    <div className='flex flex-col justify-center items-center h-full font-poopins border-y-0 border px-2 text-white uppercase border-[#3e3e3e]'>
                        {
                            userName?(<>                        <FaUserAstronaut className='text-xl'/>
                            <div className='text-xs'>have signed in</div></>):(<>                        <FaUserNinja className='text-xl'/>
                        <div className='text-xs'>haven't signed in</div></>)
                        }

                    </div>
                </div>
            </div>
        </div>
        <div className='flex justify-center'>
            <div className='flex flex-1 gap-2 justify-center items-center h-10 text-white font-poppins text-xs font-bold  uppercase tracking-widest'>
                <Link to={'/home'} className='border-e pe-2 -ml-10 h-full flex justify-center transition items-center border-[#3e3e3e] hover:text-zinc-400'>
                    characters
                </Link>
                <Link to={'/home/comics'} className='hover:text-zinc-400 transition'>
                    comics
                </Link>
            </div>
        </div>
        <div className='bg-[#1f1f1f] w-fit cursor-pointer fixed p-[5px] sm:hidden  rounded-full right-3 top-[10px]' onClick={toggleSidebar}>
            <TiThMenuOutline className='text-white text-2xl   '/>
        </div>

    </header>
  )
}

export default Header