import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../auth/LoginModal";
import { IoLogOut } from "react-icons/io5";
import Logo from "../../assets/logo.png";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Products",
    link: "/products",
  },
  {
    id: 3,
    name: "Services",
    link: "/top-products",
  },
  {
    id: 4,
    name: "About Us",
    link: "/about",
  },
];

// Add Dashboard menu item for admin users
const getMenuItems = (isAdmin) => {
  const baseMenu = [...Menu];
  if (isAdmin) {
    baseMenu.push({
      id: 5,
      name: "Dashboard",
      link: "/dashboard",
    });
  }
  return baseMenu;
};

// const DropdownLinks = [
//   {
//     id: 1,
//     name: "Trending Products",
//     link: "/#",
//   },
//   {
//     id: 2,
//     name: "Best Selling",
//     link: "/#",
//   },
//   {
//     id: 3,
//     name: "Top Rated",
//     link: "/#",
//   },
// ];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div
        className="shadow-md bg-white dark-text-white
    duration-200 relative z-40"
      >
        {/* upper navbar  */}
        <div className="bg-orange-400/40 py-1">
          <div className="container flex justify-between items-center px-4">
            <div className="py-2">
              <Link
                to="/"
                className="flex items-center gap-2 font-semibold text-xl sm:text-xl text-shadow-black"
              >
                {Logo && <img src={Logo} alt="logo" className="w-10" />}
                Afghan Culture Products
              </Link>
            </div>

            {/* input field  */}
            <div className="flex justify-between items-center gap-2 sm:gap-4">
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[200px] sm:w-[200px] group-hover:w-[300px]
                transition-all duration-300 rounded-full border border-gray-300 bg-white
                px-2 focus:outline-none focus:border-1 focus:border-orange-400"
                />

                <IoMdSearch
                  className="text-gray-500 group-hover:text-primary
                absolute top-1/2 -translate-y-1/2 right-3"
                />
              </div>
              {/* order button  */}
              {/* <button
                onClick={() => alert("ordering not availaible yet")}
                className="bg-gradient-to-r from-amber-400 to bg-amber-500 px-2 sm:px-2 
              rounded-full flex items-center gap-1 group cursor-pointer text-white hover:text-black hover:bg-amber-400 text-sm sm:text-base"
              >
                <span className="font-normal hidden sm:inline">ORDER</span>
                <span className="font-normal sm:hidden">ORDER</span>
                <FaCartShopping className="text-lg sm:text-xl" />
              </button> */}

              {/* Auth buttons */}
              <div className="flex items-center gap-2">
                {user ? (
                  <>
                    {isAdmin() && (
                      <Link
                        to="/dashboard"
                        className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors text-sm"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-amber-500 text-white px-3 py-1 rounded-md hover:bg-amber-600 transition-colors text-sm flex items-center gap-1"
                    >
                      <IoLogOut size={14} />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="bg-amber-500 text-white px-3 py-1 rounded-full hover:bg-amber-600 transition-colors text-sm"
                  >
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* lower navbar  */}
        <div className="flex justify-center">
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-1">
            {getMenuItems(isAdmin()).map((data) => (
              <li key={data.id}>
                <Link
                  to={data.link}
                  className="inline-block px-3 py-1 hover:text-primary transition-colors duration-200"
                >
                  {data.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden w-full px-4">
            <button
              onClick={toggleMenu}
              className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              <span className="font-medium">Menu</span>
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="px-3 py-2 space-y-1">
              {getMenuItems(isAdmin()).map((data) => (
                <li key={data.id}>
                  <Link
                    to={data.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-md transition-colors duration-200"
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </div>
  );
};

export default Navbar;
