import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalCartAmount, getCart } from "../features/cart/cartSlice";
import PayButton from "./PayButton";
import Redirect from "./Redirect";

function CartSummary() {
  let auth;
  const [delivery, setDelivery] = useState(3000);
  const total = useSelector(getTotalCartAmount);
  const cart = useSelector(getCart);
  const [showModal, setShowModal] = useState(true);
  const handleCheckout = () => {
    if (auth) {
    } else {
    }
  };

  return (
    <div className="border border-gray-300 p-5">
      <h2 className="font-bold text-xl uppercase pb-3">Cart Totals</h2>
      <div className="border-b border-dashed border-gray-300 flex items-center space-x-3 py-3">
        <span className="font-bold text-xl">Subtotal:</span>
        <span>{total}</span>
      </div>
      {/* delivery div */}
      <div className="border-b border-dashed border-gray-300 space-x-3 py-3">
        <span className="font-bold text-xl">Delivery Fee:</span>
        <span>{delivery}</span>
      </div>
      {/* total */}
      <div className="border-b border-dashed border-gray-300 space-x-3 py-3">
        <span className="font-bold text-xl">Total:</span>
        <span>{total}</span>
      </div>
      {/* checkout link */}
      <div className="my-4">
        {/* <button className="bg-black text-white font-bold py-2 px-3 rounded-sm">
      Proceed to check out
    </button> */}
        {/* the below is just temporal sincei probably should be having a check out page that would take me to fill a form to update user email and other details */}
        {/* <PayButton amount={delivery + total} email={email} /> */}
        <button className="bg-black text-white font-bold py-2 px-3 rounded-sm">
          Check out
        </button>
      </div>
      {showModal && (
        <Redirect setShowModal={setShowModal} isAuthenticated={auth} />
      )}
    </div>
  );
}

export default CartSummary;
