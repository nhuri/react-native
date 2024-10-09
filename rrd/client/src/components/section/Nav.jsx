import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from "../../contexts/AuthContext";

function Nav() {


  const { logOut } = useContext(AuthContext);
  const dynamicColor = (isActive) => {
    return `block py-2 px-3 text-white bg-blue-700 ${
      isActive ? "md:text-red-500" : "md:text-blue-700"
    } rounded md:bg-transparent  md:p-0 `;
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          onClick={logOut}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <CiLogout size={30} color="white" />
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => dynamicColor(isActive)}
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                // onClick={() => setNameLink('about')}
                // className={`${nameLink === 'about' && 'bg-purple-500'}`}
                className={({ isActive }) => dynamicColor(isActive)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => dynamicColor(isActive)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => dynamicColor(isActive)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
