import client from "../../config/client";

const placeOrder = async (data) => {
  const response = await client.post("order", data);
  return response.data;
};

const verifyPayment = async (data) => {
  const response = await client.post("paystack", data);
  return response.data;
};

//admin only => to be protected
const getOrders = async () => {
  const response = await client.get("order");
  return response.data.orders;
};
const updateOrderStatus = async (data) => {
  const { id } = data;
  const response = await client.patch(`order/${id}`, data);
  return response.data.order;
};

const orderService = {
  placeOrder,
  verifyPayment,
  getOrders,
  updateOrderStatus,
};

export default orderService;
