import {
  getProductsStart,
  getProductsFailed,
  getProductsFulfilled,
  deleteProductError,
  deleteProductSuccess,
  productsReset,
} from "../../features/products/productSlice";
import productsService from "../../features/products/productService";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeatureLoader from "../../components/FeatureLoader";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../../utils/toastify";
import dateFormat from "dateformat";
import ProductViewModal from "../../components/ProductViewModal";
import { NavLink } from "react-router-dom";

function Products() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingRows, setLoadingRows] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const {
    products,
    productLoading,
    productError,
    productErrorMessage,
    productSuccess,
    productSuccessMessage,
  } = useSelector((state) => state.products);

  const handleView = (id) => {
    setId(id);
    setShowModal(true);
  };
  const handleDelete = async (id) => {
    const newLoadingRows = { ...loadingRows };
    newLoadingRows[id] = true;
    setLoadingRows(newLoadingRows);
    setLoading(true);
    try {
      await productsService.deleteProduct(id);
      dispatch(deleteProductSuccess(id));
      setLoading(false);
      newLoadingRows[id] = false;
      setLoadingRows(newLoadingRows);
    } catch (error) {
      console.log(error);
      setLoading(false);
      newLoadingRows[id] = false;
      setLoadingRows(newLoadingRows);
    }
  };

  const columns = [
    { name: "Name", selector: (row) => row.name },
    {
      name: "Category",
      selector: (row) => (row.category ? row.category.name : "No category"),
    },

    { name: "Price", selector: (row) => row.price },
    { name: "Gender", selector: (row) => row.gender },
    {
      name: "Date Created",
      selector: (row) => dateFormat(row.createdAt, "longDate"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col md:flex-row items-center space-x-1">
          <button
            disabled={loading}
            onClick={() => handleView(row._id)}
            className="bg-blue-500 w-20 rounded-md text-white px-3 py-2"
          >
            View
          </button>

          <button
            disabled={loading}
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 w-20 rounded-md text-white px-3 py-2"
          >
            {loadingRows[row._id] ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];
  const fetchProducts = async () => {
    dispatch(getProductsStart());
    try {
      const response = await productsService.getProducts();
      console.log(response);
      dispatch(getProductsFulfilled(response.data.products));
    } catch (error) {
      console.log(error.response);
      dispatch(getProductsFailed);
      //handle error in a better way
    }
  };
  useEffect(() => {
    if (!dataFetched) {
      fetchProducts();
      setDataFetched(true);
    }
    if (productError) {
      toast.error(productErrorMessage, toastifyConfig);
    }
    const resetTimeout = setTimeout(() => {
      dispatch(productsReset());
    }, 500);
    return () => {
      clearTimeout(resetTimeout);
    };
  }, [productError, productErrorMessage, dataFetched]);
  return (
    <div className="font-montserrat">
      <div className="flex justify-between">
        <h2 className=" font-bold text-2xl">Manage Products</h2>
        <NavLink
          to={"product/create"}
          className="bg-yellow-600  text-white px-3 py-2 rounded-md"
        >
          Create Product
        </NavLink>
      </div>
      {productLoading ? (
        <FeatureLoader text="Fetching products" />
      ) : products ? (
        <div className="grid col-1 bg-white shadow-sm  font-montserrat mt-8">
          <Table tableHeaders={columns} tableDetails={products} />
        </div>
      ) : (
        <div className="w-full p-4 bg-red-400 flex items-center jusify-center">
          <p>There are no products yet</p>
        </div>
        // <p>No Forum posts available</p>
      )}
      {showModal && <ProductViewModal setShowModal={setShowModal} id={id} />}
      <ToastContainer />
    </div>
  );
}

export default Products;
