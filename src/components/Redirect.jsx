import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PayButton from "./PayButton";
import { getTotalCartAmount } from "../features/cart/cartSlice";
import {
  placeOrderStart,
  placeOrderFailed,
  placeOrderFulfilled,
} from "../features/order/orderSlice";
import { cartReset } from "../features/cart/cartSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import orderService from "../features/order/orderService";
import { getCart } from "../features/cart/cartSlice";
import MiniSpinner from "./MiniSpinner";
import { v4 as uuidv4 } from "uuid";

function Redirect({ setShowModal, isAuthenticated }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reference, setReference] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const {
    orderLoading,
    orderSuccess,
    orderError,
    orderErrorMessage,
    orderSuccessMessage,
  } = useSelector((state) => state.order);
  const cart = useSelector(getCart);
  let auth;
  const total = useSelector(getTotalCartAmount);
  console.log(`reference out of the function: ${reference}`);
  const handleGuestOrder = async () => {
    if (!email || !phoneNumber || !shippingAddress) {
      return alert("Fill all fields for us to be able to contact you");
    }
    console.log("we just generated a reference");
    const generatedReference = `order_${uuidv4()}`;
    console.log(`This is my generated reference: ${generatedReference}`);
    setReference(generatedReference);

    const items = cart.map((product) => {
      return {
        product: product._id,
        quantity: product.quantity,
        price: product.price,
      };
    });

    const customerOrder = {
      email,
      phoneNumber,
      shippingAddress,
      totalAmount: total,
      items,
      paymentReference: generatedReference,
    };
    console.log("we just grouped our order");

    console.log(customerOrder);
    setLoading(true);
    try {
      await orderService.placeOrder(customerOrder);
      setLoading(false);
      setShowPayButton(true);
    } catch (error) {
      // handle error in a better way
      console.log(error);
      setLoading(false);
    }
  };
  const handlePaymentVerification = async (data) => {
    setLoading(true);
    try {
      const response = await orderService.verifyPayment(data);
      setLoading(false);
      dispatch(cartReset());
      setShowModal(false);
      //   navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(`reference in the function: ${reference}`);
  }, [reference]);
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center z-[1999]">
      <div
        onClick={() => setShowModal(false)}
        className="bg-white absolute top-5 right-5 p-2 rounded-full cursor-pointer"
      >
        <XMarkIcon className="w-4 h-4 text-black" />
      </div>
      <div className="bg-white w-[90%] md:w-[500px] rounded-md font-montserrat p-4  space-y-4 relative">
        {loading && <MiniSpinner />}

        <p className=" text-sm  md:text-xl">
          Total bill to be paid = <span className="font-bold ">N{total}</span>
        </p>

        {/* for unauthenticated users */}
        {!isAuthenticated ? (
          <div>
            {showPayButton ? (
              <PayButton
                text={"Click to pay"}
                email={email}
                amount={total}
                reference={reference}
                verifyPayment={handlePaymentVerification}
              />
            ) : (
              <>
                <p className="text-sm ">
                  <NavLink to={"/register"} className="text-blue-400">
                    Register
                  </NavLink>{" "}
                  or{" "}
                  <NavLink to={"/login"} className="text-blue-400 ">
                    Login
                  </NavLink>{" "}
                  into your account with us to keep track of your order
                </p>
                <p className="text-sm ">
                  Don't want to create an account? Continue as guest by filling
                  the below form and proceeding to pay
                </p>
                <form className="w-full">
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className=" outline-none  bg-transparent p-2 w-full border border-gray-700 rounded-md"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Enter Shipping Address"
                      className=" outline-none  bg-transparent p-2 w-full border border-gray-700 rounded-md"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                      className=" outline-none  bg-transparent p-2 w-full border border-gray-700 rounded-md"
                    />
                  </div>
                </form>
                {/* <PayButton text={"Pay as guest"} /> */}
                <button
                  onClick={handleGuestOrder}
                  className="bg-black text-white font-bold py-2 px-3 rounded-sm"
                >
                  Place order as guest
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm ">
              Click the button below to proceed to payment
            </p>
            <PayButton text={"Hey Stanley! Click to pay"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Redirect;
