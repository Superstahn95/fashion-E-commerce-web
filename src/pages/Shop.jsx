import { BsFilter, BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Filter from "../components/Filter";
import {
  getProductsStart,
  getProductsFailed,
  getProductsFulfilled,
} from "../features/products/productSlice";
import productsService from "../features/products/productService";
import { useSelector, useDispatch } from "react-redux";

function Shop() {
  const [shopItems, setShopItems] = useState([]);
  const [filterShop, setFilterShop] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const {
    products,
    productLoading,
    productError,
    productErrorMessage,
    productSuccess,
    productSuccessMessage,
  } = useSelector((state) => state.products);
  console.log(products);
  console.log(productLoading);
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
      console.log("about getting the products");
      const response = await productsService.getProducts({ searchTerm });

      dispatch(getProductsFulfilled(response.data.products));
      setShopItems(products);
    } catch (error) {
      console.log(error);
      dispatch(getProductsFailed(error.data.message));
      //handle error in a better way
    }
  };
  const handleRefetch = (event) => {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  };

  useEffect(() => {
    if (!dataFetched) {
      setDataFetched(true);
      fetchProducts();
    }
    if (!filterShop) {
      setShopItems(products);
    }
    if (filterShop === "male") {
      setShopItems(products.filter((product) => product.gender === "male"));
    }
    if (filterShop === "female") {
      setShopItems(products.filter((product) => product.gender === "female"));
    }
  }, [dataFetched, filterShop]);

  useEffect(() => {
    fetchProducts();
    if (!filterShop) {
      setShopItems(products);
    }
    if (filterShop === "male") {
      setShopItems(products.filter((product) => product.gender === "male"));
    }
    if (filterShop === "female") {
      setShopItems(products.filter((product) => product.gender === "female"));
    }
  }, [searchTerm]);

  return (
    <section className=" py-7 mt-14">
      <Filter
        handleShop={handleShop}
        setFilterShop={setFilterShop}
        handleChange={handleRefetch}
      />
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
          {shopItems?.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Shop;
