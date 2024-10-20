import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartBar, FaUser, FaCog } from 'react-icons/fa';
import LogoutButton from './logout';
import LoginButton from './login';
import { useAuth0 } from '@auth0/auth0-react';
export default function Sidebar() {
  const { user, isAuthenticated } = useAuth0()

  return (
    <div className='w-64 h-screen bg-gray-800'>
      <ul className="menu text-white p-4">
        <li>
          <NavLink to="/dashboard" className="w-full flex items-center">
            <FaChartBar />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/property" className="w-full flex items-center">
            <FaChartBar />
            <span>Property</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="w-full flex items-center">
            <FaUser />
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="w-full flex items-center">
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>
        <li>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </li>
      </ul>
    </div>
  );
}
