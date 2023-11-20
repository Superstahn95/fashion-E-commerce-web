import client from "../../config/client";

const placeOrder = async (data) => {
  const response = await client.post("order", data);
  return response.data;
};

const verifyPayment = async (data) => {
  const response = await client.post("paystack", data);
  return response.data;
};

const orderService = { placeOrder, verifyPayment };

export default orderService;
