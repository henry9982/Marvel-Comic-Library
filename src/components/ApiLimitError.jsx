import React from 'react'
import { GiThorHammer ,GiLetterBomb } from "react-icons/gi";


const ApiLimitError = () => {
  return (
    <div className='w-full h-96 flex justify-center items-center'>
        <div className='flex justify-center w-11/12 sm:w-4/5 lg:w-2/4 md:w-3/4 gap-5 max-[500px]:flex-col max-[500px]:items-center'>
            <div className='relative'>

                <GiThorHammer className='text-[110px] absolute hummer text-gray-600 -top-4 left-6 z-10 rotate-[135deg]'/>
                <GiLetterBomb className='text-[150px] paper -z-30 text-red-600'/>
            </div>
            <div className='max-[500px]:-mt-8'>
                <div className='font-poopins -mt-6 sm:-mt-2 font-medium'>Apologies, data access and site usage are currently unavailable. Please try again later.</div>
                <div className='font-poopins font-medium'>Thank you for your understanding.</div>
                <div className='text-xs w-fit '>API traffic (Error 429)</div>
            </div>
        </div>
    </div>
  )
}

export default ApiLimitError