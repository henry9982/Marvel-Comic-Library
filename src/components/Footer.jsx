import React from 'react'
import { SiFacebook } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";
import { FaTelegram } from "react-icons/fa6";
import { PiPerson ,PiPersonArmsSpread } from "react-icons/pi";
import { FiMessageSquare } from "react-icons/fi";



const Footer = () => {
  return (
    <div className='w-full h-full py-8 bg-black text-white pb-14'>
        <div className='sm:w-4/5 px-5 w-full mx-auto flex flex-col gap-3 justify-center items-center font-poopins'>
            <div className='text-2xl font-medium'>Foolish Developer</div>
            <div className='person-controler w-fit text-3xl relative'>
                <PiPerson className='first'/>
                <PiPersonArmsSpread className='second'/>
                <div className='absolute -top-5 -right-5 message'>
                    <FiMessageSquare className='text-[26px]'/>
                    <small className='text-[12px] absolute -top-[7px] left-[5px]'>Hi!</small>
                </div>
            </div>
            <div className='text-sm'>This Marvel Comic Library app showcases a developer's learning journey with React JS, TailwindCSS, and Firebase. It serves as a practice platform for implementing user authentication and data storage within a Marvel Comic-themed application.</div>
            <div className='text-sm'>If you have something to share or want to get in touch for any reason, feel free to reach out! Here are my contact details.</div>
            <div className='flex items-center justify-center gap-5'>
                <div className='hover:bg-white transition rounded-full'>
                    <SiFacebook  title='Facebook' className='hover:text-blue-600 rounded-full  transition text-2xl hover:scale-125 cursor-pointer'/>
                </div>
                <div className='hover:bg-white transition rounded-full' >
                    <FaTelegram title='Telegram' className='hover:text-blue-500 transition text-2xl hover:scale-125 cursor-pointer'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer