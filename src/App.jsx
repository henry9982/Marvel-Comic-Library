import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase-config.js'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import './App.css'
import Characters from './pages/Characters.jsx'
import Comics from './pages/Comics.jsx'
import FavoriteCh from './pages/FavoriteCh.jsx'
import FavoriteCm from './pages/FavoriteCm.jsx'
import Loader from './components/Loader.jsx'

const App = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(null) 
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,user=>{
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
    
    return unsubscribe
  },[])
  if (isLoggedIn === null) {
    return <Loader/>;
  }
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/'
            element={isLoggedIn?<Navigate to={`/home`}/>:<Navigate to={'/signIn'}/>}
        />
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/home' element={<Home/>}>
           <Route index element={<Characters/>}/>
           <Route path='/home/comics' element={<Comics/>}/>
           <Route path='/home/favCharacters' element={<FavoriteCh/>}/>
           <Route path='/home/readLaterComics' element={<FavoriteCm/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App