import { BsFilter, BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import {
  getProductsStart,
  getProductsFailed,
  getProductsFulfilled,
} from "../features/products/productSlice";

import { useSelector, useDispatch } from "react-redux";

function Shop() {
  const [shopItems, setShopItems] = useState([]);
  const [filterShop, setFilterShop] = useState(null);
  const {
    products,
    productLoading,
    productError,
    productErrorMessage,
    productSuccess,
    productSuccessMessage,
  } = useSelector((state) => state.products);

  const handleShop = () => {
    console.log(filterShop);
    console.log("shop should rearrange");
  };
  // useEffect(() => {

  //   if (!filterShop) {
  //     setShopItems(items);
  //   }
  //   if (filterShop === "men") {
  //     setShopItems(items.filter((product) => product.gender === "male"));
  //   }
  //   if (filterShop === "women") {
  //     setShopItems(items.filter((product) => product.gender === "female"));
  //   }

  // }, [filterShop]);

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
    <section className=" py-7">
      <Filter handleShop={handleShop} setFilterShop={setFilterShop} />
      {/* <div className="w-[90%] mx-auto grid md:grid-cols-4 gap-8">
        {shopItems.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div> */}
      {productLoading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="font-bold text-3xl">Loading......</p>
        </div>
      ) : !products && products?.length < 1 ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="font-bold text-3xl"> There are no products available</p>
        </div>
      ) : (
        <div className="grid w-[90%] mx-auto  gap-8 md:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Shop;
