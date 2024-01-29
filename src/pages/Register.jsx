import { Form, Formik } from "formik";
import FormikTextInput from "../components/FormikTextInput";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import {
  authReset,
  signUpFailed,
  signUpStart,
  signUpSuccess,
} from "../features/auth/authSlice";
import toastifyConfig from "../utils/toastify";
import { Bars } from "react-loader-spinner";
import FeatureLoader from "../components/FeatureLoader";
import authService from "../features/auth/authService";
import { AiOutlineConsoleSql } from "react-icons/ai";
import client from "../config/client";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user,
    authLoading,
    authError,
    authErrorMessage,
    authSuccess,
    authSuccessMessage,
  } = useSelector((state) => state.auth);
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    shippingAddress: "",
    phoneNumber: "",
  };
  const signUp = async (data) => {
    dispatch(signUpStart());
    try {
      // const response = await authService.registerUser(data);
      const response = await client.post("auth/register", data, {
        withCredentials: true,
      });
      //save token to local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      dispatch(signUpSuccess(response.data.user));
    } catch (error) {
      console.log(error);
      dispatch(signUpFailed(error.response.data.message));
    }
  };
  useEffect(() => {
    if (authError) {
      toast.error(authErrorMessage, toastifyConfig);
    }
    if (authSuccess || user) {
      navigate("/", { replace: true });
    }
    dispatch(authReset());
  }, [authError, authSuccess, user, navigate, dispatch]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center mt-14">
      <div className="w-full md:w-[500px] mx-auto rounded-md shadow-lg p-4">
        <h2 className="font-montserrat  text-3xl font-bold py-3 text-center">
          Sign Up
        </h2>
        <Formik
          initialValues={initialData}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Must be greater than 3 characters")
              .required("Required"),
            email: Yup.string().required("Required"),
            password: Yup.string()
              .min(6, "Password must be greater than 6 characters")
              .required("Required"),
            confirmPassword: Yup.string()
              .min(6, "Must be greater than 6 characters")
              .required(),
            shippingAddress: Yup.string().required("Required"),
            phoneNumber: Yup.number().required("Required"),
          })}
          onSubmit={(values) => {
            signUp(values);
          }}
        >
          <Form>
            <FormikTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            <FormikTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <FormikTextInput
              label="Phone Number"
              name="phoneNumber"
              type="number"
              placeholder="Enter your phone number"
            />
            <FormikTextInput
              label="Shipping Address"
              name="shippingAddress"
              type="string"
              placeholder="Enter your shipping address"
            />
            <FormikTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <FormikTextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />

            <p className="text-xs text-gray-700 font-montserrat">
              Already have an account?{" "}
              <Link to={"/login"} className="text-yellow-500 font-bold">
                Sign in
              </Link>
            </p>
            <div className="my-2">
              <button
                type="submit"
                className="bg-black text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
              >
                Sign In
              </button>
              {authLoading && <FeatureLoader text="Signing Up" />}
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Register;
