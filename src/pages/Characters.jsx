import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../context/StateContext';
import "../styles/Reflection.css"
import { TbUserSearch } from "react-icons/tb";
import CharacterCard from '../components/CharacterCard';
import { IoIosArrowDown } from "react-icons/io";
import ApiLimitError from '../components/ApiLimitError';



const Characters = () => {
  const { state, showMoreDefaultFetching ,searchFetchingCharacters,setIfSearchInputIsEmpty} = useContext(StateContext);
  const { defaultCharacters,loadingForMoreCh, loading,loadingForDefault,loadingForSearchCh, moreDefaultCharacters, popularCharacters,fetchedMore,apiLimitReached ,fetchedCharacters,usedSearch} = state;
  const [clickedShowMore, setClickedShowMore] = useState(false);

  const [searchName,setSearchName] = useState('')


  useEffect(()=>{
    if (searchName==='') {
      setIfSearchInputIsEmpty()
    }
  },[searchName])

  const handleSubmit = (event)=>{
    event.preventDefault()
    console.log(searchName.toLowerCase());
    searchFetchingCharacters(searchName.toLowerCase())
  }
  return (
    <>
      {loading ? (
        <div>Loading</div>
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
                    <div className='h-[250px] w-[180px] max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px] border-white border-2 headCard overflow-hidden relative transition duration-300 hover:-translate-y-5 hover:shadow-lg shadow-white '>
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
            <div className='text-white font-poopins text-xs mt-3 max-md:text-[10px]'>
                In the section below, you'll find some default characters. If you don't see what you're looking for, you can search by character name.            
            </div>
          </div>

          <form onSubmit={handleSubmit} className=' relative items-center gap-2 flex bg-transparent border-b-2 border-black mt-5 w-[85%] mx-auto'>
            <TbUserSearch  type='submit' className='sm:text-3xl text-2xl'/>
            <input value={searchName} onChange={(e)=>{setSearchName(e.target.value)}} className='uppercase sm:text-3xl text-xl max-[350px]:text-lg flex-1 bg-transparent font-poopins border-none outline-none font-medium' placeholder='Search' type="text" name="" id="" />
            <small className='guideTextFromForm max-sm:text-xs'>In this search box you can search character by name (e.g. Spider-Man or Sp)</small>
          </form>
          
          {usedSearch?<>{
            loadingForSearchCh?(<div>Loading For Searching</div>):<>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-10'>
                {
                  fetchedCharacters && fetchedCharacters.length > 0 ? (
                    fetchedCharacters.map((character) => {
                      return <CharacterCard key={character.id} character={character}/>; 
                    })
                  ) : (
                    <div>Sorry no characters found</div>
                  )
                }
                </div>
            </>
          }</>:<>
          {loadingForDefault?(<div>Loaidng Default Characters</div>):<>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-10'>
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

                {loadingForMoreCh&&(<div>Loading More Data</div>)}

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
