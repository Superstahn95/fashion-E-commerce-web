import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { NavLink, useNavigate } from "react-router-dom";

function ProductViewModal({ setShowModal, id }) {
  const [product, setProduct] = useState(null);
  const { products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  useEffect(() => {
    setProduct(products.filter((product) => product._id == id)[0]);
  }, [products]);
  console.log(product);
  console.log(id);
  return (
    <div className="fixed z-[100] top-0 left-0 w-full h-full  bg-black/80  flex items-center justify-center">
      <div
        onClick={() => setShowModal(false)}
        className="bg-white absolute top-5 right-5 p-2 rounded-full cursor-pointer"
      >
        <XMarkIcon className="w-4 h-4 text-black" />
      </div>
      <div className="bg-white w-[90%] md:w-[600px] p-4 max-h-[700px] overflow-y-scroll">
        <h2 className=" font-bold">
          {product?.name}
          {/* Post by Stanley Chukwuemeka */}
        </h2>
        <span className=" text-gray-400 text-sm">
          {dateFormat(product?.createdAt, "longDate")}
          {/* Oct 23, 2023 */}
        </span>

        {/* description */}
        <div>
          <p className="text-black">{product?.short_description}</p>
        </div>
        <div>
          <img src={product?.image.url} alt={product?.name} />
        </div>
        <div className="mt-3 ">
          <button
            onClick={() => navigate(`product/update/${id}`)}
            className="bg-black  text-white px-3 py-2 rounded-md w-full "
          >
            Click to update
          </button>
          {/* <NavLink
            to={`product/update/${id}`}
            className="bg-black  text-white px-3 py-2 rounded-md w-full"
          >
            Click to update
          </NavLink> */}
        </div>
      </div>
    </div>
  );
}

export default ProductViewModal;
