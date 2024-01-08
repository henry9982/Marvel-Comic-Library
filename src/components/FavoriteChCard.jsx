import React, { useContext } from 'react'
import '../styles/Button.css'
import '../styles/Reflection.css'
import '../styles/ScroolBarCustomize.css'
import { TfiTrash } from "react-icons/tfi";
import { AiOutlineUserDelete } from "react-icons/ai";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { StateContext } from '../context/StateContext';
import { useNavigate } from 'react-router-dom';


const FavoriteChCard = ({data}) => {
  const {fetchComicsByCharcaterId} =  useContext(StateContext)
  const navigate = useNavigate()
  const {name,image,id,firestoreItemId,description} = data

  const deleteFavCh = async (id) => {
    try {
      const favChDoc = doc(db, 'favoriteCharacters', id);
      await deleteDoc(favChDoc);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick=()=>{
    fetchComicsByCharcaterId(data.id)
    navigate('/home/comics')
  }
  return (
    <div className='flex max-md:flex-col  max-md:p-2 max-md:w-[220px] max-md:h-[300px] max-sm:w-[200px] max-sm:h-[280px] max-[450px]:w-[180px] max-[450px]:h-[260px] border border-[#92C7CF] gap-4 hover:scale-105 favCard transition w-[320px] pr-1 h-[200px] bg-white shadow-lg mx-auto rounded-2xl'>
        <div className='w-fit max-md:w-full  relative h-full  flex justify-center items-center'>
          <img src={`${image.path}.${image.extension}`} className='w-[150px] max-md:w-[160px] max-md:h-[160px] max-sm:w-[145px] max-sm:h-[145px] max-[450px]:w-[135px] max-[450px]:h-[140px] object-cover max-md:-mt-12 max-[450px]:-mt-8 shadow-md shadow-[#AAD7D9] h-[150px] md:-ml-5 rounded-2xl  max-w-none' alt="" />
        </div>
        <div className='flex font-poopins flex-col justify-center  max-md:-translate-y-3 '>
        <div className=' md:-mt-3 overflow-y-auto w-[160px] cm-title-scroll '>
                <h1 className=' font-medium cm-title whitespace-nowrap '>{name}</h1>
            </div>
                        <h5 className='text-xs text-gray-400'>Description</h5>
            <div className='md:h-[95px] max-md:h-[60px] md:mb-2 text-[13px] overflow-auto favCard-des'>{description?description:"Sorry, no description available for this character!"}</div>
            <div className='flex items-center justify-between max-md:translate-y-3 max-[450px]:translate-y-1'>
              <button className="button-49 font-poopins w-fit " role="button" onClick={handleClick}>View Comics</button>
              <div onClick={()=>{
                deleteFavCh(firestoreItemId)
              }} className='border cursor-pointer p-[4px] -translate-x-1 hover:bg-red-500 hover:scale-105 text-red-600 hover:text-white transition rounded-full border-red-500 shadow-sm shadow-red-500/50'>
                <AiOutlineUserDelete className='text-lg '/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default FavoriteChCard