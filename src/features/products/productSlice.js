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
    reset: (state) => {
      state.productLoading = false;
      state.productError = false;
      state.productErrorMessage = "";
      state.productSuccessMessage = "";
      state.productSuccess = false;
    },
    getProductsStart: (state) => {
      state.productLoading = true;
    },
    getProductsFulfilled: (state, action) => {
      state.productLoading = false;
      state.products = action.payload;
      console.log(state.products);
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
        (product) => product._id !== product._id
      );
    },
    deleteProductError: (state, action) => {
      state.productLoading = false;
      state.productError = true;
      state.productErrorMessage = action.payload;
    },
    updateProductStart: (state) => {
      state.productLoading = true;
    },
  },
});

export const {
  reset,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccess,
  filterProduct,
  getProductFailed,
  getProductStart,
  getProductSuccess,
  getProductsFailed,
  getProductsFulfilled,
  getProductsStart,
  updateProductStart,
} = productSlice.actions;

export default productSlice.reducer;
