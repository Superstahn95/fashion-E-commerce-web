import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getCart } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function CartToggleButton() {
  const cart = useSelector(getCart);
  return (
    <Link
      to={"/cart"}
      className="fixed w-[150px] z-[99] text-yellow-300 flex items-center justify-center space-x-1  bottom-4 right-4 bg-black  text-xl px-4 py-2 rounded-xl font-bold"
    >
      <span>Cart</span> <AiOutlineShoppingCart />
      <span className="text-white">({cart?.length})</span>
    </Link>
  );
}

export default CartToggleButton;
