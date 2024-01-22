import Table from "../../components/Table";
import dateFormat from "dateformat";
import orderService from "../../features/order/orderService";
import {
  getOrdersStart,
  getOrdersFailed,
  getOrdersFulfilled,
  orderReset,
} from "../../features/order/orderSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toastifyConfig from "../../utils/toastify";
import { toast, ToastContainer } from "react-toastify";
import FeatureLoader from "../../components/FeatureLoader";
import OrderModal from "../../components/OrderModal";
function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const handleView = (id) => {
    setId(id);
    setShowModal(true);
  };
  const {
    orderLoading,
    orderSuccess,
    orderError,
    orderErrorMessage,
    orderSuccessMessage,
    orders,
    order,
  } = useSelector((state) => state.order);
  const columns = [
    {
      name: "Email",
      selector: (row) => (row.user ? row.user.email : row.email),
    },
    {
      name: "Phone number",
      selector: (row) => (row.user ? row.user.phoneNumber : row.phoneNumber),
    },

    { name: "Total Amount", selector: (row) => row.totalAmount },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Order date",
      selector: (row) => dateFormat(row.createdAt, "longDate"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col md:flex-row items-center space-x-1">
          <button
            disabled={loading}
            onClick={() => handleView(row._id)}
            className="bg-blue-500 w-20 rounded-md text-white px-3 py-2"
          >
            View
          </button>
        </div>
      ),
    },
  ];
  const fetchOrders = async () => {
    dispatch(getOrdersStart());
    try {
      const response = await orderService.getOrders();
      dispatch(getOrdersFulfilled(response));
    } catch (error) {
      console.log(error);
      // dispatch(getOrdersFailed(error.response.message))
    }
  };
  useEffect(() => {
    if (!dataFetched) {
      fetchOrders();
      setDataFetched(true);
    }
    if (orderError) {
      toast.error(orderErrorMessage, toastifyConfig);
    }
    const resetTimeout = setTimeout(() => {
      dispatch(orderReset());
    }, 500);
    return () => {
      clearTimeout(resetTimeout);
    };
  }, [orderError, orderErrorMessage, dataFetched]);
  return (
    <div className="font-montserrat">
      <div className="">
        <h2 className=" font-bold text-2xl">Manage Orders</h2>
      </div>
      {orderLoading ? (
        <FeatureLoader text="Fetching Orders" />
      ) : orders ? (
        <div className="grid col-1 bg-white shadow-sm  font-montserrat mt-8">
          <Table tableHeaders={columns} tableDetails={orders} />
        </div>
      ) : (
        <div className="w-full p-4 bg-red-400 flex items-center jusify-center">
          <p>There are no orders yet</p>
        </div>
        // <p>No Forum posts available</p>
      )}
      {showModal && <OrderModal setShowModal={setShowModal} id={id} />}
      <ToastContainer />
    </div>
  );
}

export default Orders;
