import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from "./context/CartContext";
import "./config/client";
import GeneralLayout from "./layout/GeneralLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/admin/Products";
import AdminLayout from "./layout/AdminLayout";
import CreateProduct from "./pages/admin/CreateProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";

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
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="product/:id" element={<Product />} />
      </Route>
      <Route
        path="/dashboard"
        element={user?.role === "admin" ? <AdminLayout /> : <ClientLayout />}
      >
        {/* i will have another default route here going to the dashboard */}
        <Route index element={<Products />} />
        <Route path="product/create" element={<CreateProduct />} />
        <Route path="product/update/:id" element={<UpdateProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}
// http://localhost:5173/dashboard/product/create
export default App;
