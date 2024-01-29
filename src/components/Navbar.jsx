import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHouseDamage } from "react-icons/fa";
import { useState, useEffect } from "react";
import { logOut } from "../features/auth/authSlice";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let Links = [
    { name: "Home", link: "/" },
    { name: "All products", link: "/shop" },

    // { name: "Get in touch", link: "/contact" },
  ];
  const [isOpen, setisOpen] = useState(false);
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className="shadow-md w-full fixed z-[1999] top-0 left-0 font-montserrat">
      <div
        className="md:px-10 py-4 px-7 md:flex justify-between items-center
    bg-black text-white"
      >
        {/* logo here */}
        <NavLink
          to={"/"}
          className="flex text-2xl cursor-pointer items-center gap-2 w-fit"
        >
          <FaHouseDamage className="w-7 h-7 text-yellow-600" />
          <span className="font-bold text-sm md:text-xl">Store</span>
        </NavLink>

        {/* menu icon */}
        <div
          onClick={() => setisOpen(!isOpen)}
          className="w-7 h-7 absolute right-8 top-6
        cursor-pointer md:hidden"
        >
          {isOpen ? <IoIosCloseCircle /> : <RxHamburgerMenu />}
        </div>

        {/* nav links here */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
         bg-black text-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9
          transition-all duration-500 ease-in ${
            isOpen ? "top-12" : "top-[-490px]"
          } `}
        >
          {Links.map((link) => (
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : "text-white"
                }
                to={link.link}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {!user && (
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : "text-white"
                }
              >
                login
              </NavLink>
            </li>
          )}
          {user && (
            <li className="font-semibold my-7 md:my-0 md:ml-8">
              <NavLink
                to={user?.role === "admin" ? "/admin" : "/dashboard"}
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : "text-white"
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="text-white bg-transparent border border-yellow-600  py-1 px-3 md:ml-8 rounded md:static"
            >
              logout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
