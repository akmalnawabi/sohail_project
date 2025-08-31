import React from "react";
import img1 from "../../assets/carpets.png";
import img2 from "../../assets/dryFruits.png";
import img3 from "../../assets/ring.png";
import { IoIosPricetag } from "react-icons/io";

const ProductsData = [
  {
    id: 1,
    img: img1,
    title: "Afghanistan",
    rating: "500-1000" ,
    color: "Red",
  },
  {
    id: 2,
    img: img2,
    title: "Iran",
    rating: "50-200",
    color: "Gray & Brown",
  },
  {
    id: 3,
    img: img3,
    title: "Garmany",
    rating: "500-2000",
    color: "Brown",
  },
];

const Products = () => {
  return (
    <div className="mt-4">
      <div className="container mt-10">
        {/* header section  */}
        <div className="text-center mb-14 max-w-[600px] mx-auto animate-fade-in">
          <p className="text-sm text-amber-500">Top Selling Products</p>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-s text-gray-400">
            Our New Products Arrive Every Month
          </p>
        </div>
        {/* body section  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
          {ProductsData.map((data, index) => (
            <div
              key={data.id}
              className={`rounded-lg bg-white transition-all duration-300 relative shadow-md max-w-[320px] flex flex-col ${
                index === 0 ? "ml-2" : ""
              }`}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="w-full h-[200px] md:h-[220px] overflow-hidden rounded-t-lg">
                <img
                  src={data.img}
                  alt={`${data.title} product`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              </div>
              {/* details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="text-center space-y-2">
                  <div className="flex justify-center items-center gap-1">
                    <IoIosPricetag className="" />
                    <span className="text-sm">{data.rating}</span>
                  </div>
                  <h2 className="text-lg font-bold">{data.title}</h2>
                  <p className="text-sm text-gray-500">{data.color}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
