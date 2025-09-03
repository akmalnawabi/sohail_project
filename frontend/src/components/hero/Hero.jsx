import React, { useState, useEffect } from "react";
import img1 from "../../assets/logo.png";
import img2 from "../../assets/red.png";
import img3 from "../../assets/productsImg.png";
import { IoBagAdd } from "react-icons/io5";

const ImageList = [
  {
    id: 1,
    img: img1,
    title: "Welcome",
    description: "To Afghan Culture Main Products",
  },
  {
    id: 2,
    img: img2,
    title: "Our Discount",
    description: "We Have 20% Off For Our Customers",
  },
  {
    id: 3,
    img: img3,
    title: "Our Products",
    description: "New Products Arrive Every Month",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showOrderAlert, setShowOrderAlert] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ImageList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Order alert functions
  const showOrderAlertModal = () => {
    setShowOrderAlert(true);
  };

  const closeOrderAlert = () => {
    setShowOrderAlert(false);
  };

  return (
    <div className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] bg-gray-100 w-full">
      {/* Background pattern */}
      <div className="absolute w-[700px] h-[700px] bg-amber-400/40 -top-1/2 right-0 rounded-3xl rotate-45 z-0"></div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Slider container */}
        <div className="relative w-full">
          {/* Slides */}
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {ImageList.map((item, index) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] sm:min-h-[500px]">
                    {/* Text content */}
                    <div className="text-center lg:text-left px-4 sm:px-8">
                      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        {item.title}
                      </h1>
                      <p
                        className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 animate-fade-in-up"
                        style={{ animationDelay: "200ms" }}
                      >
                        {item.description}
                      </p>
                      <div
                        className="animate-fade-in-up"
                        style={{ animationDelay: "400ms" }}
                      >
                        <button
                          onClick={showOrderAlertModal}
                          className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <IoBagAdd className="inline mr-2" />
                          Order Now
                        </button>
                      </div>
                    </div>

                    {/* Image content */}
                    <div className="flex justify-center lg:justify-end px-4 sm:px-8">
                      <div className="relative">
                        <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                          <img
                            src={item.img}
                            alt={`${item.title} hero image`}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {ImageList.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-amber-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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

export default Hero;
