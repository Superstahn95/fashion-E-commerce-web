import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  addToCart,
  getCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getSingleCartItem,
} from "../features/cart/cartSlice";

//i can probably set this up as a context later on
function ProductDetailModal({
  item,
  // imageUrl,
  // price,
  // name,
  // short_description,
  // id,
  setShowModal,
}) {
  const { image, price, name, short_description, _id } = item;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const cartItem = useSelector((state) => getSingleCartItem(state, _id));
  console.log("cart item", cartItem);
  console.log(cart);
  const addAnItemToCart = () => {
    console.log("dispatch an add to cart functionality");
    dispatch(addToCart({ ...item, quantity }));
    // swal("Done!!", "item added to cart", "success");
  };
  const removeAnItemFromCart = () => {
    console.log("dispatch the action to remove item");
    dispatch(removeFromCart(item));
  };

  const increaseQuantity = (e) => {
    e.preventDefault();
    setQuantity((prevState) => prevState + 1);
  };
  const decreaseQuantity = (e) => {
    e.preventDefault();
    quantity > 1
      ? setQuantity((prevState) => prevState - 1)
      : alert("You cannot go below this");
  };
  //   useEffect(() => {
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = "unset";
  //     };
  //   }, []);

  return (
    <>
      <div className="fixed top-0 bottom-0 z-[99] left-0 w-[100vw] h-[100vh] bg-black/60 font-montserrat overflow-y-scroll">
        {/* main modal div */}
        {/* changes relative to absolute  took of mx-auto*/}
        <div className="bg-white w-[95%]  min-h-[80%] mx-auto relative  mt-20 md:p-7  top-0  md:w-[80%]">
          <div className="grid md:grid-cols-2 bg-green-500">
            {/* product image */}
            <div className="flex bg-red-500 justify-center ">
              <img
                src={image.url}
                alt={name}
                className="max-h-[500px] w-[200px] object-contain "
              />
            </div>
            {/* other details */}
            <div>
              <h2 className="font-semibold text-gray-500 text-xl capitalize ">
                {name}
              </h2>
              <h2 className="font-bold py-3">{price}</h2>
              <p className="text-gray-500 pb-3">{short_description}</p>

              {/* color and size choice container.  ====> Might end up being a form though*/}
              <div className="px-10 mt-7">
                <div className="flex space-x-5">
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="text-sm text-gray-500">Color</p>
                  </div>

                  {/* other details */}
                  <div>
                    <div className="flex flex-col">
                      {" "}
                      <select name="size" className="outline-none">
                        <option>choose a size</option>
                        <option value="s">Size S</option>
                        <option value="m">Size M</option>
                        <option value="l">Size L</option>
                        <option value="xl">Size XL</option>
                      </select>
                      <div className="mt-2">
                        <select name="size" className="outline-none">
                          <option>choose a color</option>
                          <option value="red">Red</option>
                          <option value="green">Green</option>
                          <option value="blue">Blue</option>
                          <option value="white">White</option>
                        </select>
                      </div>
                      {/* increase and decrease quantity button */}
                      <div className="flex items-center my-6">
                        {cart.some((item) => item._id === _id) ? (
                          <button
                            className="border border-gray-600 py-2 px-3 cursor-pointer"
                            onClick={() =>
                              dispatch(decrementQuantity({ id: _id }))
                            }
                          >
                            -
                          </button>
                        ) : (
                          <button
                            className="border border-gray-600 py-2 px-3 cursor-pointer"
                            onClick={decreaseQuantity}
                          >
                            -
                          </button>
                        )}
                        {/* to be worked on when adding the functionality of adding and removing from cart */}
                        <div className=" bg-gray-400 py-2 px-3 border-t border-b border-gray-600">
                          {/* i need to fix this dynamically */}
                          {cartItem ? cartItem.quantity : quantity}
                        </div>
                        {/* dynamically render different buttons depending on whether item is in the cart or not */}
                        {cart.some((item) => item._id === _id) ? (
                          <button
                            className="border border-gray-600 py-2 px-3 cursor-pointer"
                            onClick={() =>
                              dispatch(incrementQuantity({ id: _id }))
                            }
                          >
                            +
                          </button>
                        ) : (
                          <button
                            className="border border-gray-600 py-2 px-3 cursor-pointer"
                            onClick={increaseQuantity}
                          >
                            +
                          </button>
                        )}
                      </div>
                      {/* add to cart button */}
                      {cart.some((item) => item._id === _id) ? (
                        <button
                          onClick={removeAnItemFromCart}
                          className="rounded-lg bg-blue-600 text-white uppercase font-bold py-2 px-3"
                        >
                          remove from cart
                        </button>
                      ) : (
                        <button
                          onClick={addAnItemToCart}
                          className="rounded-lg bg-blue-600 text-white uppercase font-bold py-2 px-3"
                        >
                          add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* close modal button */}
              <div className="absolute  -right-3 -top-10">
                <AiOutlineCloseCircle
                  size={30}
                  color="white"
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailModal;
