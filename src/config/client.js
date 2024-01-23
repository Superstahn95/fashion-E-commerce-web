import axios from "axios";

let refresh = false;
const client = axios.create({
  baseURL: "http://localhost:5500/api/v1",
});

// client.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response.status === 401 &&
//       error.response.data.message === "access token expired" &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       console.log("this should run");

//       const response = await client.post(
//         "auth/refresh",
//         {},
//         { withCredentials: true }
//       );
//       console.log("The response from our refresh end point is below");
//       console.log(response);
//       if (response.status === 200) {
//         console.log("set new header please");
//         client.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${response.data.token}`;
//         error.config.headers["Authorization"] = `Bearer ${response.data.token}`;
//         return client(originalRequest);
//       }

//     }
//     refresh = false;

//     return error;
//   }
// );
export default client;
