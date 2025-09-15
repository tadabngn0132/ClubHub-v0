import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 pl-9 pr-9">
      <div className="logo flex">
        <img className="w-25" src="src/assets/logos/logo.webp" alt="GDC Logo" />
        <img className="w-25" src="src/assets/logos/logo.webp" alt="UoG Logo" />
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
