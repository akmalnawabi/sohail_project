import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load components for better performance
const Hero = lazy(() => import("./components/hero/Hero"));
const Products = lazy(() => import("./components/products/Products"));
const TopProducts = lazy(() => import("./components/topProducts/TopProducts"));
const Banner = lazy(() => import("./components/banner/Banner"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
  </div>
);

// Component to conditionally render footer
const ConditionalFooter = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return !isDashboard ? <Footer /> : null;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Products />
                  <TopProducts />
                  <Banner />
                </>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/top-products" element={<TopProducts />} />
            <Route path="/about" element={<Banner />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        <ConditionalFooter />
      </Router>
    </AuthProvider>
  );
};

export default App;
