import { useEffect, useState } from "react";
import FeatureLoader from "./FeatureLoader";
import { MdDashboard } from "react-icons/md";
// import { useSelector, useDispatch } from "react-redux";

function ManageProfile({ user, handleSubmit }) {
  //   const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: user?.name,
    email: user?.email,
    shippingAddress: user?.shippingAddress,
    phoneNumber: user?.phoneNumber,
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleDetailsEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(userDetails);
    setLoading(false);
  };
  return (
    <div className="w-full  mx-auto rounded-md shadow-lg p-4 ">
      <div className="flex items-center mb-7 space-x-7">
        <div className="bg-yellow-600 rounded-full p-3">
          <MdDashboard size={40} color="white" />
        </div>
        <p className="font-bold text-2xl">Manage Profile</p>
      </div>
      <form onSubmit={handleDetailsEdit}>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="border border-gray-500/40 outline-none p-2  rounded-md"
            value={userDetails?.name}
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            className="border border-gray-500/40 outline-none p-2  rounded-md"
            value={userDetails?.email}
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="address">Shipping Address</label>
          <input
            type="text"
            onChange={handleChange}
            name="shippingAddress"
            id="address"
            className="border border-gray-500/40 outline-none p-2  rounded-md"
            value={userDetails?.shippingAddress}
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="number">Phone Number</label>
          <input
            type="text"
            onChange={handleChange}
            name="phoneNumber"
            id="number"
            className="border border-gray-500/40 outline-none p-2  rounded-md"
            value={userDetails?.phoneNumber}
          />
        </div>
        {/* save change button */}
        <div className="mb-3">
          <button
            type="submit"
            className="bg-black text-white px-3 py-2 rounded-md"
          >
            {loading ? "Loading...." : "Save Changes"}
          </button>
        </div>
      </form>

      {loading && <FeatureLoader text="Updating  details" />}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default ManageProfile;
