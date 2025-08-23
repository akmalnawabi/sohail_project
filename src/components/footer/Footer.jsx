import React from "react";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About",
    link: "/about",
  },
  {
    id: 3,
    title: "Products",
    link: "/products",
  },
];
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo not available yet & Description */}
        <div className="flex flex-col items-start gap-4">
          {/* <img
            src=""
            alt="Logo"
            className="w-16 h-16 bg-gray-700 rounded-full object-cover"
          /> */}
          <Link to="/" className="text-gray-200 text-lg font-bold">Noori Carpet Store</Link>
          <p className="text-sm">World Of Carpet</p>
        </div>
        {/* Important Links */}
        <div>
          <h1 className="text-lg font-semibold mb-4">Important Links</h1>
          <ul className="space-y-2">
            {footerLinks.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className="hover:text-amber-400 transition-colors duration-200 text-gray-300 text-sm"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Us */}
        <div>
          <h1 className="text-lg font-semibold mb-4">Contact Us</h1>
          <div className="flex gap-4 mt-2">
            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl hover:text-amber-400 transition-colors duration-200" />
            </Link>
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-2xl hover:text-amber-400 transition-colors duration-200" />
            </Link>
            <Link
              to="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-2xl hover:text-amber-400 transition-colors duration-200" />
            </Link>
          </div>
        </div>
        {/* Address */}
        <div>
          <h1 className="text-lg font-semibold mb-4">Address</h1>
          <p className="text-gray-300 text-sm">
            New city, Kabul second street
            <br />
            Kabul, Afghanistan
          </p>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Akmal Nawabi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
