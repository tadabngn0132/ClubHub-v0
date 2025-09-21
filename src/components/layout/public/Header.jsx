const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 pl-9 pr-9 fixed w-full bg-black z-50">
      <div className="flex items-center gap-10">
        <div className="flex gap-4">
          <img className="w-25" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
          <img className="w-25" src="src/assets/logos/2025-Greenwich-White-Eng.png" alt="UoG Logo" />
        </div>

        <nav className="">
          <ul className="flex">
            <li className="monument-regular p-9 pt-3.5 pb-3.5 font-bold text-[1rem] hover:text-[#DB3F7A] cursor-pointer">ABOUT</li>
            <li className="monument-regular p-9 pt-3.5 pb-3.5 font-bold text-[1rem] hover:text-[#DB3F7A] cursor-pointer">MEMBERS</li>
            <li className="monument-regular p-9 pt-3.5 pb-3.5 font-bold text-[1rem] hover:text-[#DB3F7A] cursor-pointer">ACTIVITIES</li>
            <li className="monument-regular p-9 pt-3.5 pb-3.5 font-bold text-[1rem] hover:text-[#DB3F7A] cursor-pointer">CONTACT</li>
          </ul>
        </nav>
      </div>

      <a className="monument-extra-bold text-[1rem] hover:text-[#DB3F7A] cursor-pointer" href="">MEMBER PORTAL</a>
    </div>
  );
};

export default Header;
