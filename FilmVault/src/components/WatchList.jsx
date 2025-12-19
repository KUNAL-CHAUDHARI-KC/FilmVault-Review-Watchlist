import React, { useEffect, useState } from 'react';
import genreids from '../Utility/genre'

function WatchList({ watchList, setWatchList, handleRemoveFromWatchList }) {

    const[search, setSearch] =  useState('');
    const[genreList, setGenereList] = useState(['All Genres']);
    const[currGenre, setCurrGenre] = useState('All Genre')

    let handleSearch = (e)=> {
       setSearch(e.target.value)
    };

    let handleFilter = (genre)=> {
      setCurrGenre(genre)
    }

    let sortIncresing = () => {
      let sortedIncresing = watchList.sort((movieA, movieB) => {
        return movieA.vote_average - movieB.vote_average
      })

      setWatchList([...sortedIncresing])
    }

    let sortDecresing = () => {
      let sortedDecresing = watchList.sort((movieA, movieB) => {
        return movieB.vote_average - movieA.vote_average
      })

      setWatchList([...sortedDecresing])
    }

    useEffect(() => {
      let temp = watchList.map((movieObj) => {
        return genreids[movieObj.genre_ids[0]]
      })
      temp = new Set(temp)  
      setGenereList(['All Genre', ...temp])
    }, [watchList])

  return (
    <>

      <div className='flex justify-center flex-wrap m-4 '>
        {genreList.map((genre) => {
         return <div onClick={() => handleFilter(genre)} className={currGenre == genre ? 'flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold  mx-4' : 'flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold  mx-4'}>
          {genre}
        </div>
        })}
        

      </div>

      <div className='flex justify-center my-4'>
        <input onChange={handleSearch} value={search} type="text" placeholder='Search Movies' className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4'
        />
      </div>

      <div className='overflow-hidden rounded-lg 
      border border-gray-200 m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th className='flex justify-center'>
                <div onClick={sortIncresing} className='p-2'><i class="fa-solid fa-arrow-up">
                  </i></div>
                  <div className='p-2'>Ratings</div>
                 <div onClick={sortDecresing} className='p-2'><i class="fa-solid fa-arrow-down">
                  </i></div>
              </th>

              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>

            {watchList.filter((movieObj) => {
              if(currGenre == 'All Genre') {
                return true
              }else {
                return genreids[movieObj.genre_ids[0]] == currGenre;
              }
            }).filter((movieObj)=> {
              return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
            }).map((movieObj) => {
              return <tr key={movieObj.id} className='border-b-2'>
                <td className='flex items-center px-6 py-4 group'>
                  <img className='h-[8rem] w-[10rem] object-contain rounded-xl transition-transform duration-300 group-hover:scale-120'
                    src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`} />
                  <div className='ml-4 transition-all duration-300 group-hover:translate-x-2 group-hover:text-blue-500'>
                    {movieObj.title}
                  </div>
                </td>


                <td>{(movieObj.vote_average.toFixed(2))}  
                </td>
                <td>{Math.round(movieObj.popularity)}%</td>
                <td>{genreids[movieObj.genre_ids[0]]}</td>

                <td onClick=
                {() =>handleRemoveFromWatchList(movieObj)} className='text-red-800 cursor-pointer'>Delete</td>

              </tr>
            })}

            {/* <tr className='border-b-2'>
              <td className='flex items-center px-6 py-4 ' >
                <img className='h-[6rem] w-[10rem]  '
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRerWen2QDM4y-Qv7PFVMR1Hc9jbn53hoctOw&s-`} />
                <div className='mx-10'>The matrix</div>
              </td>

              <td>8.5</td>
              <td>9</td>
              <td>Action</td>

              <td className='text-red-800 '>Delete</td>

            </tr> */}


          </tbody>
        </table>
      </div>

    </>
  )
}

export default WatchList
