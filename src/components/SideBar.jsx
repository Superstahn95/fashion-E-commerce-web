import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const SideBar = forwardRef(({ showNav, navigationLinks }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed w-56 h-full z-[99] font-montserrat bg-black shadow-md"
    >
      <div className="flex flex-col pt-20">
        {navigationLinks.map((link) => (
          <NavLink
            key={link.link}
            to={link.to}
            className={({ isActive, isPending }) =>
              isActive
                ? "bg-blue-100 text-blue-500 hover:bg-orange-100 hover:text-blue-500"
                : "text-white hover:bg-blue-100 hover:text-blue-500 "
            }
          >
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors  
             
       `}
            >
              <div className="mr-2">{link.icon}</div>
              <div>
                <p>{link.link}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
});
function isActive(path) {
  return (window.location.pathname = path);
}

SideBar.displayName = "SideBar";

export default SideBar;
