import React from "react";
import img1 from "../../assets/logo.png";
import img2 from "../../assets/red.png";
import img3 from "../../assets/productsImg.png";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: img1,
    title: "Welcome",
    description: "To Afghan Culture main Products",
  },
  {
    id: 2,
    img: img2,
    title: "Our Discount",
    description: "We have 20% off for our customers",
  },
  {
    id: 3,
    img: img3,
    title: "Our Products",
    description: "New Products Arrive Every Month",
  },
];

const Hero = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          dots: true,
          arrows: false,
          speed: 500,
        },
      },
    ],
  };
  return (
    <div
      className="relative overflow-hidden min-h-[550px]
    sm:min-h-[650px] bg-gray-100 flex justify-center
    items-center duration-200"
    >
      {/* backround pattern  */}
      <div className="absolute w-[700px] h-[700px] bg-amber-400/40 -top-1/2 right-0 rounded-3xl rotate-45 z-0"></div>

      <div className="container pb-4 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((item) => (
            <div className="px-2" key={item.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 items-center">
                {/* image first */}
                <div className="flex justify-center items-center order-1">
                  <div className="relative z-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold transition-all uppercase duration-300 mb-1 animate-fade-in-up">
                      {item.title}
                    </h1>
                    <p
                      className="text-md sm:text-lg lg:text-xl mb-2 animate-fade-in-up"
                      style={{ animationDelay: "200ms" }}
                    >
                      {item.description}
                    </p>
                    <div
                      className="mb-2 animate-fade-in-up"
                      style={{ animationDelay: "400ms" }}
                    >
                      <button
                        className="bg-gradient-to-r from-amber-400 to bg-amber-500
                  text-white rounded-full px-3 py-1 hover:text-black hover:bg-amber-400 shadow-lg"
                      >
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
                {/* text second */}
                <div className="flex justify-center items-center order-2">
                  <div className="flex justify-center items-center w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] mx-auto">
                    <img
                      src={item.img}
                      alt={`${item.title} hero image`}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-2xl transition-all duration-300 animate-fade-in"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
