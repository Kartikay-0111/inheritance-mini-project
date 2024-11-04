import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch,FaUmbrella } from 'react-icons/fa';
import { yariga, logo } from '../assets';
import { useAuth0 } from '@auth0/auth0-react';
import placeHolderimage from '../assets/avatar.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 const {user,isAuthenticated}  =useAuth0()
  return (
        <nav className="bg-gray-800 p-4 h-16 w-full">
    <div className="container flex justify-between items-center">
        {/* Logo */}
        <div>
        <NavLink to="/" className="flex text-2xl font-bold mr-4">
          <img src={logo} alt="Logo" className="h-8" />
          <div className="text-white text-lg font-bold">&nbsp;Kompany</div>
        </NavLink>
        </div>
        {/* Hamburger Menu Button (visible on mobile) */}
        {/* <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>   */}
        <div className='flex flex-row gap-3'>
        <FaSearch className='text-white m-auto h-7 w-7' />
        <input type="text" placeholder='Search propreties..'/>
        {isAuthenticated && <img className='h-5/6 w-9' src={user.picture || placeHolderimage} alt="profile" />}
        {isAuthenticated && <p className='text-white'>{user.name}</p>}
        </div> 
      </div>
    </nav>
  );
};

export default Navbar;
