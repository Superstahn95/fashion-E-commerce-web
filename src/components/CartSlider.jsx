import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { getCart, getTotalCartAmount } from "../features/cart/cartSlice";
import CartListItem from "./CartListItem";
import { useEffect } from "react";
import { motion } from "framer-motion";

function CartSlider({ showCart, setShowCart }) {
  const cart = useSelector(getCart);
  const total = useSelector(getTotalCartAmount);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "unset";
    };
  }, []);
  console.log(showCart);
  return (
    <motion.div
      initial={{ transform: "translateX(100%)" }}
      animate={{ transform: "translateX(0)" }}
      transition={{ duration: 1, delay: 0 }}
      className="absolute bg-white top-0 right-0 w-[400px]  h-full p-4 "
    >
      <div className="w-[80%] mt-10 mx-auto ">
        {/* cart intro div */}
        <div className="flex items-center justify-between ">
          <h2 className="font-bold text-xl">Your Cart</h2>
          <AiOutlineClose
            size={30}
            onClick={() => setShowCart((prevState) => !prevState)}
          />
        </div>
        {/* products container */}
        <ul className="py-2 h-[500px] overflow-y-scroll">
          {cart.map((item) => (
            <CartListItem key={item.id} item={item} />
          ))}
        </ul>
        <div className="my-3">
          <span className="text-xl font-bold ">Total: {total}</span>
          <div className="flex items-center space-x-3 my-3">
            <button
              to={"/cart"}
              className="bg-black text-white px-5 py-2 rounded-3xl hover:bg-blue-500 transition-all duration-500 ease-in-out"
            >
              VIEW CART
            </button>
            <button className="bg-black text-white px-5 py-2 rounded-3xl hover:bg-blue-500 transition-all duration-500 ease-in-out">
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CartSlider;
