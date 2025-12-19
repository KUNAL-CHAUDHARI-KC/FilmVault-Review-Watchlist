import { useEffect, useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import WatchList from './components/WatchList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  let [watchList, setWatchList] = useState([])

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchList, movieObj]
    setWatchList(newWatchList)
    localStorage.setItem('moviesApp',
      JSON.stringify(newWatchList))
    console.log(newWatchList)
  }

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movie) => {
      return movie.id != movieObj.id
    })

    setWatchList(filteredWatchList)
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchList))
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if (!moviesFromLocalStorage) {
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  }, [])

  return (
    <>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route
            path='/'
            element={
              <>
                <Banner /> <Movies watchList={watchList} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} />
              </>}>
          </Route>

          <Route
            path='/watchList'
            element={<WatchList watchList={watchList} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} />}
          >
          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
