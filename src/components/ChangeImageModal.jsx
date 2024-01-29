// import { XMarkIcon } from "@heroicons/react/24/solid";
import toastifyConfig from "../utils/toastify";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";

function ChangeImageModal({ setShowImageModal, handleSubmit }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    e.preventDefault();
    if (!image) {
      return toast.error("Select an image", toastifyConfig);
    }
    const formData = new FormData();
    formData.append("profilePicture", image);
    handleSubmit(formData);
  };

  //   useEffect(() => {
  //     if (isError) {
  //       toast.error(message, toastifyConfig);
  //     }
  //     if (isSuccess) {
  //       toast.success(message, toastifyConfig);
  //     }
  //     dispatch(reset());
  //   }, [isSuccess, isError, message, dispatch]);

  return (
    <div className="fixed w-full z-[100] h-full top-0 left-0 bg-black/40 font-montserrat  flex justify-center ">
      <div className="bg-white h-fit w-[90%]  sm:w-[500px]  p-4 rounded-md mt-10 ">
        <div className="border-b border-gray-400 flex items-center justify-between">
          <h2 className="text-gray-700 text-xl pb-2 font-bold ">
            Change Profile Picture
          </h2>
          <div
            onClick={() => setShowImageModal(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center border cursor-pointer border-gray-700 "
          >
            <IoIosCloseCircle className="h-5 w-5 text-gray-700" />
          </div>
        </div>
        {/* file upload field */}
        <form encType="multipart/form-data" onSubmit={(e) => uploadImage(e)}>
          <div className="my-3 ">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              name="profilePhoto"
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md"
            />
          </div>
          <div className="">
            <div className="ml-auto w-fit space-x-3">
              <button
                disabled={loading}
                role="button"
                onClick={() => setShowImageModal(false)}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Close
              </button>
              <button
                disabled={loading}
                type="submit"
                className="bg-green-700 text-white px-3 py-2 rounded-md"
              >
                {loading ? "Uploading...." : "Change"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChangeImageModal;
