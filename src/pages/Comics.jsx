import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../context/StateContext';
import ApiLimitError from '../components/ApiLimitError';
import { AiOutlineFileSearch } from "react-icons/ai";
import CharacterCard from '../components/CharacterCard';
import { IoIosArrowDown } from "react-icons/io";
import ComicCard from '../components/ComicCard';
import '../styles/Button.css'
import { GiSecretBook } from "react-icons/gi";
import { IoIosArrowBack , IoIosArrowForward  } from "react-icons/io";



const Comics = () => {
  const { state,showMoreDefaultCmFetching,searchFetchingComics,setIfSearchComicInputIsEmpty,setFasleToShowDefaultComics,openDialog} = useContext(StateContext);
  const { loading,popularComics,apiLimitReached,defaultComics,loadingForFetchCmsByChId,loadingForDefaultComic,loadingForMoreCm,moreDefaultComics,fetchedMoreCm,usedSearchComic,fetchedComics,loadingForSearchCm,fetchedComicsByCharcaterId,isUsingFetchCmsByCh} = state;
  const [clickedShowMore, setClickedShowMore] = useState(false);

  const [searchTitle,setSearchTitle] = useState('')


  // This part of pagination is for the search data
  const [separatedComics,setSeparatedComics] = useState([])
  const [currentArray,setCurrentArray] = useState(0)

  const separateComics = () => {
    const comics = fetchedComics || [];
    const separated = [];
    let tempArr = [];

    comics.forEach((comic, index) => {
      if ((index > 0 && (index + 1) % 10 === 0) || index === comic.length - 1) {
        tempArr.push(comic);
        separated.push([...tempArr]);
        tempArr = [];
      } else {
        tempArr.push(comic);
      }
    });

    setSeparatedComics(separated);
  };

  useEffect(() => {
    separateComics();
  }, [fetchedComics])
  // this is the end

  // this part of paginatio is for viewing comics that is searched by character id
  const [separatedComicsChId,setSeparatedComicsChId] = useState([])
  const [currentArrayChId,setCurrentArrayChId] = useState(0)

  const separateComicsChId = () => {
    const comics = fetchedComicsByCharcaterId || [];
    const separated = [];
    let tempArr = [];

    comics.forEach((comic, index) => {
      if ((index > 0 && (index + 1) % 10 === 0) || index === comic.length - 1) {
        tempArr.push(comic);
        separated.push([...tempArr]);
        tempArr = [];
      } else {
        tempArr.push(comic);
      }
    });

    setSeparatedComicsChId(separated);
  };

  useEffect(() => {
    separateComicsChId();
  }, [fetchedComicsByCharcaterId])




  useEffect(()=>{
    if (searchTitle==='') {
      setIfSearchComicInputIsEmpty()
    }
  },[searchTitle])

  const handleSubmit = (event)=>{
    event.preventDefault()
    searchFetchingComics(searchTitle.toLowerCase())
    setCurrentArray(0)
  }
  return (
    <>
      {loading ? (
        <>
          <div className='flex flex-col justify-center items-center py-5 gap-5 bg-[rgb(22,22,22)]'>
            {/* <div className='flex text-white animate-pulse  -translate-y-2 bg-gray-200 w-[370px] h-[18px]'></div> */}

            <div className='text-white font-banger tracking-widest -translate-y-3 w-[200px] h-[20px] bg-gray-200 animate-pulse'></div>

            <div className='flex mb-10 flex-wrap justify-center items-center gap-5'>

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
      ) :(apiLimitReached?<ApiLimitError/>:<>
        {isUsingFetchCmsByCh?<>        
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-28 relative'>

          {loadingForFetchCmsByChId?<>
              <div className='absolute -top-20   w-full  flex sm:justify-end justify-center sm:px-20 '>
                <button className=' bg-gray-200 border-gray-200 animate-pulse text-gray-200 border-2  p-2 rounded-full px-5 font-poopins text-sm'  onClick={setFasleToShowDefaultComics}>View Default Comics</button>
              </div>

                <div className='relative flex translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  justify-center items-center w-fit  mx-auto'>
                  <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                </div>
                <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-sm:hidden flex justify-center items-center w-fit  mx-auto'>
                  <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
                </div>
                <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  max-lg:hidden flex justify-center items-center w-fit  mx-auto'>
                  <div className='w-[220px] h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
              </div>
          </>:<>
            <div className='absolute -top-20  w-full  flex sm:justify-end justify-center sm:px-20 '>
              <button className='favorite-btn border-2 border-black p-2 rounded-full px-5 font-poopins text-sm hover:scale-95 shadow-lg hover:shadow-md'  onClick={setFasleToShowDefaultComics}>View Default Comics</button>
            </div>


                {
                  separatedComicsChId && separatedComicsChId.length > 0 ? (
                    separatedComicsChId[currentArrayChId].map((comic) => {
                      return <ComicCard key={comic.id} comic={comic}/>; 
                    })
                  ) : (
                    <></>
                  )
                }
          </>}

              </div>
              {isUsingFetchCmsByCh?<>{loadingForFetchCmsByChId?<></>:<>{separatedComicsChId&&separatedComicsChId.length>0?<></>:<>
                  <div className='w-fit mx-auto -mt-24 mb-10 font-poopins max-sm:w-5/6'>
                      <h1 className='text-3xl text-red-400'>Ooops!</h1>
                      <p className='text-gray-500 max-sm:text-sm'>Sorry, no comic books found for this character.</p>
                      <p className='text-gray-500 max-sm:text-sm'>You can view other default comics by clicking the button above!</p>
                  </div>
              </>}</>}</>:<></>}

              {separatedComicsChId.length>1&&<div className='w-fit select-none font-banger  mx-auto mb-5 flex items-center justify-center gap-3'>
                  <div onClick={()=>{
                    currentArrayChId!==0&&setCurrentArrayChId(currentArrayChId-1)
                  }} className={`hover:${currentArrayChId==0?'':'bg-gray-100'} ${currentArrayChId==0&&"text-gray-300"} text-xl border  rounded-md transition p-[6px] cursor-pointer`}>
                    <IoIosArrowBack className=''/>
                  </div>
                  {separatedComicsChId.map((_, index) => (
                    <button onClick={()=>{
                      setCurrentArrayChId(index)
                    }} className={`${currentArrayChId===index?'hover:bg-gray-400':'hover:bg-gray-100'} border rounded-md transition p-1 px-3 max-sm:px-2 ${currentArrayChId===index&&'bg-gray-300'}`} key={index} >
                      {index + 1}
                    </button>
                  ))}
                  <div onClick={()=>{
                    currentArrayChId!==separatedComicsChId.length-1&&setCurrentArrayChId(currentArrayChId+1)
                  }} className={`hover:${currentArrayChId==4?'':'bg-gray-100'} ${currentArrayChId==separatedComicsChId.length-1&&"text-gray-300"} text-xl border  rounded-md transition p-[6px] cursor-pointer`}>
                    <IoIosArrowForward className=''/>
                  </div>
                </div>}
        </>:<>

          <div className='flex flex-col justify-center items-center py-5 gap-5 bg-[rgb(22,22,22)]'>

            {popularComics && popularComics.length===5&&(
                <div className='text-white font-banger tracking-widest -translate-y-3'>
                    Top 5 most popular comics
                </div>
            )}
            <div className='flex flex-wrap justify-center  gap-5 bg- items-stretch'>
            {popularComics && popularComics.length>0&&popularComics.map((comic,length)=>{
                const detailUrl = comic.urls.find(element=>element['type']==="detail").url
                return (<div key={comic.id} className='flex flex-col gap-3 flex-wrap   '>
                    <a href={detailUrl} target='_blank' className='h-[250px] w-[180px] max-lg:h-[230px] max-lg:w-[150px] max-[850px]:h-[200px] max-[850px]:w-[130px] border-white border-2 headCard overflow-hidden relative transition duration-300 hover:-translate-y-5 hover:shadow-lg shadow-white '>
                        <img className='h-full w-full object-cover' src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
                        <div className='headReflection'></div>
                    </a>
                    <div className='flex items-center gap-3 w-[180px] max-lg:w-[150px] max-[850px]:w-[130px]'>
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
            loadingForSearchCm?<></>:<>
              {fetchedComics && fetchedComics.length>0?<></>:<>
              <div className='font-poopins mx-auto w-fit flex flex-col items-center'>
                  <h1 className='text-red-500 mb-1 text-4xl font-banger tracking-widest mt-20 '>Ooops!</h1>
                  <div className='text-3xl w-[50px] icon-container h-[50px] hover:scale-95 hover:bg-black hover:text-white transition border-2  relative flex items-center justify-center border-black rounded-full'>
                      <GiSecretBook/>
                      <div className='h-[3px] child w-full hover:bg-black transition bg-white absolute rotate-45'></div>
                  </div>
                  <p className='text-lg mt-1 font-medium'>No comics found</p>
                  <small className='text-gray-400'>Please try another search</small>
              </div>
              </>}
            </>
          }</>:<></>}

          {usedSearchComic?<>{
            loadingForSearchCm?(<>
                <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10  my-16'>
                  <div className='relative translate-x-7 max-md:translate-x-5  max-sm:translate-x-0 max-[320px]:hover:translate-x-6  flex justify-center items-center w-fit  mx-auto'>
                    <div className='w-[220px]  h-[320px] max-sm:w-[200px] max-sm:h-[300px] max-[470px]:w-[180px] max-[470px]:h-[280px] max-[400px]:w-[150px] max-[400px]:h-[250px] bg-gray-200 animate-pulse'></div>
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
                  separatedComics && separatedComics.length > 0 ? (
                    separatedComics[currentArray].map((comic) => {
                      return <ComicCard key={comic.id} comic={comic}/>; 
                    })
                  ) : (
                    <></>
                  )
                }
                </div>
                {separatedComics.length>1&&<div className='w-fit select-none font-banger  mx-auto mb-5 flex items-center justify-center gap-3'>
                  <div onClick={()=>{
                    currentArray!==0&&setCurrentArray(currentArray-1)
                  }} className={`hover:${currentArray==0?'':'bg-gray-100'} ${currentArray==0&&"text-gray-300"} text-xl border  rounded-md transition p-[6px] cursor-pointer`}>
                    <IoIosArrowBack className=''/>
                  </div>
                  {separatedComics.map((_, index) => (
                    <button onClick={()=>{
                      setCurrentArray(index)
                    }} className={`${currentArray===index?'hover:bg-gray-400':'hover:bg-gray-100'} border rounded-md transition p-1 px-3 max-sm:px-2 ${currentArray===index&&'bg-gray-300'}`} key={index} >
                      {index + 1}
                    </button>
                  ))}
                  <div onClick={()=>{
                    currentArray!==separatedComics.length-1&&setCurrentArray(currentArray+1)
                  }} className={`hover:${currentArray==4?'':'bg-gray-100'} ${currentArray==separatedComics.length-1&&"text-gray-300"} text-xl border  rounded-md transition p-[6px] cursor-pointer`}>
                    <IoIosArrowForward className=''/>
                  </div>
                </div>}
            </>
          }</>:<>
          {loadingForDefaultComic?(<>
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

                {loadingForMoreCm&&(<>
                  <div className='grid grid-cols-1 -mt-16 lg:grid-cols-3 sm:grid-cols-2 gap-10  mb-10'>
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

        </>}
      </>)}
    </>
  )
}

export default Comics