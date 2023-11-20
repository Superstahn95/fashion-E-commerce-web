import { createContext, useState, useContext } from "react";
import CartSlider from "../components/CartSlider";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <CartContext.Provider value={{ showCart, setShowCart }}>
        {children}
      </CartContext.Provider>
      {showCart && (
        <div className="fixed top-0  w-screen h-screen bg-black/40  ">
          <CartSlider showCart={showCart} setShowCart={setShowCart} />
        </div>
      )}
    </>
  );
}

export const useCartSlider = () => useContext(CartContext);
