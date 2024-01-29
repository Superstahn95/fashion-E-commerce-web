import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NewApp from "./NewApp.jsx";

import "./index.css";
import ProductModalProvider from "./context/ProductModalContext";
import CartProvider from "./context/CartContext.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <CartProvider>
      <ProductModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductModalProvider>
    </CartProvider>
  </Provider>
  // </React.StrictMode>
);
