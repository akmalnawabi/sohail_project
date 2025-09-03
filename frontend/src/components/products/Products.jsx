import React, { useState, useEffect } from "react";
import { IoIosPricetag } from "react-icons/io";
import {
  IoEyeOutline,
  IoBagAdd,
  IoChevronBack,
  IoChevronForward,
  IoClose,
} from "react-icons/io5";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOrderAlert, setShowOrderAlert] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Modal functions
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Order alert functions
  const showOrderAlertModal = () => {
    setShowOrderAlert(true);
  };

  const closeOrderAlert = () => {
    setShowOrderAlert(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="mt-4">
        <div className="container mt-10">
          <div className="text-center mb-14 max-w-[600px] mx-auto animate-fade-in">
            <p className="text-sm text-amber-500">Top Selling Products</p>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-s text-gray-400">
              Our New Products Arrive Every Month
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-4">
        <div className="container mt-10">
          <div className="text-center mb-14 max-w-[600px] mx-auto animate-fade-in">
            <p className="text-sm text-amber-500">Top Selling Products</p>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-s text-gray-400">
              Our New Products Arrive Every Month
            </p>
          </div>
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No products available at the moment.
            </p>
            <p className="text-gray-400 text-sm">
              Check back soon for new arrivals!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
              {currentProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="rounded-lg bg-white transition-all duration-300 relative shadow-md hover:shadow-xl max-w-[320px] w-full flex flex-col group mx-auto"
                >
                  {/* Stock status badge */}
                  {!product.inStock && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Image container with fixed aspect ratio */}
                  <div className="w-full h-[200px] md:h-[220px] overflow-hidden rounded-t-lg relative">
                    <img
                      src={product.image}
                      alt={`${product.name} product`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 cursor-pointer"
                      onClick={() => openModal(product)}
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='220' viewBox='0 0 320 220'%3E%3Crect width='320' height='220' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  {/* Product details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="text-center space-y-3">
                      {/* Price */}
                      <div className="flex justify-center items-center gap-1">
                        <IoIosPricetag className="text-amber-500" />
                        <span className="text-lg font-bold text-amber-600">
                          ${product.price}
                        </span>
                      </div>

                      {/* Product name */}
                      <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                        {product.name}
                      </h2>

                      {/* Description */}
                      {product.description && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                      )}

                      {/* Color */}
                      {product.color && (
                        <p className="text-sm text-gray-600">
                          Color:{" "}
                          <span className="font-medium">{product.color}</span>
                        </p>
                      )}

                      {/* Stock status */}
                      <div className="flex justify-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>

                      {/* Order Button */}
                      <div className="mt-4">
                        <button
                          onClick={showOrderAlertModal}
                          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            product.inStock
                              ? "bg-amber-500 text-white hover:bg-amber-600"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? "Order Now" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  <IoChevronBack size={16} />
                  Previous
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-amber-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  Next
                  <IoChevronForward size={16} />
                </button>
              </div>
            )}

            {/* Pagination Info */}
            {totalPages > 1 && (
              <div className="text-center mt-4 text-sm text-gray-600">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, products.length)} of {products.length}{" "}
                products
              </div>
            )}
          </>
        )}

        {/* Product Modal */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <IoClose size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Image */}
                  <div className="space-y-4">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-auto rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-6">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <IoIosPricetag className="text-amber-500 text-xl" />
                      <span className="text-3xl font-bold text-amber-600">
                        ${selectedProduct.price}
                      </span>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* Color */}
                    {selectedProduct.color && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Color
                        </h3>
                        <p className="text-gray-600">{selectedProduct.color}</p>
                      </div>
                    )}

                    {/* Category */}
                    {selectedProduct.category && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Category
                        </h3>
                        <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedProduct.category}
                        </span>
                      </div>
                    )}

                    {/* Stock Status */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Availability
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedProduct.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-6 border-t bg-gray-50">
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
};

export default Products;
