import React, { useEffect, useId, useState } from 'react'
import FavoriteChCard from '../components/FavoriteChCard'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import FavoriteCmCard from '../components/FavoriteCmCard'
import { Navigate, useNavigate } from 'react-router-dom'

const FavoriteCm = () => {
  const navigate = useNavigate()
  const [readLaterComics, setReadLaterComics] = useState();
  const [userID, setUserID] = useState(null);
  const user = auth.currentUser

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserID(user.uid);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      const readLaterComicsRef = collection(db, 'readLaterComics');
      const queryFavChrs = query(
        readLaterComicsRef,
        where('userID', '==', userID),
        orderBy('createdAt')
      );

      const unsubscribe = onSnapshot(queryFavChrs, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const firestoreItemId = doc.id;
          docs.push({ ...data, firestoreItemId });
        });
        setReadLaterComics(docs);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userID]);


  if (user===null) {
    return <Navigate to={'/home'}/>
  }
  return (
    <>
    
    <div className='py-16 max-md:py-20 relative max-lg:grid-cols-2 max-md:gap-y-10 max-md:grid-cols-2 max-[400px]:grid-cols-1 max-sm:gap-y-12 gap-y-5 grid grid-cols-3'>
      {readLaterComics&&<div className='absolute top-3 right-0 w-full'>
            <div className='w-fit max-md:text-sm max-sm:text-[13px] mx-auto font-poopins tracking-wider font-medium'>Displaying ({readLaterComics.length}) comics cards</div>
          </div>}
      {readLaterComics?<>{readLaterComics.length<=0?<></>:<>
        {readLaterComics.map(com=>{
          return <FavoriteCmCard key={com.id} data={com}/>
        })}
      </>}</>:<>
      <div className='absolute top-3 right-0 w-full'>
            <div className=' max-md:text-sm max-sm:text-[13px] bg-gray-200 animate-pulse w-[300px] h-[20px] max-md:w-[260px] max-md:h-[18px] max-sm:w-[210px] max-sm:h-[16px] mx-auto font-poopins tracking-wider font-medium'></div>
          </div>
        
      <div className='bg-gray-200 rounded-2xl animate-pulse flex max-md:flex-col  max-md:p-2 max-md:w-[220px] max-md:h-[300px] max-sm:w-[200px] max-sm:h-[280px] max-[450px]:w-[180px] max-[450px]:h-[260px]  gap-4 hover:scale-105 favCard transition w-[320px] pr-1 h-[200px]  mx-auto items-center '>
          <div className='w-[150px] max-md:w-[160px] max-md:h-[160px] max-sm:w-[145px] max-sm:h-[145px] max-[450px]:w-[135px] max-[450px]:h-[140px] object-cover max-md:-mt-12 max-[450px]:-mt-8  h-[150px] md:-ml-5 rounded-2xl  max-w-none bg-gray-200 '>
            
          </div>
      </div>
      <div className='bg-gray-200 max-[400px]:hidden rounded-2xl animate-pulse flex max-md:flex-col  max-md:p-2 max-md:w-[220px] max-md:h-[300px] max-sm:w-[200px] max-sm:h-[280px] max-[450px]:w-[180px] max-[450px]:h-[260px]  gap-4 hover:scale-105 favCard transition w-[320px] pr-1 h-[200px]  mx-auto items-center'>
          <div className='w-[150px] max-md:w-[160px] max-md:h-[160px] max-sm:w-[145px] max-sm:h-[145px] max-[450px]:w-[135px] max-[450px]:h-[140px] object-cover max-md:-mt-12 max-[450px]:-mt-8  h-[150px] md:-ml-5 rounded-2xl  max-w-none bg-gray-200 '>
            
          </div>
      </div>
      <div className='bg-gray-200 max-lg:hidden rounded-2xl animate-pulse flex max-md:flex-col  max-md:p-2 max-md:w-[220px] max-md:h-[300px] max-sm:w-[200px] max-sm:h-[280px] max-[450px]:w-[180px] max-[450px]:h-[260px]  gap-4 hover:scale-105 favCard transition w-[320px] pr-1 h-[200px]  mx-auto items-center'>
          <div className='w-[150px] max-md:w-[160px] max-md:h-[160px] max-sm:w-[145px] max-sm:h-[145px] max-[450px]:w-[135px] max-[450px]:h-[140px] object-cover max-md:-mt-12 max-[450px]:-mt-8  h-[150px] md:-ml-5 rounded-2xl  max-w-none bg-gray-200 '>
            
          </div>
      </div>
      </>}

    </div>

    {readLaterComics&&<>{readLaterComics.length<=0&&<>
      <div className='mb-12 flex justify-center items-center -mt-14 flex-col font-poopins'>
          <h1 className='text-3xl font-banger mb-5 tracking-widest text-red-500'>Ooops!</h1>
          <p className='text-lg max-sm:text-base'>It looks like there are no comic books in your Read Later list.</p>
          <p className='max-sm:text-sm'>Let's find some comics books you might like!</p>
          <div className='flex flex-col mt-5 gap-2 '>
            <small className='text-gray-400'>Click below to explore our collection.</small>
            <button onClick={()=>{
              navigate('/home/comics')
            }} className='hover:scale-95 transition favorite-btn w-fit mx-auto px-4 py-[5px] border-black border-2 rounded-full font-poopins'>Explore Comics</button>
          </div>

      </div>
    </>}</>}

    </>
  )
}

export default FavoriteCm