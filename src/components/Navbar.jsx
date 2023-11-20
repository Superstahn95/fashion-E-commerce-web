import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart } from "../features/cart/cartSlice";
import { useCartSlider } from "../context/CartContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log(windowWidth);
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
    if (windowWidth > 560) {
      document.body.style.overflow = "unset";
      setShowMobileMenu((prevState) => (prevState ? !prevState : prevState));
    }

    // console.log(windowWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    if (showMobileMenu) document.body.style.overflow = "hidden";
    if (!showMobileMenu) document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileMenu, windowWidth]);
  const cart = useSelector(getCart);
  const { showCart, setShowCart } = useCartSlider();
  console.log(showMobileMenu);
  return (
    <nav className="bg-white p-4 border-b border-gray-200 font-montserrat">
      <div className="flex items-center w-[90%] mx-auto">
        <h1 className="font-bold text-xl flex-1 md:flex-grow-0 text-yellow-800 ">
          STORE
        </h1>
        {/* The below div shouldn't be displayed on small screen devices */}
        <div className=" items-center flex-1 hidden md:flex">
          {/* Navlinks */}
          <ul className="flex items-center justify-center space-x-4 flex-1">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/shop"}>All products</NavLink>
            </li>
            <li>
              <NavLink to={"/cart"}>Temporal cart link</NavLink>
            </li>
          </ul>
          <div className="flex space-x-2 items-center">
            {/* might be changed to other html elements or navlinks real soon */}
            <button
              onClick={() => setShowCart((prevState) => !prevState)}
              className="bg-black text-white font-bold py-2 px-3 rounded-sm flex items-center space-x-2"
            >
              <span>cart</span>
              <div className="flex items-center space-x-1">
                <AiOutlineShoppingCart size={20} />{" "}
                <span className="text-yellow-300">({cart?.length})</span>
              </div>
            </button>
            <NavLink
              to={"/dashboard"}
              className="bg-black text-white font-bold py-2 px-3 rounded-sm"
            >
              Dashboard
            </NavLink>
            <button className="bg-black text-white font-bold py-2 px-3 rounded-sm">
              Logout
            </button>
          </div>
        </div>
        {/* hamburger menu to show up at small screen size */}
        <div
          onClick={() => setShowMobileMenu((prevState) => !prevState)}
          className="md:hidden block  cursor-pointer"
        >
          <AiOutlineMenu size={30} />
        </div>
        {/* mobile navigation menu => come back to this */}
        {showMobileMenu && (
          <div className="fixed top-0 left-0  w-full h-screen bg-black/40 flex items-center justify-center md:hidden z-[1999]">
            <AnimatePresence>
              <motion.div
                initial={{ transform: "translateX(100%)" }}
                animate={{ transform: "translateX(0)" }}
                transition={{ duration: 1, delay: 0 }}
                exit={{ transform: "translateX(100%)" }}
                className="absolute top-0 right-0 h-full bg-white w-[70%] p-5"
              >
                {/* close navbar menu div */}
                <div
                  onClick={() => setShowMobileMenu((prevState) => !prevState)}
                  className="ms-auto w-fit cursor-pointer"
                >
                  <AiOutlineClose size={30} />
                </div>
                {/* navlinks */}
                <ul className="mt-4">
                  <li className="text-lg text-gray-700 mb-1">
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li className="text-lg text-gray-700 mb-1">
                    <NavLink to={"/shop"}>All products</NavLink>
                  </li>
                  <li className="text-lg text-gray-700 mb-1">
                    <NavLink to={"/cart"}>Temporal cart link</NavLink>
                  </li>
                </ul>
                {/* admin view and log out button */}
                <div className="mt-4 flex flex-col space-y-2">
                  <NavLink className="bg-black text-white font-bold py-2 px-3 rounded-sm">
                    Dashboard
                  </NavLink>
                  <button className="bg-black text-white font-bold py-2 px-3 rounded-sm">
                    Logout
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

// import { useState, useEffect } from 'react';

// export default function App() {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleWindowResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleWindowResize);

//     return () => {
//       window.removeEventListener('resize', handleWindowResize);
//     };
//   });

//   return (
//     <div>
//       <h2>Width: {windowWidth}</h2>
//     </div>
//   );
// }
