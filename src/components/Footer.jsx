import { FiFacebook, FiTwitter } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";

function Footer() {
  return (
    <footer className="bg-black/80 py-20 mt-10 font-montserrat">
      <div className="w-[90%] mx-auto grid   text-gray-400 gap-8 md:grid-cols-4 md:gap-4">
        {/* category div */}
        <div>
          <h3 className="font-bold text-white text-xl uppercase">Categories</h3>
          <ul className="mt-5">
            <li className="pb-1">Women</li>
            <li className="pb-1">Men</li>
            <li className="pb-1">Shoes</li>
          </ul>
        </div>
        {/* help section */}
        <div>
          <h3 className="font-bold text-white text-xl uppercase">help</h3>
          <ul className="mt-5">
            <li className="pb-1">Track order</li>
            <li className="pb-1">Returns</li>
            <li className="pb-1">Shipping</li>
            <li className="pb-1"> FAQs</li>
          </ul>
        </div>

        {/* get in touch */}
        <div>
          <h3 className="font-bold text-white text-xl uppercase">
            get in touch
          </h3>
          <p className="mt-5 leading-loose">
            Any questions? Let us know in store at 8th floor, 379 Hudson St, New
            York, NY 10018 or call us on (+1) 96 716 6879
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <FiFacebook size={30} />
            <FiTwitter size={30} />
            <AiOutlineInstagram size={30} />
          </div>
        </div>
        {/* News letter */}
        <div>
          <h3 className="font-bold text-white text-xl uppercase">help</h3>
          <form className="mt-5">
            <div>
              <input
                type="email"
                placeholder="example@email.com"
                className="border-b border-gray-400 bg-transparent text-gray-400 outline-none"
              />
            </div>
            <div className="mt-5">
              <button className="rounded-lg bg-blue-600 text-white uppercase font-bold py-2 px-3">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
