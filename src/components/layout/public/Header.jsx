const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 pl-9 pr-9 fixed w-full bg-black z-50">
      <div className="logo flex">
        <img className="w-25" src="src/assets/logos/logo.webp" alt="GDC Logo" />
        <img className="w-25" src="src/assets/logos/uog_logo.webp" alt="UoG Logo" />
      </div>

      <nav className="">
        <ul className="flex">
          <li className="p-4.5 font-bold hover:text-[#DB3F7A] cursor-pointer">ABOUT</li>
          <li className="p-4.5 font-bold hover:text-[#DB3F7A] cursor-pointer">MEMBERS</li>
          <li className="p-4.5 font-bold hover:text-[#DB3F7A] cursor-pointer">ACTIVITIES</li>
          <li className="p-4.5 font-bold hover:text-[#DB3F7A] cursor-pointer">CONTACT</li>
        </ul>
      </nav>

      <a className="font-extrabold hover:text-[#DB3F7A] cursor-pointer" href="">MEMBER PORTAL</a>
    </div>
  );
};

export default Header;
