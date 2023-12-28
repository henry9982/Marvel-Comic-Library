import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../context/StateContext';
import ApiLimitError from '../components/ApiLimitError';
import { AiOutlineFileSearch } from "react-icons/ai";
import CharacterCard from '../components/CharacterCard';
import { IoIosArrowDown } from "react-icons/io";
import ComicCard from '../components/ComicCard';

const Comics = () => {
  const { state,showMoreDefaultCmFetching,searchFetchingComics,setIfSearchComicInputIsEmpty} = useContext(StateContext);
  const { loading,popularComics,apiLimitReached,defaultComics,loadingForDefaultComic,loadingForMoreCm,moreDefaultComics,fetchedMoreCm,usedSearchComic,fetchedComics,loadingForSearchCm} = state;
  const [clickedShowMore, setClickedShowMore] = useState(false);

  const [searchTitle,setSearchTitle] = useState('')

  useEffect(()=>{
    console.log(popularComics);
  },[popularComics])

  useEffect(()=>{
    if (searchTitle==='') {
      setIfSearchComicInputIsEmpty()
    }
  },[searchTitle])

  const handleSubmit = (event)=>{
    event.preventDefault()
    console.log(searchTitle.toLowerCase());
    searchFetchingComics(searchTitle.toLowerCase())
  }
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) :(apiLimitReached?<ApiLimitError/>:<>
        <div className='flex flex-col justify-center items-center py-5 gap-5 bg-[rgb(22,22,22)]'>

            {popularComics && popularComics.length===5&&(
                <div className='text-white font-banger tracking-widest -translate-y-3'>
                    Top 5 most popular comics
                </div>
            )}
            <div className='flex flex-wrap justify-center  gap-5 bg- items-stretch'>
            {popularComics && popularComics.length>0&&popularComics.map((comic,length)=>{
                return (<div key={comic.id} className='flex flex-col gap-3 flex-wrap   '>
                    <div className='h-[250px] w-[180px] max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px] border-white border-2 headCard overflow-hidden relative transition duration-300 hover:-translate-y-5 hover:shadow-lg shadow-white '>
                        <img className='h-full w-full object-cover' src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
                        <div className='headReflection'></div>
                    </div>
                    <div className='flex items-center gap-3 w-[180px]'>
                        <div className='text-white font-poopins font-semibold place-self-start'>
                            {length+1}
                        </div>
                        <div className='text-white font-poopins font-medium tracking-widest text-xs '>
                            {comic.title}
                        </div>
                    </div>
                </div>)
            })}
            </div>
            <div className='text-white font-poopins text-xs mt-3 max-md:text-[10px]'>
                In the section below, you'll find some default comics. If you don't see what you're looking for, you can search by comic title.            
            </div>
          </div>

          <form onSubmit={handleSubmit} className=' relative items-center gap-2 flex bg-transparent border-b-2 border-black mt-5 w-[85%] mx-auto'>
            <AiOutlineFileSearch  type='submit' className='sm:text-3xl text-2xl'/>
            <input value={searchTitle} onChange={(e)=>{setSearchTitle(e.target.value)}} className='uppercase sm:text-3xl text-xl max-[350px]:text-lg flex-1 bg-transparent font-poopins border-none outline-none font-medium' placeholder='Search' type="text" name="" id="" />
            <small className='guideTextFromForm max-sm:text-xs'>In this search box you can search character by name (e.g. Spider-Man or Sp)</small>
          </form>

          {usedSearchComic?<>{
            loadingForSearchCm?(<div>Loading For Searching</div>):<>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-10'>
                {
                  fetchedComics && fetchedComics.length > 0 ? (
                    fetchedComics.map((comic) => {
                      return <ComicCard key={comic.id} comic={comic}/>; 
                    })
                  ) : (
                    <div>Sorry no comics found</div>
                  )
                }
                </div>
            </>
          }</>:<>
          {loadingForDefaultComic?(<div>Loaidng Default Comics</div>):<>
              <div className='flex flex-col'>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-10'>
                  {
                    defaultComics && defaultComics.length > 0 ? (
                      defaultComics.map((comic) => {
                        return <ComicCard key={comic.id} comic={comic}/>; 
                      })
                    ) : (
                      <div>No default Comics available</div>
                    )
                  }
                  {
                    loadingForMoreCm?(<div></div>):moreDefaultComics && moreDefaultComics.length >0&&(
                      moreDefaultComics.map((comic)=>{
                        return <ComicCard key={comic.id} comic={comic}/>; 
                      })
                    )
                  }
                </div>

                {loadingForMoreCm&&(<div>Loading More Data</div>)}
                {!clickedShowMore && (!fetchedMoreCm || moreDefaultComics.length <= 0) ? (
              <div
              className='mx-auto my-5 cursor-pointer flex flex-col justify-center items-center w-fit'
              onClick={() => {
              showMoreDefaultCmFetching();
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

      </>)}
    </>
  )
}

export default Comics