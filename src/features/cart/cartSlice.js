import { createSlice } from "@reduxjs/toolkit";
import swal from "sweetalert";
//in this slice, since this is just a frontend implementation, i am setting up a cart system for guest users using local storage
//when linking my frontend to my backend, i will be setting it up for authenticated users

const storedCart = localStorage.getItem("cart");
const initialCart = storedCart ? JSON.parse(storedCart) : [];
const initialState = {
  // cart: localStorage.getItem("cart")
  //   ? JSON.parse(localStorage.getItem("cart"))
  //   : localStorage.setItem("cart", JSON.stringify([])),
  cart: initialCart,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("hey we are here");
      if (!state.cart || state.cart.length < 1) {
        console.log("why is this not running");
        //this is going to run in this conditional block if there is no cart
        state.cart = [action.payload];
      } else {
        //this is going to run when the cart is not empty
        //first we need to check if the item is already existing
        const itemExist = state.cart.find(
          (item) => item._id === action.payload._id
        );

        //if there is such an item that meets the above condition we need to get the below done
        if (itemExist) {
          let updatedCart = state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
          state.cart = updatedCart;
        } else if (!itemExist) {
          // if the item is not in cart, we can then push it into our cart
          state.cart = [...state.cart, action.payload];
        }
      }
      //we have to then save our cart to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      swal("Done!!", "item added to cart", "success");
    },
    removeFromCart: (state, action) => {
      //we need to first find the item in the cart
      const item = state.cart.find((item) => item._id === action.payload._id);

      //if item is in the cart, we then have to filter the cart array to remove that particular product from user cart
      if (item) {
        let updatedCart = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
        state.cart = updatedCart;
      }
      //save current cart stage to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      console.log(action);
      //the goal of this is to find the item in our shopping cart and increment its quqntity
      const item = state.cart.find((item) => item._id === action.payload.id);
      console.log(state.cart);
      if (item.quantity >= 1) {
        state.cart = state.cart.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      console.log(action);
      //find item from our cart
      const item = state.cart.find((item) => item._id === action.payload.id);
      //in places where we are going to implementing this, we need to make sure the action cannot be dispatched when the product is not in the cart
      if (item.quantity === 1) {
        //we want to remove this from the cart whenever we go below the 1 mark
        state.cart = state.cart.filter(
          (item) => item._id !== action.payload.id
        );
      } else {
        //if not, then just decrease the quantity property of that item object in the cart
        state.cart = state.cart.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      //save to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    cartReset: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cartReset,
} = cartSlice.actions;

//we can get the c
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getCart = (state) => state.cart.cart;
export const getTotalCartAmount = (state) =>
  state.cart.cart.length > 0
    ? state.cart.cart.reduce(
        (total, item) => (total += item.price * item.quantity),
        0
      )
    : 0;
export const getSingleCartItem = (state, id) => {
  return state.cart.cart.find((item) => item._id === id);
};

export default cartSlice.reducer;

export const getBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);
