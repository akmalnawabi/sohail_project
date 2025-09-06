import React from "react";
import logo from "../../assets/logo.png";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";

const Banner = () => {
  return (
    <div
      className="min-h-[400px] md:min-h-[450px] flex justify-center
    items-center py-2 md:py-1 px-4 sm:px-6 lg:px-4 mt-4"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-1 items-center">
          {/* image section  */}
          <div className="flex justify-center lg:justify-start animate-fade-in">
            <div className="w-[320px] sm:w-[340px] md:w-[330px] lg:w-[360px] xl:w-[380px] h-[320px] sm:h-[340px] md:h-[330px] lg:h-[360px] xl:h-[380px] mx-auto">
              <img
                src={logo}
                alt="logo"
                loading="lazy"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
            </div>
          </div>
          {/* text details  */}
          <div className="flex flex-col justify-center gap-4 md:gap-3 text-center lg:text-left animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-500">
              About Us
            </h1>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              Sohail Noori & Edris Qasemyar
            </h1>
            <p className="text-sm sm:text-md text-gray-500 tracking-wide leading-relaxed">
              Leader of Afghan Culture Products With 10+ Years of Experience
            </p>
            <div className="flex flex-col gap-1 md:gap-1">
              <div className="flex items-center gap-3 md:gap-3 justify-center lg:justify-start">
                <MdOutlineEmail className="text-2xl sm:text-3xl md:text-4xl h-10 w-10 sm:h-12 sm:w-12 shadow-sm p-2 sm:p-4 rounded-full bg-amber-100 flex-shrink-0" />
                <p className="text-sm sm:text-base break-all">
                  ahmadsohail.noori2002@gmail.com
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-3 justify-center lg:justify-start">
                <MdOutlineEmail className="text-2xl sm:text-3xl md:text-4xl h-10 w-10 sm:h-12 sm:w-12 shadow-sm p-2 sm:p-4 rounded-full bg-amber-100 flex-shrink-0" />
                <p className="text-sm sm:text-base break-all">
                  afghancultureproduct@gmail.com
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-3 justify-center lg:justify-start">
                <FaInstagram className="text-2xl sm:text-3xl md:text-4xl h-10 w-10 sm:h-12 sm:w-12 shadow-sm p-2 sm:p-4 rounded-full bg-red-100 flex-shrink-0" />
                <p className="text-sm sm:text-base">Edris Qasemyar</p>
              </div>
              <div className="flex items-center gap-3 md:gap-3 justify-center lg:justify-start">
                <IoCallOutline className="text-2xl sm:text-3xl md:text-4xl h-10 w-10 sm:h-12 sm:w-12 shadow-sm p-2 sm:p-4 rounded-full bg-green-100 flex-shrink-0" />
                <p className="text-sm sm:text-base">+93 773830719</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
