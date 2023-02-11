import React from 'react'
import {Link} from 'react-router-dom'

export const HeaderNavbar = () => {
  return (
    <div className='px-10 w-100 h-10 py-2 justify-between align-middle flex flex-row bg-slate-400'>
      <div className='tex-lg'>Header</div>
      <div className='text-gray-700 hover:text-blue-800 transition duration-150'>
        <Link to="/">
          <span className='px-6 cursor-pointer text-clip overflow-hidden'>Home</span>
        </Link>
        <Link to="/users">
          <span className='px-6 cursor-pointer'>Users</span>
        </Link>
        <Link to="/gallery">
          <span className='px-6 cursor-pointer'>Gallery</span>
        </Link>
        <Link to="/product">
          <span className='px-6 cursor-pointer'>Product</span>
        </Link>
        <Link to="/cart">
          <span className='px-6 cursor-pointer'>Cart</span>
        </Link>
      </div>
      
    </div>
  )
}
