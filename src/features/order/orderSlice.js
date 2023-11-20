import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderLoading: false,
  orderSuccess: false,
  orderError: false,
  orderErrorMessage: "",
  orderSuccessMessage: "",
  orders: null,
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderReset: (state) => {
      (state.orderLoading = false),
        (state.orderErrorMessage = ""),
        (state.orderError = false),
        (state.orderSuccess = false),
        (state.orderSuccessMessage = "");
    },
    placeOrderStart: (state) => {
      state.orderLoading = false;
    },
    placeOrderFulfilled: (state, action) => {
      state.orderLoading = false;
      state.orders = state.orders
        ? [action.payload]
        : state.orders.push(action.payload);
      state.orderSuccess = true;
    },
    placeOrderFailed: (state, action) => {
      state.orderError = true;
      state.orderErrorMessage = action.payload;
      state.orderLoading = false;
    },
  },
});

export const {
  orderReset,
  placeOrderFailed,
  placeOrderFulfilled,
  placeOrderStart,
} = orderSlice.actions;

export default orderSlice.reducer;
