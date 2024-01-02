import React from 'react'
import  '../styles/Signin.scss'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase-config'
import { FcGoogle } from 'react-icons/fc'
import { SiMarvelapp } from 'react-icons/si'

const SignIn = () => {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      console.error('Google authentication error:', error);
      // Handle the error - display a message, log it, or take appropriate action
    }
  };
  return (
    <div className='whole-container h-screen w-screen flex justify-center items-center'>
        <div className='bg-container -z-20'>
          <img className="delayed ani h-[290px] max-w-none" src="/src/pics/clean.jpg" alt=""/>
          <img  className="ani h-[290px] max-w-none" src="/src/pics/detail (1).jpg" alt=""/>
          <img className="delayed ani h-[290px] max-w-none" src="/src/pics/detail (10).jpg" alt=""/>
          <img  className="ani h-[290px] max-w-none" src="/src/pics/detail (11).jpg" alt=""/>
          <img className="delayed ani h-[290px] max-w-none" src="/src/pics/detail (12).jpg" alt=""/>
          <img  className="ani h-[290px] max-w-none" src="/src/pics/detail (13).jpg" alt=""/>
          <img className="delayed ani h-[290px] max-w-none" src="/src/pics/detail (14).jpg" alt=""/>
          <img className="ani h-[290px] max-w-none"  src="/src/pics/detail (15).jpg" alt=""/>
          <img className="delayed ani h-[290px] max-w-none" src="/src/pics/detail (16).jpg" alt=""/>
          <img  className="ani h-[290px] max-w-none" src="/src/pics/detail (17).jpg" alt=""/>
          <img className="delayed ani h-[290px] max-w-none" src="/src/pics/detail (2).jpg" alt=""/>
          <img  className="ani h-[290px] max-w-none" src="/src/pics/detail (3).jpg" alt=""/>
          <img className="delayed ani h-[290px] max-w-none" src="/src/pics/detail (4).jpg" alt=""/>
          <img className="ani h-[290px] max-w-none"  src="/src/pics/detail (5).jpg" alt=""/>
          <img src="../" alt="" />

          <div className='filter'></div>
        </div>
        <div className='logo'>
            <img src="/src/pics/image/MR-oladinocom-svg170723t001-1772023133411-1-removebg-preview.png" alt="" />
        </div>
        <div className='btn-container z-50 w-fit flex justify-center items-center gap-1 flex-col'>
            <button onClick={signInWithGoogle}  className='signin-btn bg-[rgb(255,240,33)] px-5 py-2 border-black border-2   flex justify-center items-center  '>Sign in with Google to continue <FcGoogle className='text-2xl ml-2'/></button>
            <div className='flex w-full px-2 justify-center items-center gap-2'>
              <div className='border w-full h-[1px]'></div>
              <div className='text-white'>or</div>
              <div className='border w-full h-[1px]'></div>
            </div>
            <Link to={'/home'} className='direct-link-btn px-5 py-2 bg-white w-fit  border-black border-2   flex justify-center items-center  '>Let's just get started <SiMarvelapp className=' ml-2 text-xl'/></Link>
        </div>
    </div>
  )
}

export default SignIn