import React from 'react'
import Logo from '../assets/FilmVault.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
  <div className='flex border space-x-8 items-center pl-3  py-3'>

    <img className='w-[45px]' src = {Logo} alt="" />

    <Link to="/" 
     className='text-blue-500 text-2xl font-bold'>
       Movies
    </Link>

    <Link to="/watchList" 
      className='text-blue-500 text-2xl font-bold'>
       WatchList
    </Link>

    </div>
  )
}

export default Navbar
