import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import GeneralLayout from "./layout/GeneralLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/admin/Products";
import AdminLayout from "./layout/AdminLayout";
import CreateProduct from "./pages/admin/CreateProduct";

function App() {
  const user = {
    role: "admin",
  };
  return (
    <Routes>
      <Route path="/" element={<GeneralLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
      <Route
        path="/dashboard"
        element={user?.role === "admin" ? <AdminLayout /> : <ClientLayout />}
      >
        {/* i will have another default route here going to the dashboard */}
        <Route index element={<Products />} />
        <Route path="product/create" element={<CreateProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
