import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed w-full z-10 font-[Poppins] bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
      <header className="bg-white">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div>
            <img
              className="w-16 cursor-pointer"
              src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
              alt="Logo"
            />
          </div>
          <div
            className={`nav-links z-50 duration-500 md:static absolute bg-white md:min-h-fit min-h-[40vh] left-0 transition-transform ${
              menuOpen ? "top-[90%]" : "top-[-600%]"
            } w-full flex items-center px-5`}
          >
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] mx-auto gap-8">
              <li>
                <Link className="hover:text-gray-500" to="Courses">
                  Courses
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" to="/solution">
                  Solution
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" to="/resource">
                  Resource
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" to="/developers">
                  Developers
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-500" to="/pricing">
                  How To Use
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="login"
              className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] whitespace-nowrap"
            >
              Sign in
            </Link>
            <CiMenuBurger
              onClick={onToggleMenu}
              className="text-3xl cursor-pointer  md:hidden"
            />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
