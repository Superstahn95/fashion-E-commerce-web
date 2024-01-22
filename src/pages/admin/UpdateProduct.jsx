import ProductForm from "../../components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProductFailed,
  updateProductFulfilled,
  updateProductStart,
  findProduct,
  getProductStart,
  getProductSuccess,
  getProductFailed,
  productsReset,
} from "../../features/products/productSlice";
import toastifyConfig from "../../utils/toastify";
import { toast, ToastContainer } from "react-toastify";
import productsService from "../../features/products/productService";
import { useEffect, useState } from "react";
import FeatureLoader from "../../components/FeatureLoader";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [productUpdated, setProductUpdated] = useState(false);
  const {
    products,
    product,
    productLoading,
    productError,
    productErrorMessage,
    productSuccess,
    productSuccessMessage,
  } = useSelector((state) => state.products);

  const handleSubmit = async (data) => {
    const dataToBeSent = { productData: data, id };
    dispatch(updateProductStart());
    setLoading(true);
    try {
      const response = await productsService.updateProduct(dataToBeSent);
      dispatch(updateProductFulfilled(response));
      setLoading(false);
      setProductUpdated(true);
    } catch (error) {
      //handle error in a better way
      console.log(error);
      // dispatch(updateProductFailed(error.response.message));
      setLoading(false);
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await productsService.getProduct(id);
      dispatch(getProductSuccess(response));
    } catch (error) {
      console.log(error);
      dispatch(getProductFailed(error.response.message));
    }
  };
  console.log(product);
  useEffect(() => {
    if (!productUpdated) {
      if (products) {
        dispatch(findProduct(id));
      } else {
        fetchProduct();
      }
    }
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
  const initialData = {
    name: product?.name || "",
    price: product?.price || "",
    gender: product?.gender || "",
    short_description: product?.short_description || "",
  };

  return (
    <div className="font-montserrat">
      <h2 className="font-bold text-2xl text-gray-700">Update Product</h2>
      <div className="my-7">
        {productLoading ? (
          <FeatureLoader text="Fetching Post" />
        ) : (
          <ProductForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={loading}
            text="Update Product"
            // thumbnail={post.image}
          />
        )}
      </div>
      {loading && <FeatureLoader text="Updating Post" />}
      <ToastContainer />
    </div>
  );
}

export default UpdateProduct;
