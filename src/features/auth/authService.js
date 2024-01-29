import client from "../../config/client";

const registerUser = async (data) => {
  const response = await client.post("auth/register", data, {
    withCredentials: true,
  });
  //need to send an access token along with this
  //save user to local storage
  localStorage.setItem("user", response.data.user);
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`;
  return response.data.user;
};

const signInUser = async (data) => {
  const response = await client.post("auth/login", data, {
    withCredentials: true,
  });

  localStorage.setItem("user", response.data.user);
  //need to send an access token along with this
  client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`;

  console.log("response", response);
  return response.data.user;
};

//will revisit thiss later
const reauthenticate = async (data) => {};

const authService = {
  registerUser,
  signInUser,
};

export default authService;
