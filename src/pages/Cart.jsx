import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";

function Cart() {
  return (
    <section className="py-10">
      <div className="w-[90%] mx-auto grid md:grid-cols-6 gap-10 lg:gap-3">
        <div className="overflow-x-scroll  w-full md:col-span-6 lg:col-span-4">
          <CartTable />
        </div>
        <div className=" md:col-span-4  md:col-start-2 lg:col-start-auto lg:col-span-2">
          <CartSummary />
        </div>
      </div>
    </section>
  );
}

export default Cart;
