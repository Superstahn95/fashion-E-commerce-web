import React from "react";

function CartListItem({ item }) {
  const { name, price, image, quantity } = item;
  console.log(quantity);
  return (
    <li className="flex space-x-4 shadow-sm my-4">
      {/* image div */}
      <div>
        <img src={image.url} alt="wear" className="w-[60px] h-[80px]" />
      </div>
      {/* other details */}
      <div className="">
        <p className="text-gray-500 py-2 font-semibold">{name}</p>
        <p className="text-gray-500 text-sm">
          {quantity} X {price}
        </p>
      </div>
    </li>
  );
}

export default CartListItem;
