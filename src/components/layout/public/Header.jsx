import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

const Header = () => {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false)

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen)
  }

  const closeNavBar = () => {
    setIsNavBarOpen(false)
  }

  return (
    <div className="flex justify-between items-center p-3.5 pl-[var(--pub-container-padding-x)] pr-[var(--pub-container-padding-x)] xl:pt-0 xl:pb-0 fixed top-0 left-0 w-full bg-black/25 backdrop-blur-md z-50">
      <nav className="flex items-center justify-between w-[87.5%] sm:w-[92%] md:w-11/12 xl:w-max xl:gap-7 xl:justify-baseline">
        <div className="flex items-center gap-4">
          <Link className="hover:opacity-75" to="/">
            <img className="w-15.5 sm:w-17.5 md:w-22 lg:w-24.5" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
          </Link>
          <img className="w-13.5 sm:w-15.5 md:w-20 lg:w-22.5" src="src/assets/logos/2025-Greenwich-White-Eng.png" alt="UoG Logo" />
        </div>

        {/* Mobile hamburger menu */}
        <div className="flex relative xl:hidden">
          <div className="flex cursor-pointer" onClick={toggleNavBar}>
            <FontAwesomeIcon icon={faBars} size="xl" />
          </div>
          {isNavBarOpen && 
            <ul className="flex flex-col text-right absolute top-10 md:top-11.5 right-0 bg-[var(--pink-color)] p-1.5 pl-3.5 pr-3.5 rounded-2xl rounded-tr-none">
              <li className="flex monument-regular font-bold text-[14px] w-full cursor-pointer">
                <NavLink className={({ isActive }) => `w-full hover:text-black ${isActive ? "text-black" : "text-white"}`}  to="/about" onClick={closeNavBar}>ABOUT</NavLink>
              </li>
              <li className="flex monument-regular font-bold text-[14px] w-full cursor-pointer">
                <NavLink className={({ isActive }) => `w-full hover:text-black ${isActive ? "text-black" : "text-white"}`}  to="/members" onClick={closeNavBar}>MEMBERS</NavLink>
              </li>
              <li className="flex monument-regular font-bold text-[14px] w-full cursor-pointer">
                <NavLink className={({ isActive }) => `w-full hover:text-black ${isActive ? "text-black" : "text-white"}`}  to="/activities" onClick={closeNavBar}>ACTIVITIES</NavLink>
              </li>
              <li className="flex monument-regular font-bold text-[14px] w-full cursor-pointer">
                <NavLink className={({ isActive }) => `w-full hover:text-black ${isActive ? "text-black" : "text-white"}`}  to="/contact" onClick={closeNavBar}>CONTACT</NavLink>
              </li>
            </ul>
          }
        </div>

        <div className="hidden xl:flex">
          <ul className="flex xl:flex-row xl:static p-1.5 pl-3.5 pr-3.5 rounded-2xl rounded-tr-none">
            <li className="flex monument-regular font-bold w-full cursor-pointer">
              <NavLink className={({ isActive }) => `w-full xl:p-4 xl:pl-9 xl:pr-9 xl:hover:text-[var(--pink-color)] ${isActive ? "text-[var(--pink-color)]" : "text-white"}`} to="/about" >ABOUT</NavLink>
            </li>
            <li className="flex monument-regular font-bold w-full cursor-pointer">
              <NavLink className={({ isActive }) => `w-full xl:p-4 xl:pl-9 xl:pr-9 xl:hover:text-[var(--pink-color)] ${isActive ? "text-[var(--pink-color)]" : "text-white"}`} to="/members">MEMBERS</NavLink>
            </li>
            <li className="flex monument-regular font-bold w-full cursor-pointer">
              <NavLink className={({ isActive }) => `w-full xl:p-4 xl:pl-9 xl:pr-9 xl:hover:text-[var(--pink-color)] ${isActive ? "text-[var(--pink-color)]" : "text-white"}`} to="/activities">ACTIVITIES</NavLink>
            </li>
            <li className="flex monument-regular font-bold w-full cursor-pointer">
              <NavLink className={({ isActive }) => `w-full xl:p-4 xl:pl-9 xl:pr-9 xl:hover:text-[var(--pink-color)] ${isActive ? "text-[var(--pink-color)]" : "text-white"}`} to="/contact">CONTACT</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <NavLink className={({isActive}) => `flex monument-extra-bold text [1rem] hover:text-[#DB3F7A] cursor-pointer xl:pt-4 xl:pb-4 ${isActive ? "text-[var(--pink-color)]" : "text-white"}`} to="/sign-in">
        <div className="flex xl:hidden">
          <FontAwesomeIcon icon={faArrowRightToBracket} size="xl"/>
        </div>
        <span className="hidden xl:block">
          MEMBER PORTAL
        </span>
      </NavLink>
    </div>
  );
};

export default Header;
