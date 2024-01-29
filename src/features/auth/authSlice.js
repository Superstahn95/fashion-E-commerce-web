import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authLoading: false,
  authError: false,
  authErrorMessage: "",
  authSuccess: false,
  authSuccessMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authReset: (state) => {
      state.authLoading = false;
      state.authError = false;
      state.authErrorMessage = "";
      state.authSuccess = false;
      state.authSuccessMessage = "";
    },
    signUpStart: (state, action) => {
      state.authLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.authLoading = false;
      state.authSuccess = true;
      state.user = action.payload;
    },
    signUpFailed: (state, action) => {
      state.authLoading = false;
      state.authError = true;
      state.authErrorMessage = action.payload;
    },
    loginStart: (state, action) => {
      state.authLoading = true;
    },
    loginSuccess: (state, action) => {
      state.authLoading = false;
      state.authSuccess = true;
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.authLoading = false;
      state.authError = true;
      state.authErrorMessage = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const {
  authReset,
  signUpFailed,
  signUpStart,
  signUpSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  updateUser,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
