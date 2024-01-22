import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartToggleButton from "../components/CartToggleButton";

function GeneralLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <CartToggleButton />
      <Footer />
    </>
  );
}

export default GeneralLayout;
