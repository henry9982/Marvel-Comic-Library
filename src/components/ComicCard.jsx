import React from 'react'
import { FaChevronRight } from "react-icons/fa6";

const ComicCard = ({comic}) => {
  return (
    <div key={comic.id}  className='relative flex justify-center items-center w-fit  mx-auto card hover:scale-110'>
                      <div className='bg-blue-400 w-[220px] h-[320px] z-20 innderCard relative transition overflow-hidden border-2 border-black'>
                          <img className='h-full w-full object-cover' src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
                          <div className='reflection'></div>
                      </div>
                      <div className=' top-0 border-2 border-black border-l-0 flex justify-between flex-col  right-0 bg-[#333333]  w-3/6 h-[98%] characterInfoBox  my-auto bottom-0  absolute'>
                        <div className='my-1 '>
                          <div className='font-banger text-white  tracking-widest font-'>Marvel</div>
                          <div className='text-white -mt-1 font-poopins text-[13px] whitespace-nowrap overflow-auto characterInfoBoxName'>{comic.title}</div>
                          <div className='text-[12px] mt-1 tracking-wide h-56 overflow-auto text-white characterInfoBoxDes'>{comic.description?comic.description:'No description about the character'}</div>
                        </div>
                        <div className=' flex justify-between absolute bottom-0 -right-[7px] box-info-btn cursor-pointer w-[115px] bg-white items-center h-7 overflow-hidden'>
                          <div className='bg-[#EE7214] overflow-y-hidden-hidden  h-full flex - justify-center items-center relative'>
                            <div className='text-[12px] pl-[2px] uppercase font-poopins z-10 text-white'>Read Comic</div>
                            <div className='absolute bg-[#EE7214] w-10 h-10 rounded-full -right-4 -top-6'></div>
                            <div className='absolute bg-[#EE7214] w-10 h-10 rounded-full -right-4 top-[13px]'></div>
                          </div>
                          <div className='h-full flex justify-center items-center bg-white'>
                            <FaChevronRight className='text-[#EE7214]'/>
                          </div>
                        </div>
                      </div>
                  </div>
  )
}

export default ComicCard