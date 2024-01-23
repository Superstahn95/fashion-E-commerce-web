// import {
//   AiOutlineMenu,
//   AiOutlineClose,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { NavLink } from "react-router-dom";
// import { getCart } from "../features/cart/cartSlice";
// import { useCartSlider } from "../context/CartContext";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";

// function Navbar() {
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const handleWindowResize = () => {
//     setWindowWidth(window.innerWidth);
//     if (windowWidth > 560) {
//       document.body.style.overflow = "unset";
//       setShowMobileMenu((prevState) => (prevState ? !prevState : prevState));
//     }

//     // console.log(windowWidth);
//   };
//   useEffect(() => {
//     window.addEventListener("resize", handleWindowResize);
//     if (showMobileMenu) document.body.style.overflow = "hidden";
//     if (!showMobileMenu) document.body.style.overflow = "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [showMobileMenu, windowWidth]);
//   const cart = useSelector(getCart);
//   const { showCart, setShowCart } = useCartSlider();

//   return (
//     <nav className="bg-white p-4 border-b border-gray-200 font-montserrat">
//       <div className="flex items-center w-[90%] mx-auto">
//         <h1 className="font-bold text-xl flex-1 md:flex-grow-0 text-yellow-800 ">
//           STORE
//         </h1>

//         <div className=" items-center flex-1 hidden md:flex">

//           <ul className="flex items-center justify-center space-x-4 flex-1">
//             <li>
//               <NavLink to={"/"}>Home</NavLink>
//             </li>
//             <li>
//               <NavLink to={"/shop"}>All products</NavLink>
//             </li>
//             <li>
//               <NavLink to={"/cart"}>Temporal cart link</NavLink>
//             </li>
//             {!user && (
//               <div className="flex items-center space-x-1">
//                 <NavLink to={"/register"}>Register</NavLink>
//                 <NavLink to={"/login"}>Login</NavLink>
//               </div>
//             )}
//           </ul>
//           <div className="flex space-x-2 items-center">

//             <button
//               onClick={() => setShowCart((prevState) => !prevState)}
//               className="bg-black text-white font-bold py-2 px-3 rounded-sm flex items-center space-x-2"
//             >
//               <span>cart</span>
//               <div className="flex items-center space-x-1">
//                 <AiOutlineShoppingCart size={20} />{" "}
//                 <span className="text-yellow-300">({cart?.length})</span>
//               </div>
//             </button>
//             {user && (
//               <div className="flex items-center space-x-1">
//                 <NavLink
//                   to={"/dashboard"}
//                   className="bg-black text-white font-bold py-2 px-3 rounded-sm"
//                 >
//                   Dashboard
//                 </NavLink>
//                 <button className="bg-black text-white font-bold py-2 px-3 rounded-sm">
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div
//           onClick={() => setShowMobileMenu((prevState) => !prevState)}
//           className="md:hidden block  cursor-pointer"
//         >
//           <AiOutlineMenu size={30} />
//         </div>

//         {showMobileMenu && (
//           <div className="fixed top-0 left-0  w-full h-screen bg-black/40 flex items-center justify-center md:hidden z-[1999]">
//             <AnimatePresence>
//               <motion.div
//                 initial={{ transform: "translateX(100%)" }}
//                 animate={{ transform: "translateX(0)" }}
//                 transition={{ duration: 1, delay: 0 }}
//                 exit={{ transform: "translateX(100%)" }}
//                 className="absolute top-0 right-0 h-full bg-white w-[70%] p-5"
//               >

//                 <div
//                   onClick={() => setShowMobileMenu((prevState) => !prevState)}
//                   className="ms-auto w-fit cursor-pointer"
//                 >
//                   <AiOutlineClose size={30} />
//                 </div>
//                 {/* navlinks */}
//                 <ul className="mt-4">
//                   <li className="text-lg text-gray-700 mb-1">
//                     <NavLink to={"/"}>Home</NavLink>
//                   </li>
//                   <li className="text-lg text-gray-700 mb-1">
//                     <NavLink to={"/shop"}>All products</NavLink>
//                   </li>
//                   <li className="text-lg text-gray-700 mb-1">
//                     <NavLink to={"/cart"}>Temporal cart link</NavLink>
//                   </li>
//                 </ul>

//                 <div className="mt-4 flex flex-col space-y-2">
//                   <NavLink className="bg-black text-white font-bold py-2 px-3 rounded-sm">
//                     Dashboard
//                   </NavLink>
//                   <button className="bg-black text-white font-bold py-2 px-3 rounded-sm">
//                     Logout
//                   </button>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { getCart } from "../features/cart/cartSlice";
import { useCartSlider } from "../context/CartContext";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHouseDamage } from "react-icons/fa";
import { useState, useEffect } from "react";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const { user } = useSelector((state) => state.auth);
  let Links = [
    { name: "Home", link: "/" },
    { name: "All products", link: "/shop" },

    // { name: "Get in touch", link: "/contact" },
  ];
  const [isOpen, setisOpen] = useState(false);
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
            <button className="text-white bg-transparent border border-yellow-600  py-1 px-3 md:ml-8 rounded md:static">
              logout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
