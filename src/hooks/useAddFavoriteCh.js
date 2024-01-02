import React from 'react'
import { auth, db } from '../config/firebase-config'
import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore'

const useAddFavoriteCh = () => {
  const userID = auth.currentUser?.uid
  const favoriteCharacterRef = collection(db,'favoriteCharacters')
  const addFavoriteCh = async({id,name,image,description})=>{
    // console.log('clicked add fav character');
    // await addDoc(favoriteCharacterRef,{
    //     userID,
    //     id,
    //     image,
    //     name,
    //     description,
    //     createdAt:serverTimestamp()
    // })
    const querySnapshot = await getDocs(
        query(favoriteCharacterRef, where('userID', '==', userID), where('id', '==', id))
      );
    const existingCharacter = querySnapshot.docs[0];
    console.log(querySnapshot.docs.length);

    if (existingCharacter) {
        // If the character already exists, delete it
        await deleteDoc(doc(favoriteCharacterRef, existingCharacter.id));
      } else {
        // If the character doesn't exist, add it as a favorite
        await addDoc(favoriteCharacterRef, {
          userID,
          id,
          image,
          name,
          description,
          createdAt: serverTimestamp()
        });
      }
  }
  return {addFavoriteCh}
}

export default useAddFavoriteCh