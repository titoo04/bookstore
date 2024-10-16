import React from "react";
import Image from "../../assets/headerBook1.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
export default function Home() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div style={{ backgroundColor: "#F4F2EE" }} className="py-24 w-full overflow-hidden ">
        <Slider {...settings} arrows >
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center  ">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold ">Life Of The Wild</h1>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                    eu.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src={Image}
                    alt="Life Of The Wild"
                    className="w-full shadow-lg "
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center ">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold ">Life Of The Wild</h1>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                    eu.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src={Image}
                    alt="Life Of The Wild"
                    className="w-full shadow-lg "
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center ">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold ">Life Of The Wild</h1>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                    eu.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src={Image}
                    alt="Life Of The Wild"
                    className="w-full shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-5/6 mx-auto flex justify-center items-center ">
              <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-10">
                <div className="text-center md:text-left space-y-4">
                  <h1 className="text-4xl font-bold ">Life Of The Wild</h1>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    eu feugiat amet, libero ipsum enim pharetra hac. Urna
                    commodo, lacus ut magna velit eleifend. Amet, quis urna, a
                    eu.
                  </p>
                  <button className="mt-4 px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-700">
                    Learn More
                  </button>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src={Image}
                    alt="Life Of The Wild"
                    className="w-full shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </Slider>
        {/* <div className="p-5" style={{ backgroundColor: "#F4F2EE" }}></div> */}
      </div>
    </>
  );
}
