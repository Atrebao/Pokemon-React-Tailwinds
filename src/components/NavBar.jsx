import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='w-full p-6 bg-teal-500 shadow-md '>
      <NavLink to={"/pokemons"}><h1 className='text-white text-center text-3xl font-semibold'>Pokédex</h1></NavLink>
    </div>
  )
}
