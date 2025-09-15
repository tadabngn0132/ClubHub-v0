import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center pt-1 pb-1 pl-4 pr-4">
      <div className="logo flex">
        <img className="w-25" src="src/assets/logos/logo.webp" alt="GDC Logo" />
        <img src="" alt="UoG Logo" />
      </div>

      <nav className="">
        <ul className="flex">
          <li className="p-4.5">ABOUT</li>
          <li className="p-4.5">MEMBERS</li>
          <li className="p-4.5">ACTIVITIES</li>
          <li className="p-4.5">CONTACT</li>
        </ul>
      </nav>

      <a href="">ACCOUNT</a>
    </div>
  );
};

export default Header;
