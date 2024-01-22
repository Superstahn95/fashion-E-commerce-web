import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import { ToastContainer, toast } from "react-toastify";
import FeatureLoader from "../../components/FeatureLoader";
import productsService from "../../features/products/productService";
import { useSelector, useDispatch } from "react-redux";
import {
  createProductFailed,
  createProductFulfilled,
  productsReset,
} from "../../features/products/productSlice";
import toastifyConfig from "../../utils/toastify";

function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const initialData = {
    name: "",
    // category: "",
    price: "",
    short_description: "",
    gender: "",
  };
  const {
    products,
    productLoading,
    productError,
    productErrorMessage,
    productSuccess,
    productSuccessMessage,
  } = useSelector((state) => state.products);
  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await productsService.createProduct(data);
      dispatch(createProductFulfilled(response));
      setLoading(false);
    } catch (error) {
      //handle error in a better way
      console.log(error);
      dispatch(createProductFailed(error));
      setLoading(false);
    }
  };
  useEffect(() => {
    if (productError) {
      toast.error(productErrorMessage, toastifyConfig);
    }
    if (productSuccessMessage) {
      toast.success(productSuccessMessage, toastifyConfig);
    }
    return () => {
      dispatch(productsReset());
    };
  }, [productError, productErrorMessage, productSuccessMessage, dispatch]);
  return (
    <div className="font-montserrat">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-gray-700">Create Product</h2>
        {/* image div */}
        {/* <div className="border border-black border-dashed w-[100px] h-[100px]"></div> */}
      </div>

      <div className="my-7">
        <ProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={loading}
          text="Upload Product"
        />
      </div>
      {loading && <FeatureLoader text="Uploading Product" />}
      <ToastContainer />
    </div>
  );
}

export default CreateProduct;
