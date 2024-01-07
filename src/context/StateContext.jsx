import axios from 'axios'
import md5 from 'md5'
import React, { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react'

export const StateContext = createContext(null)

const initialState = {
  defaultCharacters:[],
  defaultComics:[],
  moreDefaultCharacters:[],
  moreDefaultComics:[],
  popularCharacters:[],
  popularComics:[],
  fetchedCharacters:[],
  fetchedComics:[],
  fetchedComicsByCharcaterId:[],
  loading:false,
  loadingForDefault:false,
  loadingForDefaultComic:false,
  loadingForMoreCh:false,
  loadingForMoreCm:false,
  loadingForSearchCh:false,
  loadingForSearchCm:false,
  fetchedMore:false,
  fetchedMoreCm:false,
  apiLimitReached:false,
  usedSearch:false,
  usedSearchComic:false,
  isUsingFetchCmsByCh:false,
}
const reducer = (state,action)=>{
  switch(action.type){
    case 'SET_DEFAULT_CHARACTERS':
      return {...state,defaultCharacters:action.payload};
    case 'SET_DEFAULT_COMICS':
      return {...state,defaultComics:action.payload};
    case 'SET_LOADING':
      return {...state,loading:action.payload};  
    case 'SET_LOADING_FOR_DEFAULT':
      return {...state,loadingForDefault:action.payload};  
    case 'SET_LOADING_FOR_DEFAULT_COMIC':
      return {...state,loadingForDefaultComic:action.payload};
    case 'SET_LOADING_FOR_MORE_CH':
      return {...state,loadingForMoreCh:action.payload};
    case 'SET_LOADING_FOR_MORE_CM':
      return {...state,loadingForMoreCm:action.payload};
    case 'SET_LOADING_FOR_SEARCH_CH':
      return {...state,loadingForSearchCh:action.payload};  
    case 'SET_LOADING_FOR_SEARCH_CM':
      return {...state,loadingForSearchCm:action.payload};
    case 'SET_MORE_CHARACTERs':
      return {...state,moreDefaultCharacters:action.payload};
    case 'SET_MORE_COMICS':
      return {...state,moreDefaultComics:action.payload};
    case 'SET_FETCHED_MORE':
      return {...state,fetchedMore:action.payload};
    case 'SET_FETCHED_MORE_CM':
      return {...state,fetchedMoreCm:action.payload};
    case 'SET_POPULAR_CHARACTERS':
      return {...state,popularCharacters:action.payload};
    case 'SET_POPULAR_COMICS':
      return {...state,popularComics:action.payload};
    case 'SET_FETCHED_DATA':
      return {...state,fetchedCharacters:action.payload};
    case 'SET_FETCHED_DATA_COMIC':
      return {...state,fetchedComics:action.payload};
    case 'SET_API_LIMIT_REACHED':
      return {...state,apiLimitReached:action.payload};
    case 'SET_USED_SEARCH':
      return {...state,usedSearch:action.payload};
    case 'SET_USED_SEARCH_COMIC':
      return {...state,usedSearchComic:action.payload};
    case "SET_IS_USING_FETCH_CMS_BY_CH":
      return {...state,isUsingFetchCmsByCh:action.payload}
    case 'SET_COMICS_BY_CHARACTER_ID':
      return {...state,fetchedComicsByCharcaterId:action.payload}
    default:
      return state;
  }
}

const characterNames = {
  group1:[
      "hulk",'Ben Reilly', 'Doctor Doom','captain america','iceman','fabian cortez','zaladane','valeria richards','iron man','Scarlet Witch','doctor strange','storm','namor','havok','Wolverine','Nick Fury'
  ]
  ,
  group1Copy:[
    "hulk",'Ben Reilly', 'Doctor Doom','captain america','iceman','fabian cortez','zaladane','valeria richards','iron man','Scarlet Witch','doctor strange','carol danvers','gambit','storm','cable','namor','havok','Wolverine','cyclops','Nick Fury'
  ]
  ,group2:[
      'nightcrawler','squirrel girl','rogue','kitty pryde','human torch','warren worthington III','gambit','thor','Silver Surfer','Thing','ka-zar','Punisher','Professor X','Moon Knight','Matthew Murdock'
  ],
  mostPopularCharacters:[
    'Wolverine','Thor','Deadpool','Doctor Strange','Hulk'
  ]
}
const comicTitles = {
  mostPopularComicsId:[9286,63688,47120,4216,9292],
  group1Copy:[99960,77787,56553,113827,78374,113038,20768,113826,112856,113679,23467,608,24122,112779,112696,15878,48514,111913,61165,114381,112897,104597,102633,113344,97121,114571,107827,107173,112792,98426,22996],
  group1:[113344, 113679, 112779, 61165, 113826, 112856, 114571, 99960, 78374,
    111913, 102633, 608, 112792, 22996, 112696, 
    ],
  group2:[56553, 113827, 104597, 114381,
    23467, 107173, 15878, 98426, 107827, 112897, 24122, 20768, 77787, 97121,
    48514],
}

const publicKey = import.meta.env.VITE_PUBLIC_KEY
const privateKey = import.meta.env.VITE_PRIVATE_KEY

const generateHash = (timeStamp)=>{
  return md5(timeStamp+privateKey+publicKey)
}

const StateContextProvider = ({children}) => {
  const [state,dispatch] = useReducer(reducer,initialState)

  const getCharacters = async(name)=>{
    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&name=${name}&limit=1`;

    try {
      const response = await axios.get(url)
      const characterData = response.data.data.results[0]
      dispatch({type:'SET_API_LIMIT_REACHED',payload:false})
      return characterData ? characterData:null
    } catch (error) {
      console.error(error.response.status);
      error.response.status === 429 && dispatch({type:'SET_API_LIMIT_REACHED',payload:true})
      return null
    }
  };

  const getComics = async(id)=>{
    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)

    const url = `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`
    try {
      const response = await axios.get(url)
      const comicData = response.data.data.results[0]
      dispatch({type:'SET_API_LIMIT_REACHED',payload:false})
      return comicData
    } catch (error) {
      console.error(error.response.status);
      error?.response?.status === 429 && dispatch({type:'SET_API_LIMIT_REACHED',payload:true})
      return null
    }
  }

  const fetchSearchCharacters = async(name)=>{
    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${name}&limit=50`;

    try {
      const response = await axios.get(url)
      const characterData = response.data.data.results
      dispatch({type:'SET_API_LIMIT_REACHED',payload:false})
      return characterData
    } catch (error) {
      console.error(error.response.status);
      error.response.status === 429 && dispatch({type:'SET_API_LIMIT_REACHED',payload:true})
      return null
    }
  }

  const fetchSearchComics = async(title)=>{
    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${title}&limit=50`;
    const urlForComics = `https://gateway.marvel.com:443/v1/public/comics?format=comic&formatType=comic&titleStartsWith=${title}&limit=50&apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`
    try {
      const response = await axios.get(urlForComics)
      const comicData = response.data.data.results
      dispatch({type:'SET_API_LIMIT_REACHED',payload:false})
      return comicData
    } catch (error) {
      console.error(error.response.status);
      error.response.status === 429 && dispatch({type:'SET_API_LIMIT_REACHED',payload:true})
      return null
    }
  }

  const getComicsByCharacter = async(id)=>{
    const timeStamp = new Date().getTime()
    const hash = generateHash(timeStamp)
    const url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&limit=50`
    try {
      const response = await axios.get(url)
      const comicData = response.data.data.results
      return comicData
    } catch (error) {
      console.error(error.response.status);
      error.response.status === 429 && dispatch({type:'SET_API_LIMIT_REACHED',payload:true})
      return null
    }
  }



 

    const fetchDefaultCharacters = async()=>{
      dispatch({type:'SET_LOADING_FOR_DEFAULT',payload:true});
      let newCharacterArray = [];
      for await (const name of characterNames.group1){
        const data = await getCharacters(name);
        newCharacterArray.push(data);
      }
      if (newCharacterArray[0]===null) {
        newCharacterArray=[]
      }
      dispatch({type:'SET_DEFAULT_CHARACTERS',payload:newCharacterArray});
      dispatch({type:'SET_LOADING_FOR_DEFAULT',payload:false})
    }

    // for comic page
    const fetchDefaultComics = async()=>{
      dispatch({type:'SET_LOADING_FOR_DEFAULT_COMIC',payload:true});
      let newComicArray = [];
      for await (const title of comicTitles.group1){
        const data = await getComics(title);
        newComicArray.push(data);
      }
      if (newComicArray[0]===null) {
        newComicArray=[]
      }
      dispatch({type:'SET_DEFAULT_COMICS',payload:newComicArray});
      dispatch({type:'SET_LOADING_FOR_DEFAULT_COMIC',payload:false})
    }

    const fetchPopularCharacters = async()=>{
      dispatch({type:'SET_LOADING',payload:true});
      let characterArray = [];
      for await (const name of characterNames.mostPopularCharacters){
        const data = await getCharacters(name);
        characterArray.push(data)
      }
      if (characterArray[0]===null) {
        characterArray=[]
      }
      dispatch({type:'SET_POPULAR_CHARACTERS',payload:characterArray});
      dispatch({type:'SET_LOADING',payload:false})
    }
    useEffect(()=>{
      fetchDefaultCharacters()
      fetchPopularCharacters()
      fetchPopularComics()
      fetchDefaultComics()
    },[])

    const fetchPopularComics = async()=>{
      dispatch({type:'SET_LOADING',payload:true});
      let comicArray = [];
      for await(const id of comicTitles.mostPopularComicsId){
        const data = await getComics(id)
        comicArray.push(data)
      }
      if (comicArray[0]===null) {
        comicArray=[]
      }
      dispatch({type:'SET_POPULAR_COMICS',payload:comicArray});
      dispatch({type:'SET_LOADING',payload:false})
    }

    const showMoreDefaultFetching = async()=>{
      if (state.moreDefaultCharacters.length>0) {
        return 
      }else{
      dispatch({type:'SET_LOADING_FOR_MORE_CH',payload:true});
      let moreData = [];
      for await(const name of characterNames.group2){
        const data = await getCharacters(name)
        moreData.push(data)
      }
      if (moreData[0]===null) {
        moreData=[]
      }
      dispatch({type:'SET_MORE_CHARACTERs',payload:moreData})
      dispatch({type:'SET_FETCHED_MORE',payload:true})
      dispatch({type:'SET_LOADING_FOR_MORE_CH',payload:false})
    }
    }

    // for comic page
    const showMoreDefaultCmFetching = async()=>{
      if (state.moreDefaultComics.length>0) {
        return 
      }else{
      dispatch({type:'SET_LOADING_FOR_MORE_CM',payload:true});
      let moreData = [];
      for await(const title of comicTitles.group2){
        const data = await getComics(title)
        moreData.push(data)
      }
      if (moreData[0]===null) {
        moreData=[]
      }
      dispatch({type:'SET_MORE_COMICS',payload:moreData})
      dispatch({type:'SET_FETCHED_MORE_CM',payload:true})
      dispatch({type:'SET_LOADING_FOR_MORE_CM',payload:false})
    }
    }

    const searchFetchingCharacters = async(name)=>{
      dispatch({type:'SET_USED_SEARCH',payload:true})
      dispatch({type:'SET_LOADING_FOR_SEARCH_CH',payload:true})
      const  data = await fetchSearchCharacters(name)
      dispatch({type:"SET_FETCHED_DATA",payload:data})
      dispatch({type:'SET_LOADING_FOR_SEARCH_CH',payload:false})
    }

    const searchFetchingComics = async(title)=>{
      dispatch({type:'SET_USED_SEARCH_COMIC',payload:true})
      dispatch({type:'SET_LOADING_FOR_SEARCH_CM',payload:true})
      const  data = await fetchSearchComics(title)
      dispatch({type:"SET_FETCHED_DATA_COMIC",payload:data})
      dispatch({type:'SET_LOADING_FOR_SEARCH_CM',payload:false})
    }

    // for fetching comics by character id
    const fetchComicsByCharcaterId = async (id)=>{
      dispatch({type:'SET_IS_USING_FETCH_CMS_BY_CH',payload:true})
      dispatch({type:'SET_LOADING',payload:true});
      const data = await getComicsByCharacter(id)
      dispatch({type:'SET_COMICS_BY_CHARACTER_ID',payload:data})
      dispatch({type:'SET_LOADING',payload:false});
    }

    const setFasleToShowDefaultComics = ()=>{
      dispatch({type:'SET_IS_USING_FETCH_CMS_BY_CH',payload:false})
    }



    const setIfSearchInputIsEmpty = ()=>{
      dispatch({type:'SET_USED_SEARCH',payload:false})
    }
    const setIfSearchComicInputIsEmpty = ()=>{
      dispatch({type:'SET_USED_SEARCH_COMIC',payload:false})
    }

    // for sideBar
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarVisible((prev) => !prev);
    };

    // for dialog
    const dialogRef = useRef()
    
  const openDialog = () => {
    dialogRef.current?.showModal()
  };

  const closeDialog = () => {
    dialogRef.current?.close()
  };



    const data = {
      state,
      showMoreDefaultFetching,
      showMoreDefaultCmFetching,
      searchFetchingCharacters,
      searchFetchingComics,
      isSidebarVisible,
      toggleSidebar,
      setIfSearchInputIsEmpty,
      setIfSearchComicInputIsEmpty,
      fetchComicsByCharcaterId,
      setFasleToShowDefaultComics,
      dialogRef,
      openDialog,
      closeDialog,
    }
  return (
    <StateContext.Provider value={data}>
        {children}
    </StateContext.Provider>
  )
}

export default StateContextProvider