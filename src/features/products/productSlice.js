import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  product: null,
  productLoading: false,
  productError: false,
  productErrorMessage: "",
  productSuccessMessage: "",
  productSuccess: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsReset: (state) => {
      state.productLoading = false;
      state.productError = false;
      state.productErrorMessage = "";
      state.productSuccessMessage = "";
      state.productSuccess = false;
    },
    findProduct: (state, action) => {
      state.product = state.products.find(
        (product) => product._id === action.payload
      );
    },
    getProductsStart: (state) => {
      state.productLoading = true;
    },
    getProductsFulfilled: (state, action) => {
      state.productLoading = false;
      state.products = action.payload;

      state.productLoading = false;
    },
    getProductsFailed: (state, action) => {
      state.productLoading = false;
      state.productErrorMessage = action.payload;
      state.productError = true;
    },
    filterProduct: (state, action) => {
      state.product = state.products.filter(
        (product) => product._id === action.payload
      );
    },
    getProductStart: (state) => {
      state.productLoading = true;
    },
    getProductSuccess: (state, action) => {
      state.productLoading = false;
      state.product = action.payload;
    },
    getProductFailed: (state, action) => {
      state.productLoading = false;
      state.productError = true;
      state.productErrorMessage = action.payload;
    },
    deleteProductStart: (state) => {
      state.productLoading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.productLoading = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    deleteProductError: (state, action) => {
      state.productLoading = false;
      state.productError = true;
      state.productErrorMessage = action.payload;
    },
    createProductFulfilled: (state, action) => {
      state.productSuccess = true;
      console.log(action.payload.product);
      state.productSuccessMessage = action.payload.message;
    },
    createProductFailed: (state, action) => {
      state.productError = true;
      state.productErrorMessage = action.payload;
    },
    updateProductStart: (state) => {
      state.productLoading = true;
    },
    updateProductFulfilled: (state, action) => {
      state.productLoading = false;
      state.productSuccess = true;
      state.product = action.payload.product;
      state.productSuccessMessage = action.payload.message;
    },
    updateProductFailed: (state, action) => {
      state.productLoading = false;
      state.productError = true;
      state.productErrorMessage = action.payload;
    },
  },
});

export const {
  productsReset,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccess,
  filterProduct,
  findProduct,
  getProductFailed,
  getProductStart,
  getProductSuccess,
  getProductsFailed,
  getProductsFulfilled,
  getProductsStart,
  updateProductStart,
  updateProductFailed,
  updateProductFulfilled,
  createProductFailed,
  createProductFulfilled,
} = productSlice.actions;

export default productSlice.reducer;
