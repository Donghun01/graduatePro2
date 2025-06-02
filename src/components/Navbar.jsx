import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

const Navbar = () => {
  return (
    <nav className="w-full bg-white flex justify-between items-center px-10 py-5 border-b border-gray-200 shadow-sm">
      <Link to="/" className="flex items-center">
        <img src={icon} alt="real estate" className="w-8 h-8 mr-3" />
        <span className="font-bold text-xl text-gray-800 tracking-wide">
          이사하자
        </span>
      </Link>
      <ul className="flex space-x-8">
        <li>
          <Link
            to="/"
            className="text-gray-800 font-medium text-lg hover:text-[#00AEEF] transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-gray-800 font-medium text-lg hover:text-[#00AEEF] transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <a
            href="https://www.hs.ac.kr/IT/index.do"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 font-medium text-lg hover:text-[#00AEEF] transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
