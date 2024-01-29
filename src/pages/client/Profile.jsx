import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ProfileDetails from "../../components/ProfileDetails";
import ManageProfile from "../../components/ManageProfile";
import ManagePassword from "../../components/ManagePassword";
import ChangeImageModal from "../../components/ChangeImageModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import client from "../../config/client";
import { updateUser } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import toastifyConfig from "../../utils/toastify";

function Profile() {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUserUpdate = async (data) => {
    //write out update logic here
    // console.log(data);
    // const userData = { ...data, id: user?._id };
    console.log(data);
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      const response = await client.patch("/user/update", data, config);
      console.log(response.data.user);
      dispatch(updateUser(response.data.user));
      setShowImageModal(false);
    } catch (error) {
      //handle error properly
      console.log(error);
    }
  };

  const handleUserPasswordChange = async (data) => {
    //   dispatch(changePassword(data));
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, toastifyConfig);
    }
  };
  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <div className="grid md:grid-cols-2 gap-8  my-10 font-montserrat">
      {/* profile */}
      <ProfileDetails user={user} setShowImageModal={setShowImageModal} />

      {/* manage profile */}
      <ManageProfile user={user} handleSubmit={handleUserUpdate} />
      {/* manage password */}
      <ManagePassword setShowPasswordModal={setShowPasswordModal} />
      {/* imageModal */}
      {showImageModal && (
        <ChangeImageModal
          setShowImageModal={setShowImageModal}
          handleSubmit={handleUserUpdate}
        />
      )}
      {showPasswordModal && (
        <ChangePasswordModal
          setShowPasswordModal={setShowPasswordModal}
          handleSubmit={handleUserPasswordChange}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default Profile;
