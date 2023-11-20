import React from "react";
import Hero from "../components/Hero";
import DealSale from "../components/DealSale";
import ProductOverview from "../components/ProductOverview";

function Home() {
  return (
    <div>
      <Hero />
      {/* <DealSale /> */}
      <ProductOverview />
    </div>
  );
}

export default Home;
