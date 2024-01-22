import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";
import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector(getCart);
  console.log("Cart length...");
  console.log(cart.length);
  return (
    <section className="py-10 mt-14">
      {cart.length < 1 ? (
        <div className="min-h-[40vh] w-[90%] flex flex-col items-center justify-center font-montserrat">
          <p className="text-xl font-bold mb-5 ">Cart is empty</p>
          <Link
            to={"/shop"}
            className="bg-black rounded-md text-white uppercase font-bold py-2 px-3"
          >
            Go to shop
          </Link>
        </div>
      ) : (
        <div className="w-[90%] mx-auto grid md:grid-cols-6 gap-10 lg:gap-3">
          <div className="overflow-x-scroll  w-full md:col-span-6 lg:col-span-4 font-montserrat">
            <CartTable />
          </div>
          <div className=" md:col-span-4  md:col-start-2 lg:col-start-auto lg:col-span-2">
            <CartSummary />
          </div>
        </div>
      )}
    </section>
  );
}
//the required data for guests
// userData = {
//   email,
//   shippingAddress,
//   phoneNumber,
//   totalAmount,
//   items: items,
// };

export default Cart;
