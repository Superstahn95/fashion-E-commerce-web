import React, { useState } from "react";
import Hero from "../components/Hero";
import DealSale from "../components/DealSale";
import ProductOverview from "../components/ProductOverview";
import { useSelector } from "react-redux";
import productsService from "../features/products/productService";

function Home() {
  const [reAuthenticate, setReAuthenticate] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const tryOutCookie = async () => {
    await productsService.testCookie();
    console.log("check it out");
  };
  const trySecondCookie = async () => {
    try {
      await productsService.testSecondCookie();
    } catch (error) {
      console.log("we are about catching an error");
      console.log(error);
      if (error.status === 401) {
        setReAuthenticate(true);
      }
    }
  };
  // useEffect(()=>{

  // },[reAuthenticate])
  return (
    <div>
      <Hero />
      {/* <DealSale /> */}
      <ProductOverview />
      <button onClick={tryOutCookie} className="bg-red-500 p-4">
        Cookie experiment
      </button>
      <button onClick={trySecondCookie} className="bg-blue-500 p-4">
        Cookie second experiment
      </button>
      {/* {reAuthenticate && (
        <div className="fixed bg-black/40 top-0 left-0 w-full h-full">
          <div className="bg-white ">
            <h2 className="text-red-500">You need to sign in again</h2>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Home;
