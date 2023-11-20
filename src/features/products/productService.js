import client from "../../config/client";

const getProducts = async () => {
  const response = await client.get("product");
  console.log(response.data);
  return response.data.products;
};

const getProduct = async (id) => {
  const response = await client.get(`product/${id}`);
  return response.data.product;
};

//below services should be for admin only
//to be protected
const deleteProduct = async (id) => {
  const response = await client.delete(`product/${id}`);
  return response.data.message;
};
const createProduct = async (data) => {
  const response = await client.post("product", data);
  return response.data;
};

const updateProduct = async (data) => {
  const response = await client.patch("product", data);
};

const productsService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
};

export default productsService;
