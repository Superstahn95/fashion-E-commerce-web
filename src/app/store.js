import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/order/orderSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    order: orderReducer,
    auth: authReducer,
  },
});
