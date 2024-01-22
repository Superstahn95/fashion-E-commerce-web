import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import orderService from "../features/order/orderService";
import {
  updateStatusFailed,
  updateStatusFulfilled,
} from "../features/order/orderSlice";

function OrderModal({ setShowModal, id }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const actions = ["pending", "processing", "shipped", "delivered"];

  const handleOrderUpdate = async (status) => {
    setCurrentAction(status);
    const data = { id, status };
    try {
      setLoading(true);
      const response = await orderService.updateOrderStatus(data);
      dispatch(updateStatusFulfilled(response));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setCurrentAction("");
    }
  };
  useEffect(() => {
    setOrder(orders.filter((order) => order._id == id)[0]);
  }, [orders]);
  console.log(order);
  console.log(id);

  return (
    <div className="fixed z-[100] top-0 left-0 w-full h-full  bg-black/80  flex items-center justify-center">
      <div
        onClick={() => setShowModal(false)}
        className="bg-white absolute top-5 right-5 p-2 rounded-full cursor-pointer"
      >
        <XMarkIcon className="w-4 h-4 text-black" />
      </div>
      <div className="bg-white w-[90%] md:w-[600px] p-4 max-h-[700px] overflow-y-scroll">
        <p>
          Total amount of order is{" "}
          <span className="font-bold"> {order?.totalAmount}</span>
        </p>
        <p>
          Current status :
          <span className="font-bold text-blue-500 capitalize">
            {" "}
            {order?.status}
          </span>
        </p>
        <div className="mt-3">
          <h3 className="font-bold ">Client Details :</h3>
          <div className="border border-gray-700 py-2 mt-4">
            <p className="mb-2">
              Customer Email :{" "}
              <span className="font-bold">
                {" "}
                {order?.user ? order?.user.email : order?.email}{" "}
              </span>
            </p>
            <p className="mb-2">
              Customer Number :{" "}
              <span className="font-bold">
                {order?.user ? order?.user.phoneNumber : order?.phoneNumber}{" "}
              </span>
            </p>
            <p className="mb-2">
              Customer Shipping Address :{" "}
              <span className="font-bold">
                {order?.user
                  ? order?.user.shippingAddress
                  : order?.shippingAddress}{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="mt-3">
          Click on an action
          <div className="border border-gray-700 space-x-2 p-2">
            {actions.map(
              (action) =>
                action !== order?.status && (
                  <button
                    disabled={loading}
                    key={action}
                    onClick={() => handleOrderUpdate(action)}
                    className={`${action === "pending" && "bg-yellow-500"} ${
                      action === "processing" && "bg-blue-500"
                    } ${action === "shipped" && "bg-green-400"} ${
                      action === "delivered" && "bg-green-800"
                    } p-1 rounded-md capitalize text-white`}
                  >
                    {loading && action === currentAction
                      ? "Loading..."
                      : action}
                  </button>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;

//  {dateFormat(product?.createdAt, "longDate")}
