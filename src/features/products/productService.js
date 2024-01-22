import client from "../../config/client";

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    // console.log(response)
    return response;
  } else {
    throw { status: response.response.status, data: response.response.data };
  }
};

const getProducts = async (data = {}) => {
  const { searchTerm } = data;
  //   const { pageNo, limit, searchTerm } = data; => when i feel like including pagination
  const response = await client.get(`product?searchTerm=${searchTerm}`);
  //   ?pageNo=${pageNo}&limit=${limit}&searchTerm=${searchTerm}
  return handleResponse(response);
  //   return response.data.products;
};
// const getAllPosts = async (data = {}) => {
//     const { pageNo, limit, searchTerm } = data;
//     &searchTerm=${searchTerm}
//     const response = await client.get(
//       `post?pageNo=${pageNo}&limit=${limit}&searchTerm=${searchTerm}`
//     );
//     return response.data;
//   };

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
  const { productData, id } = data;
  const response = await client.patch(`product/${id}`, productData);
  return response.data;
};

const testCookie = async (data) => {
  try {
    const response = await client.get("product/test-cookie-products");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
const testSecondCookie = async () => {
  const response = await client.get("product/test-second-cookie-products");
  console.log("this is our response here");
  console.log(response);
  return handleResponse(response);
};

const productsService = {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  testCookie,
  testSecondCookie,
};

export default productsService;
