import ProductCard from "./ProductCard";

const dealData = [
  {
    id: 1,
    name: "Herschel supply",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci molestiae ea enim minima voluptatum sed laboriosam voluptatem commodi consectetur voluptates.",
  },
  {
    id: 2,
    name: "Classic Trench Coat",
    price: 20000,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci molestiae ea enim minima voluptatum sed laboriosam voluptatem commodi consectetur voluptates.",
  },
];
function DealSale() {
  return (
    <section className="py-7">
      <div className="grid grid-cols-3 gap-3 w-[90%] mx-auto">
        {/* current offer which i might make its content dynamic in time to come */}
        <div className="bg-gray-300 flex flex-col justify-center">
          <div className="ms-4">
            <h1 className="font-bold text-3xl">Summer Sale</h1>
            <h1 className="font-bold text-3xl">Collection</h1>
            {/* might just be replaced with a navlink in time to come */}
            <button className="bg-black py-2 px-3 uppercase text-white w-fit">
              shop all
            </button>
          </div>
        </div>
        {dealData.map((data) => (
          <ProductCard item={data} key={data.id} />
        ))}
      </div>
    </section>
  );
}

export default DealSale;
