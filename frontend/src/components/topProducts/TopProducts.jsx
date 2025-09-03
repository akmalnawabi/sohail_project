import React, { useState } from "react";
import img1 from "../../assets/services1.jpg";
import img2 from "../../assets/aboutPic.png";
import img3 from "../../assets/service3.png";
import { FaStar } from "react-icons/fa";
import { IoBagAdd } from "react-icons/io5";

const ProductsData = [
  {
    id: 1,
    img: img1,
    title: "Afghani Carpet",
    description: "This Carpet is Handmade of Afghanistan",
  },
  {
    id: 2,
    img: img2,
    title: "Afghani Walnut",
    description: "This Almond is Afghani Top Walnut",
  },
  {
    id: 3,
    img: img3,
    title: "Iranian Carpet",
    description: "This Carpet is machine made and hand made",
  },
];

const TopProducts = () => {
  const [showOrderAlert, setShowOrderAlert] = useState(false);

  // Order alert functions
  const showOrderAlertModal = () => {
    setShowOrderAlert(true);
  };

  const closeOrderAlert = () => {
    setShowOrderAlert(false);
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
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
                    onClick={showOrderAlertModal}
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

      {/* Order Alert Modal */}
      {showOrderAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {/* Alert Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <IoBagAdd className="text-amber-600 text-2xl" />
              </div>
            </div>

            {/* Alert Content */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Online Ordering Not Available
              </h3>
              <p className="text-gray-600 mb-6">
                We're working on bringing you online delivery and payment
                options. For now, please contact us directly to place your
                order.
              </p>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Contact us for orders:</strong>
                </p>
                <p className="text-sm text-gray-600">
                  📞 Phone: +1 (555) 123-4567
                  <br />
                  📧 Email: orders@sohailstore.com
                  <br />
                  💬 WhatsApp: +1 (555) 123-4567
                </p>
              </div>
            </div>

            {/* Alert Actions */}
            <div className="flex gap-3">
              <button
                onClick={closeOrderAlert}
                className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition-colors"
              >
                Got it
              </button>
              <button
                onClick={closeOrderAlert}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopProducts;
