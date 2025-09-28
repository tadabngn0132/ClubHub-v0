import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-3.5 pl-9 pr-9 xl:pt-2.5 xl:pb-2.5 fixed w-full bg-black/25 backdrop-blur-md z-50">
      <nav className="flex items-center justify-between w-[87.5%] sm:w-[92%] md:w-11/12 xl:w-max xl:gap-7 xl:justify-baseline">
        <div className="flex items-center gap-4">
          <Link className="hover:opacity-75" to="/">
            <img className="w-15.5 sm:w-17.5 md:w-22 lg:w-24.5 xl:w-27" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
          </Link>
          <img className="w-13.5 sm:w-15.5 md:w-20 lg:w-22.5 xl:w-25" src="src/assets/logos/2025-Greenwich-White-Eng.png" alt="UoG Logo" />
        </div>

        {/* Mobile hamburger menu */}
        <div className="flex relative xl:hidden">
          <div className="flex">
            <FontAwesomeIcon icon={faBars} size="xl" />
          </div>
          <ul className="flex flex-col text-right absolute top-10 md:top-11.5 right-0 bg-[var(--pink-color)] p-1.5 pl-3.5 pr-3.5 rounded-2xl rounded-tr-none">
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/about" >ABOUT</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/members">MEMBERS</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/activities">ACTIVITIES</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/contact">CONTACT</Link>
            </li>
          </ul>
        </div>

        <div className="hidden xl:flex">
          <ul className="flex xl:flex-row xl:static p-1.5 pl-3.5 pr-3.5 rounded-2xl rounded-tr-none">
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer xl:hover:text-[var(--pink-color)]">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/about" >ABOUT</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer xl:hover:text-[var(--pink-color)]">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/members">MEMBERS</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer xl:hover:text-[var(--pink-color)]">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/activities">ACTIVITIES</Link>
            </li>
            <li className="flex monument-regular font-bold text-[14px] w-full hover:text-black cursor-pointer xl:hover:text-[var(--pink-color)]">
              <Link className="w-full xl:p-4 xl:pl-9 xl:pr-9" to="/contact">CONTACT</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Link to="/sign-in" className="flex monument-extra-bold text-[1rem] hover:text-[#DB3F7A] cursor-pointer xl:pt-4 xl:pb-4">
        <div className="flex xl:hidden">
          <FontAwesomeIcon icon={faArrowRightToBracket} size="xl"/>
        </div>
        <span className="hidden xl:block">
          MEMBER PORTAL
        </span>
      </Link>
    </div>
  );
};

export default Header;
