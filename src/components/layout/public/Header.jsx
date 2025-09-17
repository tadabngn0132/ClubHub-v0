import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 pl-9 pr-9 fixed w-full bg-black index-1000">
      <div className="logo flex">
        <img className="w-25" src="src/assets/logos/logo.webp" alt="GDC Logo" />
        <img className="w-25" src="src/assets/logos/uog_logo.webp" alt="UoG Logo" />
      </div>

      <nav className="">
        <ul className="flex">
          <li className="p-4.5 font-bold">ABOUT</li>
          <li className="p-4.5 font-bold">MEMBERS</li>
          <li className="p-4.5 font-bold">ACTIVITIES</li>
          <li className="p-4.5 font-bold">CONTACT</li>
        </ul>
      </nav>

      <a className="font-extrabold" href="">ACCOUNT</a>
    </div>
  );
};

export default Header;
