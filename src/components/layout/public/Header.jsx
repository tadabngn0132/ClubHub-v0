import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 pl-9 pr-9 fixed w-full bg-transparent backdrop-blur-md z-50">
      <nav className="flex items-center justify-between w-[87.5%] md:w-max md:gap-7 md:justify-baseline">
        <div className="flex gap-4">
          <Link className="hover:opacity-75" to="/">
            <img className="w-13.5 md:w-25" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
          </Link>
          <img className="w-13.5 md:w-25" src="src/assets/logos/2025-Greenwich-White-Eng.png" alt="UoG Logo" />
        </div>


        <div className="flex">
          <div className="flex md:hidden">
            <FontAwesomeIcon icon={faBars} size="xl" />
          </div>
          <ul className="flex flex-col text-right absolute top-10 right-17.5 bg-[var(--pink-color)] md:flex-row md:static md:bg-transparent p-1.5 pl-3.5 pr-3.5 rounded-2xl rounded-tr-none">
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer  md:p-4 md:pl-9 md:pr-9 md:hover:text-[var(--pink-color)]">
              <Link className="w-full" to="/about" >ABOUT</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer  md:p-4 md:pl-9 md:pr-9 md:hover:text-[var(--pink-color)]">
              <Link className="w-full" to="/members">MEMBERS</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer  md:p-4 md:pl-9 md:pr-9 md:hover:text-[var(--pink-color)]">
              <Link className="w-full" to="/activities">ACTIVITIES</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer  md:p-4 md:pl-9 md:pr-9 md:hover:text-[var(--pink-color)]">
              <Link className="w-full" to="/contact">CONTACT</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Link to="/sign-in" className="flex monument-extra-bold text-[1rem] hover:text-[#DB3F7A] cursor-pointer">
        <div className="flex md:hidden">
          <FontAwesomeIcon icon={faArrowRightToBracket} size="xl"/>
        </div>
        <span className="hidden md:block">
          MEMBER PORTAL
        </span>
      </Link>
    </div>
  );
};

export default Header;
