import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa6";
import { StateContext } from '../context/StateContext';
import { useNavigate } from 'react-router-dom';
import { FaRegStar ,FaStar  } from "react-icons/fa";
import useAddFavoriteCh from '../hooks/useAddFavoriteCh';
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';


const CharacterCard = ({character}) => {
  const userID = auth.currentUser?.uid;
  const navigate = useNavigate();
  const { fetchComicsByCharcaterId,openDialog } = useContext(StateContext);
  const [isFavorite, setIsFavorite] = useState(null);



  // const { addFavoriteCh } = useAddFavoriteCh();


  // const handleStar = async () => {
  //   if (isFavorite) {
  //     setIsFavorite(false);
  //     // Delete the character from favorites
  //     await addFavoriteCh({
  //       id: character.id,
  //       name: character.name,
  //       image: {
  //         path: character.thumbnail.path,
  //         extension: character.thumbnail.extension,
  //       },
  //       description: character.description,
  //     });
  //   } else {
  //     setIsFavorite(true);
  //     // Add the character to favorites
  //     await addFavoriteCh({
  //       id: character.id,
  //       name: character.name,
  //       image: {
  //         path: character.thumbnail.path,
  //         extension: character.thumbnail.extension,
  //       },
  //       description: character.description,
  //     });
  //   }
  // }

  // const favoriteCharacterRef = collection(db,'favoriteCharacters')
  // const checkIfAlreadyAdded = async () => {
  //   const querySnapshot = await getDocs(
  //     query(favoriteCharacterRef, where('userID', '==', userID), where('id', '==', character.id))
  //   );
  //   const existingCharacter = querySnapshot.docs[0];
  //   if (existingCharacter) {
  //     setIsFavorite(true);
  //   }
  // };

  // useEffect(() => {
  //   if (auth.currentUser?.uid) {
  //     checkIfAlreadyAdded();
  //   }
  // }, [character.id]);

  // const handleClick = () => {
  //   fetchComicsByCharcaterId(character.id);
  //   navigate('/home/comics');
  // };


  // this is new logic
  useEffect(()=>{
    const checkIfAlreadyAdded = async()=>{
      if (!userID) {
        setIsFavorite(false)
        return
      };

      const favoriteCharacterRef = collection(db,'favoriteCharacters')
      const querySnapshot = await getDocs(
        query(favoriteCharacterRef,where('userID','==',userID),where('id','==',character.id))
      )
      const existingCharacter = querySnapshot.docs[0]
      if (existingCharacter) {
        setIsFavorite(true)
      }else{
        setIsFavorite(false)
      }
    }
    checkIfAlreadyAdded()
  },[userID,character.id])

  const handleStar = async()=>{
    if(!userID){
      openDialog()
      return
    };
    const favoriteCharacterRef = collection(db,'favoriteCharacters')
    if (isFavorite) {
      const querySnapshot =await getDocs(
        query(favoriteCharacterRef,where('userID','==',userID),where('id','==',character.id))
      )
      const existingCharacter = querySnapshot.docs[0]
      if (existingCharacter) {
        setIsFavorite(false)
        await deleteDoc(doc(favoriteCharacterRef,existingCharacter.id))
      }else{
        setIsFavorite(true)
        await addDoc(favoriteCharacterRef,{
          userID,
          id:character.id,
          image: {
            path: character.thumbnail.path,
            extension: character.thumbnail.extension,
          },
          name: character.name,
        description: character.description,
        createdAt: serverTimestamp()
        })
      }
    }else{
      setIsFavorite(true)
      await addDoc(favoriteCharacterRef,{
        userID,
        id:character.id,
        image: {
          path: character.thumbnail.path,
          extension: character.thumbnail.extension,
        },
        name: character.name,
      description: character.description,
      createdAt: serverTimestamp()
      })
    }
  }
  const handleClick=()=>{
    fetchComicsByCharcaterId(character.id)
    navigate('/home/comics')
  }

  return (
    <div key={character.id}  className='relative flex justify-center items-center w-fit  mx-auto card hover:scale-110'>
                      <div className='bg-blue-400 w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] z-20 innderCard relative transition overflow-hidden border-2 border-black'>
                          <img className='h-full w-full object-cover' src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="" />
                          <div className='reflection'></div>
                          <div className=' absolute w-fit z-50 top-1 right-1 cursor-pointe rounded-full '>
                            {/* {!isFavorite?                              <FaRegStar onClick={handleStar} className='text-xl text-white cursor-pointer'/>:<FaStar onClick={handleStar} className='text-xl text-yellow-300 cursor-pointer'/>} */}
                            {isFavorite===null?'':!isFavorite?(<FaRegStar onClick={handleStar} className='text-xl text-white cursor-pointer'/>):(<FaStar onClick={handleStar} className='text-xl text-yellow-300 cursor-pointer'/>)}
                          </div>
                      </div>
                      <div className=' top-0 border-2 border-black border-l-0 flex justify-between flex-col  right-0 bg-[#333333]  w-3/6 h-[98%] max-[400px]:w-[51%] max-[400px]:pl-[2px] characterInfoBox  my-auto bottom-0  absolute'>
                        <div className='my-1 '>
                          <div className='font-banger text-white  tracking-widest font-'>Marvel</div>
                          <div className='text-white -mt-1 font-poopins text-[13px] whitespace-nowrap overflow-auto characterInfoBoxName'>{character.name}</div>
                          <div className='text-[12px] mt-1 tracking-wide h-56 overflow-auto text-white characterInfoBoxDes'>{character.description?character.description:'No description about the character'}</div>
                        </div>
                        <div onClick={handleClick} className=' flex justify-between absolute bottom-0 max-sm:-bottom-[1px] max-[400px]:-bottom-[1.10pt] -right-[7px] box-info-btn cursor-pointer w-[115px] max-sm:w-[105px]  max-sm:h-7 max-[470px]:w-[96px] max-[400px]:w-[88px] max-[400px]:h-6 max-[400px]:-right-[15px] bg-white items-center h-7 overflow-hidden'>
                          <div className='bg-[#1976D2] h-full flex - justify-center items-center relative'>
                            <div className='text-[12px] max-sm:text-[11px] max-[400px]:text-[9px] max-sm:-mb-[2px] max-[470px]:-mb-[5px] max-[470px]:text-[10px] max-[470px]:-mt-1 max-[400px]:-mt-[3px] pl-[2px]  uppercase font-poopins z-10 text-white'>View comics</div>
                            <div className='absolute bg-[#1976D2] w-10 h-10 rounded-full -right-4 -top-6 max-[400px]:-top-6 max-[400px]:-right-3'></div>
                            <div className='absolute bg-[#1976D2] w-10 h-10 rounded-full -right-4 top-[13px] max-[400px]:-right-3 max-[400px]:top-[10px]'></div>
                          </div>
                          <div className='h-full flex justify-center items-center bg-white'>
                            <FaChevronRight className='text-[#1976D2]'/>
                          </div>
                        </div>
                      </div>
                  </div>
  )
}

export default CharacterCard