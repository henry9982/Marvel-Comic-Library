import React, { useContext, useEffect, useRef, useState } from 'react';
import { StateContext } from '../context/StateContext';
import "../styles/Reflection.css"
import { TbUserSearch } from "react-icons/tb";
import CharacterCard from '../components/CharacterCard';
import { IoIosArrowDown } from "react-icons/io";
import ApiLimitError from '../components/ApiLimitError';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePerson4 } from "react-icons/md";
import { IoIosArrowBack , IoIosArrowForward  } from "react-icons/io";




const Characters = () => {
  const { state, showMoreDefaultFetching ,searchFetchingCharacters,setIfSearchInputIsEmpty,fetchComicsByCharcaterId,dialogRef,closeDialog,openDialog} = useContext(StateContext);
  const { defaultCharacters,loadingForMoreCh, loading,loadingForDefault,loadingForSearchCh, moreDefaultCharacters, popularCharacters,fetchedMore,apiLimitReached ,fetchedCharacters,usedSearch} = state;
  const [clickedShowMore, setClickedShowMore] = useState(false);

  const [separatedCharacters,setSeparatedCharacters] = useState([])
  const [currentArray,setCurrentArray] = useState(0)

  const separateCharacters = () => {
    const characters = fetchedCharacters || [];
    const separated = [];
    let tempArr = [];

    characters.forEach((character, index) => {
      if ((index > 0 && (index + 1) % 10 === 0) || index === characters.length - 1) {
        tempArr.push(character);
        separated.push([...tempArr]);
        tempArr = [];
      } else {
        tempArr.push(character);
      }
    });

    setSeparatedCharacters(separated);
  };

  useEffect(() => {
    separateCharacters();
  }, [fetchedCharacters])

  useEffect(() => {
  }, [separatedCharacters])


  const navigate = useNavigate()
  const handleClick = (id)=>{
    fetchComicsByCharcaterId(id)
    navigate('/home/comics')
  }

  const [searchName,setSearchName] = useState('')


  useEffect(()=>{
    if (searchName==='') {
      setIfSearchInputIsEmpty()
    }
  },[searchName])

  const handleSubmit = (event)=>{
    event.preventDefault()
    searchFetchingCharacters(searchName.toLowerCase())
    setCurrentArray(0)
  }
  return (
    <>
      {loading ? (
        <>
          <div className='flex flex-col justify-center items-center py-5 gap-5 bg-[rgb(22,22,22)]'>
              <div className='flex text-white animate-pulse  -translate-y-2 bg-gray-200 w-[370px] h-[18px]'></div>

              <div className='text-white font-banger tracking-widest -translate-y-3 w-[280px] h-[20px] bg-gray-200 animate-pulse'></div>

              <div className='flex flex-wrap justify-center items-center gap-5'>

                  <div className='flex flex-col gap-3 '>
                      <div className='h-[250px] w-[180px] bg-gray-200 animate-pulse max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px]  headCard overflow-hidden relative transition duration-300  '>

                      </div>
                      <div className='h-[20px] w-[120px] bg-gray-200 animate-pulse'>

                      </div>
                  </div>

                  <div className='flex flex-col gap-3 '>
                      <div className='h-[250px] w-[180px] bg-gray-200 animate-pulse max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px]  headCard overflow-hidden relative transition duration-300  '>

                      </div>
                      <div className='h-[20px] w-[120px] bg-gray-200 animate-pulse'>

                      </div>
                  </div>

                  <div className='flex flex-col gap-3 '>
                      <div className='h-[250px] w-[180px] bg-gray-200 animate-pulse max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px]  headCard overflow-hidden relative transition duration-300  '>

                      </div>
                      <div className='h-[20px] w-[120px] bg-gray-200 animate-pulse'>

                      </div>
                  </div>
                  <div className='flex flex-col gap-3 '>
                      <div className='h-[250px] w-[180px] bg-gray-200 animate-pulse max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px]  headCard overflow-hidden relative transition duration-300  '>

                      </div>
                      <div className='h-[20px] w-[120px] bg-gray-200 animate-pulse'>

                      </div>
                  </div>
                  <div className='flex flex-col gap-3 '>
                      <div className='h-[250px] w-[180px] bg-gray-200 animate-pulse max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px]  headCard overflow-hidden relative transition duration-300  '>

                      </div>
                      <div className='h-[20px] w-[120px] bg-gray-200 animate-pulse'>

                      </div>
                  </div>


              </div>

              <div className='bg-gray-200 animate-pulse w-[775px] h-[16px] max-[800px]:w-11/12'></div>
          </div>
        </>
      ) : (
        apiLimitReached?<ApiLimitError/>:<>

        <div className='flex flex-col justify-center items-center py-5 gap-5 bg-[rgb(22,22,22)]'>
            <div className='flex text-white gap-4 font-poopins text-xs max-[400px]:text-[10px] font-semibold -translate-y-2'>
            {popularCharacters && popularCharacters.length===5&&popularCharacters.map(character=>{
               return <div key={character.id}>{character.name}</div>
            })}
            </div>
            {popularCharacters && popularCharacters.length===5&&(
                <div className='text-white font-banger tracking-widest -translate-y-3'>
                    Top 5 most popular characters
                </div>
            )}
            <div className='flex flex-wrap justify-center items-center gap-5'>
            {popularCharacters && popularCharacters.length>0&&popularCharacters.map((character,length)=>{
                return (<div key={character.id} className='flex flex-col gap-3'>
                    <div onClick={()=>{
                      handleClick(character.id)
                    }} className='h-[250px] w-[180px] max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px] border-white border-2 headCard overflow-hidden relative transition duration-300 hover:-translate-y-5 hover:shadow-lg shadow-white '>
                        <img className='h-full w-full object-cover' src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt="" />
                        <div className='headReflection'></div>
                    </div>
                    <div className='flex items-center gap-3 '>
                        <div className='text-white font-poopins font-semibold'>
                            {length+1}
                        </div>
                        <div className='text-white font-banger tracking-widest text-sm'>
                            {character.name}
                        </div>
                    </div>
                </div>)
            })}
            </div>
            <div className='text-white font-poopins text-xs mt-3 max-md:text-[10px] max-md:px-2'>
                In the section below, you'll find some default characters. If you don't see what you're looking for, you can search by character name.            
            </div>
          </div>

          

          <form onSubmit={handleSubmit} className=' relative items-center gap-2 flex bg-transparent border-b-2 border-black mt-5 w-[85%] mx-auto'>
            <TbUserSearch  type='submit' className='sm:text-3xl text-2xl'/>
            <input value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} className='uppercase sm:text-3xl text-xl max-[350px]:text-lg flex-1 bg-transparent font-poopins border-none outline-none font-medium' placeholder='Search' type="text" name="" id="" />
            <small className='guideTextFromForm max-sm:text-xs'>In this search box you can search character by name (e.g. Spider-Man or Sp)</small>
          </form>

          {usedSearch?<>{loadingForSearchCh?<></>:<>
            {
              fetchedCharacters && fetchedCharacters.length>0?<></>:<>
                  <div className='mt-20 w-fit mx-auto flex flex-col items-center font-poopins'>
                        <h1 className='text-4xl font-banger tracking-widest text-red-400'>Whoops!</h1>
                        <div className='text-3xl w-[50px] icon-container h-[50px] hover:scale-95 hover:bg-black hover:text-white transition border-2  relative flex items-center justify-center border-black rounded-full'>
                          <MdOutlinePerson4/>
                          <div className='h-[3px] child w-full hover:bg-black transition bg-white absolute rotate-45'></div>
                        </div>
                        <p className='font-medium text-lg'>Sorry, no characters found</p>
                        <small className='text-gray-400'>Please try again with a different name</small>
                    </div>
              </>
            }
          </>}</>:<></>}
          
          
          {usedSearch?<>{
            loadingForSearchCh?(<>
              <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-16'>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-sm:hidden flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-lg:hidden flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
              </div>
            </>):<>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-16'>
                {
                  separatedCharacters && separatedCharacters.length > 0 ? (
                    separatedCharacters[currentArray].map((character) => {
                      return <CharacterCard key={character.id} character={character}/>; 
                    })
                  ) : (
                    <></>
                  )
                }
                </div>
                {separatedCharacters.length>1&&<div className='w-fit select-none font-banger  mx-auto mb-5 flex items-center justify-center gap-3'>
                  <div onClick={()=>{
                    currentArray!==0&&setCurrentArray(currentArray-1)
                  }} className={`hover:${currentArray==0?'':'bg-gray-100'} ${currentArray==0&&"text-gray-300"} text-xl border  rounded-md transition p-[6px] cursor-pointer`}>
                    <IoIosArrowBack className=''/>
                  </div>
                  {separatedCharacters.map((_, index) => (
                    <button onClick={()=>{
                      setCurrentArray(index)
                    }} className={`hover:${currentArray===index?'bg-gray-400':'bg-gray-100'} border rounded-md transition p-1 px-3 max-sm:px-2  ${currentArray===index&&'bg-gray-300'}`} key={index} >
                      {index + 1}
                    </button>
                  ))}
                  <div onClick={()=>{
                    currentArray!==separatedCharacters.length-1&&setCurrentArray(currentArray+1)
                  }} className={`hover:${currentArray==4?'':'bg-gray-100'} ${currentArray==separatedCharacters.length-1&&"text-gray-300"} text-xl border  rounded-md transition p-[6px] cursor-pointer`}>
                    <IoIosArrowForward className=''/>
                  </div>
                </div>}
            </>
          }</>:<>
          {loadingForDefault?(<>
            <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-16'>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-sm:hidden flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-lg:hidden flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
              </div>
          </>):<>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-16'>
                  {
                    defaultCharacters && defaultCharacters.length > 0 ? (
                      defaultCharacters.map((character) => {
                        return <CharacterCard key={character.id} character={character}/>; 
                      })
                    ) : (
                      <div>No default characters available</div>
                    )
                  }
                  {
                    loadingForMoreCh?(<div></div>):moreDefaultCharacters && moreDefaultCharacters.length >0&&(
                      moreDefaultCharacters.map((character)=>{
                        return <CharacterCard key={character.id} character={character}/>
                      })
                    )
                  }
                </div>

                {loadingForMoreCh&&(<>
                  <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-x-10  mb-10 -mt-16'>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-sm:hidden flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-lg:hidden flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                  </div>
              </div>
                </>)}

                {!clickedShowMore && (!fetchedMore || moreDefaultCharacters.length <= 0) ? (
              <div
                  className='mx-auto my-5 cursor-pointer flex flex-col justify-center items-center w-fit'
                  onClick={() => {
                    showMoreDefaultFetching();
                    setClickedShowMore(true);
                  }}
                >
                <div className='font-banger tracking-widest text-xl'>View More</div>
                <div className='bg-green-500 p-1  rounded-full'>
                  <IoIosArrowDown className='text-xl text-white' />
                </div>
              </div>
              ) : null}
              </div>
            </>}
          </>}
          
          
        </>
      )}
    </>
  );
};

export default Characters;
