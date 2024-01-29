import { useState, useEffect } from "react";
import client from "../../config/client";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import FeatureLoader from "../../components/FeatureLoader";
import dateFormat from "dateformat";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const getOrders = async () => {
    try {
      //to work on this when i implement protected api end points
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await client.get(`order/user/${user._id}`, config);
      console.log(response);
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { name: "Total Amount", selector: (row) => row.totalAmount },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Order date",
      selector: (row) => dateFormat(row.createdAt, "longDate"),
    },
  ];

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="font-montserrat">
      <div className="">
        <h2 className=" font-bold text-2xl">Order History</h2>
      </div>
      {loading ? (
        <FeatureLoader text="Fetching Orders" />
      ) : (
        <Table tableHeaders={columns} tableDetails={orders} />
      )}
    </div>
  );
}

export default Orders;
