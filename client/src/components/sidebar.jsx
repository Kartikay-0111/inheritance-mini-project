import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaHome, FaUser, FaCog } from 'react-icons/fa';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(null); // Track the clicked item

  const handleClick = (route) => {
    setActiveItem(route);
  };

  const getItemClass = (route) => 
    `flex items-center space-x-2 hover:bg-secondary ${
      activeItem === route ? 'bg-secondary' : ''
    }`;

  return (
    <ul className="menu bg-gray-800 text-white w-80 p-4">
      <li className={getItemClass('/home')} onClick={() => handleClick('/home')}>
        <Link to="/home" className="w-full flex items-center">
          <FaHome />
          <span>Home</span>
        </Link>
      </li>
      <li className={getItemClass('/dashboard')} onClick={() => handleClick('/dashboard')}>
        <Link to="/dashboard" className="w-full flex items-center">
          <FaChartBar />
          <span>Dashboard</span>
        </Link>
      </li>
      <li className={getItemClass('/profile')} onClick={() => handleClick('/profile')}>
        <Link to="/profile" className="w-full flex items-center">
          <FaUser />
          <span>Profile</span>
        </Link>
      </li>
      <li className={getItemClass('/settings')} onClick={() => handleClick('/settings')}>
        <Link to="/settings" className="w-full flex items-center">
          <FaCog />
          <span>Settings</span>
        </Link>
      </li>
    </ul>
  );
}
