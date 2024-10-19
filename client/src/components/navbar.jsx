import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { yariga,logo } from '../assets';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex text-2xl font-bold mr-4">
          <img src={logo} alt="Logo" className="h-8" />
        </Link>
        <div className="text-white text-lg font-bold">Kompany</div>
        {/* Hamburger Menu Button (visible on mobile) */}
        <div className="md:hidden">
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
        </div>

        {/* Links */}
        <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className=""></div>
          <ul className="md:flex md:space-x-4 mt-4 md:mt-0">
            <li>
              <a href="#" className="block text-white hover:text-gray-300 p-2">
                Profile
              </a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
