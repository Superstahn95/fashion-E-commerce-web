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
  loginFailed,
  loginStart,
  loginSuccess,
} from "../features/auth/authSlice";
import toastifyConfig from "../utils/toastify";
import { Bars } from "react-loader-spinner";
import FeatureLoader from "../components/FeatureLoader";
import authService from "../features/auth/authService";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    authLoading,
    authError,
    authErrorMessage,
    authSuccess,
    authSuccessMessage,
    user,
  } = useSelector((state) => state.auth);
  const initialData = {
    email: "",
    password: "",
  };
  const handleLogIn = async (data) => {
    dispatch(loginStart());
    try {
      const response = await authService.signInUser(data);
      dispatch(loginSuccess(response));
    } catch (error) {
      //   console.log(error);
      //   console.log(error.response.data.message);
      console.log("we got an error...");
      console.log(error);
      dispatch(loginFailed(error.response.data.message));
    }
  };
  console.log(authError);
  useEffect(() => {
    if (authError) {
      toast.error(authErrorMessage, toastifyConfig);
    }
    if (authSuccess || user) {
      navigate("/", { replace: true });
    }
    dispatch(authReset());
  }, [authError, authErrorMessage, authSuccess, user, dispatch]);
  //   useEffect(() => {
  //     if (isError) {
  //       toast.error(message, toastifyConfig);
  //     }
  //     if (isSuccess || user) {
  //       navigate("/", { replace: true });
  //     }
  //     dispatch(reset());
  //   }, [isError, isSuccess, message, user, dispatch, navigate]);
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full md:w-[500px] mx-auto rounded-md shadow-lg p-4">
        <h2 className="font-montserrat  text-3xl font-bold py-3 text-center">
          Sign In
        </h2>
        <Formik
          initialValues={initialData}
          validationSchema={Yup.object({
            email: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            handleLogIn(values);
          }}
        >
          <Form>
            <FormikTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <FormikTextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />

            <p className="text-xs text-gray-700 font-montserrat">
              Don't have an account?{" "}
              <Link to={"/register"} className="text-orange-500">
                Sign up
              </Link>
            </p>
            <div className="my-2">
              <button
                type="submit"
                className="bg-black text-white px-2 py-3 rounded-r-md rounded-tl-md w-full cursor-pointer"
              >
                Sign In
              </button>
              {authLoading && <FeatureLoader text="Signing In" />}
            </div>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Login;
