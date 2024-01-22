import client from "../../config/client";

const registerUser = async (data) => {
  const response = await client.post("auth/register", data, {
    withCredentials: true,
  });
  //need to send an access token along with this
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`;
  return response.data.user;
};

const signInUser = async (data) => {
  const response = await client.post("auth/login", data, {
    withCredentials: true,
  });
  console.log(response);
  //need to send an access token along with this
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`;

  console.log("response", response);
  return response.data.user;
};

const authService = {
  registerUser,
  signInUser,
};

export default authService;
