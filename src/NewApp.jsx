import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import GeneralLayout from "./layout/GeneralLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

function NewApp() {
  return (
    <Router>
      <GeneralLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />}>
          <Route path="shop" element={<Shop />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default NewApp;
