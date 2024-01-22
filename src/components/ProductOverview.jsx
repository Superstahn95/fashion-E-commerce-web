import ProductCard from "./ProductCard";
import { items } from "../data";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import productsService from "../features/products/productService";
import {
  getProductsStart,
  getProductsFailed,
  getProductsFulfilled,
  findProduct,
} from "../features/products/productSlice";
import { Grid } from "react-loader-spinner";

function ProductOverview() {
  //fetch prdducts from backend here when component mounts
  const dispatch = useDispatch();
  const {
    products,
    product,
    productLoading,
    productError,
    productErrorMessage,
    productSuccess,
    productSuccessMessage,
  } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    dispatch(getProductsStart());
    try {
      const response = await productsService.getProducts({ searchTerm: "" });
      // console.log(response);
      dispatch(getProductsFulfilled(response.data.products));
    } catch (error) {
      console.log(error);
      //handle error in a better way
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <div className="w-[90%] mx-auto">
        <h1 className="font-bold text-xl md:text-3xl uppercase my-7 font-montserrat">
          product overview
        </h1>
        {productLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <Grid
              height="80"
              width="80"
              color="black"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : !products && products?.length < 1 ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <p className="font-bold text-3xl">
              {" "}
              There are no products available
            </p>
          </div>
        ) : (
          <div className="grid  gap-8 md:grid-cols-4">
            {products?.map((product) => (
              <ProductCard key={product._id} item={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductOverview;
