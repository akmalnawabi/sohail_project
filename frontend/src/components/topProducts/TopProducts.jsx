import React from "react";
import img1 from "../../assets/services1.jpg";
import img2 from "../../assets/services2.jpg";
import img3 from "../../assets/services3.jpg";
import { FaStar } from "react-icons/fa";

const ProductsData = [
  {
    id: 1,
    img: img1,
    title: "Product 1",
    description: "This Carpet is made of 100% Afghan Wool",
  },
  {
    id: 2,
    img: img2,
    title: "Product 2",
    description: "This Carpet is made of 100% Iranian Wool",
  },
  {
    id: 3,
    img: img3,
    title: "Product 3",
    description: "This Carpet is made of 100% German Wool",
  },
];

const TopProducts = () => {
  return (
    <div>
      <div className="container mt-14">
        {/* header  */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-amber-500">Our Customers</p>
          <h1 className="text-3xl font-bold">Our Services</h1>
          <p className="text-s text-gray-400">
            Most Popular Services That Our Customers Love
          </p>
        </div>
        {/* body  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
          {ProductsData.map((data) => (
            <div
              key={data.id}
              className="rounded-lg bg-white transition-all duration-300
                relative shadow-md mx-auto max-w-[320px] flex flex-col"
            >
              {/* Image container with fixed aspect ratio */}
              <div className="w-full h-[200px] md:h-[200px] overflow-hidden rounded-t-lg">
                <img
                  src={data.img}
                  alt={`${data.title} service`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              </div>

              {/* details  */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="text-center space-y-2">
                  <div className="flex justify-center items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                  </div>
                  <h2 className="text-lg font-bold">{data.title}</h2>
                  <p className="text-sm text-gray-500">{data.description}</p>
                </div>
                <div className="mt-4 text-center">
                  <button
                    className="bg-gradient-to-r from-amber-400 to bg-amber-500
                  text-white rounded-full px-4 py-2 hover:text-black hover:bg-amber-400 transition-colors duration-200"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
