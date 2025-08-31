import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Performance monitoring for production
if (import.meta.env.PROD) {
  // Report web vitals for performance monitoring
  const reportWebVitals = (metric) => {
    console.log(metric);
    // You can send this to your analytics service
  };

  // Monitor Core Web Vitals
  if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          reportWebVitals({ name: "LCP", value: entry.startTime });
        }
        if (entry.entryType === "first-input") {
          reportWebVitals({
            name: "FID",
            value: entry.processingStart - entry.startTime,
          });
        }
      }
    });
    observer.observe({
      entryTypes: ["largest-contentful-paint", "first-input"],
    });
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
