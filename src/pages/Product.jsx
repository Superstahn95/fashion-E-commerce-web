import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  getSingleCartItem,
} from "../features/cart/cartSlice";
import client from "../config/client";

function Product() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const cartItem = useSelector((state) => getSingleCartItem(state, id));
  const addAnItemToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    // swal("Done!!", "item added to cart", "success");
  };
  const removeAnItemFromCart = () => {
    dispatch(removeFromCart(product));
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
  const getProduct = async () => {
    setLoading(true);
    try {
      const response = await client.get(`/product/${id}`);

      setProduct(response.data.product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="w-[90%] mx-auto font-montserrat min-h-[60vh] mt-16 pt-10 flex items-center justify-center">
      {loading ? (
        <p>Fetching product....</p>
      ) : error ? (
        <p className="font-bold text-2xl">Something went wrong</p>
      ) : (
        <div className="grid gap-4  md:grid-cols-2 ">
          {/* product image */}
          <div className="flex items-center justify-center ">
            <img
              src={product?.image.url}
              alt={product?.name}
              className=" h-[300px] w-full  md:h-[500px] md:w-[500px]  object-cover"
            />
          </div>
          {/* other details */}
          <div className="">
            <h2 className="font-semibold text-black text-xl capitalize ">
              {product?.name}
            </h2>
            <h2 className="font-bold py-3">{product?.price}</h2>
            <p className="text-gray-500 pb-3">{product?.short_description}</p>

            {/* color and size choice container.  ====> Might end up being a form though*/}
            <div className=" ">
              <div className="flex space-x-5">
                {/* <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="text-sm text-gray-500">Color</p>
              </div> */}

                {/* other details */}
                <div>
                  <div className="flex flex-col">
                    {" "}
                    {/* <select name="size" className="outline-none">
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
                  </div> */}
                    {/* increase and decrease quantity button */}
                    <div className="flex items-center my-6 ">
                      {cart.some((item) => item._id === id) ? (
                        <button
                          className="border border-gray-600 py-2 px-3 cursor-pointer"
                          onClick={() =>
                            dispatch(decrementQuantity({ id: id }))
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
                      {cart.some((item) => item._id === id) ? (
                        <button
                          className="border border-gray-600 py-2 px-3 cursor-pointer"
                          onClick={() =>
                            dispatch(incrementQuantity({ id: id }))
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
                    {cart.some((item) => item._id === id) ? (
                      <button
                        onClick={removeAnItemFromCart}
                        className=" bg-blue-600 text-white uppercase font-bold py-2 px-3"
                      >
                        remove from cart
                      </button>
                    ) : (
                      <button
                        onClick={addAnItemToCart}
                        className=" bg-blue-600 text-white uppercase font-bold py-2 px-3"
                      >
                        add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
