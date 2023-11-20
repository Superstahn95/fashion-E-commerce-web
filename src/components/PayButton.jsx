import { useState } from "react";
import { PaystackButton } from "react-paystack";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

//paystack frontend payment configuration
const PayButton = ({ amount, email, text, reference, verifyPayment }) => {
  const dispatch = useDispatch();
  const amountInKobo = amount * 100;
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_TEST_KEY;
  const handlePaystackSuccessAction = (response) => {
    console.log(response);
    console.log(`Reference in the pay button: ${reference}`);
    verifyPayment({ amount: amount * 100, email, reference });
    //make a call to backend for payment verification
  };
  const componentProps = {
    email,
    amount: amountInKobo,
    publicKey,
    text,
    reference,
    // onSuccess: () => dispatch(reset()),
    onSuccess: handlePaystackSuccessAction,
    onClose: () => swal("Failed!!", "Order cancelled", "error"),
  };

  console.log({ ...componentProps });
  return (
    <PaystackButton
      {...componentProps}
      className="bg-green-500 text-white font-bold py-2 px-3 rounded-sm"
    />
  );
};

export default PayButton;
