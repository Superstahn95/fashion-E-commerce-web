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
import ClientOrderHistory from "./pages/client/Orders";
import Users from "./pages/admin/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import AdminDashboardRoute from "./routes/AdminDashboardRoute";
import ClientDashboardRoute from "./routes/ClientDashboardRoute";
import ClientLayout from "./layout/ClientLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  // const user = {
  //   role: "admin",
  // };
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

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Products />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/update/:id" element={<UpdateProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<ClientLayout />}>
          <Route index element={<ClientOrderHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
