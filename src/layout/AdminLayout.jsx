import React, { useEffect, Fragment, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { Transition } from "@headlessui/react";
import {
  HomeIcon,
  CreditCardIcon,
  UserIcon,
  SunIcon,
  ArrowDownTrayIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

function AdminLayout() {
  //   const navigate = useNavigate();
  //   const { user } = useSelector((state) => state.auth);

  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    handleResize();
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  const adminLinks = [
    {
      link: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
      to: "/admin",
      isExact: true,
    },
    {
      link: "Manage Users",
      icon: <UserIcon className="h-5 w-5" />,
      to: "users",
      isExact: false,
    },
    {
      link: "Manage Orders",
      icon: <ArrowDownTrayIcon className="h-5 w-5" />,
      to: "orders",
      isExact: false,
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-900 ">
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} navigationLinks={adminLinks} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms]  ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
