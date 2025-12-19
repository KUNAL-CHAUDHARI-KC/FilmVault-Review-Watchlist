import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'
import Banner from './Banner'

function Movies({handleAddtoWatchList,      handleRemoveFromWatchList, watchList}) {

  const[movies, setMovies] = useState([])
  let [pageNO, setPageNo] = useState(1)

  const [bannerMovie, setBannerMovie] = useState(null);


  const handlePrev = () => {
    if(pageNO === 1) {
      setPageNo(pageNO)
    }
    else {
      setPageNo(pageNO - 1)
    }
  }

  const handleNext = () => {
    setPageNo(pageNO + 1)
  }

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b839c0400beb37375d26770cd15d31c8&language=en-US&page=${pageNO}`).then(function(res){
      setMovies(res.data.results)
        // console.log(res)
      if (res.data.results.length > 0) {
  const randomIndex = Math.floor(
    Math.random() * res.data.results.length
  );
  setBannerMovie(res.data.results[randomIndex]);
}

    })
  }, [pageNO])



  return (
    <div className='p-5'>
      <Banner bannerMovie={bannerMovie} />

      <div className='text-2xl m-5 font-bold text-center  '>
        Trending Movies
      </div>

      <div className='flex flex-row flex-wrap  justify-around gap-8'>
        {movies.map((movieObj) => {
          return <MovieCard movieObj={movieObj} key={movieObj.id} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchlist={handleAddtoWatchList} handleRemoveFromWatchList = {handleRemoveFromWatchList} watchList = {watchList}/>
        })}
      </div>

        <Pagination  pageNO = {pageNO} handlePrev = {handlePrev} handleNext = {handleNext}/>

    </div>
  )
}

export default Movies


// https://api.themoviedb.org/3/movie/popular?api_key=b839c0400beb37375d26770cd15d31c8&language=en-US&page=2