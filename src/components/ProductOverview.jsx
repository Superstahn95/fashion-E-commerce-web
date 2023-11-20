import ProductCard from "./ProductCard";
import { items } from "../data";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import productsService from "../features/products/productService";
import {
  getProductsStart,
  getProductsFailed,
  getProductsFulfilled,
} from "../features/products/productSlice";

function ProductOverview() {
  //fetch prdducts from backend here when component mounts
  const dispatch = useDispatch();
  const {
    products,
    productLoading,
    productError,
    productErrorMessage,
    productSuccess,
    productSuccessMessage,
  } = useSelector((state) => state.products);
  const fetchProducts = async () => {
    dispatch(getProductsStart());
    try {
      const response = await productsService.getProducts();
      console.log(response);
      dispatch(getProductsFulfilled(response));
    } catch (error) {
      console.log(error.response);
      //handle error in a better way
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <div className="w-[90%] mx-auto">
        <h1 className="font-bold text-3xl uppercase my-7 font-montserrat">
          product overview
        </h1>
        {productLoading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <p className="font-bold text-3xl">Loading......</p>
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
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductOverview;
