import { useSelector, useDispatch } from "react-redux";
import {
  getCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";
import Table from "./Table";

function CartTable() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const columns = [
    {
      name: "Product",
      cell: (row) => (
        <div className="flex items-center space-x-1">
          <img
            src={row.image.url}
            alt={row.name}
            className="w-[60px] h-[60px]"
          />
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => (row.category ? row.category.name : "No category"),
    },

    { name: "Price", selector: (row) => row.price },
    {
      name: "Quantity",
      cell: (row) => (
        <div className="flex items-center my-6 justify-center">
          <button
            onClick={() => dispatch(decrementQuantity({ id: row._id }))}
            className="border border-gray-600 py-2 px-3"
          >
            -
          </button>
          {/* to be worked on when adding the functionality of adding and removing from cart */}
          <div className=" bg-gray-400 py-2 px-3 border-t border-b border-gray-600">
            {row.quantity}
          </div>
          <button
            onClick={() => dispatch(incrementQuantity({ id: row._id }))}
            className="border border-gray-600 py-2 px-3"
          >
            +
          </button>
        </div>
      ),
    },
    {
      name: "Total",
      selector: (row) => row.quantity * row.price,
    },
  ];
  return <Table tableHeaders={columns} tableDetails={cart} />;
}

export default CartTable;

// <table className=" w-full border border-gray-300 min-w-[500px] ">
//   <thead>
//     <tr className="border-b border-gray-300">
//       <th className="p-5 text-start">Product</th>
//       <th>Price</th>
//       <th>Quantity</th>
//       <th>Total</th>
//     </tr>
//   </thead>
//   <tbody>
//     {cart?.map((item) => (
//       <tr key={item.id} className="border-b border-gray-300">
//         <td className="p-5">
//           <div className="flex items-center ">
//             <img
//               src={item.image.url}
//               alt={name}
//               className="w-[60px] h-[80px]"
//             />
//             <span>{item.name}</span>
//           </div>
//         </td>
//         <td className="text-center">{item.price}</td>
//         <td className="text-center">
//           {" "}
//           <div className="flex items-center my-6 justify-center">
//             <button
//               onClick={() => dispatch(decrementQuantity({ id: item._id }))}
//               className="border border-gray-600 py-2 px-3"
//             >
//               -
//             </button>
//             {/* to be worked on when adding the functionality of adding and removing from cart */}
//             <div className=" bg-gray-400 py-2 px-3 border-t border-b border-gray-600">
//               {item.quantity}
//             </div>
//             <button
//               onClick={() => dispatch(incrementQuantity({ id: item._id }))}
//               className="border border-gray-600 py-2 px-3"
//             >
//               +
//             </button>
//           </div>
//         </td>
//         <td className="text-center">{item.quantity * item.price}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>
