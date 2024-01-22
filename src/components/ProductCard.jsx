import { Link } from "react-router-dom";
function ProductCard({ item }) {
  //fix the discount
  const { name, price, image, description, _id } = item;
  console.log(_id);
  const imageUrl = image.url;

  //time to set up the hover effect
  return (
    <Link
      to={`/product/${_id}`}
      className="cursor-pointer group relative font-montserrat "
    >
      <div className="absolute w-full  top-0 bottom-0 left-0 bg-transparent transition-all ease-in-out duration-500 group-hover:bg-black/60 z-10">
        {" "}
      </div>
      <div className="relative group overflow-hidden ">
        {/* <div className="absolute w-full  top-0 bottom-0 left-0 bg-transparent transition-all ease-in-out duration-500 group-hover:bg-black/60 z-[99]">
          {" "}
        </div> */}
        {/* the below image is increasing in size during transition but i want it to maintain that fixed size */}
        <img
          src={imageUrl}
          alt={name}
          className="max-h-[300px] w-full object-cover  transition-all ease-in-out duration-500 group-hover:scale-105"
        />
        <div className="absolute bg-transparent z-20  -bottom-14 left-[50%] -translate-x-[50%] transition-all ease-in-out duration-500 group-hover:bottom-10">
          <button className="bg-white border border-white rounded-xl py-2 px-3 text-black font-bold hover:bg-black hover:text-white transition-all ease-in-out duration-500">
            View More
          </button>
        </div>
      </div>
      <p className="capitalize text-gray-400">{name}</p>
      <p className="mb-4">{price}</p>
      {/* <ProductDetailModal /> */}
    </Link>
  );
}

export default ProductCard;
