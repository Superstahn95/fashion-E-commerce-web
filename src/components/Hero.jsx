import React from "react";
import image from "../assets/yellow.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className=" py-7 mt-14 font-montserrat">
      <div className="grid  w-[90%] mx-auto space-x-4 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center order-2 md:order-none">
          <h1 className="font-bold text-2xl md:text-5xl capitalize text-center py-5 md:py-2 md:text-start ">
            Best fashion collection
          </h1>
          <p className="pb-2 text-sm md:text-lg text-center md:text-start">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus
            id rerum ea sunt impedit dolorem ut minima vitae sequi harum,
            numquam ipsum quidem quasi nulla, illo aliquam doloribus molestiae
            ratione?
          </p>
          {/* to be replaced with a link to the shop */}
          <div className="my-2">
            <Link
              to={"/shop"}
              className="bg-black py-2 px-3 uppercase text-white"
            >
              shop collection
            </Link>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt="fashion"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
