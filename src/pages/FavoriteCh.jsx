import React, { useEffect, useId, useState } from 'react'
import FavoriteChCard from '../components/FavoriteChCard'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { auth, db } from '../config/firebase-config'
import { Navigate, useNavigate } from 'react-router-dom'

const FavoriteCh = () => {
  const navigate = useNavigate()
   const [favChrs, setFavChrs] = useState();
  const [userID, setUserID] = useState(null);
  const user = auth.currentUser
  console.log(user);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserID(user.uid);
    }
  }, []);

  useEffect(() => {
    if (userID) {
      const favoriteCollectionRef = collection(db, 'favoriteCharacters');
      const queryFavChrs = query(
        favoriteCollectionRef,
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
        setFavChrs(docs);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userID]);

  useEffect(() => {
    console.log(favChrs);
  }, [favChrs]);

  if (user!==null) {
    return (
      <>
      <div className='py-16 max-md:py-20 max-lg:grid-cols-2 relative max-md:gap-y-10 max-md:grid-cols-2 max-[400px]:grid-cols-1 max-sm:gap-y-12 gap-y-5 grid grid-cols-3'>
        {favChrs&&<div className='absolute top-3 right-0 w-full'>
            <div className='w-fit max-md:text-sm max-sm:text-[13px] mx-auto font-poopins tracking-wider font-medium'>Displaying ({favChrs.length}) favorite character cards</div>
          </div>}
        {favChrs?<>{favChrs.length<=0?<></>:<>
          {favChrs.map(chr=>{
            return <FavoriteChCard key={chr.id} data={chr}/>
          })}
        </>}</>:<>
        <div className='absolute top-3 right-0 w-full'>
            <div className=' max-md:text-sm max-sm:text-[13px] bg-gray-200 animate-pulse w-[340px] h-[20px] max-md:w-[300px] max-md:h-[18px] max-sm:w-[280px] max-sm:h-[16px] mx-auto font-poopins tracking-wider font-medium'></div>
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

      {favChrs&&<>{favChrs.length<=0&&<>
        <div className='mb-12 flex justify-center items-center -mt-14 flex-col font-poopins'>
          <h1 className='text-3xl font-banger mb-5 tracking-widest text-red-500'>Uh-oh!</h1>
          <p className='text-lg'>Looks like you haven't added any favorite characters yet.</p>
          <p>Let's start building your list of beloved heroes and villains!</p>
          <div className='flex flex-col mt-5 gap-2 '>
            <small className='text-gray-400'>Click below to explore our collection.</small>
            <button onClick={()=>{
              navigate('/home/comics')
            }} className='hover:scale-95 transition favorite-btn w-fit mx-auto px-4 py-[5px] border-black border-2 rounded-full font-poopins'>Explore Characters</button>
          </div>

      </div>
      </>}</>}
      </>
    )
  }else{
   return <Navigate to={'/home'}/>
  }
  
}

export default FavoriteCh