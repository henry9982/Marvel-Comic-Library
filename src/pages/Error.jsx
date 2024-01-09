import React from 'react'
import '../styles/Error.css'
import { BsChat,BsChatFill  } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';


const Error = () => {
    const navigate = useNavigate()
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className=' flex flex-col gap-3 relative'>
            <div className='border-2 border-blue-400 rounded-lg w-[150px] h-[100px] flex flex-col animation-robot'>
                <div className='h-5 bg-blue-100 rounded-ss-md rounded-se-md border-2 border-t-0 border-l-gray-300 border-r-gray-300 border-b-0 flex items-center'>
                    <div className='flex gap-1 ml-1'>
                        <div className='w-2 h-2 border rounded-full bg-gray-300'></div>
                        <div className='w-2 h-2 border rounded-full bg-gray-300'></div>
                        <div className='w-2 h-2 border rounded-full bg-gray-300'></div>
                    </div>
                </div>
                <div className='border-t-2 flex items-center relative gap-1 flex-col justify-center bg-blue-100 rounded-md rounded-t-none border-l-2 border-l-gray-300 border-r-2 border-r-gray-300 border-b-2 border-b-gray-300 border-blue-400 flex-1'>
                    <div className='w-8 rounded-full h-1 absolute top-1 left-1 bg-white'></div>
                    <div className='flex gap-10'>
                        <div className='eyes'>
                            <div className='pupil'></div>
                        </div>
                        <div className='eyes'>
                            <div className='pupil'></div>
                        </div>
                    </div>
                    <div className='flex justify-between gap-4'>
                        <div className='w-3 h-3 bg-pink-300 rounded-full'></div>
                        <div className='mouth w-6 h-4 bg-gray-400 translate-y-2 border-2 border-gray-300 border-b-0 rounded-full rounded-b-xl'></div>
                        <div className='w-3 h-3 bg-pink-300 rounded-full'></div>
                    </div>
                </div>
                <div className='404-text right-0 -top-16 text-blue-400 font-poopins text-[130px] absolute'>
                    <BsChatFill />
                    <div className='absolute text-white text-4xl top-0 bottom-0 h-fit right-0 left-0 mx-auto my-auto w-fit'>404</div>
                </div>
            </div>
            <div className='text-sm font-poopins text-gray-500'>
                <h1 className='uppercase text-blue-400 mb-3 text-4xl max-[320px]:text-3xl'>page not found</h1>
                <p>Oops! Looks like you've hit a roadblock.</p>
                <p>Are you sure the website URL is correct?</p>
                <p>Get in touch with site the owner.</p>
                <button onClick={()=>{
                    navigate('/home')
                }} className='border-2 rounded-full border-blue-400 text-base hover:bg-blue-400 transition hover:text-white hover:scale-95 text-blue-400 px-5 py-1 mt-4'>Go Back Home</button>
            </div>
        </div>
    </div>
  )
}

export default Error